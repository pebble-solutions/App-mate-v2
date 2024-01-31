import { Text, View } from "react-native";
import { globalStyles } from "../shared/globalStyles";
import { useVariableContext } from "../shared/contexts/VariableContext";
import { VariableType } from "../shared/types/VariableType";
import { useActivityContext } from "../shared/contexts/ActivityContext";
import { ActivityType } from "../shared/types/ActivityType";
import { Ionicons } from '@expo/vector-icons';

type VariableCardOptions = {
    label: string,
    description?: string,
    mandatory?: boolean,
    displayAddIcon?: boolean,
    displayRemoveIcon?: boolean,
}

export default function VariableCard({ label, description, mandatory, displayAddIcon, displayRemoveIcon }: VariableCardOptions) {
    return (
        <View style={[globalStyles.VariableCardContent]}>
            <View style={[globalStyles.VariableCardHeader]}>
                <Text style={[globalStyles.cardTitle, globalStyles.textLight]}>{label}</Text>
                <Text style={[globalStyles.cardDescription, globalStyles.textLight]}>{description}</Text>
            </View>
            <View style={globalStyles.VariableCardIconsContainer}>
                {mandatory ? (
                    <Ionicons name="shield-checkmark" size={25} color="white" style={[globalStyles.iconMargin]} />
                ) : (
                    <Ionicons name="shield-checkmark-outline" size={25} color="#00000025" style={[globalStyles.iconMargin]} />
                )}
                {displayRemoveIcon && <Ionicons name="remove-circle-outline" size={25} color="white" style={[globalStyles.iconMargin]} />}
                {displayAddIcon && <Ionicons name="add-circle-outline" size={25} color="white" style={[globalStyles.iconMargin]} />}
            </View>
        </View>
    )
}
