import React, { createContext, PropsWithChildren, useContext, useState } from "react";
import {ActivityType, JsonActivityType} from "../types/ActivityType";
import { useEffect } from "react";
import { Activity } from "../classes/Activity";
import {deleteRequest, getRequest, patchRequest, postRequest} from "@pebble-solutions/api-request";
import {useRequestsContext} from "./RequestsContext";
import {ReadParamsType} from "@pebble-solutions/api-request/lib/types/types";
import {VariableType} from "../types/VariableType";
import { ulid } from 'ulidx'

type ActivityContextType = {
    activities: ActivityType[]
    addActivity: (activity: Activity) => void
    removeActivity: (id: string) => void
    getActivityById: (id: string) => ActivityType | undefined
    updateActivity: (activity: Activity) => void
    linkVariableToActivity: (activityId: string, variable: VariableType) => void
    removeVariableFromActivity: (activityId: string, variableId: string) => void
    fetchActivitiesFromAPI: (params?: ReadParamsType) => void
    toggleVariableMandatory: (activityId: string, variable: VariableType) => void
    setVariableMandatory: (activityId: string, variableId: string, mandatory: boolean) => void
    loading: boolean
    pending: boolean
}

const ActivityContext = createContext<ActivityContextType | null>(null)

const ActivityContextProvider = ({ children }: PropsWithChildren<{}>) => {
    const [activities, setActivities] = useState<ActivityType[]>([])
    const {requestsController, pushRequest} = useRequestsContext()
    const [loading, setLoading] = useState(true)
    const [pending, setPending] = useState(false)

    const updateActivitiesState = (activities: ActivityType[] | JsonActivityType[]) => {
        setActivities((prev) => {
            let activitiesList = [...prev]

            activities.forEach(activity => {
                const prevIndex = activitiesList.findIndex(e => e._id === activity._id)
                if (prevIndex !== -1) {
                    activitiesList.splice(prevIndex, 1, new Activity(activity))
                } else {
                    activitiesList.push(new Activity(activity))
                }
            })

            return activitiesList
        })
    }

    const removeFromActivitiesState = (activitiesId: string[]) => {
        setActivities((prev) => prev.filter(e => !activitiesId.includes(e._id)))
    }

    const addActivity = (activity: Activity) => {
        if (!activity._id) {
            activity._id = ulid()
        }
        pushRequest(postRequest("https://api.pebble.solutions/v5/activity/", activity.json()))
        updateActivitiesState([activity])
    }

    const removeActivity = (id: string) => {
        pushRequest(deleteRequest("https://api.pebble.solutions/v5/activity/"+id))
        removeFromActivitiesState([id])
    }

    const updateActivity = (activity: Activity) => {
        pushRequest(patchRequest("https://api.pebble.solutions/v5/activity/"+activity._id, activity.json()))
        updateActivitiesState([activity])
    }

    const fetchActivitiesFromAPI = async (params?: ReadParamsType) => {
        const request = requestsController.addRequest(
            getRequest("https://api.pebble.solutions/v5/activity/", params)
        )
        setPending(true)
        try {
            await request.send()
            const data: JsonActivityType[] = await request.content()
            updateActivitiesState(data)
        } catch (e)  {
            throw e
        } finally {
            setPending(false)
        }
    }

    useEffect(() => {
        setLoading(true)
        fetchActivitiesFromAPI().finally(() => setLoading(false))
    }, []);

    const getVariableFromActivity = (activityId: string, variableId: string) => {
        const activity = getActivityById(activityId)
        if (!activity) return
        return activity.variables.find(e => e._id === variableId)
    }

    const setVariableMandatory = (activityId: string, variableId: string, mandatory: boolean) => {
        const activity = getActivityById(activityId)
        if (!activity) return
        const index = activity.variables.findIndex(e => e._id === variableId)
        if (index === -1) return

        activity.variables[index].mandatory = mandatory

        pushRequest(patchRequest(`https://api.pebble.solutions/v5/activity/${activity._id}`, {
            variables: activity.variables
        }))
        updateActivitiesState([activity])
    }

    const toggleVariableMandatory = (activityId: string, variable: VariableType) => {
        setVariableMandatory(activityId, variable._id, !variable.mandatory)
    }

    const linkVariableToActivity = (activityId: string, variable: VariableType) => {
        const activity = getActivityById(activityId)

        if (!activity) return
        if (activity.variables.find(e => e._id === variable._id)) return

        pushRequest(postRequest(`https://api.pebble.solutions/v5/activity/${activity._id}/metric/variable`, {
            "variable_id": variable._id,
            "mandatory": true
        }))
        activity.variables.push({...variable, mandatory: true})
        updateActivitiesState([activity])
    }

    const removeVariableFromActivity = (activityId: string, variableId: string) => {
        const activity = getActivityById(activityId)
        if (!activity) return
        const index = activity.variables.findIndex(e => e._id === variableId)

        if (index !== -1) {
            pushRequest(deleteRequest(`https://api.pebble.solutions/v5/activity/${activityId}/metric/variable/${variableId}`))
            activity.variables.splice(index, 1)
            updateActivitiesState([activity])
        }
    }

    const getActivityById = (id: string) => {
        return activities.find(e => e._id === id)
    }

    return (
        <ActivityContext.Provider value={{
            activities,
            addActivity,
            removeActivity,
            getActivityById,
            linkVariableToActivity,
            removeVariableFromActivity,
            toggleVariableMandatory,
            setVariableMandatory,
            updateActivity,
            loading,
            pending,
            fetchActivitiesFromAPI
        }}>
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