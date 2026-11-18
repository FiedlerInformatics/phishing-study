import "./server.js";
import { i as postBatch } from "./api.js";
//#region src/lib/tracker.js
var FLUSH_INTERVAL_MS = 2e3;
var MOVE_INTERVAL_MS = 50;
var SCROLL_END_MS = 150;
var now = () => (/* @__PURE__ */ new Date()).toISOString();
var relX = (e) => e.clientX / window.innerWidth;
var relY = (e) => e.clientY / window.innerHeight;
/** elementID des innersten Elements mit data-ui-element unter der Maus, sonst null */
function uiElementOf(target) {
	const el = target instanceof Element ? target.closest("[data-ui-element]") : null;
	return el ? Number(el.dataset.uiElement) : null;
}
var taskID = null;
var buffer = emptyBuffer();
var pending = [];
var flushTimer;
function emptyBuffer() {
	return {
		moves: [],
		hovers: [],
		points: [],
		scrolls: [],
		drags: []
	};
}
var lastPosition = {
	x: null,
	y: null
};
var lastMoveStamp = -Infinity;
function onMouseMove(e) {
	const x = relX(e), y = relY(e);
	if (x === lastPosition.x && y === lastPosition.y) return;
	lastPosition = {
		x,
		y
	};
	if (e.timeStamp - lastMoveStamp < MOVE_INTERVAL_MS) return;
	lastMoveStamp = e.timeStamp;
	buffer.moves.push({
		moveTime: now(),
		x,
		y
	});
}
var hover = null;
function onMouseOver(e) {
	const elementID = uiElementOf(e.target);
	if (elementID === (hover?.elementID ?? null)) return;
	endHover();
	if (elementID !== null) hover = {
		eventStart: now(),
		eventEnd: null,
		elementID,
		x: relX(e),
		y: relY(e)
	};
}
function onMouseOut(e) {
	if (e.relatedTarget === null) endHover();
}
function endHover() {
	if (!hover) return;
	hover.eventEnd = now();
	buffer.hovers.push(hover);
	hover = null;
}
var pressed = /* @__PURE__ */ new Map();
function onMouseDown(e) {
	if (e.button > 4) return;
	pressed.set(e.button, {
		eventStart: now(),
		eventEnd: null,
		mouseButton: e.button,
		x: relX(e),
		y: relY(e),
		elementID: uiElementOf(e.target)
	});
}
function onMouseUp(e) {
	const point = pressed.get(e.button);
	if (!point) return;
	pressed.delete(e.button);
	point.eventEnd = now();
	buffer.points.push(point);
}
var scrollPositions = /* @__PURE__ */ new WeakMap();
var scroll = null;
var scrollTimer;
function scrollPosition(el) {
	const maxX = el.scrollWidth - el.clientWidth;
	const maxY = el.scrollHeight - el.clientHeight;
	return {
		x: maxX > 0 ? el.scrollLeft / maxX : 0,
		y: maxY > 0 ? el.scrollTop / maxY : 0
	};
}
function onScroll(e) {
	const el = e.target === document ? document.scrollingElement : e.target;
	if (!(el instanceof Element)) return;
	if (scroll && scroll.el !== el) endScroll();
	if (!scroll) {
		const start = scrollPositions.get(el) ?? {
			x: 0,
			y: 0
		};
		scroll = {
			el,
			eventStart: now(),
			lastScroll: null,
			scrollStartX: start.x,
			scrollStartY: start.y
		};
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
		eventStart: scroll.eventStart,
		eventEnd: scroll.lastScroll,
		scrollStartX: scroll.scrollStartX,
		scrollStartY: scroll.scrollStartY,
		scrollEndX: end.x,
		scrollEndY: end.y
	});
	scroll = null;
}
var LISTENERS = {
	mousemove: onMouseMove,
	dragover: onMouseMove,
	mouseover: onMouseOver,
	mouseout: onMouseOut,
	mousedown: onMouseDown,
	mouseup: onMouseUp,
	scroll: onScroll
};
var OPTIONS = {
	capture: true,
	passive: true
};
function closeOpenEvents() {
	endHover();
	endScroll();
	pressed.clear();
}
function onPageHide() {
	closeOpenEvents();
	flushEvents(true);
}
/** Beim Task-Start, nachdem der TASK angelegt wurde. */
function startTaskTracking(id) {
	taskID = id;
	for (const [type, fn] of Object.entries(LISTENERS)) window.addEventListener(type, fn, OPTIONS);
	window.addEventListener("pagehide", onPageHide);
	flushTimer = setInterval(flushEvents, FLUSH_INTERVAL_MS);
}
/** Beim Task-Ende: offene Events abschließen und alles speichern. */
async function stopTaskTracking() {
	if (taskID === null) return;
	for (const [type, fn] of Object.entries(LISTENERS)) window.removeEventListener(type, fn, OPTIONS);
	window.removeEventListener("pagehide", onPageHide);
	clearInterval(flushTimer);
	closeOpenEvents();
	await flushEvents();
	taskID = null;
}
async function flushEvents(beacon = false) {
	if (taskID !== null && Object.values(buffer).some((list) => list.length)) {
		pending.push({
			taskID,
			...buffer
		});
		buffer = emptyBuffer();
	}
	const batches = pending;
	pending = [];
	for (const batch of batches) try {
		await postBatch("/api/events", batch, beacon);
	} catch (err) {
		console.error("Task-Daten nicht gespeichert", err);
		if (err.retry) pending.push(batch);
	}
}
//#endregion
//#region src/lib/uiElements.js
var FOLDER_ID = {
	inbox: 101,
	important: 102,
	spam: 103,
	neutral: 104,
	bin: 105,
	sent: 106,
	archive: 107,
	notes: 108,
	tags: 109
};
var BUTTON_ID = { timer: 201 };
//#endregion
//#region src/lib/tasks/assets/email-warning-icon.svg
var email_warning_icon_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'%20standalone='no'?%3e%3csvg%20version='1.1'%20viewBox='-5%20-10%2093.75%2087.500237'%20id='svg2'%20sodipodi:docname='noun-email-6853747.svg'%20width='93.75'%20height='87.500237'%20inkscape:version='1.4.2%20(ebf0e940d0,%202025-05-08)'%20xmlns:inkscape='http://www.inkscape.org/namespaces/inkscape'%20xmlns:sodipodi='http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:svg='http://www.w3.org/2000/svg'%3e%3cdefs%20id='defs2'%20/%3e%3csodipodi:namedview%20id='namedview2'%20pagecolor='%23ffffff'%20bordercolor='%23000000'%20borderopacity='0.25'%20inkscape:showpageshadow='2'%20inkscape:pageopacity='0.0'%20inkscape:pagecheckerboard='0'%20inkscape:deskcolor='%23d1d1d1'%20inkscape:zoom='5.9259259'%20inkscape:cx='46.828125'%20inkscape:cy='51.3'%20inkscape:window-width='1920'%20inkscape:window-height='1011'%20inkscape:window-x='0'%20inkscape:window-y='0'%20inkscape:window-maximized='1'%20inkscape:current-layer='svg2'%20/%3e%3cpath%20d='m%2082.50027,21.6447%20v%20-3.5195%20c%200,-0.82812%20-0.32812,-1.625%20-0.91406,-2.2109%20-0.58594,-0.58594%20-1.3828,-0.91406%20-2.2109,-0.91406%20h%20-9.375%20c%200,-2.1484%20-0.24219,-4.2422%20-0.69531,-6.25%20h%2010.07%20c%202.4883,0%204.8711,0.98828%206.6289,2.7461%201.7578,1.7578%202.7461,4.1406%202.7461,6.6289%20v%2050%20c%200,2.4883%20-0.98828,4.8711%20-2.7461,6.6289%20-1.7578,1.7578%20-4.1406,2.7461%20-6.6289,2.7461%20h%20-75%20c%20-2.4883,0%20-4.8711,-0.98828%20-6.6289,-2.7461%20C%20-4.0117,72.99634%20-5,70.61354%20-5,68.12524%20v%20-50%20c%200,-2.4883%200.98828,-4.8711%202.7461,-6.6289%201.7578,-1.7578%204.1406,-2.7461%206.6289,-2.7461%20h%2010.07%20c%20-0.45703,2.0078%20-0.69531,4.1016%20-0.69531,6.25%20h%20-9.375%20c%20-0.82812,0%20-1.625,0.32812%20-2.2109,0.91406%20-0.58594,0.58594%20-0.91406,1.3828%20-0.91406,2.2109%20v%203.5195%20l%2038.766,28.715%20c%201.1055,0.82031%202.6172,0.82031%203.7188,0%20z%20m%20-81.25,7.7773%20V%2067.25%20l%2022.027,-17.625%205.1953,3.8516%20-22.219,17.773%20h%2071.242%20l%20-22.219,-17.773%205.1953,-3.8516%2022.023,17.621%20V%2029.422%20l%20-35.043,25.961%20c%20-3.3164,2.457%20-7.8477,2.457%20-11.16,0%20L%201.24487,29.422%20Z%20M%2041.87527,-10%20c%20-13.797,0%20-25,11.203%20-25,25%200,13.797%2011.203,25%2025,25%2013.797,0%2025,-11.203%2025,-25%200,-13.797%20-11.203,-25%20-25,-25%20z%20m%2015.281,14.137%20c%202.1836,3.0664%203.4688,6.8164%203.4688,10.863%200,10.348%20-8.4023,18.75%20-18.75,18.75%20-4.0469,0%20-7.7969,-1.2852%20-10.863,-3.4688%20z%20m%20-4.418,-4.418%20-26.145,26.145%20c%20-2.1836,-3.0664%20-3.4688,-6.8164%20-3.4688,-10.863%200,-10.348%208.4023,-18.75%2018.75,-18.75%204.0469,0%207.7969,1.2852%2010.863,3.4688%20z'%20fill-rule='evenodd'%20id='path1'%20/%3e%3c/svg%3e";
//#endregion
//#region src/lib/tasks/assets/inbox-icon.svg
var inbox_icon_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'%20standalone='no'?%3e%3csvg%20viewBox='0%200%2022.007458%2022'%20x='0px'%20y='0px'%20version='1.1'%20id='svg2'%20sodipodi:docname='inbox-icon.svg'%20width='22.007458'%20height='22'%20inkscape:version='1.4.2%20(ebf0e940d0,%202025-05-08)'%20xmlns:inkscape='http://www.inkscape.org/namespaces/inkscape'%20xmlns:sodipodi='http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:svg='http://www.w3.org/2000/svg'%3e%3cdefs%20id='defs2'%20/%3e%3csodipodi:namedview%20id='namedview2'%20pagecolor='%23ffffff'%20bordercolor='%23000000'%20borderopacity='0.25'%20inkscape:showpageshadow='2'%20inkscape:pageopacity='0.0'%20inkscape:pagecheckerboard='0'%20inkscape:deskcolor='%23d1d1d1'%20inkscape:zoom='26.666667'%20inkscape:cx='10.96875'%20inkscape:cy='13.9875'%20inkscape:window-width='1920'%20inkscape:window-height='1011'%20inkscape:window-x='0'%20inkscape:window-y='0'%20inkscape:window-maximized='1'%20inkscape:current-layer='svg2'%20/%3e%3cpath%20d='m%2022.003729,12.84%20-1.46,-8.66%20a%205,5%200%200%200%20-4.93,-4.18%20h%20-9.22%20a%205,5%200%200%200%20-4.93,4.18%20l%20-1.45999999,8.66%20a%200.86,0.86%200%200%200%200,0.16%20v%204%20A%205,5%200%200%200%205.003729,22%20h%2012%20a%205,5%200%200%200%205,-5%20v%20-4%20a%200.86,0.86%200%200%200%200,-0.16%20z%20m%20-18.57,-8.33%20a%203,3%200%200%201%202.96,-2.51%20h%209.22%20a%203,3%200%200%201%203,2.51%20l%201.21,7.49%20h%20-3.7%20a%202.77,2.77%200%200%200%20-2.51,1.55%200.81,0.81%200%200%201%20-0.73,0.45%20h%20-3.76%20a%200.81,0.81%200%200%201%20-0.73,-0.45%202.79,2.79%200%200%200%20-2.51,-1.55%20h%20-3.7%20z%20m%2013.57,15.49%20h%20-12%20a%203,3%200%200%201%20-3,-3%20v%20-3%20h%203.88%20a%200.81,0.81%200%200%201%200.73,0.45%202.77,2.77%200%200%200%202.51,1.55%20h%203.76%20a%202.79,2.79%200%200%200%202.51,-1.55%200.81,0.81%200%200%201%200.73,-0.45%20h%203.88%20v%203%20a%203,3%200%200%201%20-3,3%20z'%20id='path1'%20/%3e%3c/svg%3e";
//#endregion
//#region src/lib/tasks/assets/mail-icon.svg
var mail_icon_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'%20standalone='no'?%3e%3csvg%20data-name='Layer%201'%20viewBox='0%200%20481%20324'%20x='0px'%20y='0px'%20version='1.1'%20id='svg2'%20sodipodi:docname='noun-mail-3083391.svg'%20width='481'%20height='324'%20inkscape:version='1.4.2%20(ebf0e940d0,%202025-05-08)'%20xmlns:inkscape='http://www.inkscape.org/namespaces/inkscape'%20xmlns:sodipodi='http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:svg='http://www.w3.org/2000/svg'%3e%3cdefs%20id='defs2'%20/%3e%3csodipodi:namedview%20id='namedview2'%20pagecolor='%23ffffff'%20bordercolor='%23000000'%20borderopacity='0.25'%20inkscape:showpageshadow='2'%20inkscape:pageopacity='0.0'%20inkscape:pagecheckerboard='0'%20inkscape:deskcolor='%23d1d1d1'%20inkscape:zoom='1.25'%20inkscape:cx='240.4'%20inkscape:cy='225.6'%20inkscape:window-width='1920'%20inkscape:window-height='1011'%20inkscape:window-x='0'%20inkscape:window-y='0'%20inkscape:window-maximized='1'%20inkscape:current-layer='svg2'%20/%3e%3ctitle%20id='title1'%3eArtboard%2018%3c/title%3e%3cpath%20d='M%20481,12%20A%2012,12%200%200%200%20469,0%20H%2012%20A%2012,12%200%200%200%200,12%20v%20300%20a%2012,12%200%200%200%2012,12%20h%20457%20a%2012,12%200%200%200%2012,-12%20z%20M%20241,190.023%2038.91,24%20H%20443.09%20Z%20M%20151.226,147.923%2024,283%20V%2043.4%20Z%20m%2019.068,15.367%2063.089,51.781%20a%2012.018,12.018%200%200%200%2015.234,-0.036%20L%20312.258,162.843%20440.473,300%20H%2041.619%20Z%20M%20331.322,147.47%20458,43.4%20v%20239.5%20z'%20id='path1'%20/%3e%3c/svg%3e";
//#endregion
//#region src/lib/tasks/assets/send-email-icon.svg
var send_email_icon_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'%20standalone='no'?%3e%3csvg%20version='1.1'%20viewBox='-5%20-10%2094.088577%2094.122017'%20id='svg2'%20sodipodi:docname='noun-send-email-7474580.svg'%20width='94.088577'%20height='94.122017'%20inkscape:version='1.4.2%20(ebf0e940d0,%202025-05-08)'%20xmlns:inkscape='http://www.inkscape.org/namespaces/inkscape'%20xmlns:sodipodi='http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:svg='http://www.w3.org/2000/svg'%3e%3cdefs%20id='defs2'%20/%3e%3csodipodi:namedview%20id='namedview2'%20pagecolor='%23ffffff'%20bordercolor='%23000000'%20borderopacity='0.25'%20inkscape:showpageshadow='2'%20inkscape:pageopacity='0.0'%20inkscape:pagecheckerboard='0'%20inkscape:deskcolor='%23d1d1d1'%20inkscape:zoom='5.9259259'%20inkscape:cx='46.996875'%20inkscape:cy='54.50625'%20inkscape:window-width='1920'%20inkscape:window-height='1011'%20inkscape:window-x='0'%20inkscape:window-y='0'%20inkscape:window-maximized='1'%20inkscape:current-layer='svg2'%20/%3e%3cpath%20d='m%2089.084715,-7.0067549%20c%200.07031,-1.8047%20-1.7148,-3.3047001%20-3.4805,-2.9375%20-0.26172,-0.015626%20-88.3050005,29.2889999%20-88.6170005,29.3479999%20-2.3789,0.70312%20-2.7266,4.2656%20-0.47266,5.3789%20l%2037.5040005,20.293%2020.293,37.504%20c%200.55469,1.0352%201.6875,1.6328%202.8438,1.5312%201.168,-0.10156%202.1641,-0.89062%202.5352,-2.0039%200.23828,-1.1953%2029.426,-87.8869999%2029.398,-89.1129999%20z%20m%20-13.793,6.65230004%20-39.633,39.63299986%20-30.3590005,-16.43%2069.9960005,-23.20699986%20z%20m%20-19.047,74.15199986%20-16.43,-30.359%2039.633,-39.6369999%20-23.207,69.9959999%20z'%20id='path1'%20/%3e%3c/svg%3e";
//#endregion
//#region src/lib/tasks/assets/trash-icon.svg
var trash_icon_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'%20standalone='no'?%3e%3csvg%20viewBox='0%200%20276%20384'%20x='0px'%20y='0px'%20version='1.1'%20id='svg2'%20sodipodi:docname='noun-trash-3370078.svg'%20width='276'%20height='384'%20inkscape:version='1.4.2%20(ebf0e940d0,%202025-05-08)'%20xmlns:inkscape='http://www.inkscape.org/namespaces/inkscape'%20xmlns:sodipodi='http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:svg='http://www.w3.org/2000/svg'%3e%3cdefs%20id='defs2'%20/%3e%3csodipodi:namedview%20id='namedview2'%20pagecolor='%23ffffff'%20bordercolor='%23000000'%20borderopacity='0.25'%20inkscape:showpageshadow='2'%20inkscape:pageopacity='0.0'%20inkscape:pagecheckerboard='0'%20inkscape:deskcolor='%23d1d1d1'%20inkscape:zoom='1.25'%20inkscape:cx='137.2'%20inkscape:cy='256'%20inkscape:window-width='1920'%20inkscape:window-height='1011'%20inkscape:window-x='0'%20inkscape:window-y='0'%20inkscape:window-maximized='1'%20inkscape:current-layer='svg2'%20/%3e%3cpath%20d='m%2015.1,64%2023.6,290.7%20c%200,16.2%2013.1,29.3%2029.3,29.3%20h%20141%20c%2016.2,0%2029.3,-13.1%2029.3,-29.3%20L%20261.6,64%20Z%20M%2076.7,329%2070,96%20h%2018.5%20l%206.9,233%20z%20m%2070.3,0%20H%20129%20V%2096%20h%2018%20z%20m%2052.3,0%20H%20180.7%20L%20187.5,96%20H%20206%20Z%20M%20246,28%20H%20210%20L%20183.7,5%20C%20180,1.8%20175.3,0%20170.5,0%20H%20105.7%20C%20100.8,0%2096,1.8%2092.3,5%20L%2066,28%20H%2030%20C%2012.4,28%200,36.4%200,54%20H%20276%20C%20276,36.4%20263.6,28%20246,28%20Z'%20id='path1'%20/%3e%3c/svg%3e";
//#endregion
//#region src/lib/tasks/assets/archive-icon.svg
var archive_icon_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'%20standalone='no'?%3e%3csvg%20version='1.1'%20viewBox='-5%20-10%20100.0044%2085.5625'%20id='svg2'%20sodipodi:docname='noun-archive-7392500.svg'%20width='100.0044'%20height='85.5625'%20inkscape:version='1.4.2%20(ebf0e940d0,%202025-05-08)'%20xmlns:inkscape='http://www.inkscape.org/namespaces/inkscape'%20xmlns:sodipodi='http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:svg='http://www.w3.org/2000/svg'%3e%3cdefs%20id='defs2'%20/%3e%3csodipodi:namedview%20id='namedview2'%20pagecolor='%23ffffff'%20bordercolor='%23000000'%20borderopacity='0.25'%20inkscape:showpageshadow='2'%20inkscape:pageopacity='0.0'%20inkscape:pagecheckerboard='0'%20inkscape:deskcolor='%23d1d1d1'%20inkscape:zoom='5.9259259'%20inkscape:cx='49.865625'%20inkscape:cy='50.2875'%20inkscape:window-width='1920'%20inkscape:window-height='1011'%20inkscape:window-x='0'%20inkscape:window-y='0'%20inkscape:window-maximized='1'%20inkscape:current-layer='svg2'%20/%3e%3cpath%20d='M%203.9297,-10%20C%20-0.9609,-10%20-5,-5.9609%20-5,-1.0703%20v%2013.289%20c%200,3.5234%202.0938,6.6055%205.0977,8.0508%20v%2045.008%20c%200,5.6562%204.6602,10.285%2010.316,10.285%20h%2069.184%20c%205.6562,0%2010.309,-4.6289%2010.309,-10.285%20v%20-45.008%20c%203.0039,-1.4453%205.0977,-4.5273%205.0977,-8.0508%20V%20-1.0703%20C%2095.0044,-5.9609%2090.9732,-10%2086.0825,-10%20Z%20m%200,6.25%20h%2082.148%20c%201.5352,0%202.6719,1.1445%202.6719,2.6797%20v%2013.289%20c%200,1.5352%20-1.1367,2.6719%20-2.6719,2.6719%20H%203.9297%20C%202.3945,14.8906%201.25,13.7539%201.25,12.2187%20V%20-1.0703%20C%201.25,-2.6055%202.3945,-3.75%203.9297,-3.75%20Z%20m%202.4219,24.891%20h%2077.301%20v%2044.133%20c%200,2.2773%20-1.7812,4.0352%20-4.0586,4.0352%20H%2010.41%20c%20-2.2773,0%20-4.0586,-1.7578%20-4.0586,-4.0352%20z%20m%2025.812,10.148%20v%200.0039%20c%20-0.83203,-0.0039%20-1.6328,0.32422%20-2.2227,0.91406%20-0.58984,0.58984%20-0.91797,1.3906%20-0.91406,2.2227%200,0.82812%200.33203,1.625%200.92188,2.2109%200.58984,0.58203%201.3867,0.91016%202.2148,0.90625%20h%2025.68%20c%200.82812,0.0039%201.625,-0.32422%202.2148,-0.90625%200.58594,-0.58594%200.91797,-1.3828%200.92188,-2.2109%200,-0.83203%20-0.32812,-1.6328%20-0.91797,-2.2227%20-0.58594,-0.58984%20-1.3867,-0.91797%20-2.2188,-0.91406%20z'%20id='path1'%20/%3e%3c/svg%3e";
//#endregion
//#region src/lib/tasks/assets/notes-icon.svg
var notes_icon_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'%20standalone='no'?%3e%3csvg%20viewBox='0%200%2030%2030'%20x='0px'%20y='0px'%20version='1.1'%20id='svg2'%20sodipodi:docname='noun-note-3248069.svg'%20width='30'%20height='30'%20inkscape:version='1.4.2%20(ebf0e940d0,%202025-05-08)'%20xmlns:inkscape='http://www.inkscape.org/namespaces/inkscape'%20xmlns:sodipodi='http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:svg='http://www.w3.org/2000/svg'%3e%3cdefs%20id='defs2'%20/%3e%3csodipodi:namedview%20id='namedview2'%20pagecolor='%23ffffff'%20bordercolor='%23000000'%20borderopacity='0.25'%20inkscape:showpageshadow='2'%20inkscape:pageopacity='0.0'%20inkscape:pagecheckerboard='0'%20inkscape:deskcolor='%23d1d1d1'%20inkscape:zoom='20'%20inkscape:cx='14.975'%20inkscape:cy='19'%20inkscape:window-width='1920'%20inkscape:window-height='1011'%20inkscape:window-x='0'%20inkscape:window-y='0'%20inkscape:window-maximized='1'%20inkscape:current-layer='svg2'%20/%3e%3ctitle%20id='title1'%3enote%3c/title%3e%3cpath%20d='m%2029.9342,20.3257%20a%200.984,0.984%200%200%200%200.0533,-0.2639%20C%2029.989,20.04%2030,20.0219%2030,20%20V%201%20A%201,1%200%200%200%2029,0%20H%201%20A%201,1%200%200%200%200,1%20v%2028%20a%201,1%200%200%200%201,1%20h%2019%20a%201.01,1.01%200%200%200%200.7077,-0.2936%20l%208.9985,-8.9985%200.0034,-0.0043%20a%200.9883,0.9883%200%200%200%200.191,-0.2833%200.9632,0.9632%200%200%200%200.0336,-0.0946%20z%20M%2019,20%20v%208%20H%202%20V%202%20h%2026%20v%2017%20h%20-8%20a%201,1%200%200%200%20-1,1%20z%20m%202,6.5859%20V%2021%20h%205.5859%20z'%20id='path1'%20/%3e%3c/svg%3e";
//#endregion
//#region src/lib/tasks/assets/tag-icon.svg
var tag_icon_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'%20standalone='no'?%3e%3csvg%20version='1.1'%20viewBox='-5%20-10%2087.139069%2087.794456'%20id='svg2'%20sodipodi:docname='noun-tag-8360542.svg'%20width='87.139069'%20height='87.794456'%20inkscape:version='1.4.2%20(ebf0e940d0,%202025-05-08)'%20xmlns:inkscape='http://www.inkscape.org/namespaces/inkscape'%20xmlns:sodipodi='http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:svg='http://www.w3.org/2000/svg'%3e%3cdefs%20id='defs2'%20/%3e%3csodipodi:namedview%20id='namedview2'%20pagecolor='%23ffffff'%20bordercolor='%23000000'%20borderopacity='0.25'%20inkscape:showpageshadow='2'%20inkscape:pageopacity='0.0'%20inkscape:pagecheckerboard='0'%20inkscape:deskcolor='%23d1d1d1'%20inkscape:zoom='5.9259259'%20inkscape:cx='43.453125'%20inkscape:cy='51.46875'%20inkscape:window-width='1920'%20inkscape:window-height='1011'%20inkscape:window-x='0'%20inkscape:window-y='0'%20inkscape:window-maximized='1'%20inkscape:current-layer='svg2'%20/%3e%3cpath%20d='m%2021.191712,73.746333%20c%205.332,5.3008%2013.562,5.4414%2018.863,0.15234%2012.73,-12.707%2025.379,-25.5%2038.004,-38.312%202.7461,-2.7852%204.1445,-6.2109%204.0781,-10.207%20-0.13281,-7.9609%20-0.25,-15.9140002%20-0.48828,-23.8710002%20-0.21094,-6.8789%20-5.0156,-11.492%20-11.836,-11.504%20-7.6406,-0.00781%20-15.285,-0.00781%20-22.922,0.015625%20-3.1055,0.00781%20-5.8242,1.0859%20-8.0625,3.2422%20-2.1406,2.0625%20-4.2227,4.1836%20-6.332,6.27730002%20-11.141,11.07000018%20-22.316,22.10900018%20-33.41400022,33.21900018%20-5.44919998,5.4531%20-5.42579998,13.336%20-0.03125,18.785%207.35160002,7.4297%2014.73000022,14.832%2022.14100022,22.203%20z%20m%20-16.6020002,-35.832%20c%200.0078,-0.0078%200.01172,-0.01563%200.01953,-0.02344%205.5312002,-6.2383%2011.8710002,-11.812%2017.7700002,-17.707%205.6523,-5.6484%2011.332,-11.2770002%2016.969,-16.9410002%202.1211,-2.1289%203.7656,-4.8359%206.8672,-5.6914%201.207,-0.33203%202.4766,-0.33203%203.7266,-0.32422%206.5273,0.02734%2013.051,0.05469%2019.578,0.08203%201.2109,0.0039%202.5391,0.05469%203.4336,0.86719%200.97656,0.88281002%201.0898,2.34770002%201.1367,3.6641%200.25781,6.9883%200.51953,13.9770002%200.77734,20.9650002%200.0625,1.6875%200.11719,3.4336%20-0.50391,5.0039%20-0.60938,1.543%20-1.8086,2.7695%20-2.9766,3.9453%20-11.73,11.84%20-23.465,23.68%20-35.195,35.52%20-1.5234,1.5391%20-3.2773,3.1797%20-5.4453,3.2266%20-2.375,0.05078%20-4.1562,-1.7461%20-5.7188,-3.293%20-2.1992,-2.1758%20-4.3867,-4.3672%20-6.5742,-6.5547%20-4.4648,-4.4727%20-8.9102002,-8.9648%20-13.3360002,-13.477%20-1.0312,-1.0547%20-2.1055,-2.1797%20-2.4609,-3.6094%20-0.5,-2.0117%200.55859,-4.0977%201.9336,-5.6523%20z%20m%2054.2030002,-14.336%20c%205.7305,0.01953%2010.105,-4.1914%2010.152,-9.7812%200.04297,-5.4141002%20-4.5703,-10.0120002%20-10.047,-10.0120002%20-5.5078,-0.0039%20-9.9102,4.3594%20-9.957,9.8594002%20-0.04297,5.4922%204.3438,9.9141%209.8516,9.9336%20z%20m%200.03125,-12.555%20c%201.5781,-0.04297%202.8516,1.1953%202.8438,2.7656%20-0.0078,1.4805%20-1.2227,2.6953%20-2.7266,2.7227%20-1.5391,0.03125%20-2.7852,-1.1172%20-2.8203,-2.5938%20-0.04297,-1.6445%201.0859,-2.8516%202.7031,-2.8945%20z'%20id='path1'%20/%3e%3c/svg%3e";
//#endregion
//#region src/lib/tasks/assets/important_mail-icon.svg
var important_mail_icon_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'%20standalone='no'?%3e%3csvg%20version='1.1'%20x='0px'%20y='0px'%20viewBox='0%200%2095.101562%2062.800781'%20xml:space='preserve'%20id='svg3'%20sodipodi:docname='important_email-icon.svg'%20width='95.101562'%20height='62.800781'%20inkscape:version='1.4.2%20(ebf0e940d0,%202025-05-08)'%20xmlns:inkscape='http://www.inkscape.org/namespaces/inkscape'%20xmlns:sodipodi='http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:svg='http://www.w3.org/2000/svg'%3e%3cdefs%20id='defs3'%20/%3e%3csodipodi:namedview%20id='namedview3'%20pagecolor='%23ffffff'%20bordercolor='%23000000'%20borderopacity='0.25'%20inkscape:showpageshadow='2'%20inkscape:pageopacity='0.0'%20inkscape:pagecheckerboard='0'%20inkscape:deskcolor='%23d1d1d1'%20inkscape:zoom='6.4'%20inkscape:cx='47.34375'%20inkscape:cy='44.375'%20inkscape:window-width='1920'%20inkscape:window-height='1011'%20inkscape:window-x='0'%20inkscape:window-y='0'%20inkscape:window-maximized='1'%20inkscape:current-layer='svg3'%20/%3e%3cpath%20id='path1'%20d='M%202.9003906,0%20C%201.2003906,0%20-9.9999994e-8,1.400781%200,3.300781%20v%2045.5%20c%200,1.8%201.4003906,3.300781%202.9003906,3.300781%20H%2059.90039%20L%2060,52.201172%20c%203,6.5%209.501562,10.599609%2016.601562,10.599609%2010.2,0%2018.5,-8.3%2018.5,-18.5%200,-8.6%20-5.801172,-15.900391%20-14.201172,-17.900391%20h%20-0.199218%20v%20-23%20C%2080.701172,1.60039%2079.300781,0%2077.800781,0%20Z%20m%207.7011714,6.701172%20h%2059.5%20L%2040.300781,25.5%2040.201172,25.40039%20Z%20M%205.8007812,9.101562%2038.90039,31.201172%20c%200.8,0.6%202.2,0.6%203,0%20l%2032.900391,-22%20V%2026%20h%20-0.199219%20c%20-9.4,1.1%20-16.5,8.90039%20-16.5,18.40039%20V%2045%2045.601562%20H%205.8007812%20Z%20M%2076.601562,29.800781%20c%208,0%2014.5,6.599609%2014.5,14.599609%200,8%20-6.5,14.5%20-14.5,14.5%20-8,0%20-14.5,-6.5%20-14.5,-14.5%200,-8%206.5,-14.599609%2014.5,-14.599609%20z%20M%2074.5,35.601562%20v%2011.09961%20h%204.101562%20V%2035.601562%20Z%20M%2074.5,49.5%20v%203.701172%20h%204.101562%20V%2049.5%20Z'%20/%3e%3c/svg%3e";
//#endregion
//#region src/lib/emails.json
var emails_default = /* @__PURE__ */ JSON.parse("[{\"id\":1,\"set\":\"A\",\"sender\":\"info@dropbox.com\",\"subject\":\"Droppbox Notification\",\"timestamp\":\"2021-05-12T12:43:00\",\"preview\":\"Dear John Doe, Our security system has detected some irregular ...\",\"body\":[{\"type\":\"image\",\"src\":\"/email_assets/dropbox-logo.png\",\"alt\":\"dropbox logo\",\"width\":375},{\"type\":\"paragraph\",\"text\":\"Dear John Doe\"},{\"type\":\"paragraph\",\"text\":\"Our security system has detected some irregular activity connected to your account. You will be unable to open documents until this issue has been resolved.\"},{\"type\":\"link\",\"text\":\"CLICK HERE TO RESET YOUR PASSWORD\",\"href\":\"\"},{\"type\":\"paragraph\",\"text\":\"Your Dropbox Security Support.\"}],\"folder\":\"inbox\",\"isPhishing\":false,\"read\":false},{\"id\":2,\"set\":\"B\",\"sender\":\"GlobalConnect Team\",\"subject\":\"important! Company Evaluation!\",\"timestamp\":\"2025-12-13T07:47:00\",\"preview\":\"Dear John Doe, we urge you to complete the following company ...\",\"body\":[{\"type\":\"paragraph\",\"text\":\"Dear John Doe,\"},{\"type\":\"paragraph\",\"text\":\"we urge you to complete the following company evaluation within 24 hours of receipt so that we can have enough time to evaluate it. We remind yout that filling out is mandatory to every employee.\"},{\"type\":\"link\",\"text\":\"CLICK HERE\",\"href\":\"\"},{\"type\":\"paragraph\",\"text\":\"\\nYour GLobal Connect Team.\"}],\"folder\":\"inbox\",\"isPhishing\":true,\"read\":false},{\"id\":3,\"set\":\"A\",\"sender\":\"GlobalConnect Team\",\"subject\":\"Quick Employee Survey\",\"timestamp\":\"2021-08-03T11:06:25\",\"preview\":\"Dear John Doe, We are conducting an employee survey this year to ...\",\"body\":[{\"type\":\"paragraph\",\"text\":\"Dear John Doe,\"},{\"type\":\"paragraph\",\"text\":\"We are conducting an employee survey this year to improve the climate withing our team.\\nYou have a maximum of 24 hours to complete the questionnaire.\\nThe questionnaire is mandatory for every employee.\\nIf you do not complete the questionnaire within the time limit, we will notify your boss.\"},{\"type\":\"link\",\"text\":\"CLICK HERE TO ACCESS THE SURVEY\",\"href\":\"\"},{\"type\":\"paragraph\",\"text\":\"Thank you in advance!\\n\\nYour Global Connect Team\"}],\"folder\":\"inbox\",\"isPhishing\":true,\"read\":false},{\"id\":4,\"set\":\"B\",\"sender\":\"Max Miller <maxmiller@globalconnect.com>\",\"subject\":\"RE: Document meeting urgent!\",\"timestamp\":\"2025-04-27T04:12:00\",\"preview\":\"Hey, below is the link to the important document for the next ...\",\"body\":[{\"type\":\"paragraph\",\"text\":\"Hey,\\nbelow is the link to the important document for the next meeting. Please have a look if everything is correct.\\nOpen this recourse to preview the document (it the link doesn't work, copy it and past to browser):\"},{\"type\":\"link\",\"text\":\"Document\",\"href\":\"\"}],\"folder\":\"inbox\",\"isPhishing\":false,\"read\":false},{\"id\":5,\"set\":\"A\",\"sender\":\"management@glubalconnect.com\",\"subject\":\"Earn extra money\",\"timestamp\":\"2020-12-18T03:40:00\",\"preview\":\"Dear colleagues, Great things are planned for this year's foundation ...\",\"body\":[{\"type\":\"paragraph\",\"text\":\"Dear colleagues,\"},{\"type\":\"paragraph\",\"text\":\"Great things are planned for this year's foundation anniversary. For this reason, we still need helpers who actively support us in the construction. To make the offer a little more attractive, we have talked with the company management and decided that each helper receives a bonus. For every hour worked you will get 50 Euro extra! To participate, you have to register today at the following link (all information is summarized there as well):\"},{\"type\":\"link\",\"text\":\"Link for the registration\",\"href\":\"\"},{\"type\":\"paragraph\",\"text\":\"!! Important: Tomorrow we will not accept any more registrations.\"},{\"type\":\"paragraph\",\"text\":\"Merry Christmas!\"},{\"type\":\"paragraph\",\"text\":\"Global-Connect Team\"}],\"folder\":\"inbox\",\"isPhishing\":true,\"read\":false},{\"id\":6,\"set\":\"A\",\"sender\":\"One Drive Support\",\"subject\":\"UPDATE OneDrive: Validate your Account\",\"timestamp\":\"2021-05-12T07:38:00\",\"preview\":\"Security Notice! Dear John Doe, our security system has detected some ...\",\"body\":[{\"type\":\"image\",\"src\":\"/email_assets/OneDrive-Symbol.png\",\"alt\":\"onedrive logo\",\"width\":150},{\"type\":\"paragraph\",\"text\":\"Security Notice!\"},{\"type\":\"paragraph\",\"text\":\"Dear John Doe, our security system has detected some irregular activity connected to your account. You will be unable to share documents until this issue has been resolved.\"},{\"type\":\"link\",\"text\":\"CLICK HERE TO VALIDATE NOW\",\"href\":\"\"},{\"type\":\"paragraph\",\"text\":\"Your OneDrive Support\"}],\"folder\":\"inbox\",\"isPhishing\":true,\"read\":false},{\"id\":7,\"set\":\"B\",\"sender\":\"management@globalconnect.com\",\"subject\":\"Win a new IPhone\",\"timestamp\":\"2020-08-04T06:58:00\",\"preview\":\"Dear Globalconnect employees, because the turnover was very high last ...\",\"body\":[{\"type\":\"image\",\"src\":\"/email_assets/apple-logo.png\",\"alt\":\"apple logo\",\"width\":75},{\"type\":\"paragraph\",\"text\":\"Dear Globalconnect employees,\"},{\"type\":\"paragraph\",\"text\":\"because the turnover was very high last year, Global Connect raffles 10 new iphones as corporate phones among all employees. This is our way to thank employees! If you want to participate in raffle, please register under the link following:\"},{\"type\":\"link\",\"text\":\"CLICK HERE TO ENROLL\",\"href\":\"\"},{\"type\":\"paragraph\",\"text\":\"Good luck!\"},{\"type\":\"paragraph\",\"text\":\"Your Global-Connect Managment\"}],\"folder\":\"inbox\",\"isPhishing\":true,\"read\":false},{\"id\":8,\"set\":\"A\",\"sender\":\"government@germany.eu\",\"subject\":\"New Corona regulations\",\"timestamp\":\"2021-07-29T12:01:00\",\"preview\":\"The government has decided, due to the again rising Corona numbers ...\",\"body\":[{\"type\":\"paragraph\",\"text\":\"The government has decided, due to the again rising Corona numbers, new regulations in the sense of the infection protection. These will be valid from tomorrow and sanctioned with high fines in case of violation. All necessary information can be found in the following link:\"},{\"type\":\"link\",\"text\":\"Corona Guidelines\",\"href\":\"\"}],\"folder\":\"inbox\",\"isPhishing\":true,\"read\":false},{\"id\":9,\"set\":\"B\",\"sender\":\"license@microsuft.com\",\"subject\":\"Extend your Microsoft license\",\"timestamp\":\"2021-06-29T08:35:00\",\"preview\":\"Microsoft Dear Customer, We would like remind you to renew your anual ...\",\"body\":[{\"type\":\"image\",\"src\":\"/email_assets/microsoft-logo.png\",\"alt\":\"microsoft logo\",\"width\":275},{\"type\":\"paragraph\",\"text\":\"Microsoft\"},{\"type\":\"paragraph\",\"text\":\"Dear Customer,\"},{\"type\":\"paragraph\",\"text\":\"We would like remind you to renew your anual Microsoft license in order to continue Microsoft services and applications using. Otherwise we will be forced to block your acount.\"},{\"type\":\"paragraph\",\"text\":\"Microsoft Support\"},{\"type\":\"link\",\"text\":\"CLICK HERE TO RENEW\",\"href\":\"\"}],\"folder\":\"inbox\",\"isPhishing\":true,\"read\":false},{\"id\":10,\"set\":\"B\",\"sender\":\"no-reply@dropbox.com\",\"subject\":\"Max Miller has shared Meeting Guide with you\",\"timestamp\":\"2021-05-11T06:13:00\",\"preview\":\"Hello John Doe, Max Miller (maxmiller@globalconnect.com) has invited ...\",\"body\":[{\"type\":\"paragraph\",\"text\":\"Hello John Doe,\"},{\"type\":\"paragraph\",\"text\":\"Max Miller (maxmiller@globalconnect.com) has invited you to edit the document \\\"Meeting guide\\\" in Dropbox.\"},{\"type\":\"paragraph\",\"text\":\"Click\"},{\"type\":\"link\",\"text\":\"Go to document\",\"href\":\"\"},{\"type\":\"paragraph\",\"text\":\"Have fun!\\nThe Dropbox team\"}],\"folder\":\"inbox\",\"isPhishing\":false,\"read\":false},{\"id\":11,\"set\":\"A\",\"sender\":\"maxmiller@globalconnect.com\",\"subject\":\"Lunchbreak?\",\"timestamp\":\"2021-08-05T05:18:00\",\"preview\":\"Hey, You want to have lunch today? I heard about a new restaurant ...\",\"body\":[{\"type\":\"paragraph\",\"text\":\"Hey,\"},{\"type\":\"paragraph\",\"text\":\"You want to have lunch today? I heard about a new restaurant right around the corner. We could go\"},{\"type\":\"link\",\"text\":\"there\",\"href\":\"\"},{\"type\":\"paragraph\",\"text\":\"See you later!\"},{\"type\":\"paragraph\",\"text\":\"Max\"}],\"folder\":\"inbox\",\"isPhishing\":false,\"read\":false},{\"id\":12,\"set\":\"A\",\"sender\":\"lisachase@globalconnect.com\",\"subject\":\"Distribution FFP2 Masks\",\"timestamp\":\"2021-07-30T09:13:00\",\"preview\":\"Dear colleagues, since we at Global-Connect have a FFP2 mask ...\",\"body\":[{\"type\":\"paragraph\",\"text\":\"Dear colleagues,\"},{\"type\":\"paragraph\",\"text\":\"since we at Global-Connect have a FFP2 mask obligation in our office from the week after next, two FFP2 masks will be distributed to all employees next Monday.\"},{\"type\":\"paragraph\",\"text\":\"You can pick up the masks from 09:00 am in the manager room.\"},{\"type\":\"paragraph\",\"text\":\"Thank you and stay safe, sane and healthy!\"},{\"type\":\"paragraph\",\"text\":\"Lisa Chase\"}],\"folder\":\"inbox\",\"isPhishing\":false,\"read\":false},{\"id\":13,\"set\":\"A\",\"sender\":\"margJohnson@globalconnect.com\",\"subject\":\"Explanation Transponder battery replacement\",\"timestamp\":\"2021-06-06T11:25:00\",\"preview\":\"Dear colleagues, Since there are still some questions regarding the ...\",\"body\":[{\"type\":\"paragraph\",\"text\":\"Dear colleagues,\"},{\"type\":\"paragraph\",\"text\":\"Since there are still some questions regarding the battery change of the transponders, we have made the effort to create an online overview. You can find this overview on our homepage under the following link:\"},{\"type\":\"link\",\"text\":\"LINK\",\"href\":\"\"},{\"type\":\"paragraph\",\"text\":\"Best regards\"},{\"type\":\"paragraph\",\"text\":\"Margot Johnson\"}],\"folder\":\"inbox\",\"isPhishing\":false,\"read\":false},{\"id\":14,\"set\":\"A\",\"sender\":\"companymanagement@globalconnect.com\",\"subject\":\"Company party\",\"timestamp\":\"2021-05-18T12:43:00\",\"preview\":\"Hi Global-Connect Team, one year is over again and we are very ...\",\"body\":[{\"type\":\"paragraph\",\"text\":\"Hi Global-Connect Team,\"},{\"type\":\"paragraph\",\"text\":\"one year is over again and we are very pleased to invite you to our company party. The party will take place as usual in our regular restaurant. So that we can reserve enough places, we ask you to register bindingly under the following link:\"},{\"type\":\"link\",\"text\":\"LINK\",\"href\":\"\"},{\"type\":\"paragraph\",\"text\":\"We are looking forward to seeing you!\"},{\"type\":\"paragraph\",\"text\":\"Best regards\\nMartin Rock\"}],\"folder\":\"inbox\",\"isPhishing\":false,\"read\":false},{\"id\":15,\"set\":\"B\",\"sender\":\"maxmiller@globalconnect.com\",\"subject\":\"Information mail - Craftsman\",\"timestamp\":\"2021-05-01T11:23:00\",\"preview\":\"Hey John Doe, I have ordered a craftsman for next Monday between 10am ...\",\"body\":[{\"type\":\"paragraph\",\"text\":\"Hey John Doe,\"},{\"type\":\"paragraph\",\"text\":\"I have ordered a craftsman for next Monday between 10am and 12pm to have someone take a look at the sink in the kitchen. Will you please take him in as I will be in a meeting during that time?\"},{\"type\":\"paragraph\",\"text\":\"Thank you!\"},{\"type\":\"paragraph\",\"text\":\"Max\"}],\"folder\":\"inbox\",\"isPhishing\":false,\"read\":false},{\"id\":16,\"set\":\"B\",\"sender\":\"maxmiller@globalconnect.com\",\"subject\":\"Numbers Document\",\"timestamp\":\"2021-07-07T08:54:00\",\"preview\":\"maxmiller@globalconnect.com shared the following Document with you ...\",\"body\":[{\"type\":\"paragraph\",\"text\":\"maxmiller@globalconnect.com shared the following Document with you:\"},{\"type\":\"link\",\"text\":\"Numbers\",\"href\":\"\"},{\"type\":\"paragraph\",\"text\":\"Google Docs: Create and edit documents online\"},{\"type\":\"paragraph\",\"text\":\"Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA\"}],\"folder\":\"inbox\",\"isPhishing\":false,\"read\":false},{\"id\":17,\"set\":\"B\",\"sender\":\"service@globalconnect.com\",\"subject\":\"New break room regulations\",\"timestamp\":\"2021-08-07T15:21:00\",\"preview\":\"Dear colleagues, due to the current situation, we have changed our ...\",\"body\":[{\"type\":\"paragraph\",\"text\":\"Dear colleagues,\"},{\"type\":\"paragraph\",\"text\":\"due to the current situation, we have changed our rules for the break room. The implementation is strictly controlled and violations are noted in the personnel file. So that this does not have to happen, you can find everything at a glance under the following link:\"},{\"type\":\"link\",\"text\":\"LINK\",\"href\":\"\"},{\"type\":\"paragraph\",\"text\":\"Best regards\"},{\"type\":\"paragraph\",\"text\":\"Global-Connect Service\"}],\"folder\":\"inbox\",\"isPhishing\":true,\"read\":false},{\"id\":18,\"set\":\"B\",\"sender\":\"service@globalconnect.com\",\"subject\":\"New break room regulations\",\"timestamp\":\"2021-08-07T17:17:00\",\"preview\":\"Dear colleagues, we have received feedback that the disinfection ...\",\"body\":[{\"type\":\"paragraph\",\"text\":\"Dear colleagues,\"},{\"type\":\"paragraph\",\"text\":\"we have received feedback that the disinfection dispenser on the second floor is broken. We will take care of the problem as soon as possible. Until then we will provide you with another disinfection dispenser on the other side of the hallway.\"},{\"type\":\"paragraph\",\"text\":\"Best regards\\nGlobal-Connect Service\"}],\"folder\":\"inbox\",\"isPhishing\":false,\"read\":false},{\"id\":19,\"set\":\"A\",\"sender\":\"dep.management@globalconnect.com\",\"subject\":\"Deadline Project\",\"timestamp\":\"2021-08-06T16:58:00\",\"preview\":\"Dear John Doe, after consultation with our customer, I set the ...\",\"body\":[{\"type\":\"paragraph\",\"text\":\"Dear John Doe,\"},{\"type\":\"paragraph\",\"text\":\"after consultation with our customer, I set the deadline for the current project to 15.03.2021. Please send me all necessary documents by mail until then.\"},{\"type\":\"paragraph\",\"text\":\"Thank you!\\nBest regards\\nTimo Michaelsen\"}],\"folder\":\"inbox\",\"isPhishing\":false,\"read\":false},{\"id\":20,\"set\":\"A\",\"sender\":\"lizstone@globalconnect.com\",\"subject\":\"Urgent! Missing Documents\",\"timestamp\":\"2021-08-04T12:27:00\",\"preview\":\"Dear John Doe, Unfortunately, I am still missing the documents from ...\",\"body\":[{\"type\":\"paragraph\",\"text\":\"Dear John Doe,\"},{\"type\":\"paragraph\",\"text\":\"Unfortunately, I am still missing the documents from our last team meeting. Could you please put all the files in my box today? I need them urgently!\"},{\"type\":\"paragraph\",\"text\":\"Best regards\\nLiz Stone\"}],\"folder\":\"inbox\",\"isPhishing\":false,\"read\":false},{\"id\":21,\"set\":\"A\",\"sender\":\"dep.management@globalconnect.com\",\"subject\":\"Appointment Paulsen\",\"timestamp\":\"2021-08-04T15:31:00\",\"preview\":\"Dear John Doe, could you please make an appointment with our customer ...\",\"body\":[{\"type\":\"paragraph\",\"text\":\"Dear John Doe,\"},{\"type\":\"paragraph\",\"text\":\"could you please make an appointment with our customer Mr. Paulsen for next week as soon as possible? Then we can clarify everything else.\"},{\"type\":\"paragraph\",\"text\":\"Best regards\\nTimo Michaelson\"}],\"folder\":\"inbox\",\"isPhishing\":false,\"read\":false},{\"id\":22,\"set\":\"A\",\"sender\":\"companymanagement@globalconnect.com\",\"subject\":\"Submission of sick leave\",\"timestamp\":\"2021-07-19T20:39:00\",\"preview\":\"Dear John Doe, We still need your sick leave for our booking office ...\",\"body\":[{\"type\":\"paragraph\",\"text\":\"Dear John Doe,\"},{\"type\":\"paragraph\",\"text\":\"We still need your sick leave for our booking office. Since time is now short, it would be great if you send it directly by post.\"},{\"type\":\"paragraph\",\"text\":\"Thank you in advance!\"},{\"type\":\"paragraph\",\"text\":\"Best regards\\nMartin Rock\"}],\"folder\":\"inbox\",\"isPhishing\":false,\"read\":false},{\"id\":23,\"set\":\"B\",\"sender\":\"companymanagement@globalconnect.com\",\"subject\":\"Submit vacation request\",\"timestamp\":\"2021-05-19T09:10:00\",\"preview\":\"Dear John Doe, We have revised our planning and decided that you are ...\",\"body\":[{\"type\":\"paragraph\",\"text\":\"Dear John Doe,\"},{\"type\":\"paragraph\",\"text\":\"We have revised our planning and decided that you are welcome to take a vacation at the requested time. In order for everything to work out, you should send us your application as soon as possible.\"},{\"type\":\"paragraph\",\"text\":\"Thank you in advance!\"},{\"type\":\"paragraph\",\"text\":\"Best regards\\nMartin Rock\"}],\"folder\":\"inbox\",\"isPhishing\":false,\"read\":false},{\"id\":24,\"set\":\"B\",\"sender\":\"Max Miller\",\"subject\":\"Feedback request\",\"timestamp\":\"2021-06-11T13:10:00\",\"preview\":\"Dear John Doe, thanks for your help with my project! I have tried to ...\",\"body\":[{\"type\":\"paragraph\",\"text\":\"Dear John Doe,\"},{\"type\":\"paragraph\",\"text\":\"thanks for your help with my project! I have tried to implement everything, but I am stuck at another point... Could you please look over it and help me? That would be very important to me, because my deadline is tomorrow.\"},{\"type\":\"paragraph\",\"text\":\"Thank you in advance!\"},{\"type\":\"paragraph\",\"text\":\"Max\"}],\"folder\":\"inbox\",\"isPhishing\":false,\"read\":false},{\"id\":25,\"set\":\"B\",\"sender\":\"Timo Michaelson\",\"subject\":\"Task\",\"timestamp\":\"2021-08-07T11:18:00\",\"preview\":\"Dear John Doe, Unfortunately, I am totally stressed and urgently need ...\",\"body\":[{\"type\":\"paragraph\",\"text\":\"Dear John Doe,\"},{\"type\":\"paragraph\",\"text\":\"Unfortunately, I am totally stressed and urgently need your support with a task. Please come by my office in 30 minutes, then you will receive all the important information.\"},{\"type\":\"paragraph\",\"text\":\"Best regards\\nTimo Michaelson\"}],\"folder\":\"inbox\",\"isPhishing\":false,\"read\":false},{\"id\":26,\"set\":\"B\",\"sender\":\"companymanagement@globalconnect.com\",\"subject\":\"Missing information\",\"timestamp\":\"2021-07-20T11:15:00\",\"preview\":\"Dear John Doe, we are currently drafting the new contract as ...\",\"body\":[{\"type\":\"paragraph\",\"text\":\"Dear John Doe,\"},{\"type\":\"paragraph\",\"text\":\"we are currently drafting the new contract as discussed. However, we are still missing some information, which is why we cannot finalize it. Could you please send the persons concerned to our office?\"},{\"type\":\"paragraph\",\"text\":\"Best regards\"},{\"type\":\"paragraph\",\"text\":\"Martin Rock\"}],\"folder\":\"inbox\",\"isPhishing\":false,\"read\":false},{\"id\":27,\"set\":\"B\",\"sender\":\"Timo Michaelson\",\"subject\":\"Schedule zoom meeting for employee review\",\"timestamp\":\"2021-08-07T17:27:00\",\"preview\":\"Dear John Doe, our monthly employee review meeting is coming up ...\",\"body\":[{\"type\":\"paragraph\",\"text\":\"Dear John Doe,\"},{\"type\":\"paragraph\",\"text\":\"our monthly employee review meeting is coming up again. Could you please schedule a Zoom meeting for all employees in the department?\"},{\"type\":\"paragraph\",\"text\":\"Thank you!\"},{\"type\":\"paragraph\",\"text\":\"Best regards\"},{\"type\":\"paragraph\",\"text\":\"Timo Michaelson\"}],\"folder\":\"inbox\",\"isPhishing\":false,\"read\":false},{\"id\":28,\"set\":\"A\",\"sender\":\"service@e.amaysim.com.au\",\"subject\":\"Hey there, 50% off unlimited mobile data\",\"timestamp\":\"2021-08-03T11:17:00\",\"preview\":\"exclusive deal for you: 50% off your first renewal ...\",\"body\":[{\"type\":\"iframe\",\"src\":\"/snapshots/amaysim.html\",\"width\":900,\"height\":700}],\"folder\":\"inbox\",\"isPhishing\":false,\"read\":false},{\"id\":29,\"set\":\"B\",\"sender\":\"noreply@mail.immobilienscout24.de\",\"subject\":\"Mieter vs. Vermieter – Wo wird am meisten gestritten?\",\"timestamp\":\"2021-08-01T08:21:00\",\"preview\":\"Ausgeschlossen? So kommen Sie ohne Schlüsseldienst rein ...\",\"body\":[{\"type\":\"iframe\",\"src\":\"/snapshots/ImmoScout24.html\",\"width\":900,\"height\":700}],\"folder\":\"inbox\",\"isPhishing\":false,\"read\":false},{\"id\":30,\"set\":\"A\",\"sender\":\"Angebote@myunidays.com\",\"subject\":\"Fitness-Motivation gefällig?\",\"timestamp\":\"2021-08-06T09:48:00\",\"preview\":\"Wir haben die perfekten Rabatte für Gesundheit und Fitness ...\",\"body\":[{\"type\":\"iframe\",\"src\":\"/snapshots/myunidays.html\",\"width\":900,\"height\":700}],\"folder\":\"inbox\",\"isPhishing\":false,\"read\":false},{\"id\":31,\"set\":\"B\",\"sender\":\"newsletter@newsletter.nivea.de\",\"subject\":\"Deo jetzt exklusiv testen\",\"timestamp\":\"2021-08-01T14:35:00\",\"preview\":\"1.200 Botschafter*innen gesucht ...\",\"body\":[{\"type\":\"iframe\",\"src\":\"/snapshots/nivea.html\",\"width\":900,\"height\":700}],\"folder\":\"inbox\",\"isPhishing\":false,\"read\":false},{\"id\":32,\"set\":\"A\",\"sender\":\"no-reply@message.tipico.de\",\"subject\":\"Hochspannende Spiele und Olympia-Finish\",\"timestamp\":\"2021-07-29T19:17:00\",\"preview\":\"Spitzenfußball in Europa ...\",\"body\":[{\"type\":\"iframe\",\"src\":\"/snapshots/tipico.html\",\"width\":900,\"height\":700}],\"folder\":\"inbox\",\"isPhishing\":false,\"read\":false},{\"id\":33,\"set\":\"B\",\"sender\":\"norton@secure.norton.com\",\"subject\":\"NortonLifeLock\",\"timestamp\":\"2021-07-27T12:52:00\",\"preview\":\"Schützen Sie das Gerät, über das Sie Verbindungen herstellen ...\",\"body\":[{\"type\":\"iframe\",\"src\":\"/snapshots/norton.html\",\"width\":900,\"height\":700}],\"folder\":\"inbox\",\"isPhishing\":false,\"read\":false},{\"id\":34,\"set\":\"A\",\"sender\":\"kate.cornwell@imotions.com\",\"subject\":\"Every week is pride week\",\"timestamp\":\"2021-07-01T13:11:00\",\"preview\":\"Aus Liebe zur Liebe: die neue Pride Kollektion ist da ...\",\"body\":[{\"type\":\"iframe\",\"src\":\"/snapshots/adidas.html\",\"width\":900,\"height\":700}],\"folder\":\"inbox\",\"isPhishing\":false,\"read\":false},{\"id\":35,\"set\":\"B\",\"sender\":\"payback@mailing.rewe.de\",\"subject\":\"Geld sparen mit Payback-Punkten\",\"timestamp\":\"2021-07-27T13:11:00\",\"preview\":\"Dein Umsatz. Dein REWE Bonus Coupon ...\",\"body\":[{\"type\":\"iframe\",\"src\":\"/snapshots/rewe.html\",\"width\":900,\"height\":700}],\"folder\":\"inbox\",\"isPhishing\":false,\"read\":false},{\"id\":36,\"set\":\"A\",\"sender\":\"message@my.zalando.de\",\"subject\":\"Finaler Sale\",\"timestamp\":\"2021-08-04T13:11:00\",\"preview\":\"Noch 3 Tage: Bis zu 70% ...\",\"body\":[{\"type\":\"iframe\",\"src\":\"/snapshots/zalando.html\",\"width\":900,\"height\":700}],\"folder\":\"inbox\",\"isPhishing\":false,\"read\":false}]");
//#endregion
//#region src/lib/timer.svelte.js
var TimerState = class {
	timeLeft = 3e5;
	running = false;
	interval = null;
	start() {
		if (this.running) return;
		this.running = true;
		this.interval = setInterval(() => {
			this.timeLeft -= 10;
			if (this.timeLeft <= 0) this.stop();
		}, 10);
	}
	stop() {
		clearInterval(this.interval);
		this.running = false;
		this.interval = null;
	}
	get minutes() {
		return Math.floor(this.timeLeft / 6e4);
	}
	get seconds() {
		return Math.floor(this.timeLeft % 6e4 / 1e3);
	}
	get milliseconds() {
		return this.timeLeft % 1e3;
	}
};
new TimerState();
//#endregion
export { archive_icon_default as a, mail_icon_default as c, BUTTON_ID as d, FOLDER_ID as f, notes_icon_default as i, inbox_icon_default as l, stopTaskTracking as m, important_mail_icon_default as n, trash_icon_default as o, startTaskTracking as p, tag_icon_default as r, send_email_icon_default as s, emails_default as t, email_warning_icon_default as u };
