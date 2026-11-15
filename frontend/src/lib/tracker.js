import { getSessionId } from './api';

let phase = null;
let buf = { moves: [], events: [], hr: [] };
let retry = [];

const onMove = (e) => buf.moves.push([Date.now(), Math.round(e.clientX), Math.round(e.clientY)]);

/** Im Layout: Events, HR und regelmäßiger Flush laufen die ganze Studie. */
export function startTracker() {
  const onHide = () => flush(true);
  window.addEventListener('pagehide', onHide);
  const id = setInterval(flush, 2000);

  return () => {
    stopMouse();
    window.removeEventListener('pagehide', onHide);
    clearInterval(id);
    flush(true);
  };
}

/** Nur in den Tasks: Mausbewegungen aufzeichnen. */
export function startMouse() {
  window.addEventListener('mousemove', onMove, { passive: true });
}

export function stopMouse() {
  window.removeEventListener('mousemove', onMove);
}

/** Schließt die alte Phase ab (Flush) und beginnt eine neue. */
export function setPhase(next) {
  flush();
  phase = next;
  track('phase_start');
}

export const track = (type, fields = {}) => buf.events.push({ ts: Date.now(), type, ...fields });

export const trackHr = (bpm) => buf.hr.push([Date.now(), bpm]);

export async function flush(beacon = false) {
  const sessionId = getSessionId();
  const hasData = buf.moves.length || buf.events.length || buf.hr.length;
  const batches = retry;
  retry = [];
  if (hasData && sessionId && phase) batches.push({ sessionId, phase, ...buf });
  buf = { moves: [], events: [], hr: [] };   // vor Sessionstart: verwerfen

  for (const b of batches) {
    const body = JSON.stringify(b);
    if (beacon) { navigator.sendBeacon('/api/events', body); continue; }
    try {
      const res = await fetch('/api/events', {
        method: 'POST', headers: { 'content-type': 'application/json' }, body, keepalive: true
      });
      if (!res.ok) throw new Error(String(res.status));
    } catch (err) {
      console.error('Events nicht gespeichert, neuer Versuch', err);
      retry.push(b);
    }
  }
}
