// elementIDs der UI-Elemente aus UI_ELEMENT (schema.sql) – beide Stellen müssen übereinstimmen.
// Im Markup wird ein Element mit data-ui-element={elementID} gekennzeichnet.
// E-Mail-Zeilen verwenden direkt ihre E-Mail-ID (1–36).

export const FOLDER_ID = {
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

export const BUTTON_ID = {
  timer: 201
};

/** Link im Text der E-Mail emailID */
export const linkElementID = (emailID) => 300 + emailID;
