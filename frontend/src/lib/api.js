const KEY = 'sessionId';

export const getSessionId = () =>
  typeof sessionStorage === 'undefined' ? null : sessionStorage.getItem(KEY);

async function send(url, body, method = 'POST') {
  const res = await fetch(url, {
    method,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(`${url}: ${res.status} ${await res.text()}`);
  return res.json();
}

export async function createSession(conditionOrder) {
  const { sessionId } = await send('/api/sessions', {
    conditionOrder,
    viewportW: window.innerWidth,
    viewportH: window.innerHeight
  });
  sessionStorage.setItem(KEY, sessionId);
  return sessionId;
}

export const finishSession = () =>
  send('/api/sessions', { sessionId: getSessionId() }, 'PATCH');

export const submitResponses = (questionnaire, phase, answers, startedAt) =>
  send('/api/responses', { sessionId: getSessionId(), questionnaire, phase, answers, startedAt });
