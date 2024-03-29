import {SessionContextType, useSessionContext} from "../contexts/SessionContext";
import {SessionStatusContextType, useSessionStatusContext} from "../contexts/SessionStatusContext";
import {SessionStatusType} from "../types/SessionStatusType";
import {Router} from "expo-router/build/types";
import {NoSessionStatusError} from "./errors/NoSessionStatusError";
import {useActivityContext} from "../contexts/ActivityContext";
import {NoActivityIdError} from "./errors/NoActivityIdError";
import {InvalidSessionTypeError} from "./errors/InvalidSessionTypeError";
import {ActivityNotFoundError} from "./errors/ActivityNotFoundError";
import {Session} from "../classes/Session";
import { ulid } from 'ulidx'

export function newSession (activityId: string, sessionContext: SessionContextType, statusContext: SessionStatusContextType){
    const newSession = new Session({
        _id: ulid(),
        type: "activity",
        start: new Date(),
        type_id: activityId,
        label: "Nouveau Pointage de John DOE",
        comment: "",
        status: "started",
        owner: null,
        raw_datas: [],
        raw_variables: []
    })
    sessionContext.addSession(newSession);
    openSession(newSession._id, sessionContext, statusContext);
}

export function openSession(sessionId: string, sessionContext: SessionContextType, statusContext: SessionStatusContextType) {
    if (statusContext.getStatus()) throw new Error("Session already started");
    statusContext.setStatus("started");
    statusContext.setPayload(sessionId);
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
 */
export default function getCurrentSession() {
    const { getStatus, getPayload } = useSessionStatusContext()
    const { getSessionById } = useSessionContext()

    if (getStatus()) {
        const payload = getPayload()
        if (!payload || typeof payload !== "string") {
            return null
        }

        return getSessionById(payload) || null
    }

    return null
}

/**
 * Get the current activity from the current session.
 *
 * @throws NoActivityIdError
 * @throws InvalidSessionTypeError
 * @throws ActivityNotFoundError
 */
export function getCurrentActivity() {
    const { getActivityById } = useActivityContext()
    const session = getCurrentSession()

    if (!session) {
        throw new NoSessionStatusError()
    }

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