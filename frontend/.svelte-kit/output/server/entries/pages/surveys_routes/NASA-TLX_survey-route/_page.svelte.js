import { b as escape_html, n as bind_props, r as derived, rt as fallback, t as attr_class, y as attr } from "../../../../chunks/server.js";
import { t as page } from "../../../../chunks/state.js";
import "../../../../chunks/navigation.js";
//#region src/lib/surveys/survey_NASA-TLX.svelte
function Survey_NASA_TLX($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let condition = fallback($$props["condition"], null);
		let value_mental_demand = -1;
		let value_physical_demand = -1;
		let value_temporal_demand = -1;
		let value_performance = -1;
		let value_effort = -1;
		let value_frustration = -1;
		let invalidFields = [];
		$$renderer.push(`<div class="page svelte-173nife"><div class="top svelte-173nife"><h1 class="svelte-173nife">NASA Task Load Index</h1></div> <div class="quest svelte-173nife"><div${attr_class("quest_box svelte-173nife", void 0, { "invalid": invalidFields.includes("mental_demand_input") })}><h2 id="menatl_demand_id"${attr_class("svelte-173nife", void 0, { "invalid": invalidFields.includes("mental_demand_input") })}>Mental Demand</h2> <p class="svelte-173nife">How mentally demanding was the task?</p> <p class="svelte-173nife"><strong class="svelte-173nife">Your choice: ${escape_html(value_mental_demand === -1 ? "No input" : value_mental_demand)}</strong></p> <div class="quest_box svelte-173nife"><form class="svelte-173nife"><input id="mental_demand_input" type="range" min="0" max="20"${attr("value", value_mental_demand)} class="svelte-173nife"/></form></div></div> <div${attr_class("quest_box svelte-173nife", void 0, { "invalid": invalidFields.includes("physical_demand_input") })}><h2 id="physical_demand_id"${attr_class("svelte-173nife", void 0, { "invalid": invalidFields.includes("physical_demand_input") })}>Physical Demand</h2> <p class="svelte-173nife">How physically demanding was the task?</p> <p class="svelte-173nife"><strong class="svelte-173nife">Your choice: ${escape_html(value_physical_demand === -1 ? "No input" : value_physical_demand)}</strong></p> <div class="quest_box svelte-173nife"><form class="svelte-173nife"><input id="physical_demand_input" type="range" min="0" max="20"${attr("value", value_physical_demand)} class="svelte-173nife"/></form></div></div> <div${attr_class("quest_box svelte-173nife", void 0, { "invalid": invalidFields.includes("temporal_demand_input") })}><h2 id="temporal_demand_id"${attr_class("svelte-173nife", void 0, { "invalid": invalidFields.includes("temporal_demand_input") })}>Temporal Demand</h2> <p class="svelte-173nife">How hurried or rushed was the pace of the task?</p> <p class="svelte-173nife"><strong class="svelte-173nife">Your choice: ${escape_html(value_temporal_demand === -1 ? "No input" : value_temporal_demand)}</strong></p> <div class="quest_box svelte-173nife"><form class="svelte-173nife"><input id="temporal_demand_input" type="range" min="0" max="20"${attr("value", value_temporal_demand)} class="svelte-173nife"/></form></div></div> <div${attr_class("quest_box svelte-173nife", void 0, { "invalid": invalidFields.includes("performance_input") })}><h2 id="performance_id"${attr_class("svelte-173nife", void 0, { "invalid": invalidFields.includes("performance_input") })}>Performance</h2> <p class="svelte-173nife">How successful were you in accomplishing what you were asked for?</p> <p class="svelte-173nife"><strong class="svelte-173nife">Your choice: ${escape_html(value_performance === -1 ? "No input" : value_performance)}</strong></p> <div class="quest_box svelte-173nife"><form class="svelte-173nife"><input id="performance_input" type="range" min="0" max="20"${attr("value", value_performance)} class="svelte-173nife"/></form></div></div> <div${attr_class("quest_box svelte-173nife", void 0, { "invalid": invalidFields.includes("effort_input") })}><h2 id="effort_id"${attr_class("svelte-173nife", void 0, { "invalid": invalidFields.includes("effort_input") })}>Effort</h2> <p class="svelte-173nife">How hard did you have to work to accomplish your level of performance?</p> <p class="svelte-173nife"><strong class="svelte-173nife">Your choice: ${escape_html(value_effort === -1 ? "No input" : value_effort)}</strong></p> <div class="quest_box svelte-173nife"><form class="svelte-173nife"><input id="effort_input" type="range" min="0" max="20"${attr("value", value_effort)} class="svelte-173nife"/></form></div></div> <div${attr_class("quest_box svelte-173nife", void 0, { "invalid": invalidFields.includes("frustration_input") })}><h2 id="frustration_id"${attr_class("svelte-173nife", void 0, { "invalid": invalidFields.includes("frustration_input") })}>Frustration</h2> <p class="svelte-173nife">How insecure, discouraged, irritated, stressed, and annoyed were you?</p> <p class="svelte-173nife"><strong class="svelte-173nife">Your choice: ${escape_html(value_frustration === -1 ? "No input" : value_frustration)}</strong></p> <div class="quest_box svelte-173nife"><form class="svelte-173nife"><input id="frustration_input" type="range" min="0" max="20"${attr("value", value_frustration)} class="svelte-173nife"/></form></div></div> <div class="quest_box svelte-173nife" id="submit_box">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <input type="submit" value="Submit" class="svelte-173nife"/></div></div></div>`);
		bind_props($$props, { condition });
	});
}
//#endregion
//#region src/routes/surveys_routes/NASA-TLX_survey-route/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		Survey_NASA_TLX($$renderer, { condition: derived(() => page.url.searchParams.get("condition"))() });
	});
}
//#endregion
export { _page as default };
