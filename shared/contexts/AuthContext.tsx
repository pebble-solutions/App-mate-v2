import React, {createContext, PropsWithChildren, useContext, useEffect, useRef, useState} from "react";
import {Auth} from "../classes/Auth";
import {User} from "firebase/auth"
import {onAuthorizationChange, onUserChange} from "../libs/auth";
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
    const [isAuthorized, setIsAuthorized] = useState(false)

    useEffect(() => {
        onAuthorizationChange(auth, (newTokenData) => {
            setIsAuthorized(!!newTokenData)
        })

        return onUserChange(auth, (newUser) => {
            setUser(newUser)
        })
    }, []);

    return (
        <AuthContext.Provider value={{auth, user}}>
            {user && isAuthorized ? children : <SafeAreaView style={[globalStyles.mainContainer, globalStyles.contentCenter, globalStyles.mh3Container]}>
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