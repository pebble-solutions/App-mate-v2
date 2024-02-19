import React, { useState } from "react";
import { View, Text, TextInput } from 'react-native';
import { globalStyles } from "../shared/globalStyles";
import { RawVariableType } from "../shared/types/SessionType";

// Type définissant les propriétés attendues par le composant
type GetValueText = {
  varText: RawVariableType; // La variable à afficher
  onRawVariablesChange: (rawVariables: RawVariableType[]) => void; 
};

// Composant de réponse textuelle
const GetValueText: React.FC<GetValueText> = ({ varText, onRawVariablesChange }) => {
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
    onRawVariablesChange(rawVariables);
  };

  return (  
    <View>
      <TextInput
        style={globalStyles.input}
        placeholder={`Saisissez votre réponse ici)`}
        value={response.value}
        onChangeText={handleChange}
        placeholderTextColor={'#ffffff80'}
      />
    </View>
  );
};

export default GetValueText;
