import {Text, View} from "react-native";
import {globalStyles} from "../shared/globalStyles";

type CardOptions = {
    label: string,
    color: string,
    description?: string,
}

export default function ActivityCard({label, description}: CardOptions) {
    return (
            <View style={[globalStyles.cardContent]}>
                <Text style={[globalStyles.cardTitle, globalStyles.textLight]}>{label}</Text>
                <Text style={[globalStyles.cardDescription, globalStyles.textLight]}>{description}</Text>
            </View>
    )
}