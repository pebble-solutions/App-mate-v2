import React, { createContext, PropsWithChildren, useContext, useState } from "react";
import { ActivityType } from "../types/ActivityType";
import { useEffect } from "react";
import { Activity } from "../classes/Activity";

type ActivityContextType = {
    activities: ActivityType[]
    addActivity: (activity: ActivityType) => void
    removeActivity: (id: string) => Promise<void>
    getActivityById: (id: string) => ActivityType | undefined
    editActivity: (id: string, updatedActivity: ActivityType) => void
    linkVariableToActivity: (activityId: string, variableId: string) => void
    removeVariableFromActivity: (activityId: string, variableId: string) => void
    toggleMandatory: (activityId: string, variableId: string, mandatory: boolean) => void
    loading: boolean
}

const ActivityContext = createContext<ActivityContextType | null>(null)

const ActivityContextProvider = ({ children }: PropsWithChildren<{}>) => {
    const [activities, setActivities] = useState<ActivityType[]>([])
    const [loading, setLoading] = useState(true)

    const fetchActivitiesFromAPI = async () => {
        try {
            setLoading(true)
            const response = await fetch("https://api.pebble.solutions/v5/activity/"); // Remplacez URL_DE_VOTRE_API par l'URL de votre API
            const data = await response.json();
            let activitiesList: ActivityType[] = [];
            data.forEach((incomingActivity: any) => {
                activitiesList.push(new Activity(incomingActivity));
            });
            setActivities(activitiesList);
        } catch (error) {
            console.error("Erreur lors de la récupération des activités depuis l'API:", error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchActivitiesFromAPI();
    }, []);

    const addActivity = async (activity: ActivityType) => {
        try {
            const response = await fetch("https://api.pebble.solutions/v5/activity/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    label: activity.label,
                    start: activity.start,
                    description: activity.description,
                    color: activity.color,
                }),
            });

            if (response.ok) {
                const newActivity = await response.json();
                fetchActivitiesFromAPI();
            } else {
                console.error("Erreur lors de la création de l'activité:", response.statusText);
            }
        } catch (error) {
            console.error("Erreur lors de la création de l'activité:", error);
        }
    }

    const editActivity = async (id: string, activity: ActivityType) => {
        try {
            const response = await fetch(`https://api.pebble.solutions/v5/activity/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    label: activity.label,

                    start: activity.start.toISOString(),
                    description: activity.description,
                    color: activity.color,

                }),
            });

            if (response.ok) {
                fetchActivitiesFromAPI();
                return true;
            } else {
                console.error("Erreur lors de la modification de l'activité:", response.statusText);
                return false; 
            }
        } catch (error) {
            console.error("Erreur lors de la modification de l'activité:", error);
            return false;
        }
    }

    const toggleMandatory = async (activityId: string, variableId: string, mandatory: boolean) => {
        try {
            const response = await fetch(`https://api.pebble.solutions/v5/activity/${activityId}/metric/variable/${variableId}/toggle_mandatory`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                fetchActivitiesFromAPI();
            } else {
                console.error("Erreur1 lors de la modification de la variable:", response.statusText);
            }
        } catch (error) {
            console.error("Erreur2 lors de la modification de la variable:", error);
        }
    }

    const linkVariableToActivity = async (activityId: string, variableId: string) => {
        try {
            const response = await fetch(`https://api.pebble.solutions/v5/activity/${activityId}/metric/variable`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "variable_id": variableId,
                    "mandatory": true
                }),
            });

            if (response.ok) {
                fetchActivitiesFromAPI();
            } else {
                console.error("Erreur1 lors de la liaison de la variable à l'activité:", response.statusText);
            }

        } catch (error) {
            console.error("Erreur2 lors de la liaison de la variable à l'activité:", error);
        }
    }

    const removeVariableFromActivity = async (activityId: string, variableId: string): Promise<boolean> => {
        try {
            const response = await fetch(`https://api.pebble.solutions/v5/activity/${activityId}/metric/variable/${variableId}`, {
                method: "DELETE",
            });
    
            if (response.ok) {
                fetchActivitiesFromAPI();
                return true; // Retourner true pour indiquer le succès
            } else {
                console.error("Erreur lors de la suppression de la liaison de la variable à l'activité:", response.statusText);
                return false; // Retourner false pour indiquer l'échec
            }
        } catch (error) {
            console.error("Erreur lors de la suppression de la liaison de la variable à l'activité:", error);
            return false; // Retourner false pour indiquer l'échec
        }
    }

    const removeActivity = async (id: string) => {
        try {
            const response = await fetch(`https://api.pebble.solutions/v5/activity/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                fetchActivitiesFromAPI();
            } else {
                console.error("Erreur lors de la suppression de l'activité:", response.statusText);
            }

        } catch (error) {
            console.error("Erreur lors de la suppression de l'activité:", error);
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
            editActivity,
            linkVariableToActivity,
            removeVariableFromActivity,
            toggleMandatory,
            loading
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