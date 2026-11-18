import { json } from "@sveltejs/kit";
import { randomBytes } from "node:crypto";
import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
//#region src/lib/server/respond.js
/** Ungültige Anfragedaten -> HTTP 400 */
var BadRequest = class extends Error {};
/**
* Liest den JSON-Body (als Text, weil sendBeacon text/plain schickt), führt den
* Schreibvorgang aus und antwortet mit dessen Rückgabe.
* Ungültige Daten – auch verletzte DB-Constraints wie unbekannte participantID,
* taskID oder elementID – ergeben 400 statt 500, damit der Client nicht endlos wiederholt.
*/
async function handle(request, write, status = 201) {
	try {
		return json(write(JSON.parse(await request.text())) ?? { ok: true }, { status });
	} catch (err) {
		if (err instanceof BadRequest || err instanceof SyntaxError || err instanceof RangeError || String(err.code).startsWith("SQLITE_CONSTRAINT")) return json({ error: err.message }, { status: 400 });
		throw err;
	}
}
//#endregion
//#region src/lib/server/schema.sql?raw
var schema_default = "PRAGMA foreign_keys = ON;\n\n--------------------- PARTICIPANT ------------------------------------------------------------------------\n\nCREATE TABLE IF NOT EXISTS PARTICIPANT (\n  participantID TEXT PRIMARY KEY\n);\n----------------------------------------------------------------------------------------------------------\n\n--------------------- SURVEY -----------------------------------------------------------------------------\n\nCREATE TABLE IF NOT EXISTS SURVEY (\n  surveyID        INTEGER PRIMARY KEY,\n  surveyType      TEXT NOT NULL\n); \n\nCREATE TABLE IF NOT EXISTS SURVEY_SESSION(\n  sessionID       INTEGER PRIMARY KEY,\n  participantID   TEXT NOT NULL REFERENCES PARTICIPANT(participantID) ON DELETE CASCADE,\n  surveyID        INTEGER   NOT NULL REFERENCES SURVEY(surveyID),\n  startTime       TEXT,\n  endTime         TEXT,\n  UNIQUE(participantID, surveyID)\n);  \n\nCREATE TABLE IF NOT EXISTS QUESTION (\n  questionID        INTEGER PRIMARY KEY,\n  surveyID          INTEGER NOT NULL REFERENCES SURVEY(surveyID) ON DELETE CASCADE,\n  questionHeader    TEXT,\n  questionText      TEXT\n);\n\nCREATE TABLE IF NOT EXISTS ANSWER (\n  answerID        INTEGER PRIMARY KEY,\n  sessionID       INTEGER NOT NULL REFERENCES SURVEY_SESSION(sessionID) ON DELETE CASCADE,\n  questionID      INTEGER NOT NULL REFERENCES QUESTION(questionID),\n  answerText      TEXT,\n  UNIQUE (sessionID, questionID)\n);\n----------------------------------------------------------------------------------------------------------\n\n--------------------- HEART RATE MEASUREMENT -------------------------------------------------------------\nCREATE TABLE IF NOT EXISTS HEART_RATE_RECORD(\n  recordingID     INTEGER PRIMARY KEY,\n  participantID   TEXT NOT NULL REFERENCES PARTICIPANT(participantID) ON DELETE CASCADE,\n  polarDevID      TEXT,\n  startTime       TEXT\n);\n\nCREATE TABLE IF NOT EXISTS HR_SAMPLE(\n  hrID          INTEGER PRIMARY KEY,\n  recordingID   INTEGER NOT NULL REFERENCES HEART_RATE_RECORD(recordingID) ON DELETE CASCADE,\n  hrTime        TEXT,\n  bpm           INTEGER,\n  contact       INTEGER NOT NULL CHECK (contact IN (0,1))\n);\n\nCREATE TABLE IF NOT EXISTS RR_INTERVAL(\n  rrID          INTEGER PRIMARY KEY,\n  recordingID   INTEGER NOT NULL REFERENCES HEART_RATE_RECORD(recordingID) ON DELETE CASCADE,\n  rrTime        TEXT,\n  rrMs          INTEGER,\n  contact       INTEGER NOT NULL CHECK (contact IN (0,1))\n); \n----------------------------------------------------------------------------------------------------------\n\n--------------------- UI ELEMENTS ------------------------------------------------------------------------\nCREATE TABLE IF NOT EXISTS UI_ELEMENT(\n  elementID     INTEGER PRIMARY KEY,\n  elementType   TEXT NOT NULL,\n  elementName   TEXT\n  );\n\nCREATE TABLE IF NOT EXISTS BUTTON(\n  elementID    INTEGER PRIMARY KEY REFERENCES UI_ELEMENT(elementID) ON DELETE CASCADE,\n  buttonName   TEXT\n);\n\nCREATE TABLE IF NOT EXISTS FOLDER(\n  elementID   INTEGER PRIMARY KEY REFERENCES UI_ELEMENT(elementID) ON DELETE CASCADE,\n  folderName  TEXT\n); \n\nCREATE TABLE IF NOT EXISTS EMAIL(\n  elementID INTEGER PRIMARY KEY REFERENCES UI_ELEMENT(elementID) ON DELETE CASCADE,\n  sender        TEXT,\n  subject       TEXT,\n  topic         TEXT,\n  salutation    TEXT,\n  class         TEXT\n);\n\nCREATE TABLE IF NOT EXISTS PHISHING_DETAIL(\n  elementID         INTEGER PRIMARY KEY REFERENCES EMAIL(elementID) ON DELETE CASCADE,\n  threat            TEXT,\n  specificAction    TEXT NOT NULL REFERENCES ACTION_CATEGORY(specificAction)\n); \n\nCREATE TABLE IF NOT EXISTS ACTION_CATEGORY(\n  genericAction TEXT NOT NULL,\n  specificAction    TEXT NOT NULL PRIMARY KEY\n); \n----------------------------------------------------------------------------------------------------------\n\n--------------------- TASK MEASUREMENT--------------------------------------------------------------------\nCREATE TABLE IF NOT EXISTS TASK(\n  taskID          INTEGER PRIMARY KEY,\n  participantID   TEXT NOT NULL REFERENCES PARTICIPANT(participantID) ON DELETE CASCADE,\n  condition       TEXT,\n  taskStart       TEXT,\n  taskEnd         TEXT\n);\n\nCREATE TABLE IF NOT EXISTS MOUSE_MOVEMENT(\n  moveID    INTEGER PRIMARY KEY,\n  taskID    INTEGER NOT NULL REFERENCES TASK(taskID) ON DELETE CASCADE,\n  moveTime  TEXT,\n  x         REAL,\n  y         REAL\n); \n\nCREATE TABLE IF NOT EXISTS HOVER_EVENT(\n  eventID       INTEGER PRIMARY KEY,\n  taskID        INTEGER NOT NULL REFERENCES TASK(taskID) ON DELETE CASCADE,\n  eventStart    TEXT,\n  eventEnd      TEXT,\n\n  elementID   INTEGER REFERENCES UI_ELEMENT(elementID) ON DELETE SET NULL,\n  x           REAL,         \n  y           REAL\n);\n\nCREATE TABLE IF NOT EXISTS SCROLL_EVENT(\n  eventID       INTEGER PRIMARY KEY,\n  taskID        INTEGER NOT NULL REFERENCES TASK(taskID) ON DELETE CASCADE,\n  eventStart    TEXT,\n  eventEnd      TEXT,\n\n  scrollStartX    REAL,\n  scrollStartY    REAL,\n  scrollEndX      REAL,\n  scrollEndY      REAL\n);\n\nCREATE TABLE IF NOT EXISTS DRAGDROP_EVENT(\n  eventID       INTEGER PRIMARY KEY,\n  taskID        INTEGER NOT NULL REFERENCES TASK(taskID) ON DELETE CASCADE,\n  eventStart    TEXT,\n  eventEnd      TEXT,\n\n  startX    REAL,\n  startY    REAL,\n  endX      REAL,\n  endY      REAL,\n\n  eMailID         INTEGER NOT NULL REFERENCES EMAIL(elementID),\n  fromFolderID    INTEGER REFERENCES FOLDER(elementID),\n  toFolderID      INTEGER REFERENCES FOLDER(elementID)\n);\n\nCREATE TABLE IF NOT EXISTS POINT_EVENT(\n  eventID       INTEGER PRIMARY KEY,\n  taskID        INTEGER NOT NULL REFERENCES TASK(taskID) ON DELETE CASCADE,\n  eventStart    TEXT NOT NULL,\n  eventEnd      TEXT NOT NULL,\n  mouseButton   INTEGER CHECK (mouseButton BETWEEN 0 AND 4),\n\n  x             REAL,\n  y             REAL,\n  elementID     INTEGER REFERENCES UI_ELEMENT(elementID) ON DELETE SET NULL\n);\n----------------------------------------------------------------------------------------------------------\n----------------------------------------------------------------------------------------------------------\n\n------------ INITIALIZATION ------------------------------------------------------------------------------\n\nINSERT INTO SURVEY (surveyID, surveyType) VALUES\n  (1, 'demographic/BFI-10'),\n  (2, 'NASA-TLX-stressless'),\n  (3, 'NASA-TLX-stress'),\n  (4, 'ATI-Scale')\nON CONFLICT DO NOTHING;\n\nINSERT OR IGNORE INTO QUESTION (questionID, surveyID, questionHeader, questionText) VALUES\n  -- DEMOGRAPHIC\n  (1,  1, 'Gender', 'What is your gender?'),\n  (2,  1, 'Age', 'What is your age?'),\n  (3,  1, 'Education', 'What is your highest level of education?'),\n  (4,  1, 'Occupation', 'What is your current main occupation?'),\n  (5,  1, 'Field of study', 'If you are a student, what is your field of study?'),\n  (6,  1, 'Industry', 'If not a student, in which industry do you mainly work?'),\n  (7,  1, 'Native language', 'What is your native language?'),\n  -- NASA-TLX (stressless)\n  (8,  2, 'Mental Demand', 'How mentally demanding was the task?'),\n  (9,  2, 'Physical Demand', 'How physically demanding was the task?'),\n  (10, 2, 'Temporal Demand', 'How hurried or rushed was the pace of the task?'),\n  (11, 2, 'Performance', 'How successful were you in accomplishing what you were asked for?'),\n  (12, 2, 'Effort', 'How hard did you have to work to accomplish your level of performance?'),\n  (13, 2, 'Frustration', 'How insecure, discouraged, irritated, stressed, and annoyed were you?'),\n  -- NASA-TLX (stress)\n  (14, 3, 'Mental Demand', 'How mentally demanding was the task?'),\n  (15, 3, 'Physical Demand', 'How physically demanding was the task?'),\n  (16, 3, 'Temporal Demand', 'How hurried or rushed was the pace of the task?'),\n  (17, 3, 'Performance', 'How successful were you in accomplishing what you were asked for?'),\n  (18, 3, 'Effort', 'How hard did you have to work to accomplish your level of performance?'),\n  (19, 3, 'Frustration', 'How insecure, discouraged, irritated, stressed, and annoyed were you?'),\n  -- ATI-Scale\n  (20, 4, 'ati_01', 'I like to occupy myself in greater detail with technical systems'),\n  (21, 4, 'ati_02', 'I like testing the functions of new technical systems'),\n  (22, 4, 'ati_03', 'I predominantly deal with technical systems because I have to'),\n  (23, 4, 'ati_04', 'When I have a new technical system in front of me, I try it out intensively.'),\n  (24, 4, 'ati_05', 'I enjoy spending time becoming acquainted with a new technical system'),\n  (25, 4, 'ati_06', 'It is enough for me that a technical system works; I don’t care how or why.'),\n  (26, 4, 'ati_07', 'I try to understand how a technical system exactly works'),\n  (27, 4, 'ati_08', 'It is enough for me to know the basic functions of a technical system'),\n  (28, 4, 'ati_09', 'I try to make full use of the capabilities of a technical system')\nON CONFLICT DO NOTHING;\n\n-- E-Mail-Klassifizierung nach Phishing-Codebook\n-- (\"E-Mail Characterization of the Dataset after the Phishing-Codebook Taxonomy\")\n-- elementID = Mail-Nummer aus dem Datensatz\n\n-- EMAIL.elementID referenziert UI_ELEMENT -> Basiselemente zuerst anlegen\nINSERT OR IGNORE INTO UI_ELEMENT (elementID, elementType, elementName) VALUES\n  (1,  'email', 'Mail 1'),  (2,  'email', 'Mail 2'),  (3,  'email', 'Mail 3'),  (4,  'email', 'Mail 4'),\n  (5,  'email', 'Mail 5'),  (6,  'email', 'Mail 6'),  (7,  'email', 'Mail 7'),  (8,  'email', 'Mail 8'),\n  (9,  'email', 'Mail 9'),  (10, 'email', 'Mail 10'), (11, 'email', 'Mail 11'), (12, 'email', 'Mail 12'),\n  (13, 'email', 'Mail 13'), (14, 'email', 'Mail 14'), (15, 'email', 'Mail 15'), (16, 'email', 'Mail 16'),\n  (17, 'email', 'Mail 17'), (18, 'email', 'Mail 18'), (19, 'email', 'Mail 19'), (20, 'email', 'Mail 20'),\n  (21, 'email', 'Mail 21'), (22, 'email', 'Mail 22'), (23, 'email', 'Mail 23'), (24, 'email', 'Mail 24'),\n  (25, 'email', 'Mail 25'), (26, 'email', 'Mail 26'), (27, 'email', 'Mail 27'), (28, 'email', 'Mail 28'),\n  (29, 'email', 'Mail 29'), (30, 'email', 'Mail 30'), (31, 'email', 'Mail 31'), (32, 'email', 'Mail 32'),\n  (33, 'email', 'Mail 33'), (34, 'email', 'Mail 34'), (35, 'email', 'Mail 35'), (36, 'email', 'Mail 36');\n\n-- Weitere UI-Elemente der Tasks. Im Markup gekennzeichnet mit data-ui-element={elementID},\n-- im Frontend zentral in src/lib/uiElements.js – beide Stellen müssen übereinstimmen.\n--   101–109  Ordner\n--   201      Buttons\n--   300 + n  Link im Text von Mail n (nur Mails mit Link in emails.json)\nINSERT OR IGNORE INTO UI_ELEMENT (elementID, elementType, elementName) VALUES\n  (101, 'folder', 'Inbox'),\n  (102, 'folder', 'Important'),\n  (103, 'folder', 'Spam'),\n  (104, 'folder', 'Neutral'),\n  (105, 'folder', 'Bin'),\n  (106, 'folder', 'Sent'),\n  (107, 'folder', 'Archive'),\n  (108, 'folder', 'Notes'),\n  (109, 'folder', 'Tags'),\n  (201, 'button', 'Timer'),\n  (301, 'link', 'Link Mail 1'),  (302, 'link', 'Link Mail 2'),  (303, 'link', 'Link Mail 3'),\n  (304, 'link', 'Link Mail 4'),  (305, 'link', 'Link Mail 5'),  (306, 'link', 'Link Mail 6'),\n  (307, 'link', 'Link Mail 7'),  (308, 'link', 'Link Mail 8'),  (309, 'link', 'Link Mail 9'),\n  (310, 'link', 'Link Mail 10'), (311, 'link', 'Link Mail 11'), (313, 'link', 'Link Mail 13'),\n  (314, 'link', 'Link Mail 14'), (316, 'link', 'Link Mail 16'), (317, 'link', 'Link Mail 17');\n\nINSERT OR IGNORE INTO FOLDER (elementID, folderName) VALUES\n  (101, 'inbox'), (102, 'important'), (103, 'spam'), (104, 'neutral'), (105, 'bin'),\n  (106, 'sent'),  (107, 'archive'),   (108, 'notes'), (109, 'tags');\n\nINSERT OR IGNORE INTO BUTTON (elementID, buttonName) VALUES\n  (201, 'timer');\n\n-- topic      = \"Main Topic\" aus dem Codebook (nur für Phishing-Mails klassifiziert, sonst NULL)\n-- salutation = 'Name' | 'Generic' | 'None'; Phishing-Mails laut Codebook, übrige Mails aus der\n--              sichtbaren Anrede abgeleitet, NULL wenn im Screenshot keine Anrede erkennbar ist\n-- class      = Kategorie im Datensatz: 'advertising' | 'neutral' | 'urgent'\nINSERT OR IGNORE INTO EMAIL (elementID, sender, subject, topic, salutation, class) VALUES\n  -- ADVERTISING\n  (5,  'management@glubalconnect.com',      'Earn extra money',                                      'Internal communication',                    'Generic', 'advertising'),  -- Phishing\n  (7,  'management@globalconnect.com',      'Win a new IPhone',                                      'Internal communication',                    'Generic', 'advertising'),  -- Phishing\n  (9,  'license@microsuft.com',             'Extend your Microsoft license',                         'license renewable with unspecific urgency', 'Generic', 'advertising'),  -- Phishing\n  (28, 'service@e.amaysim.com.au',          'Hey there, 50% off unlimited mobile data',              NULL, NULL,      'advertising'),\n  (29, 'noreply@mail.immobilienscout24.de', 'Mieter vs. Vermieter – Wo wird am meisten gestritten?', NULL, NULL,      'advertising'),\n  (30, 'Angebote@myunidays.com',            'Fitness-Motivation gefällig?',                          NULL, NULL,      'advertising'),\n  (31, 'newsletter@newsletter.nivea.de',    'Deo jetzt exklusiv testen',                             NULL, NULL,      'advertising'),\n  (32, 'no-reply@message.tipico.de',        'Hochspannende Spiele und Olympia-Finnish',              NULL, 'Generic', 'advertising'),\n  (33, 'norton@secure.norton.com',          'NortonLifeLock',                                        NULL, NULL,      'advertising'),\n  (34, 'kate.cornwell@imotions.com',        'Every week is pride week',                              NULL, NULL,      'advertising'),\n  (35, 'payback@mailing.rewe.de',           'Geld sparen mit Payback-Punkten',                       NULL, 'Generic', 'advertising'),\n  (36, 'message@my.zalando.de',             'Finaler Sale',                                          NULL, NULL,      'advertising'),\n\n  -- NEUTRAL\n  (1,  'info@dropbox.com',                  'Droppbox Notification',                                 'security issue',                            'Name',    'neutral'),      -- Phishing\n  (6,  'One Drive Support',                 'UPDATE OneDrive: Validate your Account',                'security issue',                            'None',    'neutral'),      -- Phishing\n  (8,  'government@germany.eu',             'New Corona regulations',                                'government',                                'None',    'neutral'),      -- Phishing\n  (10, 'no-reply@dropbox.com',              'Max Miller has shared Meeting Guide with you',          NULL, 'Name',    'neutral'),\n  (11, 'maxmiller@globalconnect.com',       'Lunchbreak?',                                           NULL, 'Generic', 'neutral'),\n  (12, 'lisachase@globalconnect.com',       'Distribution FFP2 Masks',                               NULL, 'Generic', 'neutral'),\n  (13, 'margJohnson@globalconnect.com',     'Explanation Transponder battery replacement',           NULL, 'Generic', 'neutral'),\n  (14, 'companymanagement@globalconnect.com', 'Company party',                                       NULL, 'Generic', 'neutral'),\n  (15, 'maxmiller@globalconnect.com',       'Information mail - Craftsman',                          NULL, 'Name',    'neutral'),\n  (16, 'maxmiller@globalconnect.com',       'Numbers Document',                                      NULL, 'None',    'neutral'),\n  (17, 'service@globalconnect.com',         'New break room regulations',                            NULL, 'Generic', 'neutral'),\n  (18, 'service@globalconnect.com',         'New break room regulations',                            NULL, 'Generic', 'neutral'),\n\n  -- URGENT\n  (2,  'GlobalConnect Team',                'Important! Company Evaluation!',                        'internal company communication',            'Name',    'urgent'),       -- Phishing\n  (3,  'GlobalConnect Team',                'Quick Employee Survey',                                 'company communication',                     'Name',    'urgent'),       -- Phishing\n  (4,  'maxmiller@globalconnect.com',       'RE: Document meeting urgent!',                          'company communication',                     'Generic', 'urgent'),       -- Phishing\n  (19, 'dep.management@globalconnect.com',  'Deadline Project',                                      NULL, 'Name',    'urgent'),\n  (20, 'lizstone@globalconnect.com',        'Urgent! Missing Documents',                             NULL, 'Name',    'urgent'),\n  (21, 'dep.management@globalconnect.com',  'Appointment Paulsen',                                   NULL, 'Name',    'urgent'),\n  (22, 'companymanagement@globalconnect.com', 'Submission of sick leave',                            NULL, 'Name',    'urgent'),\n  (23, 'companymanagement@globalconnect.com', 'Submit vacation request',                             NULL, 'Name',    'urgent'),\n  (24, 'Max Miller',                        'Feedback request',                                      NULL, 'Name',    'urgent'),\n  (25, 'Timo Michaelson',                   'Task',                                                  NULL, 'Name',    'urgent'),\n  (26, 'companymanagement@globalconnect.com', 'Missing information',                                 NULL, 'Name',    'urgent'),\n  (27, 'Timo Michaelson',                   'Schedule zoom meeting for employee review',             NULL, 'Name',    'urgent');\n\n-- Codebook: Action Generic -> Action Specific\nINSERT OR IGNORE INTO ACTION_CATEGORY (genericAction, specificAction) VALUES\n  ('Click', 'Participate at the preparation of the annual foundation anniversary of the company.'),  -- Mail 5\n  ('Click', 'Participate in company raffle'),                                                        -- Mail 7\n  ('Click', 'Click on the link to renew your Microsoft license'),                                    -- Mail 9\n  ('Click', 'Reset password'),                                                                       -- Mail 1\n  ('Click', 'resolve security issue by clicking the link in the e-mail'),                            -- Mail 6\n  ('Click', 'Read the regulation guidelines by clicking a link in the e-mail'),                      -- Mail 8\n  ('Click', 'participate in company evaluation'),                                                    -- Mail 2\n  ('Click', 'participate in the questionaire'),                                                      -- Mail 3\n  ('Click', 'preview the document');                                                                 -- Mail 4\n\n-- Nur Phishing-Mails (Phishing: Ja); threat = 'Yes' | 'None'\nINSERT OR IGNORE INTO PHISHING_DETAIL (elementID, threat, specificAction) VALUES\n  -- ADVERTISING\n  (5, 'None', 'Participate at the preparation of the annual foundation anniversary of the company.'),\n  (7, 'None', 'Participate in company raffle'),\n  (9, 'Yes',  'Click on the link to renew your Microsoft license'),\n  -- NEUTRAL\n  (1, 'Yes',  'Reset password'),\n  (6, 'Yes',  'resolve security issue by clicking the link in the e-mail'),\n  (8, 'Yes',  'Read the regulation guidelines by clicking a link in the e-mail'),\n  -- URGENT\n  (2, 'None', 'participate in company evaluation'),\n  (3, 'Yes',  'participate in the questionaire'),\n  (4, 'None', 'preview the document');";
//#endregion
//#region src/lib/server/db.js
mkdirSync("data", { recursive: true });
var db = new Database("data/study.db");
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");
db.exec(schema_default);
//#endregion
//#region src/lib/server/repository.js
var stmt = {
	insertParticipant: db.prepare("INSERT INTO PARTICIPANT (participantID) VALUES (?)"),
	insertTask: db.prepare(`INSERT INTO TASK (participantID, condition, taskStart)
                          VALUES (@participantID, @condition, @taskStart)`),
	endTask: db.prepare("UPDATE TASK SET taskEnd = @taskEnd WHERE taskID = @taskID"),
	insertMove: db.prepare(`INSERT INTO MOUSE_MOVEMENT (taskID, moveTime, x, y)
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
	upsertSurveySession: db.prepare(`INSERT INTO SURVEY_SESSION (participantID, surveyID, startTime, endTime)
                                   VALUES (@participantID, @surveyID, @startTime, @endTime)
                                   ON CONFLICT (participantID, surveyID)
                                   DO UPDATE SET startTime = excluded.startTime, endTime = excluded.endTime
                                   RETURNING sessionID`).pluck(),
	questionsOfSurvey: db.prepare("SELECT questionID FROM QUESTION WHERE surveyID = ?").pluck(),
	upsertAnswer: db.prepare(`INSERT INTO ANSWER (sessionID, questionID, answerText)
                            VALUES (@sessionID, @questionID, @answerText)
                            ON CONFLICT (sessionID, questionID) DO UPDATE SET answerText = excluded.answerText`),
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
	for (const field of fields) if (body?.[field] === void 0 || body[field] === null) throw new BadRequest(`${field} fehlt`);
}
/** Legt einen Teilnehmer mit pseudonymer ID an. */
function createParticipant() {
	const participantID = "P-" + randomBytes(3).toString("hex");
	stmt.insertParticipant.run(participantID);
	return { participantID };
}
function startTask(body) {
	required(body, "participantID", "condition", "taskStart");
	const { participantID, condition, taskStart } = body;
	return { taskID: Number(stmt.insertTask.run({
		participantID,
		condition,
		taskStart
	}).lastInsertRowid) };
}
function endTask(body) {
	required(body, "taskID", "taskEnd");
	const { taskID, taskEnd } = body;
	if (stmt.endTask.run({
		taskID,
		taskEnd
	}).changes === 0) throw new BadRequest(`Task ${taskID} unbekannt`);
}
/** Ein Batch aus tracker.js – alles in einer Transaktion. */
var saveTaskEvents = db.transaction((body) => {
	required(body, "taskID");
	const { taskID, moves = [], hovers = [], points = [], scrolls = [], drags = [] } = body;
	for (const m of moves) stmt.insertMove.run({
		...m,
		taskID
	});
	for (const h of hovers) stmt.insertHover.run({
		...h,
		taskID
	});
	for (const p of points) stmt.insertPoint.run({
		...p,
		taskID
	});
	for (const s of scrolls) stmt.insertScroll.run({
		...s,
		taskID
	});
	for (const d of drags) stmt.insertDragDrop.run({
		...d,
		taskID
	});
	return {
		moves: moves.length,
		hovers: hovers.length,
		points: points.length,
		scrolls: scrolls.length,
		drags: drags.length
	};
});
/** Ein Fragebogen: answers = { questionID: Antwort } */
var saveSurvey = db.transaction((body) => {
	required(body, "participantID", "surveyID", "startTime", "endTime", "answers");
	const { participantID, surveyID, startTime, endTime, answers } = body;
	const questionIDs = new Set(stmt.questionsOfSurvey.all(surveyID));
	for (const questionID of Object.keys(answers)) if (!questionIDs.has(Number(questionID))) throw new BadRequest(`Frage ${questionID} gehört nicht zu Survey ${surveyID}`);
	const sessionID = stmt.upsertSurveySession.get({
		participantID,
		surveyID,
		startTime,
		endTime
	});
	for (const [questionID, answer] of Object.entries(answers)) stmt.upsertAnswer.run({
		sessionID,
		questionID: Number(questionID),
		answerText: answer == null ? null : String(answer)
	});
	return { sessionID };
});
/** Ein Batch aus hrRecorder.js. Pro Teilnehmer und Gurt gibt es eine Aufzeichnung. */
var saveHeartRate = db.transaction((body) => {
	required(body, "participantID");
	const { participantID, polarDevID = null, samples = [], rrIntervals = [] } = body;
	let recordingID = stmt.findRecording.get(participantID, polarDevID);
	if (recordingID === void 0) {
		const startTime = samples[0]?.hrTime ?? rrIntervals[0]?.rrTime ?? null;
		recordingID = Number(stmt.insertRecording.run({
			participantID,
			polarDevID,
			startTime
		}).lastInsertRowid);
	}
	for (const s of samples) stmt.insertHrSample.run({
		...s,
		recordingID
	});
	for (const r of rrIntervals) stmt.insertRrInterval.run({
		...r,
		recordingID
	});
	return {
		recordingID,
		samples: samples.length,
		rrIntervals: rrIntervals.length
	};
});
//#endregion
export { saveTaskEvents as a, saveSurvey as i, endTask as n, startTask as o, saveHeartRate as r, handle as s, createParticipant as t };
