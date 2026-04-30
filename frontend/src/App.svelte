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
</script>

<div class="container">
  <section class="top">
    <div class="top_title">
      <h1>Outmail</h1>
      <img class="top_icon" src={mail_icon} alt="" aria-hidden="true">
    </div>
  </section>

  <section class="tool_sidebar">
    <div id="inbox" class="sidebar_item">
      <img class="icon" src={inbox_icon} alt="" aria-hidden="true">
      <h4>Inbox</h4>
    </div>

    <div id="junk" class="sidebar_item">
      <img class="icon" src={email_warning} alt="" aria-hidden="true">
      <h4>Junk Email</h4>
    </div>

    <div id="starred" class="sidebar_item">
      <img class="icon" src={star_icon} alt="" aria-hidden="true">
      <h4>Starred</h4>
    </div>

    <div id="drafts" class="sidebar_item">
      <img class="icon" src={mail_alert_icon} alt="" aria-hidden="true">
      <h4>Drafts</h4>
    </div>

    <div id="sent_items" class="sidebar_item">
      <img class="icon" src={send_email_icon} alt="" aria-hidden="true">
      <h4>Sent items</h4>
    </div>

    <div id="deleted" class="sidebar_item">
      <img class="icon" src={trash_icon} alt="" aria-hidden="true">
      <h4>Deleted</h4>
    </div>

    <div id="archive" class="sidebar_item">
      <img class="icon" src={archive_icon} alt="" aria-hidden="true">
      <h4>Archive</h4>
    </div>

    <div id="notes" class="sidebar_item">
      <img class="icon" src={notes_icon} alt="" aria-hidden="true">
      <h4>Notes</h4>
    </div>

    <div id="tags" class="sidebar_item">
      <img class="icon" src={tag_icon} alt="" aria-hidden="true">
      <h4>Tags</h4>
    </div>
  </section>

  <section class="email_window">
    <div>
      <h2>Your Current mail</h2>
    </div>
  </section>
</div>