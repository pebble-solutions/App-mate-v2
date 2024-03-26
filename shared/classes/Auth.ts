import {AuthorizationInterface} from "@pebble-solutions/api-request/lib/types/interfaces";
import {User, getAuth, signOut} from "firebase/auth"
import {app} from "../../config/firebase"

export class Auth implements AuthorizationInterface {

    readonly firebaseAuth

    private user: User | null

    constructor() {
        this.firebaseAuth = getAuth(app)
        this.user = null
    }

    setUser(user: User | null) {
        this.user = user
    }

    login() {

    }

    async logout() {
        await signOut(this.firebaseAuth)
    }

    get isAuthenticated() {
        return false
    }

    getToken() {
        return Promise.resolve("eyJhbGciOiJSUzI1NiIsInR5cCI6ImF0K2p3dCIsImtpZCI6Im45aTVQcjIzR3ljZWhsWFFPYVl5Zng4ZEtmMk9YRlBtLUNFMC01eHZWQkEifQ.eyJhdWQiOlsiYXBpLnBlYmJsZS5zb2x1dGlvbnMvdjUvbWV0cmljIiwiYXBpLnBlYmJsZS5zb2x1dGlvbnMvdjUvYWN0aXZpdHkiXSwiZXhwIjoxNzQyNjMzMDE0LCJpYXQiOjE3MTExMDQ1OTcsImlzcyI6ImFwaS5wZWJibGUuc29sdXRpb25zL3Y1L2F1dGhvcml6ZSIsImx2Ijo1LCJyb2xlcyI6WyJtYW5hZ2VyIl0sInNjb3BlIjoiYWN0aXZpdHk6cmVhZCBhY3Rpdml0eTp3cml0ZSBhY3Rpdml0eTpjcmVhdGUgYWN0aXZpdHk6ZGVsZXRlIG1ldHJpYzpsaXN0Lm93biBtZXRyaWM6Y3JlYXRlIG1ldHJpYzpyZWFkLm93biBtZXRyaWM6d3JpdGUub3duIG1ldHJpYzpkZWxldGUub3duIiwic3ViIjoidGVzdEBwZWJibGUuYnpoIiwidGlkIjoiMWplMzRrLWVkNDVkc3NxLWVrIiwiY2xpZW50X2lkIjoiMDFIS1dEQlRaWFhHVzRHVzFHSEVQRzhYRlAiLCJqdGkiOiI2YjgzYzZkYy1lOWRjLTQyMTItODlkNC1mMjRjNzIwOGZkOWYifQ.dtjxo8d0WdocHw65WQ28EhFvi40pJ2tajgeGkgn_Pm92dsmwgxeU1jC22jJnIIiu6wEPhpVJO6qjNz7_7cqMaCB-aCxC6O0x63Di2LDEbFSADv6cW4xzNV5_qDGN_BPAG4fHNm_Sv-6srJYVVKxSCBpjGsdN0iwpHIlIUmpS3buMiRhjAtqZhBb-_QEa-UGJeJg7X1FC2Ntz1rpTEQAFUiltyVgQoAGhYg5AhYd7S-kK_ZWRpAsHXx3k6TLJgCadSFeLq3b_ivcxBw7LIw4sZ6mOqvArraVBv8cQ5iMHa8yCMxKzXWxBSUbVqWoYEGsSJGFF-hOcv7hILDg8tkKEAQ")
    }

}