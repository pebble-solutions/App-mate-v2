
import React, { useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet } from 'react-native';
import { globalStyles } from "../shared/globalStyles";
import { VariableType } from "../shared/types/VariableType";

// Type définissant les propriétés attendues par le composant
type ResponseTextAreaType = {
  varTextArea: VariableType

}

// Composant de réponse textuelle
const ResponseTextArea: React.FC<ResponseTextAreaType> = ({ varTextArea }) => {
  console.log(varTextArea, 'varTextArea');

  // State pour suivre la réponse de l'utilisateur
  const [response, setResponse] = React.useState({
    'id': varTextArea._id,
    'label': varTextArea.label,
    'value': ''
  });

  // Fonction appelée lorsqu'il y a un changement dans le TextInput
  const handleChange = (text: string) => {
    // Met à jour la réponse dans le state
    setResponse(prev => ({ ...prev, value: text }));
  };

  return (
    <View>
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
    </View>
  );
};

export default ResponseTextArea;


