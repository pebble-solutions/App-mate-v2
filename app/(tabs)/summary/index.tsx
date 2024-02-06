import React, { useEffect } from "react";
import { Alert, Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { useActivityContext } from "../../../shared/contexts/ActivityContext";
import Carousel from 'react-native-reanimated-carousel';
import ActivityLabel from "../../../components/ActivityLabel";
import { useSessionContext } from "../../../shared/contexts/SessionContext";
import { globalStyles } from "../../../shared/globalStyles";
import HeaderScreenTitle from "../../../components/HeaderScreenTitle";

export default function RecapScreen() {
    const { activities } = useActivityContext();
    const { sessions, fetchSessionsFromAPI } = useSessionContext();
    const width = Dimensions.get('window').width;

    useEffect(() => {
        fetchSessionsFromAPI();
    }, []);

    let content;

    if (activities.length === 0 && sessions.length === 0) {
        content = (
            <View style={globalStyles.contentContainer}>
                <Text>Aucune activité ou session</Text>
            </View>
        );
    } else {
        content = (
            <View style={globalStyles.body}>
                <HeaderScreenTitle title="Tableau de bord" addButton={false} />
                <Carousel
                    mode="parallax"
                    modeConfig={{
                        parallaxScrollingScale: 0.9,
                        parallaxScrollingOffset: 50,
                    }}
                    pagingEnabled={true}
                    width={width}
                    height={100}
                    data={activities}
                    renderItem={({ item }) => (
                        <ActivityLabel activity={item} />
                    )}
                />
                <View style={globalStyles.contentContainer}>
                    <FlatList
                        data={sessions}
                        keyExtractor={(item, index) => item._id ? item._id.toString() : index.toString()}
                        renderItem={({ item }) => (
                            <View style={globalStyles.sessionContainer}>
                                <Text style={globalStyles.sessionText}>Session: {item.label}</Text>
                            </View>
                        )}
                    />
                </View>
            </View>
        );
    }

    return <>{content}</>;
}


