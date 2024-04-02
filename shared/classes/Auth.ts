import {AuthorizationInterface} from "@pebble-solutions/api-request/lib/types/interfaces";
import {getAuth, signInWithEmailAndPassword, signOut, User} from "firebase/auth"
import {app} from "../../config/firebase"
import {postRequest} from "@pebble-solutions/api-request";
import {NotAuthenticatedError} from "./errors/NotAuthenticatedError";
import {NotAuthorizedError} from "./errors/NotAuthorizedError";
import {AuthorizationContentError} from "./errors/AuthorizationContentError";
import {PebbleToken} from "../types/PebbleToken";

type AuthorizationEvent = {
    name: string,
    callback: (event?: any) => void
}

export class Auth implements AuthorizationInterface {

    readonly firebaseAuth

    private _user: User | null

    private _tokenData: PebbleToken | null

    private events: AuthorizationEvent[]

    constructor() {
        this.firebaseAuth = getAuth(app)
        this._user = null
        this._tokenData = null
        this.events = []

        const currentUser = this.firebaseAuth.currentUser
        if (currentUser) {
            this.setUser(currentUser)
        }
    }

    setUser(user: User | null) {
        this._user = user
        this.dispatchEvent("userChange", user)
    }

    setTokenData(tokenData: PebbleToken | null) {
        this._tokenData = tokenData
        this.dispatchEvent("authorizationChange", tokenData)
    }

    get user() {
        return this._user
    }

    get tokenData() {
        return this._tokenData
    }

    async loginWithPassword(username: string, password: string) {
        const userCred = await signInWithEmailAndPassword(this.firebaseAuth, username, password)
        this.setUser(userCred.user)
        await this.getAuthorization()
    }

    async logout() {
        await signOut(this.firebaseAuth)
        this.setUser(null)
    }

    get isAuthenticated() {
        return !!this.user
    }

    async getAuthorization() {
        const request = postRequest("https://api.pebble.solutions/v5/authorize/auth", {
            "app": "mate"
        }).withAuth({
            getToken: async () => {
                if (!this.user) {
                    throw new NotAuthenticatedError()
                }
                return await this.user.getIdToken()
            }
        })

        try {
            await request.send()
        }
        catch (e: any) {
            await this.logout()
            throw new NotAuthorizedError(e)
        }

        try {
            const tokenData: PebbleToken = await request.content()
            this.setTokenData(tokenData)
            return tokenData
        }
        catch (e) {
            this.setTokenData(null)
            throw new AuthorizationContentError(e)
        }
    }

    isExpiredAuthorization() {
        if (!this.tokenData) return true
        const exp = new Date(this.tokenData.exp * 1000);
        const now = new Date()
        return exp.getTime() < now.getTime();
    }

    addEvent(name: string, callback: (event?: any) => void) {
        this.events.push({name, callback})
    }

    dispatchEvent(name: string, event?: any) {
        const events = this.events.filter(e => e.name === name)
        events.forEach(e => e.callback(event))
    }

    async getToken() {

        let authToken: PebbleToken | null = this.tokenData

        if (this.isExpiredAuthorization()) {
            /* In order to avoid parallel requests that could require new authorization at the same time, the current
             * authorization response is returned without any cache.
             *
             * Parallel requests could generate iat error if the response delay for the authorization change the order
             * of initial requests.
             *
             * Example :
             * - Request 1 need new authorization
             * - Request 2 need new authorization at the same time
             * - Authorization for request 2 is returned first
             * - Authorization for request 1 is returned secondly
             *
             * In this example, the order of authorization response diverge from the order of the initial requests.
             */
            authToken = await this.getAuthorization()
        }

        if (!authToken) {
            throw new NotAuthorizedError("Récupération du token impossible!")
        }

        return authToken.token
        //return Promise.resolve("eyJhbGciOiJSUzI1NiIsImtpZCI6Im45aTVQcjIzR3ljZWhsWFFPYVl5Zng4ZEtmMk9YRlBtLUNFMC01eHZWQkEiLCJ0eXAiOiJhdCtqd3QifQ.eyJzdWIiOiJ0ZXN0QHBlYmJsZS5iemgiLCJpc3MiOiJsb2NhbGhvc3QiLCJhdWQiOlsiYWN0aXZpdHkvdjUiLCJtZXRyaWMvdjUiXSwidGlkIjoiMWplMzRrLWVkNDVkc3NxLWVrIiwicm9sZXMiOltdLCJsdiI6MSwiY2xpZW50X2lkIjoiMDFIVDJTSzhOSjBOOTFHU1Q2SzFTMUJSMUIiLCJzY29wZSI6Im1ldHJpYzpjcmVhdGUgbWV0cmljOnJlYWQub3duIG1ldHJpYzp3cml0ZS5vd24gbWV0cmljOmRlbGV0ZS5vd24gYWN0aXZpdHk6cmVhZCBtZXRyaWM6bGlzdC5vd24gdmFyaWFibGU6bGlzdCBhY3Rpdml0eTp3cml0ZSBhY3Rpdml0eTpkZWxldGUgYWN0aXZpdHk6Y3JlYXRlIiwiaWF0IjoxNzExNzIxNDk2LCJleHAiOjE4MjI4MzUwOTYsImp0aSI6IjEzNWI4Njk1LTA4YTItNDExNi05MjdmLWM4OTk4MDA5YjU3YiJ9.XFwAUuyZIZfktAAO8rNXpxswNCZ29_z7-2I7gb3wDaT7ZFsNjqNjoS9FxBNQlALZPGccQSvIXGmTd_jY0oyth11b6XkNs930Mj6YA3fAX6lc1aZEpCjKTJhj0zPGN2zUe6eq0_Quo_5i8-JRMqaJj65MD9pr-fmPWrzhCgjgNdhGUrMjNl8fnalY09OGqM_C9ugRr4rDkz3yjWeYgvOeHKenJNuOP79xppiN4aq3_dNdhCRBDZcQHCfxF4PzZlhzcgGmgYiXSm_8FxaG6tJlx3ciBHHQMMy-RER4HUDI5i2OLsPM1oIxr1KdCDo46qBn_HntJXIjIo4Lbta2Egm9FA")
    }

}