import {Text, View} from "react-native";
import {globalStyles} from "../shared/globalStyles";

import {LinearGradient} from "expo-linear-gradient";
import {getRGBGradientColors} from "../shared/libs/color";

type CardOptions = {
    title: string,
    color: string,
    description?: string,
}

export default function ActivityCard({title, color, description}: CardOptions) {

    const colors = getRGBGradientColors(color)

    return (
        <LinearGradient
            colors={colors}
            start={{x: 0, y: 1}}
            end={{x: 1, y: 0}}
            style={globalStyles.card}>
            <View style={[globalStyles.cardContent]}>
                <Text style={[globalStyles.cardTitle, globalStyles.textLight]}>{title}</Text>
                <Text style={[globalStyles.cardDescription, globalStyles.textLight]}>{description}</Text>
            </View>
        </LinearGradient>
    )
}