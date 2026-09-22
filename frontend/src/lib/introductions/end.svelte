<style>
  * {
    font-family: Arial, Helvetica, sans-serif;
  }

  .page {
    display: grid;
    min-height: 100vh;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: 1fr 9fr;
    background-color: #e6e6e7;
  }

  .top {
    grid-column: 2;
    grid-row: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  h1 {
    margin: 0;
    font-size: 2.75rem;
  }

  .content {
    grid-column: 2;
    grid-row: 2;
    box-sizing: border-box;
    padding: 0 1rem 5rem;
  }

  .content_box {
    background-color: #c7c7c7;
    border-radius: 3.5px;
    padding: 1rem 1.25rem;
    margin: 1rem 0;
  }

  h2 {
    margin: 0 0 0.75rem;
    font-size: 1.75rem;
  }

  p,
  li {
    font-size: 1rem;
    line-height: 1.55;
  }

  p {
    margin: 0 0 0.75rem;
  }

  p:last-child {
    margin-bottom: 0;
  }

  ol {
    margin: 0;
    padding-left: 1.5rem;
  }

  li + li {
    margin-top: 0.5rem;
  }

  .next_step {
    background-color: #e6e6e7;
    margin-top: 2rem;
    text-align: center;
  }

  .action-link {
    display: inline-block;
    margin-top: 0.5rem;
    padding: 0.85rem 1.25rem;
    border: 0.15rem solid black;
    border-radius: 3.5px;
    background-color: #494949;
    color: white;
    font-size: 1.15rem;
    font-weight: bold;
    text-decoration: none;
  }

  .action-link:hover,
  .action-link:focus-visible {
    background-color: #303030;
  }

  .action-link:focus-visible {
    outline: 3px solid #0057d8;
    outline-offset: 3px;
  }

  @media (max-width: 700px) {
    .page {
      grid-template-columns: 1rem minmax(0, 1fr) 1rem;
      grid-template-rows: auto 1fr;
    }

    .top,
    .content {
      grid-column: 2;
    }

    .top {
      padding: 1.5rem 0 0.75rem;
    }

    h1 {
      font-size: 2rem;
    }

    .content {
      padding: 0 0 2rem;
    }
  }
</style>

<div class="page">
  <header class="top">
    <h1>End of the Study</h1>
  </header>

  <main class="content">
    <section class="content_box">
        <h2>Thank you for participating!</h2>
        <p>
        You have now completed all parts of this study. Before you go, we would like to tell you a bit more about what this study was actually investigating.
        </p>

        <p>
        Earlier, you were asked to imagine yourself as an assistant sorting emails into "important" and "unimportant." What we did not tell you at the time is that some of the emails in your inbox were phishing emails — fraudulent messages designed to look legitimate in order to steal information or trick the recipient into harmful actions.
        The actual goal of this study is to better understand how people recognize (or fail to recognize) phishing emails, and whether physiological stress indicators — such as your heart rate, which we measured throughout the tasks — are related to how well someone can detect these deceptive emails. We also tracked your mouse movements and click behavior during the email-sorting tasks for the same reason.
        We did not disclose this beforehand because knowing about phishing emails in advance would have changed how you approached the task, and made the results less representative of how people behave in everyday situations.
        Your data
        </p>
        <p>
        All data collected during this session (physiological, behavioral, and questionnaire responses) will be stored securely, analyzed anonymously, and used exclusively for the purposes of this research. [Placeholder: add specific details on data storage, anonymization procedure, and retention period as required by your institution's ethics guidelines.]
        Questions or concerns
        </p>
        <p>
        If you have any questions about the study, would like more information about phishing and how to protect yourself against it, or wish to withdraw your data from the study, please contact [Placeholder: your name/email] or [Placeholder: supervisor's name/email].
        </p>

        <p>
        Thank you again for your time and participation — your contribution helps advance research on human factors in cybersecurity.
        </p>
    </section>
  </main>
</div>
