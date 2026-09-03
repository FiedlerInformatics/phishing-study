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
    <h1>Welcome to the Study</h1>
  </header>

  <main class="content">
    <section class="content_box">
      <h2>About this study</h2>
      <p>
        This study examines how people assess and handle emails in a simulated
        inbox. In particular, we are interested in how participants recognize
        potentially fraudulent or phishing emails and make decisions about them.
      </p>
      <p>
        There are no right or wrong answers. Please work independently and make
        the decisions that best reflect your own judgement.
      </p>
    </section>

    <section class="content_box">
      <h2>What you will do</h2>
      <ol>
        <li>Complete a short demographic questionnaire.</li>
        <li>Work through the simulated email inbox and assess the messages shown there.</li>
        <li>Answer short questionnaires about your experience after the task.</li>
      </ol>
    </section>

    <section class="content_box">
      <h2>Before you begin</h2>
      <p>
        Read each instruction carefully and answer all questions as accurately as
        possible. During the email task, use the available time to inspect the
        messages and decide how you would normally handle them. Do not ask other
        people for help while completing the study.
      </p>
    </section>

    <section class="content_box next_step">
      <h2>First step</h2>
      <p>
        The link below opens the demographic questionnaire. Please enter your
        answers, complete every field, and select <strong>Submit</strong> to
        continue to the next part of the study.
      </p>
      <a
        class="action-link"
        href="/survey_demographic_link"
      > Open the demographic questionnaire
      </a>
    </section>
  </main>
</div>
