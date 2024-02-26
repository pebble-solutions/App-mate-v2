import React, { useState, useEffect} from "react";
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { globalStyles } from "../shared/globalStyles";
import { RawVariableType } from "../shared/types/SessionType";

type ResponseNumberType = {
  varNumber: RawVariableType;
  onRawVariablesChange: (rawVariables: RawVariableType) => void;
}

const GetValueNumber: React.FC<ResponseNumberType> = ({ varNumber, onRawVariablesChange }) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [response, setResponse] = useState({
        _id: varNumber._id,
        label: varNumber.label,
        value: '',
        type: varNumber.type,
    });
    console.log(varNumber.type, 'varNumber')
    
    
    const handleInputChange = (text: string) => {
        setInputValue(text);
        handleCheckNumber();
        handleChange(text);
      };
      
      const validateNumber = (input: string): boolean => {
        if (varNumber.type === 'integer') {
            // Vérifier si la saisie est un entier valide
            return Number.isInteger(parseFloat(input));
        } 
        else if (varNumber.type === 'float') {
            // Vérifier si la saisie est un nombre (entier ou flottant) valide
            return !isNaN(parseFloat(input)) && isFinite(parseFloat(input));
        }
        else if (varNumber.type === 'number') {
            // Vérifier si la saisie est un nombre (entier ou flottant) valide
            return !isNaN(parseFloat(input)) && isFinite(parseFloat(input));
        }
        return false;
    };
    
      const handleCheckNumber = () => {
        const isValidNumber = validateNumber(inputValue);
        if (!isValidNumber) {
            Alert.alert('Error', 'Please enter a valid number!');
        } else {
            console.log( inputValue,'Valid number');
        }
      };
    
    const handleChange = (text: string) => {
        setResponse(prev => ({ ...prev, value: text }));
        console.log(response, 'response')
    };
    
    useEffect(() => {
        onRawVariablesChange(response);
    }, [response]);

    useEffect(() => {
        handleChange(inputValue);
    }
    , [inputValue]);

    

    return (
    <View>
        <TextInput
            style={globalStyles.input}
            placeholder="Saisissez un nombre"
            keyboardType="numeric"
            inputMode="numeric"
            value={inputValue}  
            onChangeText={handleInputChange}
            placeholderTextColor={'#ffffff80'}
        />
    </View>
    );
};

export default GetValueNumber;
