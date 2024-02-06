import React, {createContext, PropsWithChildren, useContext, useState} from "react";
import {SessionType} from "../types/SessionType";

export type SessionContextType = {
    sessions: SessionType[],
    addSession: (session: SessionType) => void,
    removeSession: (id: string) => void,
    getSessionById: (id: string) => SessionType | undefined,
    updateSession: (id: string, newSession: SessionType) => void
    postSession: (id: string, session: SessionType) => void
}

const SessionContext= createContext<SessionContextType | null>(null)

const SessionContextProvider = ({ children }: PropsWithChildren<{}>) => {
    const [sessions, setSessions] = useState<SessionType[]>([])

    const addSession = (session: SessionType) => {
        setSessions([...sessions, session])
    }
    const postSessionViaApi = async ( session: SessionType) => {
        try {
            const response = await fetch("https://api.pebble.solutions/v5/metric/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    _id: session._id,
                    label:session.label,
                    type: session.type,
                    type_id: session.type_id,
                    start: session.start,
                    end: session.end,
                    owner: session.owner,
                    raw_datas: session.raw_datas,
                    raw_variables: session.raw_variables,
                }),
            });

            if (response.ok) {
                const newSession = await response.json();
                console.log(newSession)
                addSession(newSession)
                console.log(sessions)
            } else {
                console.error("Erreur lors de la création de la session")
            }
        } catch (error) {
            console.error("Erreur lors de la création de la session", error);
        }
    }
    const postSession = (id: string, session: SessionType) => {
        console.log(session, 'session');
        postSessionViaApi(session)
    }

    const removeSession = (id: string) => {
        setSessions((prev) => {
            return prev.filter(e => e._id !== id)
        })
    }

    const updateSession = (id: string, newSession: SessionType) => {
        let sessionsList = [...sessions]
        let prevIndex = sessionsList.findIndex(e => e._id === id)
        if (prevIndex !== -1) {
            sessionsList.splice(prevIndex, 1, newSession)
        } else {
            sessionsList.push(newSession)
        }
        setSessions(sessionsList)
    }
        


    const getSessionById = (id: string) => {
        return sessions.find(e => e._id === id)
    }

    return (
        <SessionContext.Provider value={{sessions, addSession, removeSession, getSessionById, updateSession, postSession}}>
            {children}
        </SessionContext.Provider>
    )
}

export default SessionContextProvider

export const useSessionContext = () => {
    const context = useContext(SessionContext)

    if (!context) {
        throw new Error("useSessionContext must be used inside the SessionContextProvider")
    }

    return context
}