import React, { useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { globalStyles } from "../shared/globalStyles";
import { RawVariableType } from "../shared/types/SessionType";

type ResponseNumberType = {
  varNumber: RawVariableType;
  onRawVariablesChange: (rawVariables: RawVariableType) => void;
}

const GetValueNumber: React.FC<ResponseNumberType> = ({ varNumber, onRawVariablesChange }) => {
    const [response, setResponse] = useState({
        _id: varNumber._id,
        label: varNumber.label,
        value: varNumber.value,
        type: varNumber.type,
    });

    React.useEffect(() => {
        onRawVariablesChange(response);
    }, [response]);

    const handleChange = (number:Number) => {
        setResponse(prev => ({ ...prev, value: number}));
    };


    return (
    <View>
        <TextInput
            style={globalStyles.input}
            placeholder="Saisissez un nombre"
            keyboardType="numeric"
            inputMode="numeric"
            value={response.value}  
            onChangeText={(number) => handleChange(Number(number))}
            placeholderTextColor={'#ffffff80'}
        />
    </View>
    );
};

export default GetValueNumber;
