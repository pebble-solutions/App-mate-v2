import React, { useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { globalStyles } from "../shared/globalStyles";
import { RawVariableType } from "../shared/types/SessionType";

type ResponseNumberType = {
  varNumber: RawVariableType;
  onRawVariablesChange: (rawVariables: RawVariableType[]) => void;
}

const GetValueNumber: React.FC<ResponseNumberType> = ({ varNumber, onRawVariablesChange }) => {
  const [response, setResponse] = useState({
    '_id': varNumber._id,
    'label': varNumber.label,
    'value': ''
  });

  const [rawVariables, setRawVariables] = useState<RawVariableType[]>([]);

  const handleChange = (number: string) => {
    setResponse(prev => ({ ...prev, value: number }));
  };

  const validate = () => {
    const updatedRawVariables = [...rawVariables, response]; // Mettre à jour les rawVariables avec la nouvelle réponse
    setRawVariables(updatedRawVariables); // Mettre à jour le state rawVariables

    // Appeler la fonction de rappel avec les rawVariables mises à jour
    onRawVariablesChange(updatedRawVariables);
  };

  return (
    <View>
      <TextInput
        style={globalStyles.input}
        placeholder="Saisissez un nombre"
        keyboardType="numeric"
        inputMode="numeric"
        value={response.value}
        onChangeText={(number) => handleChange(number)}
        placeholderTextColor={'#ffffff80'}
      />
    </View>
  );
};

export default GetValueNumber;
