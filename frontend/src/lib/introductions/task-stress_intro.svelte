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
    <h1>Welcome to the second practical task</h1>
  </header>

  <main class="content">
    
    <section class="content_box">
        <h3>Thank you for submitting your information</h3>

        <h2>Fictional scenario and task description</h2>

        <p>
            In the second part of the study, you will asked to complete the same practical task as in the first part.
            However, this time you will be asked to complete the task under different conditions.<br>
            <br>
            <b>The scenario will be the same as in the first practical task:</b><br>
            
            You take the role of an employee of a company.
            Your task will be to read through a set of emails of your manager and decide which emails are relevant for the business and which are not.<br>
            You will be asked to mark the relevant emails and deleting the irreleant ones by moving them into the corresponding folders.
            
            The emails will be presented to you in a simulated email client in which you can open and read the emails.
            <br><br>
            Please try to complete the task as quickly and accurately as possible.
        </p>

    </section>

    <section class="content_box next_step">
      <a
        class="action-link"
        href="/task_routes/task-stress-route">
        Start the second practical task
      </a>
    </section>

  </main>
</div>
