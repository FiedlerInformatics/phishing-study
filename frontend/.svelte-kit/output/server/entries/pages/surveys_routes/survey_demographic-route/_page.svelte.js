import { t as attr_class, y as attr } from "../../../../chunks/server.js";
import "../../../../chunks/navigation.js";
//#region src/lib/surveys/survey_demographic.svelte
function Survey_demographic($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		(/* @__PURE__ */ new Date()).toISOString();
		let saving = false;
		let gender = "";
		let age = "";
		let educationLevel = "";
		let occupation = "";
		let field_of_study = "";
		let industry = "";
		let native_language = "";
		let native_language_other = "";
		let invalidFields = [];
		$$renderer.push(`<div class="page svelte-1k4whmn"><div class="top svelte-1k4whmn"><h1 class="svelte-1k4whmn">Demographic Questionnaire</h1></div> <div class="quest svelte-1k4whmn"><div${attr_class("quest_box svelte-1k4whmn", void 0, { "invalid": invalidFields.includes("gender_id") })}><h2 id="gender_id"${attr_class("svelte-1k4whmn", void 0, { "invalid": invalidFields.includes("gender_id") })}>Gender</h2> <form id="gender_input" class="svelte-1k4whmn"><label class="svelte-1k4whmn"><input type="radio" name="answer" value="male"${attr("checked", gender === "male", true)} class="svelte-1k4whmn"/> Male</label> <label class="svelte-1k4whmn"><input type="radio" name="answer" value="female"${attr("checked", gender === "female", true)} class="svelte-1k4whmn"/> Female</label> <label class="svelte-1k4whmn"><input type="radio" name="answer" value="other"${attr("checked", gender === "other", true)} class="svelte-1k4whmn"/> Other</label></form></div> <div${attr_class("quest_box svelte-1k4whmn", void 0, { "invalid": invalidFields.includes("age_id") })}><h2 id="age_id"${attr_class("svelte-1k4whmn", void 0, { "invalid": invalidFields.includes("age_id") })}>Age</h2> <form id="age_input" class="svelte-1k4whmn"><input type="number" min="18" max="99"${attr("value", age)} class="svelte-1k4whmn"/></form></div> <div${attr_class("quest_box svelte-1k4whmn", void 0, { "invalid": invalidFields.includes("education_level_id") })}><h2 id="education_level_id"${attr_class("svelte-1k4whmn", void 0, { "invalid": invalidFields.includes("education_level_id") })}>Education Level</h2> <form id="education_input" class="svelte-1k4whmn">`);
		$$renderer.select({
			value: educationLevel,
			class: ""
		}, ($$renderer) => {
			$$renderer.push(`<optgroup class="svelte-1k4whmn">`);
			$$renderer.option({
				value: "",
				disabled: true,
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Select an education level`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "No education",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`No education`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Primary school",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Primary school (Grundschule)`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Lower secondary school",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Lower secondary school (Hauptschulabschluss)`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Intermediate secondary school",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Intermediate secondary school (Realschule)`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "University of applied sciences entrance qualification",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`University of applied sciences entrance qualification (Fachhochschulreife)`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "University entrance qualification",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`University entrance qualification (Abitur)`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Bachelor",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Bachelor degree`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Master",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Master's Degree / Diplom / Staatsexamen`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "PhD",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Doctorate / PhD`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Other",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Other`);
			}, "svelte-1k4whmn");
			$$renderer.push(`</optgroup>`);
		}, "svelte-1k4whmn");
		$$renderer.push(`</form></div> <div${attr_class("quest_box svelte-1k4whmn", void 0, { "invalid": invalidFields.includes("occupation_id") })}><h2 id="occupation_id"${attr_class("svelte-1k4whmn", void 0, { "invalid": invalidFields.includes("occupation_id") })}>Occupation</h2> <p class="svelte-1k4whmn">Please select the option that best describes your current main occupation.</p> <form id="occupation_input" class="svelte-1k4whmn">`);
		$$renderer.select({
			value: occupation,
			class: ""
		}, ($$renderer) => {
			$$renderer.push(`<optgroup class="svelte-1k4whmn">`);
			$$renderer.option({
				value: "",
				disabled: true,
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Select an occupation level`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Student",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Student`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Full time employment",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Full time employment`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Part time emplyoment",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Part time employment`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Self employed",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Self employed`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Vocational training / apprenticeship",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Vocational training / apprenticeship`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Unemployed",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Unemployed`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Retired",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Retired`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Other",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Other`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Prefer not to say",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Prefer not to say`);
			}, "svelte-1k4whmn");
			$$renderer.push(`</optgroup>`);
		}, "svelte-1k4whmn");
		$$renderer.push(`</form></div> <div${attr_class("quest_box svelte-1k4whmn", void 0, { "invalid": invalidFields.includes("field_of_study_id") })}><h2 id="field_of_study_id"${attr_class("svelte-1k4whmn", void 0, { "invalid": invalidFields.includes("field_of_study_id") })}>Field of study</h2> <p class="svelte-1k4whmn">If you are a student, please select the field that best matches your study program.</p> <form id="field_of_study_input" class="svelte-1k4whmn">`);
		$$renderer.select({
			value: field_of_study,
			class: ""
		}, ($$renderer) => {
			$$renderer.push(`<optgroup class="svelte-1k4whmn">`);
			$$renderer.option({
				value: "",
				disabled: true,
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Select an field of study`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Information technology and telecommunications",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Information technology and telecommunications`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Media and publishing",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Media and publishing`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Finance and insurance",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Finance and insurance`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Manufacturing, energy and construction",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Manufacturing, energy and construction`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Trade, transport and hospitality",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Trade, transport and hospitality`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Professional, scientific and business services",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Professional, scientific and business services (e.g., consulting, law, research, real estate)`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Public administration",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Public administration`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Education",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Education`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Health and social work",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Health and social work`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Other",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Other`);
			}, "svelte-1k4whmn");
			$$renderer.push(`</optgroup>`);
		}, "svelte-1k4whmn");
		$$renderer.push(`</form></div> <div${attr_class("quest_box svelte-1k4whmn", void 0, { "invalid": invalidFields.includes("industry_id") })}><h2 id="industry_id"${attr_class("svelte-1k4whmn", void 0, { "invalid": invalidFields.includes("industry_id") })}>Industry</h2> <p class="svelte-1k4whmn">If not a student, in which industry do you mainly work?</p> <form id="industry_input" class="svelte-1k4whmn">`);
		$$renderer.select({
			value: industry,
			class: ""
		}, ($$renderer) => {
			$$renderer.push(`<optgroup class="svelte-1k4whmn">`);
			$$renderer.option({
				value: "",
				disabled: true,
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Select an industry`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Information technology and telecommunications",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Information technology and telecommunications`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Media and publishing",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Media and publishing`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Finance and insurance",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Finance and insurance`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Manufacturing, energy and construction",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Manufacturing, energy and construction`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Trade, transport and hospitality",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Trade, transport and hospitality`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Professional, scientific and business services",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Professional, scientific and business services (e.g., consulting, law, research, real estate)`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Public administration",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Public administration`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Education",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Education`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Health and social work",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Health and social work`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Other",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Other`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Prefer not to say",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Prefer not to say`);
			}, "svelte-1k4whmn");
			$$renderer.push(`</optgroup>`);
		}, "svelte-1k4whmn");
		$$renderer.push(`</form></div> <div${attr_class("quest_box svelte-1k4whmn", void 0, { "invalid": invalidFields.includes("native_language_id") })}><h2 id="native_language_id"${attr_class("svelte-1k4whmn", void 0, { "invalid": invalidFields.includes("native_language_id") })}>Native language</h2> <p class="svelte-1k4whmn">What is your native language</p> <form id="native_language_input" class="svelte-1k4whmn">`);
		$$renderer.select({
			value: native_language,
			class: ""
		}, ($$renderer) => {
			$$renderer.push(`<optgroup class="svelte-1k4whmn">`);
			$$renderer.option({
				value: "",
				disabled: true,
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Select your native language`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "English",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`English`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "German",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`German`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Other",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Other`);
			}, "svelte-1k4whmn");
			$$renderer.push(`</optgroup>`);
		}, "svelte-1k4whmn");
		$$renderer.push(` `);
		if (native_language === "Other") {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<input type="text" placeholder="Please enter your native language"${attr("value", native_language_other)} class="svelte-1k4whmn"/>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></form></div> <div class="quest_box svelte-1k4whmn" id="submit_box">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <input type="submit" value="Submit"${attr("disabled", saving, true)} class="svelte-1k4whmn"/></div></div></div>`);
	});
}
//#endregion
//#region src/routes/surveys_routes/survey_demographic-route/+page.svelte
function _page($$renderer) {
	Survey_demographic($$renderer, {});
}
//#endregion
export { _page as default };
