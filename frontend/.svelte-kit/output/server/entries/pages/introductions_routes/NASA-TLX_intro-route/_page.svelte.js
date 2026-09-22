import { r as derived } from "../../../../chunks/server.js";
import { t as page } from "../../../../chunks/state.js";
//#region src/lib/introductions/NASA-TLX_intro.svelte
function NASA_TLX_intro($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		derived(() => page.url.searchParams.get("condition"));
		$$renderer.push(`<div class="page svelte-11q03hk"><header class="top svelte-11q03hk"><h1 class="svelte-11q03hk">NASA-TLX Introduction</h1></header> <main class="content svelte-11q03hk"><section class="content_box svelte-11q03hk"><p class="svelte-11q03hk">Thank you for participating in the first practical task of the study.
            In the next step, you will be asked to complete a short questionnaire about your experience with the task.</p> <h3 class="svelte-11q03hk">Task Load Index Assessment</h3> <p class="svelte-11q03hk">The Official NASA Task Load Index (TLX) is a subjective workload assessment tool developed by Human Systems Integration Division researchers.
            This tool allows users to perform subjective workload assessments on operator(s) working with various human-machine interface systems.
        
            By incorporating a multi-dimensional rating procedure,
            NASA TLX derives an overall workload score based on a weighted average of ratings on six subscales:</p> <ul class="svelte-11q03hk"><li class="svelte-11q03hk">Mental Demand</li> <li class="svelte-11q03hk">Physical Demand</li> <li class="svelte-11q03hk">Temporal Demand</li> <li class="svelte-11q03hk">Performance</li> <li class="svelte-11q03hk">Effort</li> <li class="svelte-11q03hk">Frustration</li></ul> <p class="svelte-11q03hk">There are no right or wrong answers. Please work independently and make
            the decisions that best reflect your own judgement.</p></section> <section class="content_box next_step svelte-11q03hk"><h2 class="svelte-11q03hk">First step</h2> <p class="svelte-11q03hk">The link below opens the NASA-TLX questionnaire. Please enter your
            answers, complete every field, and select <strong class="svelte-11q03hk">Submit</strong> to
            continue to the next part of the study.</p> <a class="action-link svelte-11q03hk" href="/surveys_routes/NASA-TLX_survey-route?condition=stressless">Open the NASA-TLX questionnaire</a></section></main></div>`);
	});
}
//#endregion
//#region src/routes/introductions_routes/NASA-TLX_intro-route/+page.svelte
function _page($$renderer) {
	NASA_TLX_intro($$renderer, {});
}
//#endregion
export { _page as default };
