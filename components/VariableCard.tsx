import { Text, View, TouchableOpacity } from "react-native";
import { globalStyles } from "../shared/globalStyles";
import { useVariableContext } from "../shared/contexts/VariableContext";
import {ActivityVariableType, VariableType} from "../shared/types/VariableType";
import { useActivityContext } from "../shared/contexts/ActivityContext";
import { ActivityType } from "../shared/types/ActivityType";
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from "react";


type VariableCardOptions = {
    variable: VariableType | ActivityVariableType,
    displayAddIcon?: boolean,
    displayRemoveIcon?: boolean,
    activityId: string,
    grayedOut?: boolean,
    isChecked?: boolean,
}

export default function VariableCard({
    variable,
    displayAddIcon,
    displayRemoveIcon,
    activityId,
    grayedOut = false,
    isChecked = false,
}: VariableCardOptions) {

    const { linkVariableToActivity, removeVariableFromActivity, setVariableMandatory } = useActivityContext();

    const variableId = "_id" in variable ? variable._id : variable.variable_id

    const linkVariable = () => {
        linkVariableToActivity(activityId, {...variable, _id: variableId});
    }

    const removeVariable = () => {
        removeVariableFromActivity(activityId, variableId);
    }

    const toggleMandatory = () => {
        setVariableMandatory(activityId, variableId, !variable.mandatory);
    }

    return (
        <View style={[globalStyles.VariableCardContent, grayedOut ? globalStyles.grayedOut : null]}>
            <View style={[globalStyles.VariableCardHeader]}>
                <Text style={[globalStyles.cardTitle, globalStyles.textLight]}>{variable.label}</Text>
                <Text style={[globalStyles.cardDescription, globalStyles.textLight]}>{variable.description}</Text>
            </View>
            <View style={globalStyles.VariableCardIconsContainer}>
                {variable.mandatory ? (
                    <TouchableOpacity onPress={toggleMandatory}>
                        <Ionicons name="shield-checkmark" size={23} color="white" style={{ marginHorizontal: 5 }} />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={toggleMandatory}>
                        <Ionicons name="shield-checkmark-outline" size={22} color="#00000030" style={{ marginHorizontal: 5 }} />
                    </TouchableOpacity>
                )}

                {grayedOut && isChecked && (
                    <Ionicons name="checkmark" size={20} color="white" style={{ position: 'absolute', right: 5 }} />
                )}
                {displayRemoveIcon &&
                    <TouchableOpacity onPress={removeVariable}>
                        <Ionicons name="remove-circle-outline" size={25} color="white" />
                    </TouchableOpacity>
                }
                {!grayedOut &&
                    displayAddIcon &&
                    <TouchableOpacity onPress={linkVariable}>
                        <Ionicons name="add-circle-outline" size={25} color="white" />
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}