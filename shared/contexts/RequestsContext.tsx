import React, {createContext, PropsWithChildren, useContext, useState} from "react";
import {RequestsController} from "@pebble-solutions/api-request";
import {createRequestsController} from "@pebble-solutions/api-request";

type RequestsContextType = {
    controller: RequestsController
}

const RequestsContext= createContext<RequestsContextType | null>(null)

const RequestsContextProvider = ({children}: PropsWithChildren<{}>) => {
    const [controller] = useState(createRequestsController())

    return (
        <RequestsContext.Provider value={{controller}}>
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