import {useSessionStatusContext} from "../../../shared/contexts/SessionStatusContext";
import {Redirect, router} from "expo-router";
import {useEffect} from "react";
import {navigate} from "../../../shared/libs/session";

export default function SessionScreen() {

    const { getStatus } = useSessionStatusContext()
    const status = getStatus()
    


    if (getStatus()) {
        return <Redirect href="/session/clock" />
    }
    else {
        return <Redirect href="/session/list" />
    }
}