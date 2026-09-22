import "../../../../chunks/server.js";
//#region src/lib/introductions/task-stressless_intro.svelte
function Task_stressless_intro($$renderer) {
	$$renderer.push(`<div class="page svelte-1i7vl79"><header class="top svelte-1i7vl79"><h1 class="svelte-1i7vl79">Welcome to the first practical task</h1></header> <main class="content svelte-1i7vl79"><section class="content_box svelte-1i7vl79"><h3 class="svelte-1i7vl79">Thank you for submitting the demographic questionnaire</h3> <p class="svelte-1i7vl79">In the first practical assigment, you take the role of an employee of a company.
        Your task will be to read through a set of emails of your manager and decide which emails are relevant for the business and which are not.<br class="svelte-1i7vl79"/> You will be asked to mark the relevant emails and deleting the irreleant ones by moving them into the corresponding folders. <br class="svelte-1i7vl79"/><br class="svelte-1i7vl79"/> The emails will be presented to you in a simulated email client in which you can open and read the emails. <br class="svelte-1i7vl79"/><br class="svelte-1i7vl79"/> Please try to complete the task as quickly and accurately as possible.</p></section> <section class="content_box next_step svelte-1i7vl79"><a class="action-link svelte-1i7vl79" href="/task_routes/task-stressless-route">Start the second practical task</a></section></main></div>`);
}
//#endregion
//#region src/routes/introductions_routes/task-stressless_intro-route/+page.svelte
function _page($$renderer) {
	Task_stressless_intro($$renderer, {});
}
//#endregion
export { _page as default };
