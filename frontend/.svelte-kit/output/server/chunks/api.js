//#region src/lib/api.js
var KEY = "participantID";
var getParticipantID = () => typeof sessionStorage === "undefined" ? null : sessionStorage.getItem(KEY);
/** Am Studienende: ab jetzt werden keine Daten mehr diesem Teilnehmer zugeordnet. */
var clearParticipantID = () => sessionStorage.removeItem(KEY);
var now = () => (/* @__PURE__ */ new Date()).toISOString();
async function send(url, body, method = "POST") {
	const res = await fetch(url, {
		method,
		headers: { "content-type": "application/json" },
		body: JSON.stringify(body)
	});
	if (!res.ok) throw new Error(`${url}: ${res.status} ${await res.text()}`);
	return res.json();
}
/** TASK anlegen (taskStart) und taskID zurückgeben. condition: 'stressless' | 'stress' */
async function startTask(condition) {
	const { taskID } = await send("/api/tasks", {
		participantID: getParticipantID(),
		condition,
		taskStart: now()
	});
	return taskID;
}
/** TASK abschließen (taskEnd). */
var endTask = (taskID) => send("/api/tasks", {
	taskID,
	taskEnd: now()
}, "PATCH");
/**
* Schickt einen Mess-Batch (Task-Events, Herzfrequenz).
* beacon = true beim Schließen der Seite: sendBeacon, ohne Rückmeldung.
* Fehler haben `retry = true`, wenn ein neuer Versuch sinnvoll ist (Server nicht
* erreichbar oder Serverfehler) – bei ungültigen Daten (4xx) nicht.
*/
async function postBatch(url, batch, beacon = false) {
	const body = JSON.stringify(batch);
	if (beacon) {
		navigator.sendBeacon(url, body);
		return;
	}
	let res;
	try {
		res = await fetch(url, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body,
			keepalive: true
		});
	} catch (err) {
		throw Object.assign(/* @__PURE__ */ new Error(`${url}: Server nicht erreichbar (${err.message})`), { retry: true });
	}
	if (!res.ok) throw Object.assign(/* @__PURE__ */ new Error(`${url}: ${res.status} ${await res.text()}`), { retry: res.status >= 500 });
}
//#endregion
export { startTask as a, postBatch as i, endTask as n, getParticipantID as r, clearParticipantID as t };
