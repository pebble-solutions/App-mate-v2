/**
 * This error might occur when a user try to get an information onto a remote server that he is not authorized to read.
 */
export class NotAuthorizedError extends Error
{
    constructor(error: any) {
        let message = typeof error === "string" ? error : error?.message || null
        message = message ? "("+message+")" : ""
        super("Vous n'êtes pas authorisé "+message);
    }
}