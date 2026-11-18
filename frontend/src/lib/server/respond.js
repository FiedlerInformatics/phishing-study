import { json } from '@sveltejs/kit';

/** Ungültige Anfragedaten -> HTTP 400 */
export class BadRequest extends Error {}

/**
 * Liest den JSON-Body (als Text, weil sendBeacon text/plain schickt), führt den
 * Schreibvorgang aus und antwortet mit dessen Rückgabe.
 * Ungültige Daten – auch verletzte DB-Constraints wie unbekannte participantID,
 * taskID oder elementID – ergeben 400 statt 500, damit der Client nicht endlos wiederholt.
 */
export async function handle(request, write, status = 201) {
  try {
    const body = JSON.parse(await request.text());
    return json(write(body) ?? { ok: true }, { status });
  } catch (err) {
    const invalid =
      err instanceof BadRequest ||
      err instanceof SyntaxError ||                       // kein gültiges JSON
      err instanceof RangeError ||                        // better-sqlite3: Feld fehlt
      String(err.code).startsWith('SQLITE_CONSTRAINT');   // Fremdschlüssel, CHECK, NOT NULL …
    if (invalid) return json({ error: err.message }, { status: 400 });
    throw err;
  }
}
