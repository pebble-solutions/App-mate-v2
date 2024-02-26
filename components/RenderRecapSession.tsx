import React, { useState } from "react";
import { View, Text, ScrollView} from 'react-native';
import { globalStyles } from "../shared/globalStyles";
import { RawVariableType } from "../shared/types/SessionType";

type renderRecapSessionType = { 
    raw_variables: RawVariableType[];
}
const RenderRecapSession: React.FC<renderRecapSessionType> = ({ raw_variables}) => {
    console.log(raw_variables, 'raw_variables') 
    const renderItemValue = (item: RawVariableType) => {
        if (item.value && typeof item.value === "object") {
            console.log(item.value)
            return <Text style={globalStyles.textLight}>{item.value.toLocaleString()}</Text>;
        }
        return <Text  style={globalStyles.textLight}>?{typeof item.value}</Text>
    }
    return (
        <ScrollView>
            <View >
            {raw_variables.length > 0 && <Text style={[globalStyles.textLight, globalStyles.CategoryTitle]}>Vos informations</Text>}
            {raw_variables.map((item: RawVariableType, index:number) => {
                return (
                    <View style={globalStyles.VariableCardContent} key={item._id}>
                        {/* <Text style={globalStyles.textLight}>{index+1}</Text>     */}
                        <Text style={globalStyles.textLight}>{item.label}</Text>
                        {/* <Text style={globalStyles.textLight}>{item._id}</Text> */}
                        {/* <Text style={globalStyles.textLight}>item.type:  {item.type}</Text> */}
                        <Text style={globalStyles.textLight}>typeof: {typeof item.value}</Text>
                        {renderItemValue(item)}
                        <Text style={globalStyles.textLight}>item.value: {item.value}</Text>
                    </View>
                )
            })}
            </View>
        </ScrollView>
    );

}



    
 
export default RenderRecapSession;   