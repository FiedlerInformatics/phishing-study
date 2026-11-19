<svelte:head>
  <link rel="icon" href="/favicon.svg"/>
</svelte:head>

<script lang="ts">
  import './app.css';

  import {onMount } from 'svelte'
  import { hr } from '$lib/hrState.svelte.js';
  import { startTask, endTask } from '$lib/api';
  import { startTaskTracking, stopTaskTracking, trackDragStart, trackDrop, trackDragEnd } from '$lib/tracker';
  import { FOLDER_ID, BUTTON_ID, linkElementID } from '$lib/uiElements';
  import {goto} from '$app/navigation';

  import email_warning from './assets/email-warning-icon.svg'
  import inbox_icon from './assets/inbox-icon.svg'
  import mail_alert_icon from './assets/mail-alert-icon.svg'
  import mail_icon from './assets/mail-icon.svg'
  import send_email_icon from './assets/send-email-icon.svg'
  import trash_icon from './assets/trash-icon.svg'
  import archive_icon from './assets/archive-icon.svg'
  import notes_icon from './assets/notes-icon.svg'
  import tag_icon from './assets/tag-icon.svg'
  import star_icon from './assets/star-icon.svg'
  import importantMail_icon from './assets/important_mail-icon.svg'

  import emailsRaw from '$lib/emails.json'

  import Button_start from '$lib/components/Button_start.svelte';
  import {timer} from '$lib/timer.svelte'

  // Set A = stressless-Task (emails.json, Feld "set")
  let emails = $state(emailsRaw.filter(e => e.set === 'A').map(e => ({ ...e })))
  let selectedEmail = $state(null)
  let activeFolder = $state('inbox')

  //Timer
  const DURATION_MS = 2 * 60 * 1000;

  let { sessionId } = $props();
  let remaining = $state(DURATION_MS);

  let running = $state(false);
  let intervalId: ReturnType<typeof setInterval> | undefined;
  let deadline = 0;

  const formatted = $derived(() => {
    const m  = Math.floor(remaining / 60000);
    const s  = Math.floor((remaining % 60000) / 1000);
    const ms = Math.floor(remaining % 1000);
    return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}:${String(ms).padStart(3,'0')}`;
  });

  const isFinalCountdown = $derived(remaining < 60000 && running);
  const isFirstWarning = $derived(remaining < 1.5 * 60000 && running)

  // TASK anlegen -> Tracking starten -> Timer starten.
  // Ohne taskID (Server nicht erreichbar) startet der Task nicht.
  let taskID: number | null = null;
  let startError = $state('');

  onMount(() => {
    let mounted = true;

    startTask('stressless')
      .then((id) => {
        if (!mounted) return;
        taskID = id;
        startTaskTracking(id);
        start();
      })
      .catch((err) => {
        console.error(err);
        startError = 'The task could not be started. Please inform the study leader.';
      });

    return () => {
      mounted = false;
      stopTaskTracking();
      if (intervalId !== undefined) {
        clearInterval(intervalId);
      }
    };
  });

  /** Timer abgelaufen: Tracking abschließen, taskEnd speichern, weiter zum NASA-TLX. */
  async function finishTask() {
    await stopTaskTracking();
    if (taskID !== null) {
      try {
        await endTask(taskID);
      } catch (err) {
        console.error(err);
      }
    }
    goto('/introductions_routes/NASA-TLX_intro-route?condition=stressless');
  }


  function start() {
    if (running || taskID === null) return;
    running = true;

    // Feste Deadline statt Tick-Zählung: setInterval wird vom Browser gedrosselt
    // (Hintergrund-Tab, ausgelasteter Main-Thread), die Dauer bleibt so trotzdem exakt.
    deadline = Date.now() + DURATION_MS;

    intervalId = setInterval(() => {
      remaining = Math.max(0, deadline - Date.now());

      if (remaining <= 0) {
        remaining = 0;
        clearInterval(intervalId);
        running = false;

        finishTask();
      }
    }, 10);
  }

  /** @param {typeof emails[0]} email */
  function selectEmail(email) {
    selectedEmail = email
    email.read = true
  }

  /** @param {string} folder */
  function selectFolder(folder) {
    activeFolder = folder
    selectedEmail = null
  }

  let visibleEmails = $derived(emails.filter(e => e.folder === activeFolder))

  /** @param {string} isoString */
  function formatTime(isoString) {
    const date = new Date(isoString)
    const today = new Date()
    const isToday = date.toDateString() === today.toDateString()
    return isToday
      ? date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
      : date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: '2-digit' })
  }

  let draggedEmail = $state(null)

  function onDragStart(e, email) {
    draggedEmail = email
    trackDragStart(e, email.id, FOLDER_ID[email.folder])
  }

  function onDragEnd() {
    trackDragEnd()          // nur wirksam, wenn vorher kein gültiger Drop kam
    draggedEmail = null
  }

  function onDrop(e, folder) {
    if (!draggedEmail) return
    trackDrop(e, FOLDER_ID[folder])
    draggedEmail.folder = folder
    if (selectedEmail?.id === draggedEmail.id && folder !== activeFolder) {
      selectedEmail = null
    }
    draggedEmail = null
  }

</script>

<div class="email-app">
  <div class="container">

    <section class="top">
        <div class="top_title">
          <h1>Outmail</h1>
          <img class="top_icon" src={mail_icon} alt="mail logo">
        </div>
        {#if startError}
          <p class="task_error" role="alert">{startError}</p>
        {/if}
    </section>

    <section class="tool_sidebar">
      <div
        id="inbox"
        data-ui-element={FOLDER_ID.inbox}
        class="sidebar_item"
        class:active={activeFolder === 'inbox'}
        role="button"
        tabindex="0"
        onclick={() => selectFolder('inbox')}
        onkeydown={e => e.key === 'Enter' && selectFolder('inbox')}

        class:drop_target={draggedEmail != null}
        ondragover={(e) => e.preventDefault()}
        ondrop={(e) => onDrop(e, 'inbox')}
      >
        <img class="icon" src={inbox_icon} alt="" aria-hidden="true">
        <h4>Inbox</h4>
      </div>

      <div
        id="important"
        data-ui-element={FOLDER_ID.important}
        class="sidebar_item"
        class:active={activeFolder === 'important'}
        role="button"
        tabindex="0"
        onclick={() => selectFolder('important')}
        onkeydown={e => e.key === 'Enter' && selectFolder('important')}
        
        class:drop_target={draggedEmail != null}
        ondragover={(e) => e.preventDefault()}
        ondrop={(e) => onDrop(e, 'important')}
      >
        <img class="icon" src={importantMail_icon} alt="" aria-hidden="true">
        <h4>Important</h4>
      </div>

      <div
        id="spam"
        data-ui-element={FOLDER_ID.spam}
        class="sidebar_item"
        class:active={activeFolder === 'spam'}
        role="button"
        tabindex="0"
        onclick={() => selectFolder('spam')}
        onkeydown={e => e.key === 'Enter' && selectFolder('spam')}

        class:drop_target={draggedEmail != null}
        ondragover={(e) => e.preventDefault()}
        ondrop={(e) => onDrop(e, 'spam')}
      >
        <img class="icon" src={email_warning} alt="" aria-hidden="true">
        <h4>Spam</h4>
      </div>

      <div
        id="neutral"
        data-ui-element={FOLDER_ID.neutral}
        class="sidebar_item"
        class:active={activeFolder === 'neutral'}
        role="button"
        tabindex="0"
        onclick={() => selectFolder('neutral')}
        onkeydown={e => e.key === 'Enter' && selectFolder('neutral')}
        
        class:drop_target={draggedEmail != null}
        ondragover={(e) => e.preventDefault()}
        ondrop={(e) => onDrop(e, 'neutral')}
      >
        <img class="icon" src={mail_icon} alt="" aria-hidden="true">
        <h4>Neutral</h4>
      </div>

      <div
        id="bin"
        data-ui-element={FOLDER_ID.bin}
        class="sidebar_item"
        class:active={activeFolder === 'bin'}
        role="button"
        tabindex="0"
        onclick={() => selectFolder('bin')}
        onkeydown={e => e.key === 'Enter' && selectFolder('bin')}

        class:drop_target={draggedEmail != null}
        ondragover={(e) => e.preventDefault()}
        ondrop={(e) => onDrop(e, 'bin')}

      >
        <img class="icon" src={trash_icon} alt="" aria-hidden="true">
        <h4>Bin</h4>
      </div>

      <div
        id="sent"
        data-ui-element={FOLDER_ID.sent}
        class="sidebar_item"
        class:active={activeFolder === 'sent'}
        role="button"
        tabindex="0"
        onclick={() => selectFolder('sent')}
        onkeydown={e => e.key === 'Enter' && selectFolder('sent')}
      >
        <img class="icon" src={send_email_icon} alt="" aria-hidden="true">
        <h4>Sent</h4>
      </div>
     
      <div
        id="archive"
        data-ui-element={FOLDER_ID.archive}
        class="sidebar_item"
        class:active={activeFolder === 'archive'}
        role="button"
        tabindex="0"
        onclick={() => selectFolder('archive')}
        onkeydown={e => e.key === 'Enter' && selectFolder('archive')}

        class:drop_target={draggedEmail != null}
        ondragover={(e) => e.preventDefault()}
        ondrop={(e) => onDrop(e, 'archive')}
      >
        <img class="icon" src={archive_icon} alt="" aria-hidden="true">
        <h4>Archive</h4>
      </div>

      <div
        id="notes"
        data-ui-element={FOLDER_ID.notes}
        class="sidebar_item"
        class:active={activeFolder === 'notes'}
        role="button"
        tabindex="0"
        onclick={() => selectFolder('notes')}
        onkeydown={e => e.key === 'Enter' && selectFolder('notes')}
      >
        <img class="icon" src={notes_icon} alt="" aria-hidden="true">
        <h4>Notes</h4>
      </div>

      <div
        id="tags"
        data-ui-element={FOLDER_ID.tags}
        class="sidebar_item"
        class:active={activeFolder === 'tags'}
        role="button"
        tabindex="0"
        onclick={() => selectFolder('tags')}
        onkeydown={e => e.key === 'Enter' && selectFolder('tags')}
      >
        <img class="icon" src={tag_icon} alt="" aria-hidden="true">
        <h4>Tags</h4>
      </div>
    </section>

    <section class="email_window">

      <ul class="email_list" role="list">
        {#each visibleEmails as email (email.id)}
          <li
            class="email_row"
            class:selected={selectedEmail?.id === email.id}
            class:unread={!email.read}
            data-ui-element={email.id}
            draggable="true"
            ondragstart={(e) => onDragStart(e, email)}
            ondragend={onDragEnd}
            role="button"
            tabindex="0"
            onclick={() => selectEmail(email)}
            onkeydown={e => e.key === 'Enter' && selectEmail(email)}
          >
            <div class="email_row_top">
              <span class="email_sender">{email.sender}</span>
              <span class="email_time">{formatTime(email.timestamp)}</span>
            </div>
            <div class="email_row_bottom">
              <span class="email_subject">{email.subject}</span>
              <span class="email_preview">{email.preview}</span>
            </div>
          </li>
        {/each}

        {#if visibleEmails.length === 0}
          <li class="email_empty">Keine E-Mails in diesem Ordner.</li>
        {/if}
      </ul>

      <div class="email_detail_pane">
        {#if selectedEmail}
          <article class="email_detail">
            <header class="email_detail_header">
              <h2 class="email_detail_subject">{selectedEmail.subject}</h2>
              <p class="email_detail_meta">
                <strong>Von:</strong> {selectedEmail.sender}
              </p>
              <p class="email_detail_meta">
                <strong>Datum:</strong>
                {new Date(selectedEmail.timestamp).toLocaleString('de-DE')}
              </p>
            </header>
            <hr class="email_detail_divider">
            <div class="email_detail_body">
              {#each selectedEmail.body as part}
                {#if part.type === 'paragraph'}
                  <p class="body_paragraph">{part.text}</p>
                {:else if part.type === 'link'}
                  <a
                    class="body_link"
                    data-ui-element={linkElementID(selectedEmail.id)}
                    href={part.href}
                    onclick={(e) => {
                      e.preventDefault()
                    }}
                  >
                    {part.text}
                  </a>
                {:else if part.type === 'image'}
                  <img
                    class="body_image"
                    src={part.src}
                    alt={part.alt}
                    width={part.width ?? 'auto'}
                  >
                  {:else if part.type === 'iframe'}
                    <iframe
                      class="body_iframe"
                      src={part.src}
                      title={part.alt ?? ''}
                      width={part.width ?? 950}
                      height={part.height ?? 420}
                      sandbox="allow-scripts allow-same-origin"
                      scrolling="yes"
                    ></iframe>
                {/if}
              {/each}
            </div>
          </article>
        {:else}
          <p class="email_placeholder">Wählen Sie eine E-Mail aus der Liste aus.</p>
        {/if}
      </div>

    </section>

  </div>
</div>