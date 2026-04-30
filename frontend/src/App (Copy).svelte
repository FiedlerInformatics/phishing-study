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
    <div>
      <h1>Outmail</h1>
      <img src={mail_icon} alt="mail icon">
    </div>
  </section>

  <section class="tool_sidebar">
    <div id="inbox">
      <h4>Inbox</h4>
      <img src={mail_icon} alt="mail icon">
    </div>
    <div id="junk">
      <h4>Junk Email</h4>
      <img src={mail_alert_icon} alt="junk email">
    </div>
    <div id="starred">
      <h4>Starred</h4>
      <img src={mail_alert_icon} alt="junk email">
    </div>
    <div id="drafts">
      <h4>Drafts</h4>
    </div>
    <div id="sent_items">
      <h4>Sent items</h4>
    </div>
    <div id="deleted">
      <h4>Deleted</h4>
    </div>
    <div id="archive">
      <h4>Archive</h4>
    </div>
    <div id="notes">
      <h4>notes</h4>
    </div>
    <div class="tags">
      <h4>notes</h4>
    </div>
  </section>

  <section class="email_window">
    <div>
      <h2>Your Current mail</h2>
    </div>
  </section>
</div>