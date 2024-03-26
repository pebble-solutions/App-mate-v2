import {useEffect, useState} from "react";
import {onAuthStateChanged, User} from "firebase/auth";
import {Auth} from "../classes/Auth";

export default function useAuth() {

    const [user, setUser] = useState<User | null>(null)
    const [auth, setAuth] = useState(new Auth())

    useEffect(() => {
        return onAuthStateChanged(auth.firebaseAuth, user => {
            setUser(() => user)
        })
    }, []);

    useEffect(() => {
        auth.setUser(user)
    }, [user]);

    return {user, auth}
}