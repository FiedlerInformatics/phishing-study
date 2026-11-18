import { handle } from '$lib/server/respond';
import { saveTaskEvents } from '$lib/server/repository';

// Batch aus tracker.js: { taskID, moves, hovers, points, scrolls, drags }
export const POST = ({ request }) => handle(request, saveTaskEvents);
