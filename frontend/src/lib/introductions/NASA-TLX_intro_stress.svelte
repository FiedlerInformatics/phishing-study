<script>
  import { page } from '$app/state';

  const condition = $derived(
      page.url.searchParams.get('condition')
  );
</script>

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
    <h1>NASA-TLX Introduction</h1>
  </header>

  <main class="content">
    <section class="content_box">
        <p>
            Thank you for participating in the second practical task of the study.<br>
            In the next step, you will be asked to complete another short questionnaire about your experience with the task.<br>
            Those are the same questions as after the first email task.<br>
        </p> 
        
        <h3>Task Load Index Assessment</h3>

        <p>
            The Official NASA Task Load Index (TLX) is a subjective workload assessment tool developed by Human Systems Integration Division researchers.
            This tool allows users to perform subjective workload assessments on operator(s) working with various human-machine interface systems.
        
            By incorporating a multi-dimensional rating procedure,
            NASA TLX derives an overall workload score based on a weighted average of ratings on six subscales: 
        </p>
        <ul>
            <li>Mental Demand</li>
            <li>Physical Demand</li>
            <li>Temporal Demand</li>
            <li>Performance</li>
            <li>Effort</li>
            <li>Frustration</li>
        </ul>
        <p>
            There are no right or wrong answers. Please work independently and make
            the decisions that best reflect your own judgement.<br>
            <br>
            Think about the differences between the first and second practical email task and how you experienced the change in the stress level.
        </p>
    </section>

    <section class="content_box next_step">
        <h2>First step</h2>
        <p>
            The link below opens the second NASA-TLX questionnaire. Please enter your
            answers, complete every field, and select <strong>Submit</strong> to
            continue to the next part of the study.
        </p>
        <a
            class="action-link"
            href="/surveys_routes/NASA-TLX_survey-route?condition=stress"
            > Open the NASA-TLX questionnaire</a>
    </section>
  </main>
</div>
