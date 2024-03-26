import {useEffect, useState} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {app} from "../../config/firebase";
import {Auth} from "../classes/Auth";

export default function useAuth() {
    const [user, setUser] = useState(null)
    const [auth, setAuth] = useState(new Auth())

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, )
    }, []);

}