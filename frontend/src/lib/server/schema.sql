PRAGMA foreign_keys = ON;

--------------------- PARTICIPANT ------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS PARTICIPANT (
  participantID TEXT PRIMARY KEY
);
----------------------------------------------------------------------------------------------------------

--------------------- SURVEY -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS SURVEY (
  surveyID        INTEGER PRIMARY KEY,
  surveyType      TEXT NOT NULL
); 

CREATE TABLE IF NOT EXISTS SURVEY_SESSION(
  sessionID       INTEGER PRIMARY KEY,
  participantID   TEXT NOT NULL REFERENCES PARTICIPANT(participantID) ON DELETE CASCADE,
  surveyID        INTEGER   NOT NULL REFERENCES SURVEY(surveyID),
  startTime       TEXT,
  endTime         TEXT,
  UNIQUE(participantID, surveyID)
);

CREATE TABLE IF NOT EXISTS QUESTION (
  questionID        INTEGER PRIMARY KEY,
  surveyID          INTEGER NOT NULL REFERENCES SURVEY(surveyID) ON DELETE CASCADE,
  questionHeader    TEXT,
  questionText      TEXT
);

CREATE TABLE IF NOT EXISTS ANSWER (
  answerID        INTEGER PRIMARY KEY,
  sessionID       INTEGER NOT NULL REFERENCES SURVEY_SESSION(sessionID) ON DELETE CASCADE,
  questionID      INTEGER NOT NULL REFERENCES QUESTION(questionID),
  answerText      TEXT,
  UNIQUE (sessionID, questionID)
);
----------------------------------------------------------------------------------------------------------

--------------------- HEART RATE MEASUREMENT -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS HEART_RATE_RECORD(
  recordingID     INTEGER PRIMARY KEY,
  participantID   TEXT NOT NULL REFERENCES PARTICIPANT(participantID) ON DELETE CASCADE,
  polarDevID      TEXT,
  startTime       TEXT
);

CREATE TABLE IF NOT EXISTS HR_SAMPLE(
  hrID          INTEGER PRIMARY KEY,
  recordingID   INTEGER NOT NULL REFERENCES HEART_RATE_RECORD(recordingID) ON DELETE CASCADE,
  hrTime        TEXT,
  bpm           INTEGER,
  contact       INTEGER NOT NULL CHECK (contact IN (0,1))
);

CREATE TABLE IF NOT EXISTS RR_INTERVAL(
  rrID          INTEGER PRIMARY KEY,
  recordingID   INTEGER NOT NULL REFERENCES HEART_RATE_RECORD(recordingID) ON DELETE CASCADE,
  rrTime        TEXT,
  rrMs          INTEGER,
  contact       INTEGER NOT NULL CHECK (contact IN (0,1))
); 
----------------------------------------------------------------------------------------------------------

--------------------- UI ELEMENTS ------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS UI_ELEMENT(
  elementID     INTEGER PRIMARY KEY,
  elementType   TEXT NOT NULL,
  elementName   TEXT
  );

CREATE TABLE IF NOT EXISTS BUTTON(
  elementID    INTEGER PRIMARY KEY REFERENCES UI_ELEMENT(elementID) ON DELETE CASCADE,
  buttonName   TEXT
);

CREATE TABLE IF NOT EXISTS FOLDER(
  elementID   INTEGER PRIMARY KEY REFERENCES UI_ELEMENT(elementID) ON DELETE CASCADE,
  folderName  TEXT
); 

CREATE TABLE IF NOT EXISTS EMAIL(
  elementID INTEGER PRIMARY KEY REFERENCES UI_ELEMENT(elementID) ON DELETE CASCADE,
  sender        TEXT,
  subject       TEXT,
  topic         TEXT,
  salutation    TEXT,
  class         TEXT
);

CREATE TABLE IF NOT EXISTS PHISHING_DETAIL(
  elementID         INTEGER PRIMARY KEY REFERENCES EMAIL(elementID) ON DELETE CASCADE,
  threat            TEXT,
  specificAction    TEXT NOT NULL REFERENCES ACTION_CATEGORY(specificAction)
); 

CREATE TABLE IF NOT EXISTS ACTION_CATEGORY(
  genericAction TEXT NOT NULL,
  specificAction    TEXT NOT NULL PRIMARY KEY
); 
----------------------------------------------------------------------------------------------------------

--------------------- TASK MEASUREMENT--------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS TASK(
  taskID          INTEGER PRIMARY KEY,
  participantID   TEXT NOT NULL REFERENCES PARTICIPANT(participantID) ON DELETE CASCADE,
  condition       TEXT,
  taskStart       TEXT,
  taskEnd         TEXT
);

CREATE TABLE IF NOT EXISTS MOUSE_MOVEMENT(
  moveID    INTEGER PRIMARY KEY,
  taskID    INTEGER NOT NULL REFERENCES TASK(taskID) ON DELETE CASCADE,
  moveTime  TEXT,
  x         REAL,
  y         REAL
); 

CREATE TABLE IF NOT EXISTS HOVER_EVENT(
  eventID       INTEGER PRIMARY KEY,
  taskID        INTEGER NOT NULL REFERENCES TASK(taskID) ON DELETE CASCADE,
  eventStart    TEXT,
  eventEnd      TEXT,

  elementID   INTEGER REFERENCES UI_ELEMENT(elementID) ON DELETE SET NULL,
  x           REAL,         
  y           REAL
);

CREATE TABLE IF NOT EXISTS SCROLL_EVENT(
  eventID       INTEGER PRIMARY KEY,
  taskID        INTEGER NOT NULL REFERENCES TASK(taskID) ON DELETE CASCADE,
  eventStart    TEXT,
  eventEnd      TEXT,

  scrollStartX    REAL,
  scrollStartY    REAL,
  scrollEndX      REAL,
  scrollEndY      REAL
);

CREATE TABLE IF NOT EXISTS DRAGDROP_EVENT(
  eventID       INTEGER PRIMARY KEY,
  taskID        INTEGER NOT NULL REFERENCES TASK(taskID) ON DELETE CASCADE,
  eventStart    TEXT,
  eventEnd      TEXT,

  startX    REAL,
  startY    REAL,
  endX      REAL,
  endY      REAL,

  eMailID         INTEGER NOT NULL REFERENCES EMAIL(elementID),
  fromFolderID    INTEGER REFERENCES FOLDER(elementID),
  toFolderID      INTEGER REFERENCES FOLDER(elementID)
);

CREATE TABLE IF NOT EXISTS POINT_EVENT(
  eventID       INTEGER PRIMARY KEY,
  taskID        INTEGER NOT NULL REFERENCES TASK(taskID) ON DELETE CASCADE,
  eventStart    TEXT NOT NULL,
  eventEnd      TEXT NOT NULL,

  x             REAL,
  y             REAL,
  elementID     INTEGER REFERENCES UI_ELEMENT(elementID) ON DELETE SET NULL
);
----------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------

------------ INITIALIZATION ------------------------------------------------------------------------------

INSERT INTO SURVEY (surveyID, surveyType) VALUES
  (1, 'demographic/BFI-10'),
  (2, 'NASA-TLX-stressless'),
  (3, 'NASA-TLX-stress'),
  (4, 'ATI-Scale')
ON CONFLICT DO NOTHING;

INSERT OR IGNORE INTO QUESTION (questionID, surveyID, questionHeader, questionText) VALUES
  -- DEMOGRAPHIC
  (1,  1, 'Gender', 'What is your gender?'),
  (2,  1, 'Age', 'What is your age?'),
  (3,  1, 'Education', 'What is your highest level of education?'),
  (4,  1, 'Occupation', 'What is your current main occupation?'),
  (5,  1, 'Field of study', 'If you are a student, what is your field of study?'),
  (6,  1, 'Industry', 'If not a student, in which industry do you mainly work?'),
  (7,  1, 'Native language', 'What is your native language?'),
  -- NASA-TLX (stressless)
  (8,  2, 'Mental Demand', 'How mentally demanding was the task?'),
  (9,  2, 'Physical Demand', 'How physically demanding was the task?'),
  (10, 2, 'Temporal Demand', 'How hurried or rushed was the pace of the task?'),
  (11, 2, 'Performance', 'How successful were you in accomplishing what you were asked for?'),
  (12, 2, 'Effort', 'How hard did you have to work to accomplish your level of performance?'),
  (13, 2, 'Frustration', 'How insecure, discouraged, irritated, stressed, and annoyed were you?'),
  -- NASA-TLX (stress)
  (14, 3, 'Mental Demand', 'How mentally demanding was the task?'),
  (15, 3, 'Physical Demand', 'How physically demanding was the task?'),
  (16, 3, 'Temporal Demand', 'How hurried or rushed was the pace of the task?'),
  (17, 3, 'Performance', 'How successful were you in accomplishing what you were asked for?'),
  (18, 3, 'Effort', 'How hard did you have to work to accomplish your level of performance?'),
  (19, 3, 'Frustration', 'How insecure, discouraged, irritated, stressed, and annoyed were you?'),
  -- ATI-Scale
  (20, 4, 'ati_01', 'I like to occupy myself in greater detail with technical systems'),
  (21, 4, 'ati_02', 'I like testing the functions of new technical systems'),
  (22, 4, 'ati_03', 'I predominantly deal with technical systems because I have to'),
  (23, 4, 'ati_04', 'When I have a new technical system in front of me, I try it out intensively.'),
  (24, 4, 'ati_05', 'I enjoy spending time becoming acquainted with a new technical system'),
  (25, 4, 'ati_06', 'It is enough for me that a technical system works; I don’t care how or why.'),
  (26, 4, 'ati_07', 'I try to understand how a technical system exactly works'),
  (27, 4, 'ati_08', 'It is enough for me to know the basic functions of a technical system'),
  (28, 4, 'ati_09', 'I try to make full use of the capabilities of a technical system')
ON CONFLICT DO NOTHING;

-- E-Mail-Klassifizierung nach Phishing-Codebook
-- ("E-Mail Characterization of the Dataset after the Phishing-Codebook Taxonomy")
-- elementID = Mail-Nummer aus dem Datensatz

-- EMAIL.elementID referenziert UI_ELEMENT -> Basiselemente zuerst anlegen
INSERT OR IGNORE INTO UI_ELEMENT (elementID, elementType, elementName) VALUES
  (1,  'email', 'Mail 1'),  (2,  'email', 'Mail 2'),  (3,  'email', 'Mail 3'),  (4,  'email', 'Mail 4'),
  (5,  'email', 'Mail 5'),  (6,  'email', 'Mail 6'),  (7,  'email', 'Mail 7'),  (8,  'email', 'Mail 8'),
  (9,  'email', 'Mail 9'),  (10, 'email', 'Mail 10'), (11, 'email', 'Mail 11'), (12, 'email', 'Mail 12'),
  (13, 'email', 'Mail 13'), (14, 'email', 'Mail 14'), (15, 'email', 'Mail 15'), (16, 'email', 'Mail 16'),
  (17, 'email', 'Mail 17'), (18, 'email', 'Mail 18'), (19, 'email', 'Mail 19'), (20, 'email', 'Mail 20'),
  (21, 'email', 'Mail 21'), (22, 'email', 'Mail 22'), (23, 'email', 'Mail 23'), (24, 'email', 'Mail 24'),
  (25, 'email', 'Mail 25'), (26, 'email', 'Mail 26'), (27, 'email', 'Mail 27'), (28, 'email', 'Mail 28'),
  (29, 'email', 'Mail 29'), (30, 'email', 'Mail 30'), (31, 'email', 'Mail 31'), (32, 'email', 'Mail 32'),
  (33, 'email', 'Mail 33'), (34, 'email', 'Mail 34'), (35, 'email', 'Mail 35'), (36, 'email', 'Mail 36');

-- topic      = "Main Topic" aus dem Codebook (nur für Phishing-Mails klassifiziert, sonst NULL)
-- salutation = 'Name' | 'Generic' | 'None'; Phishing-Mails laut Codebook, übrige Mails aus der
--              sichtbaren Anrede abgeleitet, NULL wenn im Screenshot keine Anrede erkennbar ist
-- class      = Kategorie im Datensatz: 'advertising' | 'neutral' | 'urgent'
INSERT OR IGNORE INTO EMAIL (elementID, sender, subject, topic, salutation, class) VALUES
  -- ADVERTISING
  (5,  'management@glubalconnect.com',      'Earn extra money',                                      'Internal communication',                    'Generic', 'advertising'),  -- Phishing
  (7,  'management@globalconnect.com',      'Win a new IPhone',                                      'Internal communication',                    'Generic', 'advertising'),  -- Phishing
  (9,  'license@microsuft.com',             'Extend your Microsoft license',                         'license renewable with unspecific urgency', 'Generic', 'advertising'),  -- Phishing
  (28, 'service@e.amaysim.com.au',          'Hey there, 50% off unlimited mobile data',              NULL, NULL,      'advertising'),
  (29, 'noreply@mail.immobilienscout24.de', 'Mieter vs. Vermieter – Wo wird am meisten gestritten?', NULL, NULL,      'advertising'),
  (30, 'Angebote@myunidays.com',            'Fitness-Motivation gefällig?',                          NULL, NULL,      'advertising'),
  (31, 'newsletter@newsletter.nivea.de',    'Deo jetzt exklusiv testen',                             NULL, NULL,      'advertising'),
  (32, 'no-reply@message.tipico.de',        'Hochspannende Spiele und Olympia-Finnish',              NULL, 'Generic', 'advertising'),
  (33, 'norton@secure.norton.com',          'NortonLifeLock',                                        NULL, NULL,      'advertising'),
  (34, 'kate.cornwell@imotions.com',        'Every week is pride week',                              NULL, NULL,      'advertising'),
  (35, 'payback@mailing.rewe.de',           'Geld sparen mit Payback-Punkten',                       NULL, 'Generic', 'advertising'),
  (36, 'message@my.zalando.de',             'Finaler Sale',                                          NULL, NULL,      'advertising'),

  -- NEUTRAL
  (1,  'info@dropbox.com',                  'Droppbox Notification',                                 'security issue',                            'Name',    'neutral'),      -- Phishing
  (6,  'One Drive Support',                 'UPDATE OneDrive: Validate your Account',                'security issue',                            'None',    'neutral'),      -- Phishing
  (8,  'government@germany.eu',             'New Corona regulations',                                'government',                                'None',    'neutral'),      -- Phishing
  (10, 'no-reply@dropbox.com',              'Max Miller has shared Meeting Guide with you',          NULL, 'Name',    'neutral'),
  (11, 'maxmiller@globalconnect.com',       'Lunchbreak?',                                           NULL, 'Generic', 'neutral'),
  (12, 'lisachase@globalconnect.com',       'Distribution FFP2 Masks',                               NULL, 'Generic', 'neutral'),
  (13, 'margJohnson@globalconnect.com',     'Explanation Transponder battery replacement',           NULL, 'Generic', 'neutral'),
  (14, 'companymanagement@globalconnect.com', 'Company party',                                       NULL, 'Generic', 'neutral'),
  (15, 'maxmiller@globalconnect.com',       'Information mail - Craftsman',                          NULL, 'Name',    'neutral'),
  (16, 'maxmiller@globalconnect.com',       'Numbers Document',                                      NULL, 'None',    'neutral'),
  (17, 'service@globalconnect.com',         'New break room regulations',                            NULL, 'Generic', 'neutral'),
  (18, 'service@globalconnect.com',         'New break room regulations',                            NULL, 'Generic', 'neutral'),

  -- URGENT
  (2,  'GlobalConnect Team',                'Important! Company Evaluation!',                        'internal company communication',            'Name',    'urgent'),       -- Phishing
  (3,  'GlobalConnect Team',                'Quick Employee Survey',                                 'company communication',                     'Name',    'urgent'),       -- Phishing
  (4,  'maxmiller@globalconnect.com',       'RE: Document meeting urgent!',                          'company communication',                     'Generic', 'urgent'),       -- Phishing
  (19, 'dep.management@globalconnect.com',  'Deadline Project',                                      NULL, 'Name',    'urgent'),
  (20, 'lizstone@globalconnect.com',        'Urgent! Missing Documents',                             NULL, 'Name',    'urgent'),
  (21, 'dep.management@globalconnect.com',  'Appointment Paulsen',                                   NULL, 'Name',    'urgent'),
  (22, 'companymanagement@globalconnect.com', 'Submission of sick leave',                            NULL, 'Name',    'urgent'),
  (23, 'companymanagement@globalconnect.com', 'Submit vacation request',                             NULL, 'Name',    'urgent'),
  (24, 'Max Miller',                        'Feedback request',                                      NULL, 'Name',    'urgent'),
  (25, 'Timo Michaelson',                   'Task',                                                  NULL, 'Name',    'urgent'),
  (26, 'companymanagement@globalconnect.com', 'Missing information',                                 NULL, 'Name',    'urgent'),
  (27, 'Timo Michaelson',                   'Schedule zoom meeting for employee review',             NULL, 'Name',    'urgent');

-- Codebook: Action Generic -> Action Specific
INSERT OR IGNORE INTO ACTION_CATEGORY (genericAction, specificAction) VALUES
  ('Click', 'Participate at the preparation of the annual foundation anniversary of the company.'),  -- Mail 5
  ('Click', 'Participate in company raffle'),                                                        -- Mail 7
  ('Click', 'Click on the link to renew your Microsoft license'),                                    -- Mail 9
  ('Click', 'Reset password'),                                                                       -- Mail 1
  ('Click', 'resolve security issue by clicking the link in the e-mail'),                            -- Mail 6
  ('Click', 'Read the regulation guidelines by clicking a link in the e-mail'),                      -- Mail 8
  ('Click', 'participate in company evaluation'),                                                    -- Mail 2
  ('Click', 'participate in the questionaire'),                                                      -- Mail 3
  ('Click', 'preview the document');                                                                 -- Mail 4

-- Nur Phishing-Mails (Phishing: Ja); threat = 'Yes' | 'None'
INSERT OR IGNORE INTO PHISHING_DETAIL (elementID, threat, specificAction) VALUES
  -- ADVERTISING
  (5, 'None', 'Participate at the preparation of the annual foundation anniversary of the company.'),
  (7, 'None', 'Participate in company raffle'),
  (9, 'Yes',  'Click on the link to renew your Microsoft license'),
  -- NEUTRAL
  (1, 'Yes',  'Reset password'),
  (6, 'Yes',  'resolve security issue by clicking the link in the e-mail'),
  (8, 'Yes',  'Read the regulation guidelines by clicking a link in the e-mail'),
  -- URGENT
  (2, 'None', 'participate in company evaluation'),
  (3, 'Yes',  'participate in the questionaire'),
  (4, 'None', 'preview the document');

