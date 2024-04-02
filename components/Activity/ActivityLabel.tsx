import {globalStyles} from "../../shared/globalStyles";
import {StyleSheet, Text, View} from "react-native";
import {ActivityType} from "../../shared/types/ActivityType";
import ActivityGradient from "./ActivityGradient";

type ActivityOverviewType = {
    activity: ActivityType,
    buttonTitle?: string,
}

export default function ActivityLabel({ activity }: ActivityOverviewType) {

    return (
        <ActivityGradient
            color={activity.color}
            style={[globalStyles.body, globalStyles.recapCarrouselCard, globalStyles.sContainer]}>
            <View style={[globalStyles.cardContent, styles.localCardContent]}>
                <Text style={[globalStyles.recapHeadTitle, globalStyles.textLight, globalStyles.textCenter]}>{activity.label}</Text>
            </View>
        </ActivityGradient>
    )
}

const styles = StyleSheet.create({
    localCardContent: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})