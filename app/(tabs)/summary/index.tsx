import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";
import { useSessionContext } from "../../../shared/contexts/SessionContext";
import { globalStyles } from "../../../shared/globalStyles";
import moment from 'moment';
import 'moment/locale/fr';
import { useActivityContext } from "../../../shared/contexts/ActivityContext";
import ActivityOverview from "../../../components/Activity/ActivityOverview";
import {newSession, openSession} from "../../../shared/libs/session";
import HeaderScreenTitle from "../../../components/HeaderScreenTitle";
import Carousel from "react-native-reanimated-carousel";
import { LinearGradient } from "expo-linear-gradient";
import { getRGBGradientColors } from "../../../shared/libs/color";
import {useSessionStatusContext} from "../../../shared/contexts/SessionStatusContext";
import SummaryOverview from "../../../components/Summary/SummaryOverView";



moment.locale('fr');

export default function RecapScreen() {
    const { activities, loading } = useActivityContext();
    const {fetchSessionsFromAPI, sessions } = useSessionContext();
    const {getSessionsFromActivity} = useSessionContext();
    const width = Dimensions.get('window').width;
    const [selectedActivityColor, setSelectedActivityColor] = useState("");
    const [sessionsLoaded, setSessionsLoaded] = useState(false);

    useEffect( () => {
        fetchSessionsFromAPI().then(() => {
            setSessionsLoaded(true);
        });
    }, []);
    const handleActivitySelect = (color: string | null ) => {
        if (color) {
            setSelectedActivityColor(color);
        }
        setSelectedActivityColor("#4287f5");

    };

    let content;

    if (sessions.length === 0) {
        content = (
            <View style={globalStyles.contentContainer}>
                <Text>Aucune  session</Text>
            </View>
        );
    } else {
        content = (
            <SafeAreaView style={globalStyles.body}>
                <HeaderScreenTitle title="Tableau de bord" addButton={false} />
                {sessionsLoaded ?
                    <Carousel
                        mode="parallax"
                        modeConfig={{
                            parallaxScrollingScale: 0.9,
                            parallaxScrollingOffset: 50,
                        }}
                        pagingEnabled={true}
                        width={width}
                        data={activities}
                        onSnapToItem={(index) => handleActivitySelect(activities[index].color)}
                    
                        renderItem={({item}) => (
                            <SummaryOverview
                                activity={item}
                                sessions={getSessionsFromActivity(item._id)}
                                onNewPress={() => {
                                    newSession(item._id, useSessionContext(), useSessionStatusContext())
                                }}
                                onSessionPress={(session) => {
                                    openSession(session._id, useSessionContext(), useSessionStatusContext())
                                }}
                            />
                        )}
                    /> : <View><Text>Chargement des sessions ...</Text></View>
                }
                
            </SafeAreaView>
        );
        
    }

    return <>{content}</>

}
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "grey",
        alignItems: "center",
        justifyContent: "center",
        color: "black",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
});
