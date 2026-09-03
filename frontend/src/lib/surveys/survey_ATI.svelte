<script>
    let ati_01_value = -1;
    let ati_02_value = -1;
    let ati_03_value = -1;
    let ati_04_value = -1;
    let ati_05_value = -1;
    let ati_06_value = -1;
    let ati_07_value = -1;
    let ati_08_value = -1;
    let ati_09_value = -1;
    
    let showValidationWarning = false;
    let invalidFields = [];

    function isEmpty(value) {
        return (value === -1);
    }

    function validateForm(event) {

        if (event) event.preventDefault();

        const fields = [
            { id: 'ati_01', value: ati_01_value },
            { id: 'ati_02', value: ati_02_value },
            { id: 'ati_03', value: ati_03_value },
            { id: 'ati_04', value: ati_04_value },
            { id: 'ati_05', value: ati_05_value },
            { id: 'ati_06', value: ati_06_value },
            { id: 'ati_07', value: ati_07_value },
            { id: 'ati_08', value: ati_08_value },
            { id: 'ati_09', value: ati_09_value }
        ];

        invalidFields = fields.filter((field) => isEmpty(field.value)).map((field) => field.id);

        console.log(invalidFields);
        console.log("---")
        console.log(ati_01_value, ati_02_value, ati_03_value, ati_04_value, ati_05_value, ati_06_value, ati_07_value, ati_08_value, ati_09_value);

        showValidationWarning = invalidFields.length > 0;
    }

</script>
<style>
    * {
        font-family: Arial, Helvetica, sans-serif;
    }
    h1 {
        font-size: 2.75 rem;
    }
    h2 {
        font-size: 1.75 rem;
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

    .quest_box label {
        display: block;
    }

    .radio_group {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 0.5rem;
    }

    #submit_box {
        background-color: #E6E6E7;
        margin-top: 2rem;
    }

    input[type="submit"] {
        width: 100%;
        border-radius: 3.5px;
        cursor: pointer;
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

<div class=page>

    <div class="top">
        <h1>Affinity for Technology Interaction</h1>
    </div>

    <div class="quest">

        <div class="quest_box" class:invalid={invalidFields.includes('ati_01')}>
            <h2 class:invalid={invalidFields.includes('ati_01')}>
                1. I like to occupy myself in greater detail with technical systems
            </h2>
            <div class="radio_group">
                <form>
                    <input type="radio" id="ati_id_01-1" value="completely_disagree" bind:group={ati_01_value}>
                    <label for="ati_id_01-1">Completely<br>disagree</label>
                </form>
                <form>
                    <input type="radio" id="ati_id_01-2" value="largely_disagree" bind:group={ati_01_value}>
                    <label for="ati_id_01-2">Largely<br>disagree</label>
                </form>
                <form>
                    <input type="radio" id="ati_id_01-3" value="slightly_disagree" bind:group={ati_01_value}>
                    <label for="ati_id_01-3">Slightly<br>disagree</label>
                </form>
                <form>
                    <input type="radio" id="ati_id_01-4" value="slightly_agree" bind:group={ati_01_value}>
                    <label for="ati_id_01-4">Slightly<br>agree</label>
                </form>
                <form>
                    <input type="radio" id="ati_id_01-5" value="largely_agree" bind:group={ati_01_value}>
                    <label for="ati_id_01-5">Largely<br>agree</label>
                </form>
                <form>
                    <input type="radio" id="ati_id_01-6" value="completely_agree" bind:group={ati_01_value}>
                    <label for="ati_id_01-6">Completely<br>agree</label>
                </form>
            </div>
        </div>
        
        <div class="quest_box" class:invalid={invalidFields.includes('ati_02')}>
            <h2 class:invalid={invalidFields.includes('ati_02')}>
                2. I like testing the functions of new technical systems
            </h2>
            <div class="radio_group">
                <form>
                    <input type="radio" id="ati_id_02-1" value="completely_disagree" bind:group={ati_02_value}>
                    <label for="ati_id_02-1">Completely<br>disagree</label>
                </form>
                <form>
                    <input type="radio" id="ati_id_02-2" value="largely_disagree" bind:group={ati_02_value}>
                    <label for="ati_id_02-2">Largely<br>disagree</label>
                </form>
                <form>
                    <input type="radio" id="ati_id_02-3" value="slightly_disagree" bind:group={ati_02_value}>
                    <label for="ati_id_02-3">Slightly<br>disagree</label>
                </form>
                <form>
                    <input type="radio" id="ati_id_02-4" value="slightly_agree" bind:group={ati_02_value}>
                    <label for="ati_id_02-4">Slightly<br>agree</label>
                </form>
                <form>
                    <input type="radio" id="ati_id_02-5" value="largely_agree" bind:group={ati_02_value}>
                    <label for="ati_id_02-5">Largely<br>agree</label>
                </form>
                <form>
                    <input type="radio" id="ati_id_02-6" value="completely_agree" bind:group={ati_02_value}>
                    <label for="ati_id_02-6">Completely<br>agree</label>
                </form>
            </div>
        </div>

        <div class="quest_box" class:invalid={invalidFields.includes('ati_03')}>
            <h2 class:invalid={invalidFields.includes('ati_03')}>
                3. I predominantly deal with technical systems because I have to
            </h2>
            <div class="radio_group">
                <form>
                    <input type="radio" id="ati_id_03-1" value="completely_disagree" bind:group={ati_03_value}>
                    <label for="ati_id_03-1">Completely<br>disagree</label>
                </form>
                <form>
                    <input type="radio" id="ati_id_03-2" value="largely_disagree" bind:group={ati_03_value}>
                    <label for="ati_id_03-2">Largely<br>disagree</label>
                </form>
                <form>  
                    <input type="radio" id="ati_id_03-3" value="slightly_disagree" bind:group={ati_03_value}>
                    <label for="ati_id_03-3">Slightly<br>disagree</label>
                </form>
                <form>
                    <input type="radio" id="ati_id_03-4" value="slightly_agree" bind:group={ati_03_value}>
                    <label for="ati_id_03-4">Slightly<br>agree</label>
                </form>
                <form>
                    <input type="radio" id="ati_id_03-5" value="largely_agree" bind:group={ati_03_value}>
                    <label for="ati_id_03-5">Largely<br>agree</label>
                </form>
                <form>
                    <input type="radio" id="ati_id_03-6" value="completely_agree" bind:group={ati_03_value}>
                    <label for="ati_id_03-6">Completely<br>agree</label>
                </form>
            </div>
        </div>

        <div class="quest_box" class:invalid={invalidFields.includes('ati_04')}>
            <h2 class:invalid={invalidFields.includes('ati_04')}>
                4. When I have a new technical system in front of me, I try it out intensively.
            </h2>
            <div class="radio_group">
                <form>
                    <input type="radio" id="ati_id_04-1" value="completely_disagree" bind:group={ati_04_value}>
                    <label for="ati_id_04-1">Completely<br>disagree</label>
                </form>
                <form>
                    <input type="radio" id="ati_id_04-2" value="largely_disagree" bind:group={ati_04_value}>
                    <label for="ati_id_04-2">Largely<br>disagree</label>
                </form>
                <form>
                    <input type="radio" id="ati_id_04-3" value="slightly_disagree" bind:group={ati_04_value}>
                    <label for="ati_id_04-3">Slightly<br>disagree</label>
                </form>
                <form>
                    <input type="radio" id="ati_id_04-4" value="slightly_agree" bind:group={ati_04_value}>
                    <label for="ati_id_04-4">Slightly<br>agree</label>
                </form>
                <form>
                    <input type="radio" id="ati_id_04-5" value="largely_agree" bind:group={ati_04_value}>
                    <label for="ati_id_04-5">Largely<br>agree</label>
                </form>
                <form>
                    <input type="radio" id="ati_id_04-6" value="completely_agree" bind:group={ati_04_value}>
                    <label for="ati_id_04-6">Completely<br>agree</label>
                </form>
            </div>
        </div>

        <div class="quest_box" class:invalid={invalidFields.includes('ati_05')}>
            <h2 class:invalid={invalidFields.includes('ati_05')}>
                5. I enjoy spending time becoming acquainted with a new technical system
            </h2>
            <div class="radio_group">
                <form>
                    <input type="radio" id="ati_id_05-1" value="completely_disagree" bind:group={ati_05_value}>
                    <label for="ati_id_05-1">Completely<br>disagree</label>
                </form>
                <form>
                    <input type="radio" id="ati_id_05-2" value="largely_disagree" bind:group={ati_05_value}>
                    <label for="ati_id_05-2">Largely<br>disagree</label>
                </form>
                <form>
                    <input type="radio" id="ati_id_05-3" value="slightly_disagree" bind:group={ati_05_value}>
                    <label for="ati_id_05-3">Slightly<br>disagree</label>
                </form>
                <form>
                    <input type="radio" id="ati_id_05-4" value="slightly_agree" bind:group={ati_05_value}>
                    <label for="ati_id_05-4">Slightly<br>agree</label>
                </form>
                <form>
                    <input type="radio" id="ati_id_05-5" value="largely_agree" bind:group={ati_05_value}>
                    <label for="ati_id_05-5">Largely<br>agree</label>
                </form>
                <form>
                    <input type="radio" id="ati_id_05-6" value="completely_agree" bind:group={ati_05_value}>
                    <label for="ati_id_05-6">Completely<br>agree</label>
                </form>
            </div>
        </div>

        <div class="quest_box" class:invalid={invalidFields.includes('ati_06')}>
            <h2 class:invalid={invalidFields.includes('ati_06')}>
                6. It is enough for me that a technical system works; I don’t care how or why.
            </h2>
            <div class="radio_group">
                <form>
                    <input type="radio" id="ati_id_06-1" value="completely_disagree" bind:group={ati_06_value}>
                    <label for="ati_id_06-1">Completely<br>disagree</label>
                </form>
                <form>
                    <input type="radio" id="ati_id_06-2" value="largely_disagree" bind:group={ati_06_value}>
                    <label for="ati_id_06-2">Largely<br>disagree</label>
                </form>
                <form>
                    <input type="radio" id="ati_id_06-3" value="slightly_disagree" bind:group={ati_06_value}>
                    <label for="ati_id_06-3">Slightly<br>disagree</label>
                </form>
                <form>
                    <input type="radio" id="ati_id_06-4" value="slightly_agree" bind:group={ati_06_value}>
                    <label for="ati_id_06-4">Slightly<br>agree</label>
                </form>
                <form>
                    <input type="radio" id="ati_id_06-5" value="largely_agree" bind:group={ati_06_value}>
                    <label for="ati_id_06-5">Largely<br>agree</label>
                </form>
                <form>
                    <input type="radio" id="ati_id_06-6" value="completely_agree" bind:group={ati_06_value}>
                    <label for="ati_id_06-6">Completely<br>agree</label>
                </form>
            </div>
        </div>

        <div class="quest_box" class:invalid={invalidFields.includes('ati_07')}>
            <h2 class:invalid={invalidFields.includes('ati_07')}>
                7. I try to understand how a technical system exactly works
            </h2>
            <div class="radio_group">
                <form>
                    <input type="radio" id="ati_id_07-1" value="completely_disagree" bind:group={ati_07_value}>
                    <label for="ati_id_07-1">Completely<br>disagree</label>
                </form>
                <form>
                    <input type="radio" id="ati_id_07-2" value="largely_disagree" bind:group={ati_07_value}>
                    <label for="ati_id_07-2">Largely<br>disagree</label>
                </form>
                <form>
                    <input type="radio" id="ati_id_07-3" value="slightly_disagree" bind:group={ati_07_value}>
                    <label for="ati_id_07-3">Slightly<br>disagree</label>
                </form>
                <form>
                    <input type="radio" id="ati_id_07-4" value="slightly_agree" bind:group={ati_07_value}>
                    <label for="ati_id_07-4">Slightly<br>agree</label>
                </form>
                <form>
                    <input type="radio" id="ati_id_07-5" value="largely_agree" bind:group={ati_07_value}>
                    <label for="ati_id_07-5">Largely<br>agree</label>
                </form>
                <form>
                    <input type="radio" id="ati_id_07-6" value="completely_agree" bind:group={ati_07_value}>
                    <label for="ati_id_07-6">Completely<br>agree</label>
                </form>
            </div>
        </div>

        <div class="quest_box" class:invalid={invalidFields.includes('ati_08')}>
            <h2 class:invalid={invalidFields.includes('ati_08')}>
                8. It is enough for me to know the basic functions of a technical system
            </h2>
            <div class="radio_group">
                <form>
                    <input type="radio" id="ati_id_08-1" value="completely_disagree" bind:group={ati_08_value}>
                    <label for="ati_id_08-1">Completely<br>disagree</label>
                </form>
                <form>
                    <input type="radio" id="ati_id_08-2" value="largely_disagree" bind:group={ati_08_value}>
                    <label for="ati_id_08-2">Largely<br>disagree</label>
                </form>
                <form>
                    <input type="radio" id="ati_id_08-3" value="slightly_disagree" bind:group={ati_08_value}>
                    <label for="ati_id_08-3">Slightly<br>disagree</label>
                </form>
                <form>
                    <input type="radio" id="atti_id_08-4" value="slightly_agree" bind:group={ati_08_value}>
                    <label for="atti_id_08-4">Slightly<br>agree</label>
                </form>
                <form>
                    <input type="radio" id="atti_id_08-5" value="largely_agree" bind:group={ati_08_value}>
                    <label for="atti_id_08-5">Largely<br>agree</label>
                </form>
                <form>
                    <input type="radio" id="atti_id_08-6" value="completely_agree" bind:group={ati_08_value}>
                    <label for="atti_id_08-6">Completely<br>agree</label>
                </form>
            </div>
        </div>

        <div class="quest_box" class:invalid={invalidFields.includes('ati_09')}>
            <h2 class:invalid={invalidFields.includes('ati_09')}>
                9. I try to make full use of the capabilities of a technical system
            </h2>
            <div class="radio_group">
                <form>
                    <input type="radio" id="ati_id_09-1" value="completely_disagree" bind:group={ati_09_value}>
                    <label for="ati_id_09-1">Completely<br>disagree</label>
                </form>
                <form>
                    <input type="radio" id="ati_id_09-2" value="largely_disagree" bind:group={ati_09_value}>
                    <label for="ati_id_09-2">Largely<br>disagree</label>
                </form>
                <form>
                    <input type="radio" id="ati_id_09-3" value="slightly_disagree" bind:group={ati_09_value}>
                    <label for="ati_id_09-3">Slightly<br>disagree</label>
                </form>
                <form>
                    <input type="radio" id="ati_id_09-4" value="slightly_agree" bind:group={ati_09_value}>
                    <label for="ati_id_09-4">Slightly<br>agree</label>
                </form>
                <form>
                    <input type="radio" id="ati_id_09-5" value="largely_agree" bind:group={ati_09_value}>
                    <label for="ati_id_09-5">Largely<br>agree</label>
                </form>
                <form>
                    <input type="radio" id="ati_id_09-6" value="completely_agree" bind:group={ati_09_value}>
                    <label for="ati_id_09-6">Completely<br>agree</label>
                </form>
            </div>
        </div>
    
        <div class="quest_box" id="submit_box">
            {#if showValidationWarning}
                <div class="validation-warning">
                    <p>Please answer all questions before submitting the survey</p>
                </div>
            {/if}

            <input type="submit"
                   value="Submit" 
                   on:click|preventDefault={validateForm}
            />

        </div>

    </div>

</div>
