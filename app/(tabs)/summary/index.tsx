import { Alert, Dimensions, FlatList, StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { useActivityContext } from "../../../shared/contexts/ActivityContext";
import Carousel from 'react-native-reanimated-carousel';
import ActivityLabel from "../../../components/ActivityLabel";
import { useSessionStatusContext } from "../../../shared/contexts/SessionStatusContext";
import { useSessionContext } from "../../../shared/contexts/SessionContext";
import { globalStyles } from "../../../shared/globalStyles";
import HeaderScreenTitle from "../../../components/HeaderScreenTitle";

export default function RecapScreen() {


    const { activities, getActivityById } = useActivityContext();

    const width = Dimensions.get('window').width;
    let content;

    if (activities.length === 0) {
        content = <View style={globalStyles.contentContainer}>
            <Text>Aucune activité</Text>
        </View>
    } else {
        content =
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
                        <ActivityLabel
                            activity={item}

                        />
                    )} />
                <Text>RecapScreen ${}</Text>
            </View>

        return (<>{content}</>)
    }
}


