import React, { useState } from "react";
import { Text, View, ScrollView, TouchableOpacity, Alert, Dimensions, StyleSheet} from "react-native"; // Importez Alert
import { useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { getRGBGradientColors } from "../../../shared/libs/color";
import { globalStyles, variables } from "../../../shared/globalStyles";
import { useActivityContext } from "../../../shared/contexts/ActivityContext";
import { useVariableContext } from "../../../shared/contexts/VariableContext";
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import { SessionType } from "../../../shared/types/SessionType";
import { ActivityType } from "../../../shared/types/ActivityType";
import { useSessionContext } from "../../../shared/contexts/SessionContext";
import { SummaryCard } from "../../../components/Summary/SummaryCard";
import Carousel from "react-native-reanimated-carousel";
import { FlatList } from "react-native-gesture-handler";


type SummaryScreenType = {
    sessions: SessionType[],
    activity: ActivityType,
}


export default function SummaryScreen() {
    const { getActivityById} = useActivityContext();
    const {getSessionsFromActivity} = useSessionContext();
    const { _id } = useLocalSearchParams<{ _id: string }>();
    const activity = _id ? getActivityById(_id) : null;
    const { variables } = useVariableContext();
    const {height, width} = Dimensions.get('window');


    console.log(_id, 'id')
    if (!activity || !_id) {
        return (
            <View style={globalStyles.body}>
                <View style={globalStyles.contentContainer}>
                    <Text>Activité non trouvée</Text>
                </View>
            </View>
        );
    }
    const sessions = getSessionsFromActivity(_id);
    console.log(sessions, 'sessionsday')

    const [isSettingsVisible, setSettingsVisible] = useState(false);
    const colors = activity?.color ? getRGBGradientColors(activity.color) : ["#262729"];

    


    return (
        <LinearGradient
            colors={colors}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={globalStyles.body}>

            <View style={globalStyles.contentContainer}>
                <View style={globalStyles.headerIcons}>
                    <TouchableOpacity
                        onPress={() => {
                            setSettingsVisible(!isSettingsVisible);
                        }}
                    >
                        <Ionicons name="settings-outline" size={28} color="white" style={{ position: 'relative', left: 5, top: 19 }} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            router.back();
                        }}
                    >
                        <Ionicons name="close-outline" size={32} color="white" style={{ position: 'relative', right: 0, top: 18 }} />
                    </TouchableOpacity>
                </View>
                    <Text style={[globalStyles.headTitle, globalStyles.textLight, globalStyles.textCenter]}>{activity.label}</Text>
                    <Text style={[globalStyles.textLight, globalStyles.textCenter]}>{activity.description}</Text>
                    {sessions.length > 0 && (
                    <Text style={[globalStyles.headTitle, globalStyles.textLight, globalStyles.textCenter]}>
                        {sessions.length} session{sessions.length > 1 && "s"} enregistrée{sessions.length > 1 && "s"}
                    </Text>
                    )}
                    {sessions.length === 0 && (
                        <Text style={[globalStyles.headTitle, globalStyles.textLight, globalStyles.textCenter]}>Aucune session enregistrée</Text>
                    )}
                        

                                <Carousel
                                mode="parallax"
                                modeConfig={{
                                    parallaxScrollingScale: .94,
                                    parallaxScrollingOffset: 30,
                                }}
                                // mode="horizontal-stack"
                                // modeConfig={{
                                //     moveSize: 200,
                                //     stackInterval: 30,
                                //     scaleInterval: 0.08,
                                //     rotateZDeg: 135,
                                //     snapDirection: 'left',
                                // }}
                                pagingEnabled={true}
                                width={width}
                                data={sessions}
                                renderItem={({ item }) => 
                                <SummaryCard key={item._id} session={item}  />}
                                />
            </View>
                {/* <FlatList
                    data={sessions}
                    renderItem={({ item }) => (
                        <SummaryCard session={item} />
                    )}
                    keyExtractor={item => item._id} 
                /> */}
        </LinearGradient>
    )
}
const styles = StyleSheet.create({
    localCardContent: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: variables.contentPadding[2]
    },

    buttonLight: {
        backgroundColor: "white",
    },
    buttonContainerTunnel: {
        flexDirection: 'row',
        backgroundColor: '#00000000',
        margin: variables.contentMargin[1],
        justifyContent: 'space-around',

    }
})