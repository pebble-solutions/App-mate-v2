/**
 * This error might occur when the type contained in the session is invalid.
 */
export class InvalidSessionTypeError extends Error
{
    constructor(providedType?: string, requestedType?: string) {
        let message = "Invalid session type."

        if (providedType) {
            message += " Provided : "+providedType
        }
        if (requestedType) {
            message += " Requested : "+requestedType
        }
        super(message);
    }
}