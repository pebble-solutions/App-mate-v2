import { Text, View, TouchableOpacity } from "react-native";
import { globalStyles } from "../shared/globalStyles";
import { useVariableContext } from "../shared/contexts/VariableContext";
import { VariableType } from "../shared/types/VariableType";
import { useActivityContext } from "../shared/contexts/ActivityContext";
import { ActivityType } from "../shared/types/ActivityType";
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from "react";


type VariableCardOptions = {
    label: string,
    description?: string,
    mandatory?: boolean,
    displayAddIcon?: boolean,
    displayRemoveIcon?: boolean,
    isMandatory?: boolean,
    activityId: string,
    variableId: string,
    onLoaderChange?: (newVal: boolean) => void

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
    onLoaderChange,
}: VariableCardOptions) {

    const { linkVariableToActivity, removeVariableFromActivity, toggleMandatory } = useActivityContext();
    const [loaderStatus, setLoaderStatus] = useState(false)

    const addVariableToActivity = async (activityId: string, variableId: string) => {
        loaderStart();
        await linkVariableToActivity(activityId, variableId);
        loaderEnd();
    }

    const removeVariable = async (activityId: string, variableId: string) => {
        loaderStart();
        await removeVariableFromActivity(activityId, variableId);
        loaderEnd();
    }

    const toggle_Mandatory = async (activityId: string, variableId: string) => {
        loaderStart();
        await toggleMandatory(activityId, variableId, !mandatory);
        loaderEnd();
    }

    const loaderStart = () => {  
        setLoaderStatus(true)  
    }  
    
    const loaderEnd = () => {  
        setLoaderStatus(false)  
    }  

    useEffect(() => {  
        if (typeof onLoaderChange !== "undefined") onLoaderChange(loaderStatus)  
    }, [loaderStatus]) 

    return (
        <View style={[globalStyles.VariableCardContent]}>
            <View style={[globalStyles.VariableCardHeader]}>
                <Text style={[globalStyles.cardTitle, globalStyles.textLight]}>{label}</Text>
                <Text style={[globalStyles.cardDescription, globalStyles.textLight]}>{description}</Text>
            </View>
            <View style={globalStyles.VariableCardIconsContainer}>
                {
                    isMandatory && (
                        mandatory ? (
                            <TouchableOpacity onPress={() => toggle_Mandatory(activityId, variableId)}>
                                <Ionicons name="shield-checkmark" size={23} color="white" style={{ marginHorizontal: 5 }} />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={() => toggle_Mandatory(activityId, variableId)}>
                                <Ionicons name="shield-checkmark-outline" size={22} color="#00000030" style={{ marginHorizontal: 5 }} />
                            </TouchableOpacity>
                        )
                    )
                }
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
