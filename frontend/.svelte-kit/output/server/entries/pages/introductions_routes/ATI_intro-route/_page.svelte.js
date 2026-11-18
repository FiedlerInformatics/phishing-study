import "../../../../chunks/server.js";
//#region src/lib/introductions/ATI_intro.svelte
function ATI_intro($$renderer) {
	$$renderer.push(`<div class="page svelte-1p566h6"><header class="top svelte-1p566h6"><h1 class="svelte-1p566h6">Affinity for Technology Introduction</h1></header> <main class="content svelte-1p566h6"><section class="content_box svelte-1p566h6"><p class="svelte-1p566h6">Thank you for submitting the last practical task.<br class="svelte-1p566h6"/> You are now ready to complete the final questionnaire of the study, the <b class="svelte-1p566h6">Affinity for Technology Scale</b></p> <p class="svelte-1p566h6">This is the final questionnaire of the study. It asks about your general relationship with technology, rather than anything specific to the tasks you just completed.

        Please read each statement below and indicate how much you agree or disagree with it, based on how you normally feel and behave when dealing with technical systems in everyday life — not just in the context of this study.

        There are no right or wrong answers. We are simply interested in your personal tendencies and attitudes toward technology in general.</p></section> <section class="content_box next_step svelte-1p566h6"><h2 class="svelte-1p566h6">First step</h2> <p class="svelte-1p566h6">The link below opens the ATI questionnaire. Please enter your
            answers, complete every field, and select <strong class="svelte-1p566h6">Submit</strong> to
            continue to finish the study.</p> <a class="action-link svelte-1p566h6" href="/surveys_routes/ATI_route">Open the ATI questionnaire</a></section></main></div>`);
}
//#endregion
//#region src/routes/introductions_routes/ATI_intro-route/+page.svelte
function _page($$renderer) {
	ATI_intro($$renderer, {});
}
//#endregion
export { _page as default };
