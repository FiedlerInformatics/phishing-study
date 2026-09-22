import "../../../../chunks/server.js";
//#region src/lib/introductions/task-stress_intro.svelte
function Task_stress_intro($$renderer) {
	$$renderer.push(`<div class="page svelte-14zg4uq"><header class="top svelte-14zg4uq"><h1 class="svelte-14zg4uq">Welcome to the second practical task</h1></header> <main class="content svelte-14zg4uq"><section class="content_box svelte-14zg4uq"><h3 class="svelte-14zg4uq">Thank you for submitting your information</h3> <h2 class="svelte-14zg4uq">Fictional scenario and task description</h2> <p class="svelte-14zg4uq">In the second part of the study, you will asked to complete the same practical task as in the first part.
            However, this time you will be asked to complete the task under different conditions.<br class="svelte-14zg4uq"/> <br class="svelte-14zg4uq"/> <b class="svelte-14zg4uq">The scenario will be the same as in the first practical task:</b><br class="svelte-14zg4uq"/> You take the role of an employee of a company.
            Your task will be to read through a set of emails of your manager and decide which emails are relevant for the business and which are not.<br class="svelte-14zg4uq"/> You will be asked to mark the relevant emails and deleting the irreleant ones by moving them into the corresponding folders.
            
            The emails will be presented to you in a simulated email client in which you can open and read the emails. <br class="svelte-14zg4uq"/><br class="svelte-14zg4uq"/> Please try to complete the task as quickly and accurately as possible.</p></section> <section class="content_box next_step svelte-14zg4uq"><a class="action-link svelte-14zg4uq" href="/task_routes/task-stress-route">Start the second practical task</a></section></main></div>`);
}
//#endregion
//#region src/routes/introductions_routes/task-stress_intro-route/+page.svelte
function _page($$renderer) {
	Task_stress_intro($$renderer, {});
}
//#endregion
export { _page as default };
