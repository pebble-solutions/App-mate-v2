import React, {createContext, PropsWithChildren, useContext, useEffect, useState} from "react";
import {createRequestsBucket, createRequestsController} from "@pebble-solutions/api-request";
import {Bucket, RequestsController} from "@pebble-solutions/api-request/lib/types/classes";

type RequestsContextType = {
    requestsController: RequestsController,
    requestsQueue: Bucket
}

const RequestsContext= createContext<RequestsContextType | null>(null)

const RequestsContextProvider = ({children}: PropsWithChildren<{}>) => {
    const [requestsController] = useState(createRequestsController())
    const [requestsQueue, setRequestsQueue] = useState(createRequestsBucket())

    const sendQueue = async () => {
        console.log("Je déclenche la queue")
        if (requestsQueue.requests.length) {
            console.log("quelque chose se présente")
            const bucket = requestsController.addRequest(requestsQueue)
            setRequestsQueue(() => createRequestsBucket())
            try {
                await bucket.send()
                const res = await bucket.content()
                console.log("C'est fait", res)
                return res
            } catch (e) {
                console.log("Erreur", e)
            }

        }
    }

    useEffect(() => {
        const timer = setInterval(sendQueue, 10000)
        return () => {
            clearTimeout(timer)
        }
    }, []);

    return (
        <RequestsContext.Provider value={{requestsController, requestsQueue}}>
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