import React, { useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet } from 'react-native';
import { globalStyles } from "../shared/globalStyles";


type ResponseTextType = {
  varText: {
    _id: string;
    label: string;
    min_length: number;
    max_length: number;
    question: string;
    mandatory: boolean;
    getValue?: (text: string) => void;
  };
}

const ResponseText: React.FC<ResponseTextType> = ({ varText }) => {
  console.log(varText, 'varText');

  const [response, setResponse] = React.useState({
    'id': varText._id,
    'label': varText.label,
    'value': ''
  });


  const handleChange = (text: string) => {

    if (text.length <= varText.max_length) {
      setResponse(prev => ({ ...prev, value: text }));
    } else {
      Alert.alert(`La réponse ne peut pas dépasser ${varText.max_length} caractères`);
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
    </View>
  );
};

export default ResponseText;


