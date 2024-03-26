import {useSessionStatusContext} from "../../../shared/contexts/SessionStatusContext";
import {Redirect, router} from "expo-router";

export default function SessionScreen() {

    const { getStatus } = useSessionStatusContext()

    if (getStatus()) {
        return <Redirect href="/session/clock" />
    }
    else {
        return <Redirect href="/session/list" />
    }
}