import { Text, View, TouchableOpacity } from "react-native";
import { globalStyles } from "../shared/globalStyles";
import { useVariableContext } from "../shared/contexts/VariableContext";
import { VariableType } from "../shared/types/VariableType";
import { useActivityContext } from "../shared/contexts/ActivityContext";
import { ActivityType } from "../shared/types/ActivityType";
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from "react";


type VariableCardOptions = {
    variable: VariableType,
    displayAddIcon?: boolean,
    displayRemoveIcon?: boolean,
    isMandatory?: boolean,
    activityId: string,
    grayedOut?: boolean,
    isChecked?: boolean,
}

export default function VariableCard({
    variable,
    displayAddIcon,
    displayRemoveIcon,
    isMandatory,
    activityId,
    grayedOut = false,
    isChecked = false,
}: VariableCardOptions) {

    const { linkVariableToActivity, removeVariableFromActivity, setVariableMandatory } = useActivityContext();

    const linkVariable = () => {
        linkVariableToActivity(activityId, variable);
    }

    const removeVariable = () => {
        removeVariableFromActivity(activityId, variable._id);
    }

    const toggleMandatory = () => {
        setVariableMandatory(activityId, variable._id, !isMandatory);
    }

    return (
        <View style={[globalStyles.VariableCardContent, grayedOut ? globalStyles.grayedOut : null]}>
            <View style={[globalStyles.VariableCardHeader]}>
                <Text style={[globalStyles.cardTitle, globalStyles.textLight]}>{variable.label}</Text>
                <Text style={[globalStyles.cardDescription, globalStyles.textLight]}>{variable.description}</Text>
            </View>
            <View style={globalStyles.VariableCardIconsContainer}>
                {isMandatory !== undefined ? (
                    variable.mandatory ? (
                        <TouchableOpacity onPress={toggleMandatory}>
                            <Ionicons name="shield-checkmark" size={23} color="white" style={{ marginHorizontal: 5 }} />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={toggleMandatory}>
                            <Ionicons name="shield-checkmark-outline" size={22} color="#00000030" style={{ marginHorizontal: 5 }} />
                        </TouchableOpacity>
                    )
                ) : null
                }

                {grayedOut && isChecked && (
                    <Ionicons name="checkmark" size={20} color="white" style={{ position: 'absolute', right: 5 }} />
                )}
                {displayRemoveIcon &&
                    <TouchableOpacity onPress={removeVariable}>
                        <Ionicons name="remove-circle-outline" size={25} color="white" />
                    </TouchableOpacity>
                }
                {displayAddIcon &&
                    <TouchableOpacity onPress={linkVariable}>
                        <Ionicons name="add-circle-outline" size={25} color="white" />
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}