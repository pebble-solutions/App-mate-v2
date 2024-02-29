import {globalStyles} from "../../../shared/globalStyles";
import Carousel from "react-native-reanimated-carousel";
import ActivityOverview from "../../../components/Activity/ActivityOverview";
import {navigate, newSession, openSession} from "../../../shared/libs/session";
import {Alert, Dimensions, SafeAreaView, Text, View} from "react-native";
import React, {useEffect} from "react";
import {useActivityContext} from "../../../shared/contexts/ActivityContext";
import {useSessionContext} from "../../../shared/contexts/SessionContext";
import {useSessionStatusContext} from "../../../shared/contexts/SessionStatusContext";
import {router} from "expo-router";
import FullscreenLoader from "../../../components/FullscreenLoader";
import {ActivityType} from "../../../shared/types/ActivityType";

export default function ListScreen() {
    const { activities, loading } = useActivityContext()
    const sessionContext = useSessionContext()
    const { getSessionsFromActivity } = sessionContext
    const statusContext = useSessionStatusContext()
    const { status } = statusContext

    // If session status change, we run the navigate function from session library
    useEffect(() => {
        navigate(status || null, router)
    }, [status])

    const width = Dimensions.get('window').width;

    // Action on new session button is pressed. If some session already exists on provided activity, the user will
    // choose between starting a new session or recovering the last one.
    const newSessionHandler = (activity: ActivityType) => {
        const sessions = getSessionsFromActivity(activity._id)
        if (sessions.length) {
            Alert.alert("Session en cours", "Il y a déjà une session en cours sur" +
                " cette activitée.", [
                {
                    text: "Reprendre la dernière session",
                    onPress: () => openSession(sessions[sessions.length-1]._id, sessionContext, statusContext)
                },
                {
                    text: "Démarrer une nouvelle session",
                    onPress: () => newSession(activity._id, sessionContext, statusContext)
                },
                {
                    text: "Annuler"
                }
            ])
        }
        else {
            newSession(activity._id, sessionContext, statusContext)
        }
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
                    data={activities}
                    renderItem={({item}) => (
                        <ActivityOverview
                            activity={item}
                            sessions={getSessionsFromActivity(item._id)}
                            onNewPress={() => newSessionHandler(item)}
                            onSessionPress={(session) => {
                                openSession(session._id, sessionContext, statusContext)
                            }}
                            buttonTitle="Démarrer"
                        />
                    )} />
                )
            }
        </SafeAreaView>
    )
}