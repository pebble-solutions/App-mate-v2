import {Auth} from "../classes/Auth";
import {User} from "firebase/auth";
import {PebbleToken} from "../types/PebbleToken";

export function onUserChange(auth: Auth, callback: (newUser: User | null) => void) {
    auth.addEvent("userChange", callback)
}

export function onAuthorizationChange(auth:Auth, callback: (newTokenData: PebbleToken | null) => void) {
    auth.addEvent("authorizationChange", callback)
}