import React, { useState } from "react";
import { View, Text, ScrollView} from 'react-native';
import { globalStyles } from "../shared/globalStyles";
import { RawVariableType } from "../shared/types/SessionType";

type renderRecapSessionType = { 

    raw_variables: RawVariableType[];
    };
const RenderRecapSession: React.FC<renderRecapSessionType> = ({ raw_variables }) => {

    return (
        <ScrollView>
            <View >
            {raw_variables.length > 0 && <Text style={[globalStyles.textLight, globalStyles.CategoryTitle]}>Vos informations complémentaires</Text>}
            {raw_variables.map((item: RawVariableType, index:number) => {
                return (
                    <View style={globalStyles.cardContent} key={item._id}>
                        <Text style={globalStyles.textLight}>{item.label}</Text>
                        <Text style={globalStyles.textLight}>- {item.value}</Text>
                    </View>
                )
            })}
            </View>
        </ScrollView>
    );
}    
export default RenderRecapSession;   