import React, {createContext, PropsWithChildren, useContext, useState} from "react";
import {ActivityType} from "../types/ActivityType";
import { SessionType } from "../types/SessionType";
import {SessionStatusType} from "../types/SessionStatusType";

type StatusType = SessionStatusType
type PayloadType = string | number;


export type SessionStatusContextType = {
    status?: StatusType,
    payload?: PayloadType,
    getStatus: () => StatusType | undefined,
    setStatus: (status: StatusType) => void,
    resetStatus: () => void,
    getPayload: () => PayloadType | undefined,
    setPayload: (payload: PayloadType) => void,
    resetPayload: () => void
}

const SessionStatusContext= createContext<SessionStatusContextType | null>(null)

const SessionStatusContextProvider = ({children}: PropsWithChildren<{}>) => {
    const [status, setStatus] = useState<StatusType>()
    const [payload, setPayload] = useState<PayloadType>()



    const getStatus = () => {
        return status
    }

    const resetStatus = () => {
        setStatus(undefined)
    }

    const getPayload = () => {
        return payload;
    }

    const resetPayload = () => {
        setPayload(undefined)
    }
    
    
    return (
        <SessionStatusContext.Provider value={{status, getStatus, resetStatus, setStatus, getPayload, setPayload, resetPayload}}>
            {children}
        </SessionStatusContext.Provider>
    )
}

export default SessionStatusContextProvider

export const useSessionStatusContext = () => {
    const context = useContext(SessionStatusContext)

    if (!context) {
        throw new Error("useSessionStatusContext must be used inside the SessionStatusContextProvider")
    }

    return context
}