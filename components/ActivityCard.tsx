import {Text, View} from "react-native";
import {globalStyles} from "../shared/globalStyles";

import {LinearGradient} from "expo-linear-gradient";
import {getRGBGradientColors} from "../shared/libs/color";

type CardOptions = {
    title: string,
    color: string
}

export default function ActivityCard({title, color}: CardOptions) {

    const colors = getRGBGradientColors(color)

    return (
        <LinearGradient
            colors={colors}
            start={{x: 0, y: 1}}
            end={{x: 1, y: 0}}
            style={globalStyles.card}>
            <View style={[globalStyles.cardContent]}>
                <Text style={[globalStyles.cardTitle, globalStyles.textLight]}>{title}</Text>
            </View>
        </LinearGradient>
    )
}