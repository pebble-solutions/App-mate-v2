import { globalStyles } from "../shared/globalStyles";import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { ActivityType } from "../shared/types/ActivityType";
import RenderItem from "./RenderItem";
import ActivityCard from "./ActivityCard";

type SessionFormType = {
    activity: ActivityType;
    title: string;
    variables : [];
};

export default function SessionForm({ activity, title, variables }: SessionFormType) {
    console.log(activity.variables, 'variables in item')
    console.log(variables, 'variablesassoc') 

    
    
    return(
        variables.map((variable) => {
            return (
                <View style={globalStyles.cardContent}>
                    <Text style={globalStyles.textLight}>variable: {variable.label}</Text>
                    <Text style={globalStyles.textLight}>type: {variable.type}</Text>
                    <Text style={globalStyles.textLight}>valeur: {variable.value}</Text>
                </View>
            )       
        })
    )
    // (
        
    //     <View style={globalStyles.pContainer}>
    //         <Text style={globalStyles.textLight}>SessionFormTEST</Text>
    //         <Text style={globalStyles.textLight}>titla passé{title}</Text>
    //         <Text style={globalStyles.textLight}>label{activity.label}</Text>
    //         {/* <Text style={globalStyles.textLight}>description{variables[0].label}</Text> */}
    //         <RenderItem {...variables} />
    //     </View>
    // )
}