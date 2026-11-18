import "../../../../chunks/index-server.js";
import "../../../../chunks/server.js";
import "../../../../chunks/api.js";
import "../../../../chunks/hrRecorder.js";
//#region src/lib/introductions/end.svelte
function End($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		$$renderer.push(`<div class="page svelte-n6igc6"><header class="top svelte-n6igc6"><h1 class="svelte-n6igc6">End of the Study</h1></header> <main class="content svelte-n6igc6"><section class="content_box svelte-n6igc6"><h2 class="svelte-n6igc6">Thank you for participating!</h2> <p class="svelte-n6igc6">You have now completed all parts of this study. Before you go, we would like to tell you a bit more about what this study was actually investigating.</p> <p class="svelte-n6igc6">Earlier, you were asked to imagine yourself as an assistant sorting emails into "important" and "unimportant." What we did not tell you at the time is that some of the emails in your inbox were phishing emails — fraudulent messages designed to look legitimate in order to steal information or trick the recipient into harmful actions.
        The actual goal of this study is to better understand how people recognize (or fail to recognize) phishing emails, and whether physiological stress indicators — such as your heart rate, which we measured throughout the tasks — are related to how well someone can detect these deceptive emails. We also tracked your mouse movements and click behavior during the email-sorting tasks for the same reason.
        We did not disclose this beforehand because knowing about phishing emails in advance would have changed how you approached the task, and made the results less representative of how people behave in everyday situations.
        Your data</p> <p class="svelte-n6igc6">All data collected during this session (physiological, behavioral, and questionnaire responses) will be stored securely, analyzed anonymously, and used exclusively for the purposes of this research. [Placeholder: add specific details on data storage, anonymization procedure, and retention period as required by your institution's ethics guidelines.]
        Questions or concerns</p> <p class="svelte-n6igc6">If you have any questions about the study, would like more information about phishing and how to protect yourself against it, or wish to withdraw your data from the study, please contact [Placeholder: your name/email] or [Placeholder: supervisor's name/email].</p> <p class="svelte-n6igc6">Thank you again for your time and participation — your contribution helps advance research on human factors in cybersecurity.</p></section></main></div>`);
	});
}
//#endregion
//#region src/routes/introductions_routes/end-route/+page.svelte
function _page($$renderer) {
	End($$renderer, {});
}
//#endregion
export { _page as default };
