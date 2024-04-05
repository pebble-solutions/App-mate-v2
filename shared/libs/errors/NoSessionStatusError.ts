/**
 * This error might occur when no status is saved in the current session manager.
 */
export class NoSessionStatusError extends Error {
    constructor() {
        super("Session status is empty.");
    }
}