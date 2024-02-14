import React, { useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { globalStyles } from "../shared/globalStyles";
import ButtonPrevNext from "./TunnelsButton";
import { router } from "expo-router";
import { VariableType } from "../shared/types/VariableType";
import { RawVariableType } from "../shared/types/SessionType";

type ResponseNumberType = {
  varNumber: VariableType;
  onRawVariablesChange: (rawVariables: RawVariableType[]) => void;
}

const ResponseNumber: React.FC<ResponseNumberType> = ({ varNumber, onRawVariablesChange }) => {
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
      {rawVariables.map((rawVariable, index) => (
        <Text key={index} style={globalStyles.textLight}>
          {rawVariable.label}: {rawVariable.value}
        </Text>
      ))}
      <Text style={globalStyles.textLight}>
        {varNumber.question}
      </Text>
      <TextInput
        style={globalStyles.input}
        placeholder="Saisissez un nombre"
        keyboardType="numeric"
        inputMode="numeric"
        value={response.value}
        onChangeText={(number) => handleChange(number)}
        placeholderTextColor={'#ffffff80'}
      />
      <ButtonPrevNext
        onPress1={() => router.back()}
        onPress2={validate}
        buttonName1="< ANNULER"
        buttonName2="VALIDER >"
      />
    </View>
  );
};

export default ResponseNumber;
