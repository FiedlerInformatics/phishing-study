<script>
    let value_mental_demand = -1;
    let value_physical_demand = -1;
    let value_temporal_demand = -1;
    let value_performance = -1;
    let value_effort = -1;
    let value_frustration = -1;

    let showValidationWarning = false;
    let value_id_arr = [];

    function changeNULLValue(val) {
        if (val === -1) return 0;
        else return val;
    }

    let invalidFields = [];

    function isEmpty(val) {
        return (val === -1);
    }

    function checkCompletenes(event) {
        if (event) event.preventDefault();

        const value_id_arr= [
            {value: value_mental_demand, id: 'mental_demand_input'},
            {value: value_physical_demand, id: 'physical_demand_input'},
            {value: value_temporal_demand, id: 'temporal_demand_input'},
            {value: value_performance, id: 'performance_input'},
            {value: value_effort, id: 'effort_input'},
            {value: value_frustration, id: 'frustration_input'}
        ]

        invalidFields = value_id_arr
            .filter( (field) => isEmpty(field.value))
            .map((field) => field.id );
        
        showValidationWarning = invalidFields.length > 0;

        console.log(invalidFields)
    }

    function logValues(event) {
        if (event) event.preventDefault();
        const valueArr = [value_mental_demand, value_physical_demand, value_temporal_demand, value_performance, value_effort, value_frustration]

        console.log(valueArr);
    }

</script>
<style>
    * {
        font-family: Arial, Helvetica, sans-serif;
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
        grid-template-rows: 1fr 7fr;
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

    input[type="range"] {
        position: relative;
        width: 30vw;
        transform: scale(1.5);
        transform-origin: 0 0;
    }
    
  .quest_box input[type="submit"] {
    border-radius: 3.5px;
    border-width: 0.1 5rem;
    width: 100%;
    min-height: 1.75rem;
    padding: 0.5rem 0.75rem;
    font-size: 0.85rem;
  }

    input {
        size: 2rem;
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
    <div class="top">
        <h1>NASA Task Load Index</h1>
    </div>

    <div class="quest">

        <div class="quest_box" class:invalid={invalidFields.includes('mental_demand_input')}>
            <h2 id="menatl_demand_id" class:invalid={invalidFields.includes('mental_demand_input')}>Mental Demand</h2>
            <p>How mentally demanding was the task?</p>
            <p><strong>Your choice: {value_mental_demand === -1 ? "No input" : value_mental_demand}</strong></p>
            <div class="quest_box" >
                <form >
                    <input id="mental_demand_input" type="range" min="0" max="20"  bind:value={value_mental_demand} on:click={ () => value_mental_demand = changeNULLValue(value_mental_demand)}>
                </form>
            </div>
        </div>
        
        <div class="quest_box" class:invalid={invalidFields.includes('physical_demand_input')}>
            <h2 id="physical_demand_id" class:invalid={invalidFields.includes('physical_demand_input')}>Physical Demand</h2>
            <p>How physically demanding was the task?</p>
            <p><strong>Your choice: {value_physical_demand === -1 ? "No input" : value_physical_demand}</strong></p>
            <div class="quest_box">
                <form >
                    <input id="physical_demand_input" type="range" min="0" max="20" bind:value={value_physical_demand} on:click={ () => value_physical_demand = changeNULLValue(value_physical_demand)}>
                </form>
            </div>
        </div>

        <div class="quest_box" class:invalid={invalidFields.includes('temporal_demand_input')}>
            <h2 id="temporal_demand_id" class:invalid={invalidFields.includes('temporal_demand_input')}>Temporal Demand</h2>
            <p>How hurried or rushed was the pace of the task?</p>
            <p><strong>Your choice: {value_temporal_demand === -1 ? "No input" : value_temporal_demand}</strong></p>
            <div class="quest_box">
                <form>
                    <input id="temporal_demand_input" type="range" min="0" max="20" bind:value={value_temporal_demand} on:click={() => value_temporal_demand = changeNULLValue(value_temporal_demand)}>
                </form>
            </div>
        </div>
        <div class="quest_box" class:invalid={invalidFields.includes('performance_input')}>
            <h2 id="performance_id" class:invalid={invalidFields.includes('performance_input')}>Performance</h2>
            <p>How successful were you in accomplishing what you were asked for?</p>
            <p><strong>Your choice: {value_performance === -1 ? "No input" : value_performance}</strong></p>
            <div class="quest_box">
                <form>
                    <input id="performance_input" type="range" min="0" max="20" bind:value={value_performance} on:click={ () => value_performance = changeNULLValue(value_performance) }>
                </form>
            </div>
        </div>

        <div class="quest_box" class:invalid={invalidFields.includes('effort_input')}>
            <h2 id="effort_id" class:invalid={invalidFields.includes('effort_input')}>Effort</h2>
            <p>How hard did you have to work to accomplish your level of performance?</p>
            <p><strong>Your choice: {value_effort === -1 ? "No input" : value_effort}</strong></p>
            <div class="quest_box">
                <form>
                    <input id="effort_input" type="range" min="0" max="20" bind:value={value_effort} on:click={value_effort = changeNULLValue(value_effort)}>
                </form>
            </div>
        </div>
        
        <div class="quest_box" class:invalid={invalidFields.includes('frustration_input')}>
            <h2 id="frustration_id" class:invalid={invalidFields.includes('frustration_input')}>Frustration</h2>
            <p>How insecure, discouraged, irritated, stressed, and annoyed were you?</p>
            <p><strong>Your choice: {value_frustration === -1 ? "No input" : value_frustration}</strong></p>
            <div class="quest_box">
                <form>
                    <input id="frustration_input" type="range" min="0" max="20" bind:value={value_frustration} on:click={value_frustration = changeNULLValue(value_frustration)}>
                </form>
            </div>
        </div>

        <div class="quest_box" id="submit_box">
            
            {#if showValidationWarning}
                <div class="validation-warning">
                    Please answer all questions before submitting the survey
                </div>
            {/if}
            
            <input
                type="submit" value= Submit
                on:click|preventDefault={checkCompletenes}
            >
        </div>
    
    </div>

</div>
