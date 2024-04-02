/**
 * This method try to analyse an error status and gets the most relevant message from it.
 *
 * @param e             The error object (any type)
 */
export function getMessage(e: any): string | null {
    if (typeof e === "string") return e

    if (e instanceof Error) {
        return e.message
    }

    const keys = ["message", "error message", "error"]

    keys.forEach(key => {
        if (key in e) {
            if (typeof e[key] === "string") return e[key]
        }
    })

    if (e?.detail) {
        if (typeof e.detail === "string") return e.detail

        if (e.detail?.msg && typeof e.detail?.msg === "string") return e.detail?.msg
        if (e.detail?.message && typeof e.detail?.message === "string") return e.detail?.message
    }

    return null

}