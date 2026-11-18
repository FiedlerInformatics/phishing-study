import { n as endTask, o as startTask, s as handle } from "../../../../chunks/repository.js";
//#region src/routes/api/tasks/+server.js
var POST = ({ request }) => handle(request, startTask);
var PATCH = ({ request }) => handle(request, endTask, 200);
//#endregion
export { PATCH, POST };
