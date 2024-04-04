import {globalStyles} from "../../../shared/globalStyles";
import Carousel from "react-native-reanimated-carousel";
import ActivityOverview from "../../../components/Activity/ActivityOverview";
import {navigate, newSession, openSession} from "../../../shared/libs/session";
import {Alert, Dimensions, SafeAreaView, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {useActivityContext} from "../../../shared/contexts/ActivityContext";
import {useSessionContext} from "../../../shared/contexts/SessionContext";
import {useSessionStatusContext} from "../../../shared/contexts/SessionStatusContext";
import {useAuthContext} from "../../../shared/contexts/AuthContext"
import {router} from "expo-router";
import FullscreenLoader from "../../../components/FullscreenLoader";
import {ActivityType} from "../../../shared/types/ActivityType";
import {SessionType} from "../../../shared/types/SessionType";

export default function ListScreen() {
    const { activities, loading } = useActivityContext()
    const sessionContext = useSessionContext()
    const { sessions } = sessionContext
    const statusContext = useSessionStatusContext()
    const { status } = statusContext
    const [activeActivities, setActiveActivities] = useState<ActivityType[]>([])
    const {user} = useAuthContext()


    // If session status change, we run the navigate function from session library
    useEffect(() => {
        navigate(status || null, router)
    }, [status])

    useEffect(() => {
        setActiveActivities(() => activities.filter(e => e.is_active))
    }, [activities]);

    const width = Dimensions.get('window').width;

    const activeSessionsFromActivity = (sessions: SessionType[], activityId: string) => {
        return sessions.filter(e => e.type_id === activityId && e.type.toLowerCase() === "activity" && e.is_active)
    }

    // Action on new session button is pressed. If some session already exists on provided activity, the user will
    // choose between starting a new session or recovering the last one.
    const newSessionHandler = (activity: ActivityType) => {
        const sessions = activeSessionsFromActivity(sessionContext.sessions, activity._id)
        if (sessions.length) {
            Alert.alert("Session en cours", "Il y a déjà une session en cours sur" +
                " cette activitée.", [
                {
                    text: "Reprendre la dernière session",
                    onPress: () => openSession(sessions[sessions.length-1]._id, sessionContext, statusContext)
                },
                {
                    text: "Démarrer une nouvelle session",
                    onPress: () => newSession(activity._id, sessionContext, statusContext, user, 'cron')
                },
                {
                    text: "Annuler"
                }
            ])
        }
        else {
            newSession(activity._id, sessionContext, statusContext, user, "cron")
        }
    }

    const openSessionHandler = (session: SessionType) => openSession(session._id, sessionContext, statusContext)


    const manualSessionHandler = (activity: ActivityType) => {
        newSession(activity._id, sessionContext, statusContext, user, "manual")
    }

    return (
        <SafeAreaView style={globalStyles.body}>
            {loading ? <FullscreenLoader /> : (
                <Carousel
                    mode="parallax"
                    modeConfig={{
                        parallaxScrollingScale: 0.9,
                        parallaxScrollingOffset: 50,
                    }}
                    pagingEnabled={true}
                    width={width}
                    data={activeActivities}
                    renderItem={({item}) => (
                        <ActivityOverview
                            user={user}
                            activity={item}
                            sessions={activeSessionsFromActivity(sessions, item._id)}
                            onNewPress={() => newSessionHandler(item)}
                            onSessionPress={openSessionHandler}
                            onManualPress={ ()=> manualSessionHandler(item)}
                            buttonTitle="Démarrer"
                        />
                    )} />
                )
            }
        </SafeAreaView>
    )
}