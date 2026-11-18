import { handle } from '$lib/server/respond';
import { saveHeartRate } from '$lib/server/repository';

// Batch aus hrRecorder.js: { participantID, polarDevID, samples, rrIntervals }
export const POST = ({ request }) => handle(request, saveHeartRate);
