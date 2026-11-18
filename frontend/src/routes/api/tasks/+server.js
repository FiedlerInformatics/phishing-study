import { handle } from '$lib/server/respond';
import { startTask, endTask } from '$lib/server/repository';

// Task-Start: { participantID, condition, taskStart } -> { taskID }
export const POST = ({ request }) => handle(request, startTask);

// Task-Ende: { taskID, taskEnd }
export const PATCH = ({ request }) => handle(request, endTask, 200);
