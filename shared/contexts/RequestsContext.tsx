import React, {createContext, PropsWithChildren, useContext, useEffect, useRef, useState} from "react";
import {createRequestsBucket, createRequestsController} from "@pebble-solutions/api-request";
import {Bucket, Request, RequestsController} from "@pebble-solutions/api-request/lib/types/classes";
import {Auth} from "../classes/Auth";
import {User} from "firebase/auth"
import {useAuthContext} from "./AuthContext";

type RequestsContextType = {
    requestsController: RequestsController,
    pushRequest: (request: Request | Bucket) => void,
    auth: Auth,
    user: User | null,
    pushError: (e: any) => void
}

const RequestsContext= createContext<RequestsContextType | null>(null)

const RequestsContextProvider = ({onError, children}: PropsWithChildren<{onError?: (error: any) => void}>) => {
    //const {auth, user} = useAuth()
    const {auth, user} = useAuthContext()
    const [requestsController] = useState(createRequestsController().withAuth(auth))
    const requestsQueue = useRef(createRequestsBucket())

    const pushRequest = (request: Request | Bucket) => {
        requestsQueue.current.addRequest(request)
    }

    const sendQueue = async () => {
        const queue = requestsQueue.current

        if (queue.requests.length) {
            const bucket = requestsController.addRequest(queue)
            requestsQueue.current = createRequestsBucket()
            try {
                await bucket.send()
                return await bucket.content()
            } catch (e) {
                if (typeof onError !== "undefined") onError(e)
                console.error("API Exchange error", e)
            }

        }
    }

    useEffect(() => {
        // Initialize requests queue at startup
        const timer = setInterval(sendQueue, 1000)
        return () => {
            // Each time context is destroyed, queue is cleared
            clearTimeout(timer)
        }
    }, []);

    const pushError = (e: any) => {
        if (onError) onError(e)
        console.error("API Exchange error", e)
    }

    return (
        <RequestsContext.Provider value={{requestsController, pushRequest, auth, user, pushError}}>
            {children}
        </RequestsContext.Provider>
    )
}

export default RequestsContextProvider

export const useRequestsContext = () => {
    const context = useContext(RequestsContext)

    if (!context) {
        throw new Error("useRequestsContext must be used inside the RequestsContextProvider")
    }

    return context
}