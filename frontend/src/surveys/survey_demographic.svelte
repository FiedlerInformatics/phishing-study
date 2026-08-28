<script>
  let gender = '';
  let age = '';
  let maritalStatus = '';
  let householdSize = '';
  let educationLevel = '';
  let vocationalEducation = '';
  let employmentStatus = '';
  let occupation = '';
  let income = '';
  let nationality = '';
  let migrationBackground = '';
  let region = '';

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

  function validateForm(event) {

    if (event) event.preventDefault();

    const fields = [
      { value: gender, id: 'gender_id' },
      { value: age, id: 'age_id' },
      { value: maritalStatus, id: 'marital_status_id' },
      { value: householdSize, id: 'household_size_id' },
      { value: educationLevel, id: 'education_level_id' },
      { value: vocationalEducation, id: 'vocational_education_id' },
      { value: employmentStatus, id: 'employment_status_id' },
      { value: occupation, id: 'occupation_id' },
      { value: income, id: 'income_id' },
      { value: nationality, id: 'nationality_id' },
      { value: migrationBackground, id: 'migration_background_id' },
      { value: region, id: 'region_id' }
    ];

    invalidFields = fields.filter((field) => isEmpty(field.value)).map((field) => field.id);

    console.log(invalidFields);
    console.log("---")
    console.log(gender, age, maritalStatus, householdSize, educationLevel, vocationalEducation, employmentStatus, occupation, income, nationality, migrationBackground, region);

    showValidationWarning = invalidFields.length > 0;

    return invalidFields.length === 0;
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

    <div class="quest_box" class:invalid={invalidFields.includes('age_id')}>
      <h2 id="age_id" class:invalid={invalidFields.includes('age_id')}>Age</h2>
      <form id="age_input">
        <input type="number" min="0" max="99" bind:value={age} />
      </form>
    </div>

    <div class="quest_box" class:invalid={invalidFields.includes('marital_status_id')}>
      <h2 id="marital_status_id" class:invalid={invalidFields.includes('marital_status_id')}>Marital Status</h2>
      <form id="marital_status_input">
        <label>
          <input type="radio" name="maritalStatus" value="Single" bind:group={maritalStatus} />
          Single
        </label>

        <label>
          <input type="radio" name="maritalStatus" value="Married" bind:group={maritalStatus} />
          Married
        </label>

        <label>
          <input type="radio" name="maritalStatus" value="Divorced" bind:group={maritalStatus} />
          Divorced
        </label>

        <label>
          <input type="radio" name="maritalStatus" value="Widowed" bind:group={maritalStatus} />
          Widowed
        </label>
      </form>
    </div>

    <div class="quest_box" class:invalid={invalidFields.includes('household_size_id')}>
      <h2 id="household_size_id" class:invalid={invalidFields.includes('household_size_id')}>Household Size</h2>
      <input type="number" min="0" bind:value={householdSize} />
    </div>

    <div class="quest_box" class:invalid={invalidFields.includes('education_level_id')}>
      <h2 id="education_level_id" class:invalid={invalidFields.includes('education_level_id')}>Education Level</h2>
      
      <form id="education_level_input">
        <select bind:value={educationLevel}>
        <optgroup>
          <option value="" disabled>Select an education level</option>
          <option value="No education">No education</option>
          <option value="Primary school">Primary school (Grundschule)</option>
          <option value="Lower secondary school">Lower secondary school (Hauptschulabschluss)</option>
          <option value="Intermediate secondary school">Intermediate secondary school (Realschule)</option>
          <option value="University of applied sciences entrance qualification">University of applied sciences entrance qualification (Fachhochschulreife)</option>
          <option value="University entrance qualification">University entrance qualification (Abitur)</option>
        </optgroup>
        </select>
      </form>
      
    </div>

    <div class="quest_box" class:invalid={invalidFields.includes('vocational_education_id')}>
      <h2 id="vocational_education_id" class:invalid={invalidFields.includes('vocational_education_id')}>Vocational education</h2>

      <form id="vocational_education_input">
        <input type="text" bind:value={vocationalEducation} />
      </form>
    </div>

    <div class="quest_box" class:invalid={invalidFields.includes('employment_status_id')}>

      <h2 id="employment_status_id" class:invalid={invalidFields.includes('employment_status_id')}>Employment Status</h2>
      <form id="employment_status_input">
        <input type="text" bind:value={employmentStatus} />
      </form>  
    </div>

    <div class="quest_box" class:invalid={invalidFields.includes('occupation_id')}>
      <h2 id="occupation_id" class:invalid={invalidFields.includes('occupation_id')}>Occupation</h2>

      <form id="occupation_input">
        <input type="text" bind:value={occupation} />
      </form>
    </div>

    <div class="quest_box" class:invalid={invalidFields.includes('income_id')}>
      <h2 id="income_id" class:invalid={invalidFields.includes('income_id')}>Income</h2>
      
      <form id="income_input">
        <input type="number" min="0" bind:value={income} />
      </form>
    </div>

    <div class="quest_box" class:invalid={invalidFields.includes('nationality_id')}>
      <h2 id="nationality_id" class:invalid={invalidFields.includes('nationality_id')}>Nationality</h2>

      <form id="nationality_id">
        <select bind:value={nationality}>
          <optgroup>
              <option value="Afghan">Afghan</option>
              <option value="Albanian">Albanian</option>
              <option value="Algerian">Algerian</option>
              <option value="American">American</option>
              <option value="Andorran">Andorran</option>
              <option value="Angolan">Angolan</option>
               <option value="Antiguan">Antiguan</option>
               <option value="Argentine">Argentine</option>
               <option value="Armenian">Armenian</option>
               <option value="Australian">Australian</option>
               <option value="Austrian">Austrian</option>
               <option value="Azerbaijani">Azerbaijani</option>
               <option value="Bahamian">Bahamian</option>
               <option value="Bahraini">Bahraini</option>
               <option value="Bangladeshi">Bangladeshi</option>
               <option value="Barbadian">Barbadian</option>
               <option value="Belarusian">Belarusian</option>
               <option value="Belgian">Belgian</option>
               <option value="Belizean">Belizean</option>
               <option value="Beninese">Beninese</option>
               <option value="Bhutanese">Bhutanese</option>
               <option value="Bolivian">Bolivian</option>
               <option value="Bosnian">Bosnian</option>
               <option value="Botswanan">Botswanan</option>
               <option value="Brazilian">Brazilian</option>
               <option value="British">British</option>
               <option value="Bruneian">Bruneian</option>
               <option value="Bulgarian">Bulgarian</option>
               <option value="Burkinabe">Burkinabe</option>
               <option value="Burundian">Burundian</option>
               <option value="Cambodian">Cambodian</option>
               <option value="Cameroonian">Cameroonian</option>
               <option value="Canadian">Canadian</option>
               <option value="Cape Verdean">Cape Verdean</option>
               <option value="Central African">Central African</option>
               <option value="Chadian">Chadian</option>
               <option value="Chilean">Chilean</option>
               <option value="Chinese">Chinese</option>
               <option value="Colombian">Colombian</option>
               <option value="Comorian">Comorian</option>
               <option value="Congolese (Democratic Republic of the Congo)">Congolese (Democratic Republic of the Congo)</option>
               <option value="Congolese (Republic of the Congo)">Congolese (Republic of the Congo)</option>
               <option value="Costa Rican">Costa Rican</option>
               <option value="Croatian">Croatian</option>
               <option value="Cuban">Cuban</option>
               <option value="Cypriot">Cypriot</option>
               <option value="Czech">Czech</option>
               <option value="Danish">Danish</option>
               <option value="Djiboutian">Djiboutian</option>
               <option value="Dominican (Dominica)">Dominican (Dominica)</option>
               <option value="Dominican (Dominican Republic)">Dominican (Dominican Republic)</option>
               <option value="Dutch">Dutch</option>
               <option value="Ecuadorian">Ecuadorian</option>
               <option value="Egyptian">Egyptian</option>
               <option value="Emirati">Emirati</option>
               <option value="Equatorial Guinean">Equatorial Guinean</option>
               <option value="Eritrean">Eritrean</option>
               <option value="Estonian">Estonian</option>
               <option value="Ethiopian">Ethiopian</option>
               <option value="Fijian">Fijian</option>
               <option value="Filipino">Filipino</option>
               <option value="Finnish">Finnish</option>
               <option value="French">French</option>
               <option value="Gabonese">Gabonese</option>
               <option value="Gambian">Gambian</option>
               <option value="Georgian">Georgian</option>
               <option value="German">German</option>
               <option value="Ghanaian">Ghanaian</option>
               <option value="Greek">Greek</option>
               <option value="Grenadian">Grenadian</option>
               <option value="Guatemalan">Guatemalan</option>
               <option value="Guinea-Bissauan">Guinea-Bissauan</option>
               <option value="Guinean">Guinean</option>
               <option value="Guyanese">Guyanese</option>
               <option value="Haitian">Haitian</option>
               <option value="Honduran">Honduran</option>
               <option value="Hungarian">Hungarian</option>
               <option value="Icelandic">Icelandic</option>
               <option value="Indian">Indian</option>
               <option value="Indonesian">Indonesian</option>
               <option value="Iranian">Iranian</option>
               <option value="Iraqi">Iraqi</option>
               <option value="Irish">Irish</option>
               <option value="Israeli">Israeli</option>
               <option value="Italian">Italian</option>
               <option value="Ivorian">Ivorian</option>
               <option value="Jamaican">Jamaican</option>
               <option value="Japanese">Japanese</option>
               <option value="Jordanian">Jordanian</option>
               <option value="Kazakh">Kazakh</option>
               <option value="Kenyan">Kenyan</option>
               <option value="Kiribati">Kiribati</option>
               <option value="Kittitian and Nevisian">Kittitian and Nevisian</option>
               <option value="Kuwaiti">Kuwaiti</option>
               <option value="Kyrgyz">Kyrgyz</option>
               <option value="Lao">Lao</option>
               <option value="Latvian">Latvian</option>
               <option value="Lebanese">Lebanese</option>
               <option value="Lesotho">Lesotho</option>
               <option value="Liberian">Liberian</option>
               <option value="Libyan">Libyan</option>
               <option value="Liechtensteiner">Liechtensteiner</option>
               <option value="Lithuanian">Lithuanian</option>
               <option value="Luxembourger">Luxembourger</option>
               <option value="Malagasy">Malagasy</option>
               <option value="Malawian">Malawian</option>
               <option value="Malaysian">Malaysian</option>
               <option value="Maldivian">Maldivian</option>
               <option value="Malian">Malian</option>
               <option value="Maltese">Maltese</option>
               <option value="Marshallese">Marshallese</option>
               <option value="Mauritanian">Mauritanian</option>
               <option value="Mauritian">Mauritian</option>
               <option value="Mexican">Mexican</option>
               <option value="Micronesian">Micronesian</option>
               <option value="Moldovan">Moldovan</option>
               <option value="Monegasque">Monegasque</option>
               <option value="Mongolian">Mongolian</option>
               <option value="Montenegrin">Montenegrin</option>
               <option value="Moroccan">Moroccan</option>
               <option value="Mozambican">Mozambican</option>
               <option value="Myanmar">Myanmar</option>
               <option value="Namibian">Namibian</option>
               <option value="Nauruan">Nauruan</option>
               <option value="Nepalese">Nepalese</option>
               <option value="New Zealander">New Zealander</option>
               <option value="Nicaraguan">Nicaraguan</option>
               <option value="Nigerian">Nigerian</option>
               <option value="Nigerien">Nigerien</option>
               <option value="North Korean">North Korean</option>
               <option value="North Macedonian">North Macedonian</option>
               <option value="Norwegian">Norwegian</option>
               <option value="Omani">Omani</option>
               <option value="Pakistani">Pakistani</option>
               <option value="Palauan">Palauan</option>
               <option value="Palestinian">Palestinian</option>
               <option value="Panamanian">Panamanian</option>
               <option value="Papua New Guinean">Papua New Guinean</option>
               <option value="Paraguayan">Paraguayan</option>
               <option value="Peruvian">Peruvian</option>
               <option value="Polish">Polish</option>
               <option value="Portuguese">Portuguese</option>
               <option value="Qatari">Qatari</option>
               <option value="Romanian">Romanian</option>
               <option value="Russian">Russian</option>
               <option value="Rwandan">Rwandan</option>
               <option value="Saint Lucian">Saint Lucian</option>
               <option value="Salvadoran">Salvadoran</option>
               <option value="Samoan">Samoan</option>
               <option value="San Marinese">San Marinese</option>
               <option value="Sao Tomean">Sao Tomean</option>
               <option value="Saudi">Saudi</option>
               <option value="Senegalese">Senegalese</option>
               <option value="Serbian">Serbian</option>
               <option value="Seychellois">Seychellois</option>
               <option value="Sierra Leonean">Sierra Leonean</option>
               <option value="Singaporean">Singaporean</option>
               <option value="Slovak">Slovak</option>
               <option value="Slovenian">Slovenian</option>
               <option value="Solomon Islander">Solomon Islander</option>
               <option value="Somali">Somali</option>
               <option value="South African">South African</option>
               <option value="South Korean">South Korean</option>
               <option value="South Sudanese">South Sudanese</option>
               <option value="Spanish">Spanish</option>
               <option value="Sri Lankan">Sri Lankan</option>
               <option value="Sudanese">Sudanese</option>
               <option value="Surinamese">Surinamese</option>
               <option value="Swazi">Swazi</option>
               <option value="Swedish">Swedish</option>
               <option value="Swiss">Swiss</option>
               <option value="Syrian">Syrian</option>
               <option value="Tajik">Tajik</option>
               <option value="Tanzanian">Tanzanian</option>
               <option value="Thai">Thai</option>
               <option value="Timorese">Timorese</option>
               <option value="Togolese">Togolese</option>
               <option value="Tongan">Tongan</option>
               <option value="Trinidadian and Tobagonian">Trinidadian and Tobagonian</option>
               <option value="Tunisian">Tunisian</option>
               <option value="Turkish">Turkish</option>
               <option value="Turkmen">Turkmen</option>
               <option value="Tuvaluan">Tuvaluan</option>
               <option value="Ugandan">Ugandan</option>
               <option value="Ukrainian">Ukrainian</option>
               <option value="Uruguayan">Uruguayan</option>
               <option value="Uzbek">Uzbek</option>
               <option value="Vanuatuan">Vanuatuan</option>
               <option value="Vatican">Vatican</option>
               <option value="Venezuelan">Venezuelan</option>
               <option value="Vietnamese">Vietnamese</option>
               <option value="Vincentian">Vincentian</option>
               <option value="Yemeni">Yemeni</option>
               <option value="Zambian">Zambian</option>
               <option value="Zimbabwean">Zimbabwean</option>
          </optgroup>
        </select>
      </form>  
    </div>

    <div class="quest_box" class:invalid={invalidFields.includes('migration_background_id')}>
      <h2 id="migration_background_id" class:invalid={invalidFields.includes('migration_background_id')}>Migration Background</h2>

      <form id="migration_background_input">
        <input type="text" bind:value={migrationBackground} />
      </form>
    </div>

    <div class="quest_box" class:invalid={invalidFields.includes('region_id')}>
      <h2 id="region_id" class:invalid={invalidFields.includes('region_id')}>Region</h2>
      <form id="region_input">
        <input type="text" bind:value={region} />
      </form>
    </div>

    <div class="quest_box" id="submit_box">

      {#if showValidationWarning}
        <div class="validation-warning">
          Please fill out all fields before submitting the survey
        </div>
      {/if}

      <input
        type="submit"
        value="Submit"
        on:click|preventDefault={validateForm}
      />

    </div>    

  </div>
</div>
