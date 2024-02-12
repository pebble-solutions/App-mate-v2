import React, { useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet,TouchableOpacity } from 'react-native';
import {globalStyles} from "../shared/globalStyles";

// type définissant les propriétés attendues par le composant
type ResponseNumberType = {
  varNumber: {
    _id: string;
    label: string;
    min_value: number;
    max_value: number;
    question: string;
    mandatory: boolean;
  };
}
// Composant de réponse numérique
const ResponseNumber: React.FC<ResponseNumberType> = ({ varNumber }) => {
  console.log(varNumber, 'varNumber');
   // State pour suivre la réponse de l'utilisateur
  const [response, setResponse] = React.useState({
    'id': varNumber._id,
    'label': varNumber.label,
    'value': ''
  });
// Fonction appelée lorsqu'il y a un changement dans le TextInput
  const handleChange = (number: string) => {
    // Convertit la valeur entrée en nombre
    const parsedNumber = parseFloat(number);
    // Met à jour la réponse dans le state si le nombre est valide

    if (!isNaN(parsedNumber) && parsedNumber >= varNumber.min_value && parsedNumber <= varNumber.max_value) {
      setResponse(prev => ({ ...prev, value: parsedNumber.toString() }));
    } else {
      Alert.alert(`Veuillez saisir un nombre compris entre ${varNumber.min_value} et ${varNumber.max_value}`);
    }
  };

  return (
    <View>
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
    </View>
  );
};

export default ResponseNumber;
