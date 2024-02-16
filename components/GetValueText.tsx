import React, { useState } from "react";
import { View, Text, TextInput } from 'react-native';
import { globalStyles } from "../shared/globalStyles";
import ButtonPrevNext from "./TunnelsButton";
import { router } from "expo-router";
import { VariableType } from "../shared/types/VariableType";
import { RawVariableType } from "../shared/types/SessionType";

// Type définissant les propriétés attendues par le composant
type ResponseTextType = {
  varText: VariableType;
  onRawVariablesChange: (rawVariables: RawVariableType[]) => void; 
};

// Composant de réponse textuelle
const ResponseText: React.FC<ResponseTextType> = ({ varText, onRawVariablesChange }) => {
  // State pour suivre la réponse de l'utilisateur
  const [response, setResponse] = useState({
    _id: varText._id,
    label: varText.label,
    value: ''
  });

  // State pour suivre les réponses brutes
  const [rawVariables, setRawVariables] = useState<RawVariableType[]>([]);

  // Fonction appelée lorsqu'il y a un changement dans le TextInput
  const handleChange = (text: string) => {
    // Met à jour la réponse dans le state
    setResponse(prev => ({ ...prev, value: text }));
  };

  // Fonction de validation
  const validate = () => {
    setRawVariables(prev => [...prev, response]);
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
        {varText.question}
      </Text>
      <TextInput
        style={globalStyles.input}
        placeholder={`Saisissez votre réponse ici (max ${varText.max_length} caractères)`}
        value={response.value}
        onChangeText={handleChange}
        placeholderTextColor={'#ffffff80'}
      />
      <View style={{ height: 20 }} />
      <ButtonPrevNext
        onPress1={() => router.back()}
        onPress2={validate}
        buttonName1="< ANNULER"
        buttonName2="VALIDER >"
      />
    </View>
  );
};

export default ResponseText;
