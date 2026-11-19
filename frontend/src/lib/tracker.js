// Misst die Interaktion während eines Tasks und speichert sie in
// MOUSE_MOVEMENT, HOVER_EVENT, POINT_EVENT, SCROLL_EVENT und DRAGDROP_EVENT.
// Feldnamen entsprechen den Spalten in schema.sql.
//
// Bildschirmunabhängig:
//   - UI-Elemente werden über ihre elementID erkannt (Attribut data-ui-element), nicht über ihre Position.
//   - x / y              = Mausposition als Anteil der Fensterbreite / -höhe (0–1).
//   - scrollStart/End X/Y = Position der oberen (linken) Kante des sichtbaren Ausschnitts als Anteil
//                           der gesamten Inhaltshöhe (-breite): scrollTop / scrollHeight.
//                           0 = ganz oben; ganz unten = 1 - clientHeight / scrollHeight.
//                           (Nicht scrollTop / maxScroll: Bei Containern, die nur wenige Pixel
//                           überstehen, springt dieser Wert bei jedem Scrollen zwischen 0 und 1.)
import { postBatch } from './api';

const FLUSH_INTERVAL_MS = 2000;
const MOVE_INTERVAL_MS = 50;    // höchstens 20 Mauspositionen pro Sekunde
const SCROLL_END_MS = 150;      // so lange ohne Scrollen = Scrollvorgang beendet

const now = () => new Date().toISOString();
const relX = (e) => e.clientX / window.innerWidth;
const relY = (e) => e.clientY / window.innerHeight;

/** elementID des innersten Elements mit data-ui-element unter der Maus, sonst null */
function uiElementOf(target) {
  const el = target instanceof Element ? target.closest('[data-ui-element]') : null;
  return el ? Number(el.dataset.uiElement) : null;
}

let taskID = null;
let buffer = emptyBuffer();
let pending = [];
let flushTimer;

function emptyBuffer() {
  return { moves: [], hovers: [], points: [], scrolls: [], drags: [] };
}

// ---------- MOUSE_MOVEMENT ----------
let lastPosition = { x: null, y: null };
let lastMoveStamp = -Infinity;

function onMouseMove(e) {
  const x = relX(e), y = relY(e);
  if (x === lastPosition.x && y === lastPosition.y) return;   // dragover feuert auch ohne Bewegung
  lastPosition = { x, y };

  if (e.timeStamp - lastMoveStamp < MOVE_INTERVAL_MS) return;
  lastMoveStamp = e.timeStamp;
  buffer.moves.push({ moveTime: now(), x, y });
}

// ---------- HOVER_EVENT: Maus betritt ein UI-Element bis sie es verlässt ----------
let hover = null;

function onMouseOver(e) {
  const elementID = uiElementOf(e.target);
  if (elementID === (hover?.elementID ?? null)) return;   // noch im selben Element
  endHover();
  if (elementID !== null) {
    hover = { eventStart: now(), eventEnd: null, elementID, x: relX(e), y: relY(e) };
  }
}

function onMouseOut(e) {
  if (e.relatedTarget === null) endHover();   // Maus verlässt das Fenster
}

function endHover() {
  if (!hover) return;
  hover.eventEnd = now();
  buffer.hovers.push(hover);
  hover = null;
}

// ---------- POINT_EVENT: Maustaste gedrückt bis losgelassen ----------
const pressed = new Map();   // mouseButton -> offenes POINT_EVENT

function onMouseDown(e) {
  if (e.button > 4) return;   // mouseButton: 0 links, 1 Mitte, 2 rechts, 3 zurück, 4 vor
  pressed.set(e.button, {
    eventStart: now(), eventEnd: null, mouseButton: e.button,
    x: relX(e), y: relY(e), elementID: uiElementOf(e.target)
  });
}

function onMouseUp(e) {
  const point = pressed.get(e.button);
  if (!point) return;
  pressed.delete(e.button);
  point.eventEnd = now();
  buffer.points.push(point);
}

// ---------- SCROLL_EVENT ----------
const scrollPositions = new WeakMap();   // letzte bekannte Position je Container
let scroll = null;
let scrollTimer;

function scrollPosition(el) {
  return {
    x: el.scrollWidth > 0 ? el.scrollLeft / el.scrollWidth : 0,
    y: el.scrollHeight > 0 ? el.scrollTop / el.scrollHeight : 0
  };
}

function onScroll(e) {
  const el = e.target === document ? document.scrollingElement : e.target;
  if (!(el instanceof Element)) return;
  if (scroll && scroll.el !== el) endScroll();

  if (!scroll) {
    const start = scrollPositions.get(el) ?? { x: 0, y: 0 };
    scroll = { el, eventStart: now(), lastScroll: null, scrollStartX: start.x, scrollStartY: start.y };
  }
  scroll.lastScroll = now();
  scrollPositions.set(el, scrollPosition(el));

  clearTimeout(scrollTimer);
  scrollTimer = setTimeout(endScroll, SCROLL_END_MS);
}

function endScroll() {
  clearTimeout(scrollTimer);
  if (!scroll) return;
  const end = scrollPosition(scroll.el);
  buffer.scrolls.push({
    eventStart: scroll.eventStart, eventEnd: scroll.lastScroll,
    scrollStartX: scroll.scrollStartX, scrollStartY: scroll.scrollStartY,
    scrollEndX: end.x, scrollEndY: end.y
  });
  scroll = null;
}

// ---------- DRAGDROP_EVENT: aufgerufen aus den Drag-Handlern des Tasks ----------
let drag = null;

export function trackDragStart(e, eMailID, fromFolderID) {
  pressed.delete(0);   // nach dragstart kommt kein mouseup mehr; der Vorgang steht in DRAGDROP_EVENT
  endHover();          // während des Ziehens wird nicht gehovert
  drag = {
    eventStart: now(), eventEnd: null,
    startX: relX(e), startY: relY(e), endX: null, endY: null,
    eMailID, fromFolderID: fromFolderID ?? null, toFolderID: null
  };
}

/** Gültiger Drop auf einen Ordner */
export function trackDrop(e, toFolderID) {
  finishDrag(relX(e), relY(e), toFolderID ?? null);
}

/** Drag ohne gültigen Drop (toFolderID = NULL). Nach einem Drop ohne Wirkung. */
export function trackDragEnd() {
  finishDrag(lastPosition.x, lastPosition.y, null);
}

function finishDrag(x, y, toFolderID) {
  if (!drag) return;
  Object.assign(drag, { eventEnd: now(), endX: x, endY: y, toFolderID });
  buffer.drags.push(drag);
  drag = null;
}

// ---------- Start / Stopp / Senden ----------
const LISTENERS = {
  mousemove: onMouseMove,
  dragover: onMouseMove,   // während HTML5-Drag feuert kein mousemove
  mouseover: onMouseOver,
  mouseout: onMouseOut,
  mousedown: onMouseDown,
  mouseup: onMouseUp,
  scroll: onScroll         // capture: erreicht auch Scrolls in Unterelementen
};
const OPTIONS = { capture: true, passive: true };

function closeOpenEvents() {
  endHover();
  endScroll();
  pressed.clear();
  drag = null;
}

function onPageHide() {
  closeOpenEvents();
  flushEvents(true);
}

/** Beim Task-Start, nachdem der TASK angelegt wurde. */
export function startTaskTracking(id) {
  taskID = id;
  for (const [type, fn] of Object.entries(LISTENERS)) window.addEventListener(type, fn, OPTIONS);
  window.addEventListener('pagehide', onPageHide);
  flushTimer = setInterval(flushEvents, FLUSH_INTERVAL_MS);
}

/** Beim Task-Ende: offene Events abschließen und alles speichern. */
export async function stopTaskTracking() {
  if (taskID === null) return;
  for (const [type, fn] of Object.entries(LISTENERS)) window.removeEventListener(type, fn, OPTIONS);
  window.removeEventListener('pagehide', onPageHide);
  clearInterval(flushTimer);
  closeOpenEvents();
  await flushEvents();
  taskID = null;
}

async function flushEvents(beacon = false) {
  if (taskID !== null && Object.values(buffer).some((list) => list.length)) {
    pending.push({ taskID, ...buffer });
    buffer = emptyBuffer();
  }

  const batches = pending;
  pending = [];
  for (const batch of batches) {
    try {
      await postBatch('/api/events', batch, beacon);
    } catch (err) {
      console.error('Task-Daten nicht gespeichert', err);
      if (err.retry) pending.push(batch);
    }
  }
}
