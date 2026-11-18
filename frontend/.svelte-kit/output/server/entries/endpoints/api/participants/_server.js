import { s as handle, t as createParticipant } from "../../../../chunks/repository.js";
//#region src/routes/api/participants/+server.js
var POST = ({ request }) => handle(request, () => createParticipant());
//#endregion
export { POST };
