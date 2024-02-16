/**
 * This error might occur when the activity ID has not been provided.
 */
export class NoActivityIdError extends Error
{
    constructor() {
        super("Activity ID not provided.");
    }

}