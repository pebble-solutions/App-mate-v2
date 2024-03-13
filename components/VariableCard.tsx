import { Text, View, TouchableOpacity } from "react-native";
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
    isMandatory?: boolean,
    activityId: string,
    variableId: string,
    onActionStart?: () => void;
    onActionEnd?: () => void;

}

export default function VariableCard({
    label,
    description,
    mandatory,
    displayAddIcon,
    displayRemoveIcon,
    isMandatory,
    activityId,
    variableId,
    onActionStart,
    onActionEnd }: VariableCardOptions) {

    const { linkVariableToActivity, removeVariableFromActivity, toggleMandatory } = useActivityContext();

    const addVariableToActivity = async (activityId: string, variableId: string) => {
        if (onActionStart) onActionStart();
        await linkVariableToActivity(activityId, variableId);
        if (onActionEnd) onActionEnd();
    }

    const removeVariable = async (activityId: string, variableId: string) => {
        if (onActionStart) onActionStart();
        await removeVariableFromActivity(activityId, variableId);
        if (onActionEnd) onActionEnd();
    }

    const toggle_Mandatory = async (activityId: string, variableId: string) => {
        if (onActionStart) onActionStart();
        await toggleMandatory(activityId, variableId, !mandatory);

        if (onActionEnd) onActionEnd();
    }

    return (
        <View style={[globalStyles.VariableCardContent]}>
            <View style={[globalStyles.VariableCardHeader]}>
                <Text style={[globalStyles.cardTitle, globalStyles.textLight]}>{label}</Text>
                <Text style={[globalStyles.cardDescription, globalStyles.textLight]}>{description}</Text>
            </View>
            <View style={globalStyles.VariableCardIconsContainer}>
                {mandatory ? (
                    <TouchableOpacity onPress={() => toggle_Mandatory(activityId, variableId)}>
                        <Ionicons name="shield-checkmark" size={23} color="white" style={{ marginHorizontal: 5 }} />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={() => toggle_Mandatory(activityId, variableId)}>
                        <Ionicons name="shield-checkmark-outline" size={22} color="#00000030" style={{ marginHorizontal: 5 }} />
                    </TouchableOpacity>
                )}
                {displayRemoveIcon &&
                    <TouchableOpacity onPress={() => { removeVariable(activityId, variableId) }}>
                        <Ionicons name="remove-circle-outline" size={25} color="white" />
                    </TouchableOpacity>
                }
                {displayAddIcon &&
                    <TouchableOpacity onPress={() => { addVariableToActivity(activityId, variableId) }}>
                        <Ionicons name="add-circle-outline" size={25} color="white" />
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}
