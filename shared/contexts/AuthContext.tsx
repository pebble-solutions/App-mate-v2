import React, {createContext, PropsWithChildren, useContext, useEffect, useRef, useState} from "react";
import {createRequestsBucket, createRequestsController} from "@pebble-solutions/api-request";
import {Bucket, Request, RequestsController} from "@pebble-solutions/api-request/lib/types/classes";
import {Auth} from "../classes/Auth";
import {User} from "firebase/auth"
import {onUserChange} from "../libs/auth";
import {SafeAreaView, Text} from "react-native";
import LoginForm from "../../components/Auth/LoginForm";
import {globalStyles} from "../globalStyles";

type AuthContextType = {
    auth: Auth,
    user: User | null
}

const AuthContext= createContext<AuthContextType | null>(null)

const AuthContextProvider = ({children}: PropsWithChildren) => {
    const [auth, setAuth] = useState(new Auth())
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        // Initialize requests queue at startup
        const rootAuth = auth
        return onUserChange(auth, (newUser) => {
            setUser(newUser)
            setAuth(rootAuth)
        })
    }, []);

    return (
        <AuthContext.Provider value={{auth, user}}>
            {user ? children : <SafeAreaView style={[globalStyles.mainContainer, globalStyles.contentCenter, globalStyles.mh3Container]}>
                <LoginForm auth={auth} />
            </SafeAreaView>}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("useAuthContext must be used inside the AuthContextProvider")
    }

    return context
}