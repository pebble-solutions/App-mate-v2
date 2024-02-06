import React, { useState } from "react";
import { View, Text, TextInput, Alert} from 'react-native';
import { VariableType } from '../shared/types/VariableType';
import { globalStyles } from "../shared/globalStyles";
import Button from "./Button";

type ResponseTextType = {

  varText:VariableType 
  getValue: (text: string) => void;
}

const ResponseText: React.FC<ResponseTextType> = ({ varText, getValue }) => {
  console.log(varText, 'varText');

  const [response, setResponse] = React.useState({
    'id': varText._id,
    'label': varText.label,
    'value': ''
  });


  const handleChange = (text: string) => {
    if (varText.max_length){
      if (text.length  <= varText.max_length) {
        setResponse(prev => ({ ...prev, value: text }));
      } else {
        Alert.alert(`La réponse ne peut pas dépasser ${varText.max_length} caractères`);
      } 
    }else{
        setResponse(prev => ({ ...prev, value: text }))
    }
  };

  return (
    <View>
      <Text>
        {varText.question}
      </Text>
      <TextInput
        style={globalStyles.input}
        placeholder={`Saisissez votre réponse ici (max ${varText.max_length} caractères)`}
        value={response.value}
        onChangeText={(text) => handleChange(text)}
      />
      <Button title="valider"  onPress={() => console.log("Bouton cliqué")} variant='lg' />
    </View>
  );
};

export default ResponseText;


