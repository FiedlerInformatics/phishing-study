<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { onNavigate } from '$app/navigation';
  import { page } from '$app/state';
  import { connectHeartRate } from '$lib/heartRate';
  import { startTracker, setPhase, trackHr } from '$lib/tracker';
  import { hr } from '$lib/hrState.svelte.js';

  let { children } = $props();

  // '/task_routes/task-stress-route' -> 'task-stress'
  // '/surveys_routes/NASA-TLX_survey-route?condition=stress' -> 'NASA-TLX_survey-stress'
  function phaseOf(url) {
    const base = url.pathname.split('/').at(-1).replace(/[-_]?route$/, '') || 'start';
    const condition = url.searchParams.get('condition');
    return condition ? `${base}-${condition}` : base;
  }

  // Die Phase muss gesetzt sein, BEVOR die neue Seite ihr onMount ausführt
  // (sonst landet z. B. task_start in der vorherigen Phase).
  // 1) erster Seitenaufruf / Neuladen: sofort beim Initialisieren des Layouts
  if (browser) setPhase(phaseOf(page.url));
  // 2) jede weitere Navigation: vor dem Rendern der neuen Seite
  onNavigate(({ to }) => {
    if (to) setPhase(phaseOf(to.url));
  });

  // Die einzige HR-Verbindung der Studie: main.py baut pro WebSocket-Client
  // eine eigene Bluetooth-Verbindung zum Gurt auf.
  onMount(() => {
    const stopTracker = startTracker();
    const disconnect = connectHeartRate((bpm) => {
      hr.bpm = bpm;
      trackHr(bpm);
    });
    return () => { disconnect(); stopTracker(); };
  });
</script>

{@render children()}
