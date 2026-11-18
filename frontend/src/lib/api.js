// Client-Seite der Server-API. Feldnamen entsprechen den Spalten in schema.sql.

const KEY = 'participantID';

export const getParticipantID = () =>
  typeof sessionStorage === 'undefined' ? null : sessionStorage.getItem(KEY);

/** Am Studienende: ab jetzt werden keine Daten mehr diesem Teilnehmer zugeordnet. */
export const clearParticipantID = () => sessionStorage.removeItem(KEY);

const now = () => new Date().toISOString();

async function send(url, body, method = 'POST') {
  const res = await fetch(url, {
    method,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(`${url}: ${res.status} ${await res.text()}`);
  return res.json();
}

/** PARTICIPANT anlegen; die participantID gilt für diesen Browser-Tab. */
export async function createParticipant() {
  const { participantID } = await send('/api/participants', {});
  sessionStorage.setItem(KEY, participantID);
  return participantID;
}

/** TASK anlegen (taskStart) und taskID zurückgeben. condition: 'stressless' | 'stress' */
export async function startTask(condition) {
  const { taskID } = await send('/api/tasks', {
    participantID: getParticipantID(), condition, taskStart: now()
  });
  return taskID;
}

/** TASK abschließen (taskEnd). */
export const endTask = (taskID) => send('/api/tasks', { taskID, taskEnd: now() }, 'PATCH');

/**
 * Fragebogen speichern: SURVEY_SESSION (startTime, endTime) + ANSWER.
 * answers: { questionID: Antwort } – questionIDs aus QUESTION in schema.sql
 */
export const submitSurvey = (surveyID, startTime, answers) =>
  send('/api/surveys', {
    participantID: getParticipantID(), surveyID, startTime, endTime: now(), answers
  });

/**
 * Schickt einen Mess-Batch (Task-Events, Herzfrequenz).
 * beacon = true beim Schließen der Seite: sendBeacon, ohne Rückmeldung.
 * Fehler haben `retry = true`, wenn ein neuer Versuch sinnvoll ist (Server nicht
 * erreichbar oder Serverfehler) – bei ungültigen Daten (4xx) nicht.
 */
export async function postBatch(url, batch, beacon = false) {
  const body = JSON.stringify(batch);
  if (beacon) {
    navigator.sendBeacon(url, body);
    return;
  }

  let res;
  try {
    res = await fetch(url, {
      method: 'POST', headers: { 'content-type': 'application/json' }, body, keepalive: true
    });
  } catch (err) {
    throw Object.assign(new Error(`${url}: Server nicht erreichbar (${err.message})`), { retry: true });
  }
  if (!res.ok) {
    throw Object.assign(new Error(`${url}: ${res.status} ${await res.text()}`), { retry: res.status >= 500 });
  }
}
