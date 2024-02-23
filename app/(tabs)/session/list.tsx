import {globalStyles} from "../../../shared/globalStyles";
import Carousel from "react-native-reanimated-carousel";
import ActivityOverview from "../../../components/Activity/ActivityOverview";
import {navigate, newSession, openSession} from "../../../shared/libs/session";
import {Dimensions, SafeAreaView, Text, View} from "react-native";
import React, {useEffect} from "react";
import {useActivityContext} from "../../../shared/contexts/ActivityContext";
import {useSessionContext} from "../../../shared/contexts/SessionContext";
import {useSessionStatusContext} from "../../../shared/contexts/SessionStatusContext";
import {router} from "expo-router";
import FullscreenLoader from "../../../components/FullscreenLoader";

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
                            onNewPress={() => {
                                newSession(item._id, sessionContext, statusContext)
                            }}
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