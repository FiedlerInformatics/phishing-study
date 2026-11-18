import { i as saveSurvey, s as handle } from "../../../../chunks/repository.js";
//#region src/routes/api/surveys/+server.js
var POST = ({ request }) => handle(request, saveSurvey);
//#endregion
export { POST };
