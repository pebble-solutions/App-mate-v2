
import React, { useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet } from 'react-native';
// import { useSessionStatusContext } from "../shared/contexts/SessionStatusContext";
// import { useSessionContext } from "../shared/contexts/SessionContext";
import { globalStyles } from "../shared/globalStyles";
import { VariableType } from "../shared/types/VariableType";
import ButtonPrevNext from "./TunnelsButton";
import { router } from "expo-router";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

// Type définissant les propriétés attendues par le composant
type ResponseTextAreaType = {
  varTextArea: VariableType
}
// const statusContext = useSessionStatusContext()
// const { getStatus, setStatus, resetStatus, setPayload, resetPayload, getPayload} = statusContext
// const sessionContext = useSessionContext()
// console.log(sessionContext, 'sessionContext')
// console.log(getStatus, 'getStatus')
// Composant de réponse textuelle
const ResponseTextArea: React.FC<ResponseTextAreaType> = ({ varTextArea }) => {

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
    console.log(response, 'response'   )
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
       <ButtonPrevNext 
        onPress1={() =>  router.back() }
        onPress2={()=> console.log('suivant')}
        buttonName1="< Précédent"
        buttonName2="Suivant >"
        />  
    </View>
  );
};

export default ResponseTextArea;


