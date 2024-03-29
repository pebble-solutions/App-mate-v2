/**
 * This error might occur when authorization system try to get an authorization token while no use is logged in
 */
export class NotAuthenticatedError extends Error
{
    constructor() {
        super("Vous n'êtes pas authentifié. Connectez-vous.");
    }
}