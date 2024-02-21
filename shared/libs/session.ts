import {SessionContextType, useSessionContext} from "../contexts/SessionContext";
import {SessionStatusContextType, useSessionStatusContext} from "../contexts/SessionStatusContext";
import { SessionType } from "../types/SessionType";
import {SessionStatusType} from "../types/SessionStatusType";
import {Router} from "expo-router/build/types";
import {InvalidSessionIDError} from "./errors/InvalidSessionIDError";
import {SessionNotFoundError} from "./errors/SessionNotFoundError";
import {NoSessionStatusError} from "./errors/NoSessionStatusError";
import {useActivityContext} from "../contexts/ActivityContext";
import {NoActivityIdError} from "./errors/NoActivityIdError";
import {InvalidSessionTypeError} from "./errors/InvalidSessionTypeError";
import {ActivityNotFoundError} from "./errors/ActivityNotFoundError";

export function startSession (activityId: string, sessionContext: SessionContextType, statusContext: SessionStatusContextType){
    if (statusContext.getStatus()) throw new Error("Session already started");
    let r = (Math.random() + 1).toString(36).substring(7);

    const newSession: SessionType = {
        _id: r,
        type: "activity",
        start: new Date(),
        end: undefined,
        type_id: activityId,
        label: "Nouveau Pointage de John DOE",
        comment: "",
        status: "started",
        owner: {
            _id: "1",
            firstName: "John",
            lastName: "Doe",
            matricule: "ANDROID-1234",
        },
        raw_datas: [],
        raw_variables: [],
    }
    console.log(newSession, sessionContext, 'newSession')
    sessionContext.addSession(newSession);
    statusContext.setStatus("started");
    statusContext.setPayload(newSession._id);
}

/**
 * Navigate to the route corresponding to the provided status
 *
 * @param status            Session status
 * @param router            Expo router object
 */
export function navigate(status: SessionStatusType | null, router: Router) {
    router.navigate(getRouteByStatus(status))
}

/**
 * Get route name corresponding to the provided status
 *
 * @param status            Session status
 */
export function getRouteByStatus(status?: SessionStatusType | null) {
    const routesByStatus = {
        "started": "/session/clock",
        "paused": "/session/clock",
        "start": "/session/clock",
        "pause": "/session/clock",
        "validate": "/session/validate",
        "validating": "/session/validating"
    }

    if (status) {
        return routesByStatus[status]
    }
    else {
        return "/session/list"
    }
}

/**
 * Get the current session stored in the session status context
 *
 * @throws InvalidSessionIDError
 * @throws SessionNotFoundError
 * @throws NoSessionStatusError
 */
export default function getCurrentSession() {
    const { getStatus, getPayload } = useSessionStatusContext()
    const { getSessionById } = useSessionContext()

    if (getStatus()) {
        const payload = getPayload()
        if (!payload || typeof payload !== "string") {
            throw new InvalidSessionIDError(payload)
        }

        const session = getSessionById(payload)

        if (!session) {
            throw new SessionNotFoundError(payload)
        }

        return session
    }

    throw new NoSessionStatusError()
}

/**
 * Get the current activity from the current session.
 *
 * @throws NoActivityIdError
 * @throws InvalidSessionTypeError
 * @throws ActivityNotFoundError
 */
export function getCurrentActivity() {
    const session = getCurrentSession()
    const { getActivityById } = useActivityContext()

    if (!session.type_id) {
        throw new NoActivityIdError()
    }
    if (session.type !== "activity") {
        throw new InvalidSessionTypeError(session.type, "activity")
    }

    const activity = getActivityById(session.type_id)

    if (!activity) {
        throw new ActivityNotFoundError(session.type_id)
    }

    return activity
}