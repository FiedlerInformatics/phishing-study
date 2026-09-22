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
      const heartRate = Number(event.data);

      if (Number.isFinite(heartRate) && heartRate > 0) {
        onHeartRate(heartRate);
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