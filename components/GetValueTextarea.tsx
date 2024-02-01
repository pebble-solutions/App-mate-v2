// import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
// import {globalStyles} from "../shared/globalStyles";

// type ResponseTextAreaType = {
//     varTextArea: string
//     min: number | null; 
//     max: number | null;
// }

// export default function ResponseText({ varTextArea }: ResponseTextAreaType) {
//     console.log(varTextArea, ' varTextArea')
    
//   return (
//     <View>
//         <Text>
//             {varTextArea}
//         </Text>
//         <TextInput
//           placeholder="Saisissez votre réponse ici "
//           value={""}
//         />
//     </View>
//   );
// }

import React, { useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet } from 'react-native';
import { globalStyles } from "../shared/globalStyles";

// Type définissant les propriétés attendues par le composant
type ResponseTextAreaType = {
  varTextArea: {
    _id: string;
    label: string;
    min_length: number;
    max_length: number;
    question: string;
    mandatory: boolean;
  };
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
      <Text>
        {varTextArea.question}
      </Text>
      <TextInput
        // style={globalStyles.input}
        placeholder={`Saisissez votre réponse ici (max ${varTextArea.max_length} caractères)`}
        value={response.value}
        multiline={true}
        onChangeText={(text) => handleChange(text)}
      />
    </View>
  );
};

export default ResponseTextArea;


