import {Text, View} from "react-native";
import {globalStyles} from "../shared/globalStyles";

type VariableCardOptions = {
    label: string,
    color: string,
    description?: string,
}

export default function ActivityCard({label, description}: VariableCardOptions) {
    return (
            <View style={[globalStyles.VariableCardContent]}>
                <Text style={[globalStyles.cardTitle, globalStyles.textLight]}>{label}</Text>
                <Text style={[globalStyles.cardDescription, globalStyles.textLight]}>{description}</Text>
            </View>
    )
}