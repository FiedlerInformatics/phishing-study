import { json } from '@sveltejs/kit';
import { sessionExists, saveEvents } from '$lib/server/repository';

export async function POST({ request }) {
  // text() statt json(): sendBeacon schickt den Body als text/plain
  const batch = JSON.parse(await request.text());
  if (!batch.sessionId || !batch.phase) {
    return json({ error: 'sessionId und phase sind Pflicht' }, { status: 400 });
  }
  if (!sessionExists(batch.sessionId)) return json({ error: 'Session unbekannt' }, { status: 404 });

  const stored = saveEvents(batch);
  return json({ ok: true, stored });
}
