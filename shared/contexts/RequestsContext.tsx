import React, {createContext, PropsWithChildren, useContext, useState} from "react";
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
        if (requestsQueue.requests.length) {
            const bucket = requestsController.addRequest(requestsQueue)
            setRequestsQueue(() => createRequestsBucket())
            await bucket.send()
            return await bucket.content()
        }
    }

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