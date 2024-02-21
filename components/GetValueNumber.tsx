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
        value: '',
        type: varNumber.type,
    });

    React.useEffect(() => {
        onRawVariablesChange(response);
    }, [response]);

    const handleChange = (text:string) => {
        setResponse(prev => ({ ...prev, value: text}));
    };


    return (
    <View>
        <TextInput
            style={globalStyles.input}
            placeholder="Saisissez un nombre"
            keyboardType="numeric"
            inputMode="numeric"
            value={response.value?.toString()}  
            onChangeText={(text) => handleChange(text)}
            placeholderTextColor={'#ffffff80'}
        />
    </View>
    );
};

export default GetValueNumber;
