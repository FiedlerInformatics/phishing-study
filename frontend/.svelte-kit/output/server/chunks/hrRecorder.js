import { i as postBatch, r as getParticipantID } from "./api.js";
//#region src/lib/hrRecorder.js
var FLUSH_INTERVAL_MS = 2e3;
var current = null;
var pending = [];
/** Nimmt eine Nachricht von backend/main.py entgegen. */
function recordHr({ polarDevID, hrTime, bpm, contact, rrIntervals = [] }) {
	const participantID = getParticipantID();
	if (!participantID) return;
	if (current?.participantID !== participantID || current?.polarDevID !== polarDevID) {
		if (current?.samples.length || current?.rrIntervals.length) pending.push(current);
		current = {
			participantID,
			polarDevID,
			samples: [],
			rrIntervals: []
		};
	}
	current.samples.push({
		hrTime,
		bpm,
		contact
	});
	for (const { rrTime, rrMs } of rrIntervals) current.rrIntervals.push({
		rrTime,
		rrMs,
		contact
	});
}
async function flushHr(beacon = false) {
	if (current?.samples.length || current?.rrIntervals.length) {
		pending.push(current);
		current = {
			...current,
			samples: [],
			rrIntervals: []
		};
	}
	const batches = pending;
	pending = [];
	for (const batch of batches) try {
		await postBatch("/api/hr", batch, beacon);
	} catch (err) {
		console.error("Herzfrequenzdaten nicht gespeichert", err);
		if (err.retry) pending.push(batch);
	}
}
/** Im Layout: alle 2 s und beim Schließen der Seite speichern. */
function startHrRecording() {
	const onPageHide = () => flushHr(true);
	window.addEventListener("pagehide", onPageHide);
	const intervalId = setInterval(flushHr, FLUSH_INTERVAL_MS);
	return () => {
		window.removeEventListener("pagehide", onPageHide);
		clearInterval(intervalId);
		flushHr(true);
	};
}
//#endregion
export { recordHr as n, startHrRecording as r, flushHr as t };
