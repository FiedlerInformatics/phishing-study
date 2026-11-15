import { json } from '@sveltejs/kit';
import { createSession, finishSession } from '$lib/server/repository';

export async function POST({ request }) {
  const body = await request.json();
  const sessionId = createSession({ ...body, userAgent: request.headers.get('user-agent') });
  return json({ sessionId }, { status: 201 });
}

export async function PATCH({ request }) {
  const { sessionId } = await request.json();
  if (!finishSession(sessionId)) return json({ error: 'Session unbekannt' }, { status: 404 });
  return json({ ok: true });
}
