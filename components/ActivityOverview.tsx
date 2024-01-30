import {globalStyles} from "../shared/globalStyles";
import {getRGBGradientColors} from "../shared/libs/color";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {ActivityType} from "../shared/types/ActivityType";
import {router} from "expo-router";
import {Href} from "expo-router/build/link/href";
import Button from "./Button";

type ActivityOverviewType = {
    activity: ActivityType,
    action?: () => void,
    buttonTitle?: string
}

export default function ActivityOverview({ activity, action, buttonTitle }: ActivityOverviewType) {

    buttonTitle = buttonTitle || "Consulter"

    return (
        <LinearGradient
            style={[globalStyles.body, globalStyles.card, globalStyles.mContainer]}
            colors={getRGBGradientColors(activity.color)}
            start={{x: 0, y: 1}}
            end={{x: 1, y: 0}}
        >
            <View style={[globalStyles.cardContent, styles.localCardContent]}>
                <Text style={[globalStyles.headTitle, globalStyles.textLight]}>{activity.label}</Text>
                <Text style={globalStyles.textLight}>{activity.description}</Text>

                {action ? <View style={globalStyles.pv2Container}>
                    <Button
                        title={buttonTitle}
                        onPress={() => action() }
                        style={[styles.buttonLight]}
                        variant="xl"
                        titleStyle={[{color: activity.color}]} />
                </View>: null}
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    localCardContent: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },

    buttonLight: {
        backgroundColor: "white"
    }
})