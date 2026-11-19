/**
 * Verbindung zu backend/main.py (ws://localhost:8765).
 *
 * Nur +layout.svelte ruft connectHeartRate auf – es gibt genau eine Verbindung pro
 * Browser-Tab. Komponenten, die nur den aktuellen Puls anzeigen, lesen hr.bpm aus
 * hrState.svelte.js.
 */

/** Eine Nachricht von main.py; Feldnamen wie in HR_SAMPLE / RR_INTERVAL. */
export interface HeartRateMessage {
  polarDevID: string | null;
  hrTime: string;                                  // ISO-8601 UTC, Empfang in main.py
  bpm: number;
  contact: 0 | 1;
  rrIntervals: { rrTime: string; rrMs: number }[];
}

function parseHeartRate(data: unknown): HeartRateMessage | null {
  if (typeof data !== 'string') return null;

  try {
    const msg = JSON.parse(data);
    const bpm = Number(msg?.bpm);
    if (!Number.isFinite(bpm) || typeof msg?.hrTime !== 'string') return null;

    return {
      polarDevID: msg.polarDevID ?? null,
      hrTime: msg.hrTime,
      bpm,
      contact: msg.contact === 0 ? 0 : 1,
      rrIntervals: Array.isArray(msg.rrIntervals) ? msg.rrIntervals : []
    };
  } catch {
    return null;
  }
}

export function connectHeartRate(
  onHeartRate: (message: HeartRateMessage) => void
): () => void {
  let socket: WebSocket | undefined;
  let reconnectTimer: ReturnType<typeof setTimeout> | undefined;
  let stopped = false;

  function connect() {
    if (stopped) return;

    socket = new WebSocket('ws://localhost:8765');

    socket.onmessage = (event) => {
      const message = parseHeartRate(event.data);

      if (message !== null) {
        onHeartRate(message);
      } else {
        console.warn('Unbekanntes Herzfrequenz-Format:', event.data);
      }
    };

    socket.onclose = () => {
      if (!stopped) {
        reconnectTimer = setTimeout(connect, 2000);
      }
    };

    socket.onerror = () => {
      socket?.close();
    };
  }

  connect();

  return () => {
    stopped = true;

    if (reconnectTimer !== undefined) {
      clearTimeout(reconnectTimer);
    }

    socket?.close();
  };
}
