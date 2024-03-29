/**
 * This error might occur when the authorization response is malformed or not usable.
 */
export class AuthorizationContentError extends Error
{
    constructor(error: any) {
        let message = typeof error === "string" ? error : error?.message || null
        message = message ? "("+message+")" : ""
        super("Erreur lors de la lecture de l'authorisation "+message);
    }
}