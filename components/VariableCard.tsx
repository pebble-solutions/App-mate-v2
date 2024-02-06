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
}: VariableCardOptions) {

    const { linkVariableToActivity, removeVariableFromActivity, toggleMandatory } = useActivityContext();

    const addVariableToActivity = (activityId: string, variableId: string) => {
        linkVariableToActivity(activityId, variableId);
    }

    const removeVariable = (activityId: string, variableId: string) => {
        removeVariableFromActivity(activityId, variableId);
    }

    const toggle_Mandatory = (activityId: string, variableId: string, mandatory: boolean) => {
        toggleMandatory(activityId, variableId, mandatory);
    }

    return (
        <View style={[globalStyles.VariableCardContent]}>
            <View style={[globalStyles.VariableCardHeader]}>
                <Text style={[globalStyles.cardTitle, globalStyles.textLight]}>{label}</Text>
                <Text style={[globalStyles.cardDescription, globalStyles.textLight]}>{description}</Text>
            </View>
            <View style={globalStyles.VariableCardIconsContainer}>
                {isMandatory !== undefined ? (
                    mandatory ? (
                        <TouchableOpacity onPress={() => { toggleMandatory(activityId, variableId, false) }}>
                            <Ionicons name="shield-checkmark" size={23} color="white" style={{ marginHorizontal: 5 }} />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={() => { toggle_Mandatory(activityId, variableId, true) }}>
                            <Ionicons name="shield-checkmark-outline" size={22} color="#00000030" style={{ marginHorizontal: 5 }} />
                        </TouchableOpacity>
                    )
                ) : null}
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
