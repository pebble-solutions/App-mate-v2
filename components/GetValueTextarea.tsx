
import React, { useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet } from 'react-native';
// import { useSessionStatusContext } from "../shared/contexts/SessionStatusContext";
// import { useSessionContext } from "../shared/contexts/SessionContext";
import { globalStyles } from "../shared/globalStyles";
import { VariableType } from "../shared/types/VariableType";
import ButtonPrevNext from "./TunnelsButton";
import { router } from "expo-router";
import { RawVariableType } from "../shared/types/SessionType";

// Type définissant les propriétés attendues par le composant
type ResponseTextAreaType = {
  varTextArea: VariableType;
  onRawVariablesChange: (rawVariables: RawVariableType[]) => void;

}

const ResponseTextArea: React.FC<ResponseTextAreaType> = ({ varTextArea, onRawVariablesChange }) => {

  // State pour suivre la réponse de l'utilisateur
  const [response, setResponse] = React.useState({
    '_id': varTextArea._id,
    'label': varTextArea.label,
    'value': ''
  });
  const [rawVariables, setRawVariables] = useState<RawVariableType[]>([]);

  // Fonction appelée lorsqu'il y a un changement dans le TextInput
  const handleChange = (text: string) => {
    // Met à jour la réponse dans le state
    setResponse(prev => ({ ...prev, value: text }));
  };

 const validate = () => {
    setRawVariables([...rawVariables, response])
    console.log(response);
    onRawVariablesChange(rawVariables);
  };
  return (
    <View>
        {rawVariables.map((rawVariable, index) => (
        <Text key={index} style={globalStyles.textLight}>
            {rawVariable.label}: {rawVariable.value}
        </Text>
        ))}
      <Text style={globalStyles.textLight}>
        {varTextArea.question}
      </Text>
      <TextInput
        style={globalStyles.input}
        placeholder={`Saisissez votre réponse ici (max ${varTextArea.max_length} caractères)`}
        value={response.value}
        multiline={true}
        onChangeText={(text) => handleChange(text)}
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

export default ResponseTextArea;


