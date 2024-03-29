import React, { useEffect, useState } from "react";
import { Alert, Dimensions, StyleSheet, Text, View, FlatList, ScrollView } from "react-native";

import { useSessionContext } from "../../../../shared/contexts/SessionContext";
import { globalStyles } from "../../../../shared/globalStyles";
import moment from 'moment';
import 'moment/locale/fr';
import { useActivityContext } from "../../../../shared/contexts/ActivityContext";
import HeaderScreenTitle from "../../../../components/HeaderScreenTitle";
import Carousel from "react-native-reanimated-carousel";
import ActivityLabel from "../../../../components/Activity/ActivityLabel";
import { LinearGradient } from "expo-linear-gradient";
import { getRGBGradientColors } from "../../../../shared/libs/color";
import TextInput from "../../../../components/Form/TextInput";
import NumberInput from "../../../../components/Form/NumberInput";
import DateTimeInput from "../../../../components/Form/DateTimeInput";
import BooleanInput from "../../../../components/Form/BooleanInput";
import FormInput from "../../../../components/Form/FormInput";
moment.locale('fr');

export default function RecapScreen() {
    const { activities } = useActivityContext();
    const {fetchSessionsFromAPI, sessions } = useSessionContext();
    const width = Dimensions.get('window').width;
    const [selectedActivityColor, setSelectedActivityColor] = useState("");


    useEffect(() => {
        fetchSessionsFromAPI();
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
            <View style={globalStyles.body}>
                <HeaderScreenTitle title="Tableau de bord" addButton={false} />
                {/* test formInput */}
                {/* <ScrollView>
                    <Text>RecapScreen</Text>
                    <FormInput label="date" placeholder="forminput" type='date'/>
                    <FormInput label="time" placeholder="forminput" type='time'/>
                    <FormInput label="datetime" placeholder="forminput" type='datetime'/>
                    <FormInput label="textarea" placeholder="forminput" type="textarea" />
                    <FormInput label="number" placeholder="forminput" type="number" />
                    <FormInput label="float" placeholder="forminput" type="float" />
                    <FormInput label="integer" placeholder="forminput" type="integer" />
                    <FormInput label="boolean" placeholder="forminput" type="boolean" />

                </ScrollView> */}

                {/* <Carousel
                    mode="parallax"
                    modeConfig={{
                        parallaxScrollingScale: 0.9,
                        parallaxScrollingOffset: 50,
                    }}
                    pagingEnabled={true}
                    width={width}
                    height={72}
                    data={activities}
                    onSnapToItem={(index) => handleActivitySelect(activities[index].color)}
                    renderItem={({ item }) => (
                        <ActivityLabel
                            activity={item}
                            key={item._id}
                        />

                    )}
                /> */}
                
            </View>
        );
        
    }

    return <>{content}</>

}
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "lightgrey",
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
