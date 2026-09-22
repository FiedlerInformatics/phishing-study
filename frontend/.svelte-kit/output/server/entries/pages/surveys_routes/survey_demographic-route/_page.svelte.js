import { t as attr_class, y as attr } from "../../../../chunks/server.js";
import "../../../../chunks/navigation.js";
//#region src/lib/surveys/survey_demographic.svelte
function Survey_demographic($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let gender = "";
		let age = "";
		let maritalStatus = "";
		let householdSize = "";
		let educationLevel = "";
		let vocationalEducation = "";
		let employmentStatus = "";
		let occupation = "";
		let income = "";
		let nationality = "";
		let migrationBackground = "";
		let region = "";
		let invalidFields = [];
		$$renderer.push(`<div class="page svelte-1k4whmn"><div class="top svelte-1k4whmn"><h1 class="svelte-1k4whmn">Demographic Questionnaire</h1></div> <div class="quest svelte-1k4whmn"><div${attr_class("quest_box svelte-1k4whmn", void 0, { "invalid": invalidFields.includes("gender_id") })}><h2 id="gender_id"${attr_class("svelte-1k4whmn", void 0, { "invalid": invalidFields.includes("gender_id") })}>Gender</h2> <form id="gender_input" class="svelte-1k4whmn"><label class="svelte-1k4whmn"><input type="radio" name="answer" value="male"${attr("checked", gender === "male", true)} class="svelte-1k4whmn"/> Male</label> <label class="svelte-1k4whmn"><input type="radio" name="answer" value="female"${attr("checked", gender === "female", true)} class="svelte-1k4whmn"/> Female</label> <label class="svelte-1k4whmn"><input type="radio" name="answer" value="other"${attr("checked", gender === "other", true)} class="svelte-1k4whmn"/> Other</label></form></div> <div${attr_class("quest_box svelte-1k4whmn", void 0, { "invalid": invalidFields.includes("age_id") })}><h2 id="age_id"${attr_class("svelte-1k4whmn", void 0, { "invalid": invalidFields.includes("age_id") })}>Age</h2> <form id="age_input" class="svelte-1k4whmn"><input type="number" min="0" max="99"${attr("value", age)} class="svelte-1k4whmn"/></form></div> <div${attr_class("quest_box svelte-1k4whmn", void 0, { "invalid": invalidFields.includes("marital_status_id") })}><h2 id="marital_status_id"${attr_class("svelte-1k4whmn", void 0, { "invalid": invalidFields.includes("marital_status_id") })}>Marital Status</h2> <form id="marital_status_input" class="svelte-1k4whmn"><label class="svelte-1k4whmn"><input type="radio" name="maritalStatus" value="Single"${attr("checked", maritalStatus === "Single", true)} class="svelte-1k4whmn"/> Single</label> <label class="svelte-1k4whmn"><input type="radio" name="maritalStatus" value="Married"${attr("checked", maritalStatus === "Married", true)} class="svelte-1k4whmn"/> Married</label> <label class="svelte-1k4whmn"><input type="radio" name="maritalStatus" value="Divorced"${attr("checked", maritalStatus === "Divorced", true)} class="svelte-1k4whmn"/> Divorced</label> <label class="svelte-1k4whmn"><input type="radio" name="maritalStatus" value="Widowed"${attr("checked", maritalStatus === "Widowed", true)} class="svelte-1k4whmn"/> Widowed</label></form></div> <div${attr_class("quest_box svelte-1k4whmn", void 0, { "invalid": invalidFields.includes("household_size_id") })}><h2 id="household_size_id"${attr_class("svelte-1k4whmn", void 0, { "invalid": invalidFields.includes("household_size_id") })}>Household Size</h2> <input type="number" min="0"${attr("value", householdSize)} class="svelte-1k4whmn"/></div> <div${attr_class("quest_box svelte-1k4whmn", void 0, { "invalid": invalidFields.includes("education_level_id") })}><h2 id="education_level_id"${attr_class("svelte-1k4whmn", void 0, { "invalid": invalidFields.includes("education_level_id") })}>Education Level</h2> <form id="education_level_input" class="svelte-1k4whmn">`);
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
			$$renderer.push(`</optgroup>`);
		}, "svelte-1k4whmn");
		$$renderer.push(`</form></div> <div${attr_class("quest_box svelte-1k4whmn", void 0, { "invalid": invalidFields.includes("vocational_education_id") })}><h2 id="vocational_education_id"${attr_class("svelte-1k4whmn", void 0, { "invalid": invalidFields.includes("vocational_education_id") })}>Vocational education</h2> <form id="vocational_education_input" class="svelte-1k4whmn"><input type="text"${attr("value", vocationalEducation)} class="svelte-1k4whmn"/></form></div> <div${attr_class("quest_box svelte-1k4whmn", void 0, { "invalid": invalidFields.includes("employment_status_id") })}><h2 id="employment_status_id"${attr_class("svelte-1k4whmn", void 0, { "invalid": invalidFields.includes("employment_status_id") })}>Employment Status</h2> <form id="employment_status_input" class="svelte-1k4whmn"><input type="text"${attr("value", employmentStatus)} class="svelte-1k4whmn"/></form></div> <div${attr_class("quest_box svelte-1k4whmn", void 0, { "invalid": invalidFields.includes("occupation_id") })}><h2 id="occupation_id"${attr_class("svelte-1k4whmn", void 0, { "invalid": invalidFields.includes("occupation_id") })}>Occupation</h2> <form id="occupation_input" class="svelte-1k4whmn"><input type="text"${attr("value", occupation)} class="svelte-1k4whmn"/></form></div> <div${attr_class("quest_box svelte-1k4whmn", void 0, { "invalid": invalidFields.includes("income_id") })}><h2 id="income_id"${attr_class("svelte-1k4whmn", void 0, { "invalid": invalidFields.includes("income_id") })}>Income</h2> <form id="income_input" class="svelte-1k4whmn"><input type="number" min="0"${attr("value", income)} class="svelte-1k4whmn"/></form></div> <div${attr_class("quest_box svelte-1k4whmn", void 0, { "invalid": invalidFields.includes("nationality_id") })}><h2 id="nationality_id"${attr_class("svelte-1k4whmn", void 0, { "invalid": invalidFields.includes("nationality_id") })}>Nationality</h2> <form id="nationality_id" class="svelte-1k4whmn">`);
		$$renderer.select({
			value: nationality,
			class: ""
		}, ($$renderer) => {
			$$renderer.push(`<optgroup class="svelte-1k4whmn">`);
			$$renderer.option({
				value: "Afghan",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Afghan`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Albanian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Albanian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Algerian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Algerian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "American",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`American`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Andorran",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Andorran`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Angolan",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Angolan`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Antiguan",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Antiguan`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Argentine",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Argentine`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Armenian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Armenian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Australian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Australian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Austrian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Austrian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Azerbaijani",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Azerbaijani`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Bahamian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Bahamian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Bahraini",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Bahraini`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Bangladeshi",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Bangladeshi`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Barbadian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Barbadian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Belarusian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Belarusian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Belgian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Belgian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Belizean",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Belizean`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Beninese",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Beninese`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Bhutanese",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Bhutanese`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Bolivian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Bolivian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Bosnian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Bosnian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Botswanan",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Botswanan`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Brazilian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Brazilian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "British",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`British`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Bruneian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Bruneian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Bulgarian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Bulgarian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Burkinabe",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Burkinabe`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Burundian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Burundian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Cambodian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Cambodian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Cameroonian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Cameroonian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Canadian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Canadian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Cape Verdean",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Cape Verdean`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Central African",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Central African`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Chadian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Chadian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Chilean",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Chilean`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Chinese",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Chinese`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Colombian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Colombian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Comorian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Comorian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Congolese (Democratic Republic of the Congo)",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Congolese (Democratic Republic of the Congo)`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Congolese (Republic of the Congo)",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Congolese (Republic of the Congo)`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Costa Rican",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Costa Rican`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Croatian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Croatian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Cuban",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Cuban`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Cypriot",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Cypriot`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Czech",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Czech`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Danish",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Danish`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Djiboutian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Djiboutian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Dominican (Dominica)",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Dominican (Dominica)`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Dominican (Dominican Republic)",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Dominican (Dominican Republic)`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Dutch",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Dutch`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Ecuadorian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Ecuadorian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Egyptian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Egyptian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Emirati",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Emirati`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Equatorial Guinean",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Equatorial Guinean`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Eritrean",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Eritrean`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Estonian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Estonian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Ethiopian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Ethiopian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Fijian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Fijian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Filipino",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Filipino`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Finnish",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Finnish`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "French",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`French`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Gabonese",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Gabonese`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Gambian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Gambian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Georgian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Georgian`);
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
				value: "Ghanaian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Ghanaian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Greek",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Greek`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Grenadian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Grenadian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Guatemalan",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Guatemalan`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Guinea-Bissauan",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Guinea-Bissauan`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Guinean",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Guinean`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Guyanese",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Guyanese`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Haitian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Haitian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Honduran",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Honduran`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Hungarian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Hungarian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Icelandic",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Icelandic`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Indian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Indian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Indonesian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Indonesian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Iranian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Iranian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Iraqi",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Iraqi`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Irish",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Irish`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Israeli",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Israeli`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Italian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Italian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Ivorian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Ivorian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Jamaican",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Jamaican`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Japanese",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Japanese`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Jordanian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Jordanian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Kazakh",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Kazakh`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Kenyan",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Kenyan`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Kiribati",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Kiribati`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Kittitian and Nevisian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Kittitian and Nevisian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Kuwaiti",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Kuwaiti`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Kyrgyz",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Kyrgyz`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Lao",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Lao`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Latvian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Latvian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Lebanese",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Lebanese`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Lesotho",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Lesotho`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Liberian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Liberian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Libyan",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Libyan`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Liechtensteiner",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Liechtensteiner`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Lithuanian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Lithuanian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Luxembourger",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Luxembourger`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Malagasy",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Malagasy`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Malawian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Malawian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Malaysian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Malaysian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Maldivian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Maldivian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Malian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Malian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Maltese",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Maltese`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Marshallese",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Marshallese`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Mauritanian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Mauritanian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Mauritian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Mauritian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Mexican",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Mexican`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Micronesian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Micronesian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Moldovan",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Moldovan`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Monegasque",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Monegasque`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Mongolian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Mongolian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Montenegrin",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Montenegrin`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Moroccan",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Moroccan`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Mozambican",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Mozambican`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Myanmar",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Myanmar`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Namibian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Namibian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Nauruan",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Nauruan`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Nepalese",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Nepalese`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "New Zealander",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`New Zealander`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Nicaraguan",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Nicaraguan`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Nigerian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Nigerian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Nigerien",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Nigerien`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "North Korean",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`North Korean`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "North Macedonian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`North Macedonian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Norwegian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Norwegian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Omani",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Omani`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Pakistani",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Pakistani`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Palauan",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Palauan`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Palestinian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Palestinian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Panamanian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Panamanian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Papua New Guinean",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Papua New Guinean`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Paraguayan",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Paraguayan`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Peruvian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Peruvian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Polish",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Polish`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Portuguese",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Portuguese`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Qatari",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Qatari`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Romanian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Romanian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Russian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Russian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Rwandan",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Rwandan`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Saint Lucian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Saint Lucian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Salvadoran",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Salvadoran`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Samoan",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Samoan`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "San Marinese",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`San Marinese`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Sao Tomean",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Sao Tomean`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Saudi",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Saudi`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Senegalese",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Senegalese`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Serbian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Serbian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Seychellois",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Seychellois`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Sierra Leonean",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Sierra Leonean`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Singaporean",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Singaporean`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Slovak",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Slovak`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Slovenian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Slovenian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Solomon Islander",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Solomon Islander`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Somali",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Somali`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "South African",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`South African`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "South Korean",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`South Korean`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "South Sudanese",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`South Sudanese`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Spanish",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Spanish`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Sri Lankan",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Sri Lankan`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Sudanese",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Sudanese`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Surinamese",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Surinamese`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Swazi",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Swazi`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Swedish",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Swedish`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Swiss",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Swiss`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Syrian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Syrian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Tajik",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Tajik`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Tanzanian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Tanzanian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Thai",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Thai`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Timorese",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Timorese`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Togolese",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Togolese`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Tongan",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Tongan`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Trinidadian and Tobagonian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Trinidadian and Tobagonian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Tunisian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Tunisian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Turkish",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Turkish`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Turkmen",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Turkmen`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Tuvaluan",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Tuvaluan`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Ugandan",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Ugandan`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Ukrainian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Ukrainian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Uruguayan",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Uruguayan`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Uzbek",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Uzbek`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Vanuatuan",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Vanuatuan`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Vatican",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Vatican`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Venezuelan",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Venezuelan`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Vietnamese",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Vietnamese`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Vincentian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Vincentian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Yemeni",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Yemeni`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Zambian",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Zambian`);
			}, "svelte-1k4whmn");
			$$renderer.push(` `);
			$$renderer.option({
				value: "Zimbabwean",
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`Zimbabwean`);
			}, "svelte-1k4whmn");
			$$renderer.push(`</optgroup>`);
		}, "svelte-1k4whmn");
		$$renderer.push(`</form></div> <div${attr_class("quest_box svelte-1k4whmn", void 0, { "invalid": invalidFields.includes("migration_background_id") })}><h2 id="migration_background_id"${attr_class("svelte-1k4whmn", void 0, { "invalid": invalidFields.includes("migration_background_id") })}>Migration Background</h2> <form id="migration_background_input" class="svelte-1k4whmn"><input type="text"${attr("value", migrationBackground)} class="svelte-1k4whmn"/></form></div> <div${attr_class("quest_box svelte-1k4whmn", void 0, { "invalid": invalidFields.includes("region_id") })}><h2 id="region_id"${attr_class("svelte-1k4whmn", void 0, { "invalid": invalidFields.includes("region_id") })}>Region</h2> <form id="region_input" class="svelte-1k4whmn"><input type="text"${attr("value", region)} class="svelte-1k4whmn"/></form></div> <div class="quest_box svelte-1k4whmn" id="submit_box">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <input type="submit" value="Submit" class="svelte-1k4whmn"/></div></div></div>`);
	});
}
//#endregion
//#region src/routes/surveys_routes/survey_demographic-route/+page.svelte
function _page($$renderer) {
	Survey_demographic($$renderer, {});
}
//#endregion
export { _page as default };
