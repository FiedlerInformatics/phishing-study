import "../../../../chunks/server.js";
import { t as Grand_intro } from "../../../../chunks/grand_intro.js";
//#region src/routes/introductions_routes/grand_intro-route/+page.svelte
function _page($$renderer) {
	Grand_intro($$renderer, {});
}
//#endregion
export { _page as default };
