import { randomBytes } from 'node:crypto';
import { db } from './db';

const stmt = {
  insertSession:   db.prepare(`INSERT INTO sessions
                     (id, created_at, condition_order, viewport_w, viewport_h, user_agent)
                     VALUES (?, ?, ?, ?, ?, ?)`),
  finishSession:   db.prepare('UPDATE sessions SET finished_at = ? WHERE id = ?'),
  sessionExists:   db.prepare('SELECT 1 FROM sessions WHERE id = ?').pluck(),
  insertMove:      db.prepare('INSERT INTO mouse_moves (session_id, phase, ts, x, y) VALUES (?, ?, ?, ?, ?)'),
  insertEvent:     db.prepare('INSERT INTO events (session_id, phase, ts, type, email_id, folder, data) VALUES (?, ?, ?, ?, ?, ?, ?)'),
  insertHr:        db.prepare('INSERT INTO hr_samples (session_id, phase, ts, bpm) VALUES (?, ?, ?, ?)'),
  deleteResponses: db.prepare('DELETE FROM responses WHERE session_id = ? AND questionnaire = ? AND phase = ?'),
  insertResponse:  db.prepare(`INSERT INTO responses
                     (session_id, questionnaire, phase, item_id, value, started_at, submitted_at)
                     VALUES (?, ?, ?, ?, ?, ?, ?)`)
};

/** Legt eine Session an und gibt ihre pseudonyme ID zurück. */
export function createSession({ conditionOrder, viewportW, viewportH, userAgent }) {
  const id = 'P-' + randomBytes(3).toString('hex');
  stmt.insertSession.run(id, Date.now(), conditionOrder ?? null,
                         viewportW ?? null, viewportH ?? null, userAgent ?? null);
  return id;
}

/** true, wenn die Session existierte und beendet wurde. */
export function finishSession(sessionId) {
  return stmt.finishSession.run(Date.now(), sessionId).changes > 0;
}

export function sessionExists(sessionId) {
  return stmt.sessionExists.get(sessionId) !== undefined;
}

/** Speichert einen Batch in einer Transaktion und gibt die Anzahl je Typ zurück. */
export const saveEvents = db.transaction(({ sessionId, phase, moves = [], events = [], hr = [] }) => {
  for (const [ts, x, y] of moves) stmt.insertMove.run(sessionId, phase, ts, x, y);
  for (const e of events) {
    stmt.insertEvent.run(sessionId, phase, e.ts, e.type, e.emailId ?? null, e.folder ?? null,
                         e.data === undefined ? null : JSON.stringify(e.data));
  }
  for (const [ts, bpm] of hr) stmt.insertHr.run(sessionId, phase, ts, bpm);
  return { moves: moves.length, events: events.length, hr: hr.length };
});

/** Speichert einen Fragebogen; ein zweites Absenden ersetzt das erste. */
export const saveResponses = db.transaction(({ sessionId, questionnaire, phase, answers, startedAt }) => {
  const now = Date.now();
  phase ??= 'main';   // nie NULL, sonst greift das DELETE nicht
  stmt.deleteResponses.run(sessionId, questionnaire, phase);
  for (const [item, value] of Object.entries(answers)) {
    stmt.insertResponse.run(sessionId, questionnaire, phase, item, String(value), startedAt ?? null, now);
  }
});
