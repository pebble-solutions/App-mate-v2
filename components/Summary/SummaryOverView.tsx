import {globalStyles, variables} from "../../shared/globalStyles";
import {getRGBGradientColors} from "../../shared/libs/color";
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {ActivityType} from "../../shared/types/ActivityType";
import {router} from "expo-router";
import {Href} from "expo-router/build/link/href";
import Button from "../Button";
import { Activity } from "../../shared/classes/Activity";
import ActivityGradient from "../Activity/ActivityGradient";
import {SessionType} from "../../shared/types/SessionType";
import {SessionCard} from "../Session/SessionCard";

type SummaryOverviewType = {
    activity: ActivityType,
    onNewPress?: () => void,
    buttonTitle?: string,
    sessions?: SessionType[],
    onSessionPress?: (session: SessionType) => void
}

export default function SummaryOverview({ activity, onNewPress, onSessionPress, buttonTitle, sessions }: SummaryOverviewType) {
    buttonTitle = buttonTitle || "Consulter"

    return (
        <ActivityGradient
            activity={activity}
            style={[globalStyles.body, globalStyles.card]}>
            <View style={[globalStyles.cardContent, styles.localCardContent]}>
                <Text style={[globalStyles.headTitle, globalStyles.textLight]}>{activity.label}</Text>
                <Text style={[globalStyles.headTitle, globalStyles.textLight]}>{activity.description}</Text>

                {sessions?.length ? (
                    <>
                        <View style={[globalStyles.mt3Container, {opacity: .5}]}>
                            <Text style={[globalStyles.headTitle, globalStyles.textLight]}>{sessions.length} session{sessions.length > 1 && "s"} enregistrées</Text>
                        </View>
                        
                    </>
                )
                : null}

                
            </View>
        </ActivityGradient>
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
    }
})