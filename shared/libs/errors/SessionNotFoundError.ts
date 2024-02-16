/**
 * This error might occur when a sessionId has not been found in the session context.
 */
export class SessionNotFoundError extends Error
{
    constructor(sessionId: string) {
        super("Session with id "+sessionId+" has not been found");
    }
}