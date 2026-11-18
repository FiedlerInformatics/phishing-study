import { r as saveHeartRate, s as handle } from "../../../../chunks/repository.js";
//#region src/routes/api/hr/+server.js
var POST = ({ request }) => handle(request, saveHeartRate);
//#endregion
export { POST };
