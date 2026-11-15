import { json } from '@sveltejs/kit';
import { sessionExists, saveResponses } from '$lib/server/repository';

export async function POST({ request }) {
  const body = await request.json();
  if (!body.sessionId || !body.questionnaire || !body.answers) {
    return json({ error: 'sessionId, questionnaire und answers sind Pflicht' }, { status: 400 });
  }
  if (!sessionExists(body.sessionId)) return json({ error: 'Session unbekannt' }, { status: 404 });

  saveResponses(body);
  return json({ ok: true }, { status: 201 });
}
