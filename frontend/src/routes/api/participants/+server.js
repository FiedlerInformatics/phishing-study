import { handle } from '$lib/server/respond';
import { createParticipant } from '$lib/server/repository';

// Studienbeginn: PARTICIPANT anlegen -> { participantID }
export const POST = ({ request }) => handle(request, () => createParticipant());
