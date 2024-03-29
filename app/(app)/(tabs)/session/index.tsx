import {useSessionStatusContext} from "../../../../shared/contexts/SessionStatusContext";
import {Redirect, router} from "expo-router";

export default function SessionScreen() {

    const { status } = useSessionStatusContext()

    if (status) {
        return <Redirect href="/session/clock" />
    }
    else {
        return <Redirect href="/session/list" />
    }
}