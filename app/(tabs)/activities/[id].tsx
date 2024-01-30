import {Text, View} from "react-native";
import {useLocalSearchParams} from "expo-router";
import {LinearGradient} from "expo-linear-gradient";
import {getRGBGradientColors} from "../../../shared/libs/color";
import {globalStyles} from "../../../shared/globalStyles";
import {ActivityType} from "../../../shared/types/ActivityType";
import {useActivityContext} from "../../../shared/contexts/ActivityContext";

export default function ActivityScreen() {

    const { getActivityById } = useActivityContext()

    const {_id} = useLocalSearchParams<ActivityType>()

    const activity = _id ? getActivityById(_id) : null

    if (!activity) {
        return (
            <View style={globalStyles.body}>
                <View style={globalStyles.contentContainer}>
                    <Text>Not found</Text>
                </View>
            </View>
        )
    }

    const colors = activity.color ? getRGBGradientColors(activity.color) : ["#fff"]

    return (
        <LinearGradient
            colors={colors}
            start={{x: 0, y: 1}}
            end={{x: 1, y: 0}}
            style={globalStyles.body}>
            <View style={globalStyles.contentContainer}>
                <Text style={[globalStyles.headTitle, globalStyles.textLight]}>{activity.label}</Text>
            </View>

            <View style={[globalStyles.contentContainer]}>
                <Text style={[globalStyles.textLight]}>{activity.description}</Text>
                <Text style={[globalStyles.textLight]}>Crée le {activity.start}</Text>
            </View>

            <View style={globalStyles.contentContainer}>
                <Text style={[globalStyles.headTitle, globalStyles.textLight]}>Mes jolies variables :</Text>
            </View>
        </LinearGradient>
    )
}