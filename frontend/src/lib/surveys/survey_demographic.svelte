
<script>

  //import {navigate} from "svelte-routing";
  import {goto} from '$app/navigation';
  import { submitResponses } from '$lib/api';

  const startedAt = Date.now();
  let saveError = '';
  let saving = false;

  let gender = '';
  let age = '';
  let educationLevel = '';
  let occupation = '';
  let field_of_study = '';
  let industry = ''
  let native_language = ''
  let native_language_other = ''

  // Resolved value: the free-text entry when "Other" is selected, otherwise the dropdown choice
  $: resolved_native_language =
    native_language === 'Other' ? native_language_other : native_language;

  let showValidationWarning = false;
  let invalidFields = [];

  function isEmpty(value) {
    return (
      value === '' ||
      value === null ||
      value === undefined ||
      (typeof value === 'string' && value.trim() === '')
    );
  }

  async function validateForm(event) {

    if (event) event.preventDefault();

    const fields = [
      { value: gender, id: 'gender_id' },
      { value: age, id: 'age_id' },
      { value: educationLevel, id: 'education_level_id' },
      { value: occupation, id: 'occupation_id' },
      { value: field_of_study, id: 'studyfield_id' },
      { value: industry, id: 'industry_id' },
      { value: resolved_native_language, id: 'native_language_id' }
    ];

    invalidFields = fields.filter((field) => isEmpty(field.value)).map((field) => field.id);

    showValidationWarning = invalidFields.length > 0;

    if (invalidFields.length > 0 || saving) return false;

    saving = true;
    saveError = '';
    try {
      await submitResponses('demographic', 'main', {
        gender,
        age,
        education_level: educationLevel,
        occupation,
        field_of_study,
        industry,
        native_language: resolved_native_language
      }, startedAt);
      goto('/introductions_routes/task-stressless_intro-route');
      return true;
    } catch (e) {
      console.error(e);
      saveError = 'Your answers could not be saved. Please inform the study leader.';
      saving = false;
      return false;
    }
  }

</script>
<style>
  * {
    font-family: Arial, sans-serif;
  }
  h1 {
    font-size: 2.75rem;
  }
  h2 {
    font-size: 1.75rem;
  }

  .quest_box p {
    margin: -0.5rem 0 0.75rem;
    font-size: 0.9rem;
    color: #555;
  }
  .page {
    display: grid;
    min-height: 100vh;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: 1fr 9fr;
    background-color: #E6E6E7;
  }

  .top {
    grid-column: 2;
    grid-row: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .quest {
    grid-column: 2;
    grid-row: 2;
    box-sizing: border-box;
    padding: 0 1rem 5rem;
  }

  .quest_box {
    background-color: #c7c7c7;
    border-radius: 3.5px;
    padding: 1rem;
    margin: 1rem 0;
  }

  input {
    size: 2rem;
  }

  optgroup {
    font-weight: bold;
    font-size: 1rem;
  }

  input[type="radio"] {
    margin-right: -1px;
    vertical-align: middle;
  }

  .quest_box label {
    display: block;
  }

  .quest_box input:not([type="radio"]),
  .quest_box select {
    box-sizing: border-box;
    border-radius: 3.5px;
    border-width: 0.15rem;
    width: 100%;
    min-height: 1.75rem;
    padding: 0.5rem 0.75rem;
    font-size: 0.85rem;
  }

  #submit_box {
    background-color: #E6E6E7;
    margin-top: 2rem;
  }

  #submit_box input[type="submit"] {
    background-color: #494949;
    font-size: 1.5rem;
    color: white;
    border-color: black;
    height: 3.5rem;
  }

  h2.invalid {
    color: #b00020;
  }

  .quest_box.invalid {
    border: 2px solid #b00020;
    background-color: #f5c2c2;
  }

  .validation-warning {
    color: #b00020;
    font-weight: bold;
    font-size: 1rem;
    text-align: center;
    margin-bottom: 0.75rem;
  }

</style>

<div class="page">

  <div class = "top">
    <h1>Demographic Questionnaire</h1>
  </div>

<!------------------------- GENDER -------------------------------------------------------------------->
  
  <div class = "quest">

    <div class="quest_box" class:invalid={invalidFields.includes('gender_id')}>
      <h2 id="gender_id" class:invalid={invalidFields.includes('gender_id')}>Gender</h2>
      <form id="gender_input">
        <label>
          <input type="radio" name="answer" value="male" bind:group={gender}/>
          Male
          </label>

          <label>
          <input type="radio" name="answer" value="female" bind:group={gender} />
          Female
        </label>

        <label>
        <input type="radio" name="answer" value="other" bind:group={gender} />
        Other
        </label>
      </form>
    </div>

<!------------------------- AGE -------------------------------------------------------------------->

    <div class="quest_box" class:invalid={invalidFields.includes('age_id')}>
      <h2 id="age_id" class:invalid={invalidFields.includes('age_id')}>Age</h2>
      <form id="age_input">
        <input type="number" min="18" max="99" bind:value={age} />
      </form>
    </div>

<!------------------------- EDUCATION -------------------------------------------------------------------->

    <div class="quest_box" class:invalid={invalidFields.includes('education_level_id')}>

      <h2 id="education_level_id" class:invalid={invalidFields.includes('education_level_id')}>Education Level</h2>
      
      <form id="education_input">
        <select bind:value={educationLevel}>
        <optgroup>
          <option value="" disabled>Select an education level</option>
          <option value="No education">No education</option>
          <option value="Primary school">Primary school (Grundschule)</option>
          <option value="Lower secondary school">Lower secondary school (Hauptschulabschluss)</option>
          <option value="Intermediate secondary school">Intermediate secondary school (Realschule)</option>
          <option value="University of applied sciences entrance qualification">University of applied sciences entrance qualification (Fachhochschulreife)</option>
          <option value="University entrance qualification">University entrance qualification (Abitur)</option>
          <option value="Bachelor">Bachelor degree</option>
          <option value="Master">Master's Degree / Diplom / Staatsexamen</option>
          <option value="PhD">Doctorate / PhD</option>
          <option value="Other">Other</option>
        </optgroup>
        </select>
      </form>
    </div>
    
<!--------------------------- OCCUPATION --------------------------------------------------------------->

 <div class="quest_box" class:invalid={invalidFields.includes('occupation_id')}>

      <h2 id="occupation_id" class:invalid={invalidFields.includes('occupation_id')}>Occupation</h2>
      <p>Please select the option that best describes your current main occupation.</p>

      <form id="occupation_input">
        <select bind:value={occupation}>
        <optgroup>
          <option value="" disabled>Select an occupation level</option>
          <option value="Student">Student</option>
          <option value="Full time employment">Full time employment</option>
          <option value="Part time emplyoment">Part time employment</option>
          <option value="Self employed">Self employed</option>
          <option value="Vocational training / apprenticeship" >Vocational training / apprenticeship</option>
          <option value="Unemployed">Unemployed</option>
          <option value="Retired">Retired</option>
          <option value="Other">Other</option>
          <option value="Prefer not to say">Prefer not to say</option>
          </optgroup>
        </select>
      </form>
    </div>

<!--------------------------- FIELD OF STUDY ----------------------------------------->

 <div class="quest_box" class:invalid={invalidFields.includes('field_of_study_id')}>
 
      <h2 id="field_of_study_id" class:invalid={invalidFields.includes('field_of_study_id')}>Field of study</h2>
      <p>If you are a student, please select the field that best matches your study program.</p>

      <form id="field_of_study_input">
        <select bind:value={field_of_study}>
        <optgroup>
          <option value="" disabled>Select an field of study</option>
          <option value="Information technology and telecommunications">Information technology and telecommunications</option>
          <option value="Media and publishing">Media and publishing</option>
          <option value="Finance and insurance">Finance and insurance</option>
          <option value="Manufacturing, energy and construction">Manufacturing, energy and construction</option>
          <option value="Trade, transport and hospitality">Trade, transport and hospitality</option>
          <option value="Professional, scientific and business services">Professional, scientific and business services (e.g., consulting, law, research, real estate)</option>
          <option value="Public administration">Public administration</option>
          <option value="Education">Education</option>
          <option value="Health and social work">Health and social work</option>
          <option value="Other">Other</option>
          </optgroup>
        </select>
      </form>
    </div>

<!--------------------------- INDUSTRY ----------------------------------------->

    <div class="quest_box" class:invalid={invalidFields.includes('industry_id')}>

      <h2 id="industry_id" class:invalid={invalidFields.includes('industry_id')}>Industry</h2>
      <p>If not a student, in which industry do you mainly work?</p>

      <form id="industry_input">
        <select bind:value={industry}>
        <optgroup>
          <option value="" disabled>Select an industry</option>
          <option value="Information technology and telecommunications">Information technology and telecommunications</option>
          <option value="Media and publishing">Media and publishing</option>
          <option value="Finance and insurance">Finance and insurance</option>
          <option value="Manufacturing, energy and construction">Manufacturing, energy and construction</option>
          <option value="Trade, transport and hospitality">Trade, transport and hospitality</option>
          <option value="Professional, scientific and business services">Professional, scientific and business services (e.g., consulting, law, research, real estate)</option>
          <option value="Public administration">Public administration</option>
          <option value="Education">Education</option>
          <option value="Health and social work">Health and social work</option>
          <option value="Other">Other</option>
          <option value="Prefer not to say">Prefer not to say</option>
          </optgroup>
        </select>
      </form>
    </div>

<!--------------------------- NATIVE LANGUAGE ----------------------------------------->

    <div class="quest_box" class:invalid={invalidFields.includes('native_language_id')}>

      <h2 id="native_language_id" class:invalid={invalidFields.includes('native_language_id')}>Native language</h2>
      <p>What is your native language</p>

      <form id="native_language_input" on:submit|preventDefault>
        <select bind:value={native_language}>
        <optgroup>
          <option value="" disabled>Select your native language</option>
          <option value="English">English</option>
          <option value="German">German</option>
          <option value="Other">Other</option>
          </optgroup>
        </select>

        {#if native_language === 'Other'}
          <input
            type="text"
            placeholder="Please enter your native language"
            bind:value={native_language_other}
          />
        {/if}
      </form>
    </div>


    <div class="quest_box" id="submit_box">

      {#if showValidationWarning}
        <div class="validation-warning">
          Please fill out all fields before submitting the survey
        </div>
      {/if}
      {#if saveError}
        <div class="validation-warning">{saveError}</div>
      {/if}

      <input
        type="submit"
        value="Submit"
        disabled={saving}
        on:click|preventDefault={validateForm}
      />

    </div>    

  </div>
</div>
