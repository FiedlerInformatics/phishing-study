<script>
  import { onMount } from 'svelte';
  import { connectHeartRate } from '$lib/heartRate';
  import { startHrRecording, recordHr } from '$lib/hrRecorder';
  import { hr } from '$lib/hrState.svelte.js';

  let { children } = $props();

  // Die einzige HR-Verbindung der Studie (Tasks lesen nur hr.bpm).
  // Gespeichert wird in hrRecorder.js, solange ein Teilnehmer angelegt ist:
  // von grand_intro (createParticipant) bis zur End-Seite (clearParticipantID),
  // also über alle Tasks und Fragebögen hinweg.
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
