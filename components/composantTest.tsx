import React from 'react';
import { RawVariableType, SessionType } from '../shared/types/SessionType';
import { Text,View } from 'react-native';
import { globalStyles } from '../shared/globalStyles';
import { VariableType } from '../shared/types/VariableType';
import RenderItem from './RenderItem';

type VariableTestType = {
    variable: RawVariableType| null;
    // listVariables: VariableType[];
    session: SessionType
};

const VariableTest = ({variable} : VariableTestType, {session} : VariableTestType) => {
    if (variable) {
        return  <View>
                    <Text style={globalStyles.textLight}>{variable.label}</Text>
                    
                </View>
    } return <Text  style={globalStyles.textLight}>plus de variable à valider</Text>;
    }

export default VariableTest;