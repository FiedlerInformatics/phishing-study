<script>
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

  import emailsRaw from './lib/emails.json'

  let emails = $state(emailsRaw.map(e => ({ ...e })))
  let selectedEmail = $state(null)
  let activeFolder = $state('inbox')

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

  function onDragStart(email) {
    draggedEmail = email
  }

  function onDrop(folder) {
    if (!draggedEmail) return
    draggedEmail.folder = folder
    if (selectedEmail?.id === draggedEmail.id && folder !== activeFolder) {
      selectedEmail = null
    }
    draggedEmail = null
  }

</script>

<link rel="icon" href="./assets/email_assets/favicon.svg"/>

<div class="container">

  <section class="top">
    <div class="top_title">
      <h1>Outmail</h1>
      <img class="top_icon" src={mail_icon} alt="mail logo">
    </div>
  </section>

  <section class="tool_sidebar">
    <div
      id="inbox"
      class="sidebar_item"
      class:active={activeFolder === 'inbox'}
      role="button"
      tabindex="0"
      onclick={() => selectFolder('inbox')}
      onkeydown={e => e.key === 'Enter' && selectFolder('inbox')}

      class:drop_target={draggedEmail != null}
      ondragover={(e) => e.preventDefault()}
      ondrop={() => onDrop('inbox')}
    >
      <img class="icon" src={inbox_icon} alt="" aria-hidden="true">
      <h4>Inbox</h4>
    </div>

    <div
      id="junk"
      class="sidebar_item"
      class:active={activeFolder === 'junk'}
      role="button"
      tabindex="0"
      onclick={() => selectFolder('junk')}
      onkeydown={e => e.key === 'Enter' && selectFolder('junk')}
      
      class:drop_target={draggedEmail != null}
      ondragover={(e) => e.preventDefault()}
      ondrop={() => onDrop('junk')}
    >
      <img class="icon" src={email_warning} alt="" aria-hidden="true">
      <h4>Junk Email</h4>
    </div>

    <div
      id="starred"
      class="sidebar_item"
      class:active={activeFolder === 'starred'}
      role="button"
      tabindex="0"
      onclick={() => selectFolder('starred')}
      onkeydown={e => e.key === 'Enter' && selectFolder('starred')}

      class:drop_target={draggedEmail != null}
      ondragover={(e) => e.preventDefault()}
      ondrop={() => onDrop('starred')}
    >
      <img class="icon" src={star_icon} alt="" aria-hidden="true">
      <h4>Starred</h4>
    </div>

    <div
      id="drafts"
      class="sidebar_item"
      class:active={activeFolder === 'drafts'}
      role="button"
      tabindex="0"
      onclick={() => selectFolder('drafts')}
      onkeydown={e => e.key === 'Enter' && selectFolder('drafts')}
      
      class:drop_target={draggedEmail != null}
      ondragover={(e) => e.preventDefault()}
      ondrop={() => onDrop('drafts')}
    >
      <img class="icon" src={mail_alert_icon} alt="" aria-hidden="true">
      <h4>Drafts</h4>
    </div>

    <div
      id="sent_items"
      class="sidebar_item"
      class:active={activeFolder === 'sent'}
      role="button"
      tabindex="0"
      onclick={() => selectFolder('sent')}
      onkeydown={e => e.key === 'Enter' && selectFolder('sent')}

      class:drop_target={draggedEmail != null}
      ondragover={(e) => e.preventDefault()}
      ondrop={() => onDrop('send_items')}

    >
      <img class="icon" src={send_email_icon} alt="" aria-hidden="true">
      <h4>Sent items</h4>
    </div>

    <div
      id="deleted"
      class="sidebar_item"
      class:active={activeFolder === 'deleted'}
      role="button"
      tabindex="0"
      onclick={() => selectFolder('deleted')}
      onkeydown={e => e.key === 'Enter' && selectFolder('deleted')}

      class:drop_target={draggedEmail != null}
      ondragover={(e) => e.preventDefault()}
      ondrop={() => onDrop('deleted')}

    >
      <img class="icon" src={trash_icon} alt="" aria-hidden="true">
      <h4>Deleted</h4>
    </div>

    <div
      id="archive"
      class="sidebar_item"
      class:active={activeFolder === 'archive'}
      role="button"
      tabindex="0"
      onclick={() => selectFolder('archive')}
      onkeydown={e => e.key === 'Enter' && selectFolder('archive')}

      class:drop_target={draggedEmail != null}
      ondragover={(e) => e.preventDefault()}
      ondrop={() => onDrop('archive')}
    >
      <img class="icon" src={archive_icon} alt="" aria-hidden="true">
      <h4>Archive</h4>
    </div>

    <div
      id="notes"
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
          draggable="true"
          ondragstart={() => onDragStart(email)}
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
                  href={part.href}
                  onclick={(e) => {
                    e.preventDefault()
                    console.log({ type: 'link_clicked', href: part.href, emailId: selectedEmail.id, ts: Date.now() })
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
