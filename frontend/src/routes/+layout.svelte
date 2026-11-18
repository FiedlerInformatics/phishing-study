<script>
  import { onMount } from 'svelte';
  import { connectHeartRate } from '$lib/heartRate';
  import { startHrRecording, recordHr } from '$lib/hrRecorder';
  import { hr } from '$lib/hrState.svelte.js';

  let { children } = $props();

  // Die einzige HR-Verbindung der Studie: main.py baut pro WebSocket-Client
  // eine eigene Bluetooth-Verbindung zum Gurt auf.
  // Gespeichert wird in hrRecorder.js, sobald ein Teilnehmer angelegt ist.
  onMount(() => {
    const stopRecording = startHrRecording();
    const disconnect = connectHeartRate((message) => {
      if (message.bpm > 0) hr.bpm = message.bpm;   // Anzeige (Stress-Warnung im Task)
      recordHr(message);
    });
    return () => { disconnect(); stopRecording(); };
  });
</script>

{@render children()}
