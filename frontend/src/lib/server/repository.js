// Alle Schreibzugriffe auf die Studien-DB. Parameter heißen wie die Spalten in schema.sql.
import { randomBytes } from 'node:crypto';
import { db } from './db';
import { BadRequest } from './respond';
import { writeFileSync, readFileSync, rmSync } from 'node:fs';

const stmt = {
  // PARTICIPANT
  insertParticipant: db.prepare('INSERT INTO PARTICIPANT (participantID) VALUES (?)'),

  // TASK
  insertTask: db.prepare(`INSERT INTO TASK (participantID, condition, taskStart)
                          VALUES (@participantID, @condition, @taskStart)`),
  endTask:    db.prepare('UPDATE TASK SET taskEnd = @taskEnd WHERE taskID = @taskID'),

  // Task-Events
  insertMove:  db.prepare(`INSERT INTO MOUSE_MOVEMENT (taskID, moveTime, x, y)
                           VALUES (@taskID, @moveTime, @x, @y)`),
  insertHover: db.prepare(`INSERT INTO HOVER_EVENT (taskID, eventStart, eventEnd, elementID, x, y)
                           VALUES (@taskID, @eventStart, @eventEnd, @elementID, @x, @y)`),
  insertPoint: db.prepare(`INSERT INTO POINT_EVENT (taskID, eventStart, eventEnd, mouseButton, x, y, elementID)
                           VALUES (@taskID, @eventStart, @eventEnd, @mouseButton, @x, @y, @elementID)`),
  insertScroll: db.prepare(`INSERT INTO SCROLL_EVENT
                              (taskID, eventStart, eventEnd, scrollStartX, scrollStartY, scrollEndX, scrollEndY)
                            VALUES (@taskID, @eventStart, @eventEnd, @scrollStartX, @scrollStartY, @scrollEndX, @scrollEndY)`),
  insertDragDrop: db.prepare(`INSERT INTO DRAGDROP_EVENT
                                (taskID, eventStart, eventEnd, startX, startY, endX, endY, eMailID, fromFolderID, toFolderID)
                              VALUES (@taskID, @eventStart, @eventEnd, @startX, @startY, @endX, @endY,
                                      @eMailID, @fromFolderID, @toFolderID)`),

  // SURVEY_SESSION + ANSWER (erneutes Absenden überschreibt)
  upsertSurveySession: db.prepare(`INSERT INTO SURVEY_SESSION (participantID, surveyID, startTime, endTime)
                                   VALUES (@participantID, @surveyID, @startTime, @endTime)
                                   ON CONFLICT (participantID, surveyID)
                                   DO UPDATE SET startTime = excluded.startTime, endTime = excluded.endTime
                                   RETURNING sessionID`).pluck(),
  questionsOfSurvey: db.prepare('SELECT questionID FROM QUESTION WHERE surveyID = ?').pluck(),
  upsertAnswer: db.prepare(`INSERT INTO ANSWER (sessionID, questionID, answerText)
                            VALUES (@sessionID, @questionID, @answerText)
                            ON CONFLICT (sessionID, questionID) DO UPDATE SET answerText = excluded.answerText`),

  // HEART_RATE_RECORD + HR_SAMPLE + RR_INTERVAL
  findRecording: db.prepare(`SELECT recordingID FROM HEART_RATE_RECORD
                             WHERE participantID = ? AND polarDevID IS ?`).pluck(),
  insertRecording: db.prepare(`INSERT INTO HEART_RATE_RECORD (participantID, polarDevID, startTime)
                               VALUES (@participantID, @polarDevID, @startTime)`),
  insertHrSample: db.prepare(`INSERT INTO HR_SAMPLE (recordingID, hrTime, bpm, contact)
                              VALUES (@recordingID, @hrTime, @bpm, @contact)`),
  insertRrInterval: db.prepare(`INSERT INTO RR_INTERVAL (recordingID, rrTime, rrMs, contact)
                                VALUES (@recordingID, @rrTime, @rrMs, @contact)`)
};

function required(body, ...fields) {
  for (const field of fields) {
    if (body?.[field] === undefined || body[field] === null) throw new BadRequest(`${field} fehlt`);
  }
}
var participantID = null;
/** Legt einen Teilnehmer mit pseudonymer ID an. */
export function createParticipant() {
  participantID = 'P-' + randomBytes(3).toString('hex');
  stmt.insertParticipant.run(participantID);
  return { participantID };
}

var body = {};
export function startTask(body) {
  required(body, 'participantID', 'condition', 'taskStart');
  const { participantID, condition, taskStart } = body;
  return { taskID: Number(stmt.insertTask.run({ participantID, condition, taskStart }).lastInsertRowid) };
}

/** Creating the statusfile */
function createStatusFile() {
  const data = {};
}

export function endTask(body) {
  required(body, 'taskID', 'taskEnd');
  const { taskID, taskEnd } = body;
  if (stmt.endTask.run({ taskID, taskEnd }).changes === 0) throw new BadRequest(`Task ${taskID} unbekannt`);
}

/** Ein Batch aus tracker.js – alles in einer Transaktion. */
export const saveTaskEvents = db.transaction((body) => {
  required(body, 'taskID');
  const { taskID, moves = [], hovers = [], points = [], scrolls = [], drags = [] } = body;

  for (const m of moves)   stmt.insertMove.run({ ...m, taskID });
  for (const h of hovers)  stmt.insertHover.run({ ...h, taskID });
  for (const p of points)  stmt.insertPoint.run({ ...p, taskID });
  for (const s of scrolls) stmt.insertScroll.run({ ...s, taskID });
  for (const d of drags)   stmt.insertDragDrop.run({ ...d, taskID });

  return { moves: moves.length, hovers: hovers.length, points: points.length,
           scrolls: scrolls.length, drags: drags.length };
});

/** Ein Fragebogen: answers = { questionID: Antwort } */
export const saveSurvey = db.transaction((body) => {
  required(body, 'participantID', 'surveyID', 'startTime', 'endTime', 'answers');
  const { participantID, surveyID, startTime, endTime, answers } = body;

  const questionIDs = new Set(stmt.questionsOfSurvey.all(surveyID));
  for (const questionID of Object.keys(answers)) {
    if (!questionIDs.has(Number(questionID))) {
      throw new BadRequest(`Frage ${questionID} gehört nicht zu Survey ${surveyID}`);
    }
  }

  const sessionID = stmt.upsertSurveySession.get({ participantID, surveyID, startTime, endTime });
  for (const [questionID, answer] of Object.entries(answers)) {
    stmt.upsertAnswer.run({
      sessionID, questionID: Number(questionID), answerText: answer == null ? null : String(answer)
    });
  }
  return { sessionID };
});

/** Ein Batch aus hrRecorder.js. Pro Teilnehmer und Gurt gibt es eine Aufzeichnung. */
export const saveHeartRate = db.transaction((body) => {
  required(body, 'participantID');
  const { participantID, polarDevID = null, samples = [], rrIntervals = [] } = body;

  let recordingID = stmt.findRecording.get(participantID, polarDevID);
  if (recordingID === undefined) {
    const startTime = samples[0]?.hrTime ?? rrIntervals[0]?.rrTime ?? null;
    recordingID = Number(stmt.insertRecording.run({ participantID, polarDevID, startTime }).lastInsertRowid);
  }

  for (const s of samples)     stmt.insertHrSample.run({ ...s, recordingID });
  for (const r of rrIntervals) stmt.insertRrInterval.run({ ...r, recordingID });

  return { recordingID, samples: samples.length, rrIntervals: rrIntervals.length };
});
