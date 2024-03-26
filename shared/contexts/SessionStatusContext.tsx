import React, {createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState} from "react";
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
    resetPayload: () => void,
    exitStatus: boolean,
    setExitStatus: Dispatch<SetStateAction<boolean>>
}

const SessionStatusContext= createContext<SessionStatusContextType | null>(null)

const SessionStatusContextProvider = ({children}: PropsWithChildren<{}>) => {
    const [status, setStatus] = useState<StatusType>()
    const [payload, setPayload] = useState<PayloadType>()
    const [exitStatus, setExitStatus] = useState(false)

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
        <SessionStatusContext.Provider value={{
            status,
            getStatus,
            resetStatus,
            setStatus,
            getPayload,
            setPayload,
            resetPayload,
            exitStatus,
            setExitStatus
        }}>
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