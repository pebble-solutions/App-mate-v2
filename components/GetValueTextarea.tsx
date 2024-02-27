
import React, { useState, useEffect} from "react";
import { View, Text, TextInput, Alert, StyleSheet } from 'react-native';
import { globalStyles } from "../shared/globalStyles";
import { RawVariableType } from "../shared/types/SessionType";

// Type définissant les propriétés attendues par le composant
type ResponseTextARea = {
  varTextArea: RawVariableType;
  onRawVariablesChange: (response: RawVariableType) => void;
};

const GetValueTextArea: React.FC<ResponseTextARea> = ({ varTextArea, onRawVariablesChange }) => {

  // State pour suivre la réponse de l'utilisateur
  const [response, setResponse] = useState({
    _id: varTextArea._id,
    label: varTextArea.label,
    value: '',
    type: varTextArea.type,
  });

  useEffect(() => {
    onRawVariablesChange(response);
    }, [response]);
    

  // Fonction appelée lorsqu'il y a un changement dans le TextInput
  const handleChange = (text: string) => {
    // Met à jour la réponse dans le state
    setResponse(prev => ({ ...prev, value: text }));
  };

 
  return (
    <View>
      <TextInput
        style={globalStyles.input}
        placeholder={`Saisissez votre réponse ici `}
        value={response.value}
        multiline={true}
        onChangeText={(text) => handleChange(text)}
        placeholderTextColor={'#ffffff80'}
      />
    </View>
  );
};

export default GetValueTextArea;


