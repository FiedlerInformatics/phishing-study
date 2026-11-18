// Speichert die Polar-Daten (HEART_RATE_RECORD, HR_SAMPLE, RR_INTERVAL).
// Aufgezeichnet wird, solange ein Teilnehmer angelegt ist (Studienbeginn bis Studienende).
import { getParticipantID, postBatch } from './api';

const FLUSH_INTERVAL_MS = 2000;

// Ein Batch gehört immer zu genau einem Teilnehmer und einem Gurt.
let current = null;   // { participantID, polarDevID, samples: [], rrIntervals: [] }
let pending = [];     // abgeschlossene oder fehlgeschlagene Batches

/** Nimmt eine Nachricht von backend/main.py entgegen. */
export function recordHr({ polarDevID, hrTime, bpm, contact, rrIntervals = [] }) {
  const participantID = getParticipantID();
  if (!participantID) return;   // vor Studienbeginn / nach Studienende: nicht speichern

  if (current?.participantID !== participantID || current?.polarDevID !== polarDevID) {
    if (current?.samples.length || current?.rrIntervals.length) pending.push(current);
    current = { participantID, polarDevID, samples: [], rrIntervals: [] };
  }

  current.samples.push({ hrTime, bpm, contact });
  for (const { rrTime, rrMs } of rrIntervals) current.rrIntervals.push({ rrTime, rrMs, contact });
}

export async function flushHr(beacon = false) {
  if (current?.samples.length || current?.rrIntervals.length) {
    pending.push(current);
    current = { ...current, samples: [], rrIntervals: [] };
  }

  const batches = pending;
  pending = [];
  for (const batch of batches) {
    try {
      await postBatch('/api/hr', batch, beacon);
    } catch (err) {
      console.error('Herzfrequenzdaten nicht gespeichert', err);
      if (err.retry) pending.push(batch);
    }
  }
}

/** Im Layout: alle 2 s und beim Schließen der Seite speichern. */
export function startHrRecording() {
  const onPageHide = () => flushHr(true);
  window.addEventListener('pagehide', onPageHide);
  const intervalId = setInterval(flushHr, FLUSH_INTERVAL_MS);

  return () => {
    window.removeEventListener('pagehide', onPageHide);
    clearInterval(intervalId);
    flushHr(true);
  };
}
