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
        this._user = this.firebaseAuth.currentUser
        this._tokenData = null
        this.events = []
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
            const tokenData = await request.content()
            this.setTokenData(tokenData)
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
        /*if (this.isExpiredAuthorization()) {
            await this.getAuthorization()
        }

        if (!this.tokenData) {
            throw new NotAuthorizedError("Récupération du token impossible!")
        }

        return this.tokenData.token*/
        return Promise.resolve("eyJhbGciOiJSUzI1NiIsImtpZCI6Im45aTVQcjIzR3ljZWhsWFFPYVl5Zng4ZEtmMk9YRlBtLUNFMC01eHZWQkEiLCJ0eXAiOiJhdCtqd3QifQ.eyJzdWIiOiJ0ZXN0QHBlYmJsZS5iemgiLCJpc3MiOiJsb2NhbGhvc3QiLCJhdWQiOlsiYWN0aXZpdHkvdjUiLCJtZXRyaWMvdjUiXSwidGlkIjoiMWplMzRrLWVkNDVkc3NxLWVrIiwicm9sZXMiOltdLCJsdiI6MSwiY2xpZW50X2lkIjoiMDFIVDJTSzhOSjBOOTFHU1Q2SzFTMUJSMUIiLCJzY29wZSI6Im1ldHJpYzpjcmVhdGUgbWV0cmljOnJlYWQub3duIG1ldHJpYzp3cml0ZS5vd24gbWV0cmljOmRlbGV0ZS5vd24gYWN0aXZpdHk6cmVhZCBtZXRyaWM6bGlzdC5vd24gdmFyaWFibGU6bGlzdCIsImlhdCI6MTcxMTcyMTQ5NiwiZXhwIjoxODIyODM1MDk2LCJqdGkiOiIxMzViODY5NS0wOGEyLTQxMTYtOTI3Zi1jODk5ODAwOWI1N2IifQ.gap2QZZAbPior8nrjRmjXB_dzinMqRuujEN-2tT-hK1OoO5YUo-GVepZ9ZoLVFdVN1bA2mAqOpR5giKbHerLmqXMQV_QGpDzeZQzN-XTCKT_v7O14T7zc7abiYDPb_8j2ysIwovsS7vmo3nAQxQBRVlUyeioDLoIjEgkhm_2VHCWseai9eyTR_QvjYPUitW_oxBwiCUGF00dfTj2qeCYRLuTpRtzBlSGKZ2E6nL30e7LsCDllhA16RVcbn9SnWBI5LPB7LlQEWDw92HwRo1yaV2bZcMTm1yB2iiKUzSQKpcm2DSw_DdP4xnun1oO3XNIV_DJmpfKW1niDQOO1Zd1MA")
    }

}