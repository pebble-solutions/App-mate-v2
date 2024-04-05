/**
 * This error might occur when the provided session ID is not according sessionID standard. A session ID should be
 * a ULID string.
 */
export class InvalidSessionIDError extends Error {
    constructor(sessionId?: any) {
        const idLabel = sessionId || "[unknown]"
        super("Invalid session id ("+idLabel+")");
        this.name = "InvalidSessionIDError"
    }
}