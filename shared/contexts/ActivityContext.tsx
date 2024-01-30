import React, {createContext, PropsWithChildren, useContext, useState} from "react";
import {ActivityType} from "../types/ActivityType";
import {useEffect} from "react";

type ActivityContextType = {
    activities: ActivityType[],
    addActivity: (activity: ActivityType) => void,
    removeActivity: (id: string) => void,
    getActivityById: (id: string) => ActivityType | undefined
}

export const ActivityContext= createContext<ActivityContextType>({
    activities: [],
    addActivity: (activity: ActivityType) => {},
    removeActivity: (id: string) => {},
    getActivityById: (id: string): ActivityType => { return {_id: "", label: "", color: ""} }
})

const ActivityContextProvider = ({ children }: PropsWithChildren<{}>) => {
    const [activities, setActivities] = useState<ActivityType[]>([])

    const fetchActivitiesFromAPI = async () => {
        try {
            const response = await fetch("https://api.pebble.solutions/v5/activity/"); // Remplacez URL_DE_VOTRE_API par l'URL de votre API
            const data = await response.json();
            setActivities(data);
        } catch (error) {
            console.error("Erreur lors de la récupération des activités depuis l'API:", error);
        }
    }

    useEffect(() => {
        fetchActivitiesFromAPI();
    }, []); 

    const addActivity = (activity: ActivityType) => {
        setActivities([...activities, activity])
    }

    const removeActivity = (id: string) => {
        setActivities((prev) => {
            return prev.filter(e => e._id !== id)
        })
    }

    const getActivityById = (id: string) => {
        return activities.find(e => e._id === id)
    }

    return (
        <ActivityContext.Provider value={{activities, addActivity, removeActivity, getActivityById}}>
            {children}
        </ActivityContext.Provider>
    )
}

export default ActivityContextProvider

export const useActivityContext = () => {
    const context = useContext(ActivityContext)

    if (!context) {
        throw new Error("useActivityContext must be used inside the ActivityContextProvider")
    }

    return context
}