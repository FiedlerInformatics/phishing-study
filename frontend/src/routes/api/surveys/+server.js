import { handle } from '$lib/server/respond';
import { saveSurvey } from '$lib/server/repository';

// Fragebogen: { participantID, surveyID, startTime, endTime, answers: { questionID: Antwort } }
export const POST = ({ request }) => handle(request, saveSurvey);
