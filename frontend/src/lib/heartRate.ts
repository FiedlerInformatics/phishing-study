/**
 * Liest den Pulswert aus einer WebSocket-Nachricht.
 * Akzeptiert eine reine Zahl ("94") oder JSON, z. B.
 * {"bpm": 94, "rr": [...], "contact": 1} bzw. {"heartRate": 94}.
 */
function parseHeartRate(data: unknown): number | null {
  if (typeof data !== 'string') return null;

  const direct = Number(data);
  if (Number.isFinite(direct)) return direct > 0 ? direct : null;

  try {
    const msg = JSON.parse(data);
    const value = Number(
      msg?.bpm ?? msg?.heartRate ?? msg?.heart_rate ?? msg?.hr ?? msg?.data?.bpm
    );
    return Number.isFinite(value) && value > 0 ? value : null;
  } catch {
    return null;
  }
}

export function connectHeartRate(
  onHeartRate: (heartRate: number) => void
): () => void {
  let socket: WebSocket | undefined;
  let reconnectTimer: ReturnType<typeof setTimeout> | undefined;
  let stopped = false;

  function connect() {
    if (stopped) return;

    socket = new WebSocket('ws://localhost:8765');

    socket.onmessage = (event) => {
      const heartRate = parseHeartRate(event.data);

      if (heartRate !== null) {
        onHeartRate(heartRate);
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
