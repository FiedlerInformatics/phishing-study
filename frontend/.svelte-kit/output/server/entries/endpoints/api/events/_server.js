import { a as saveTaskEvents, s as handle } from "../../../../chunks/repository.js";
//#region src/routes/api/events/+server.js
var POST = ({ request }) => handle(request, saveTaskEvents);
//#endregion
export { POST };
