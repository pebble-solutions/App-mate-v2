import {Text, View} from "react-native";
import {globalStyles} from "../../shared/globalStyles";
import ActivityGradient from "./ActivityGradient";

type CardOptions = {
    title: string,
    color: string,
    description?: string,
}

export default function ActivityCard({title, color, description}: CardOptions) {

    return (
        <ActivityGradient color={color} style={globalStyles.card}>
            <View style={[globalStyles.cardContent]}>
                <Text style={[globalStyles.cardTitle, globalStyles.textLight]}>{title}</Text>
                <Text style={[globalStyles.cardDescription, globalStyles.textLight]}>{description}</Text>
            </View>
        </ActivityGradient>
    )
}