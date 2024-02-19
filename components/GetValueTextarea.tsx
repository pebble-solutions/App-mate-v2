
import React, { useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet } from 'react-native';
import { globalStyles } from "../shared/globalStyles";
import { RawVariableType } from "../shared/types/SessionType";

// Type définissant les propriétés attendues par le composant
type GetValueTextAreaType = {
  varTextArea: RawVariableType;
  onRawVariablesChange: (rawVariables: RawVariableType[]) => void;

}

const GetValueTextArea: React.FC<GetValueTextAreaType> = ({ varTextArea, onRawVariablesChange }) => {

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
      <TextInput
        style={globalStyles.input}
        placeholder={`Saisissez votre réponse ici (max ${varTextArea.max_length} caractères)`}
        value={response.value}
        multiline={true}
        onChangeText={(text) => handleChange(text)}
        placeholderTextColor={'#ffffff80'}

      />
    </View>
  );
};

export default GetValueTextArea;


