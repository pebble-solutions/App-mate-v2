import React, {createContext, PropsWithChildren, useContext, useState} from "react";
import {ActivityType} from "../types/ActivityType";

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
    getActivityById: (id: string): ActivityType => { return {id: "", label: "", color: ""} }
})

const ActivityContextProvider = ({children}: PropsWithChildren<{}>) => {
    const [activities , setActivities] = useState<ActivityType[]>([
        {label: "Activity 1", description: "My activity description 1", color: "blueviolet", id: "dkeo20d"},
        {label: "Activity 2", description: "My activity description 2", color: "cadetblue", id: "d2jd03s"},
        {label: "Activity 3", description: "My activity description 3", color: "crimson", id: "dsra00z"},
        {label: "Activity 4", description: "My activity description 4", color: "cadetblue", id: "adkr0za"},
    ])

    const addActivity = (activity: ActivityType) => {
        setActivities([...activities, activity])
    }

    const removeActivity = (id: string) => {
        setActivities((prev) => {
            return prev.filter(e => e.id !== id)
        })
    }

    const getActivityById = (id: string) => {
        return activities.find(e => e.id === id)
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