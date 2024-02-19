import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { globalStyles } from '../shared/globalStyles';  
import { RawVariableType } from '../shared/types/SessionType';

type ResponseTimeType = {
  onTimeChange: (time: Date) => void;
  onRawVariablesChange: (rawVariables: RawVariableType[]) => void; // Fonction de rappel pour passer les rawVariables au composant parent
  varTime: RawVariableType; // Assurez-vous de définir correctement le type de varTime
  response: RawVariableType;
}

const GetValueTime: React.FC<ResponseTimeType> = ({ onTimeChange, varTime, onRawVariablesChange }) => {
  console.log(varTime, 'varNumber');
    const [response, setResponse] = React.useState({
        '_id': varTime._id,
        'label': varTime.label,
        'value': new Date()
        
    });
  const [selectedTime, setSelectedTime] = useState<Date>(new Date());
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [rawVariables, setRawVariables] = useState<RawVariableType[]>([]);

  const handleChange = (time: Date) => {
    setResponse(prev => ({ ...prev, value: time }));
};

  const handleTimeChange = (time?: Date) => {
    if (Platform.OS === 'android') {
      setShowTimePicker(false);
    }
    if (time !== undefined) {
      setSelectedTime(time);
      onTimeChange(time);
      console.log(time, 'time');
    }
  };
  const validate = () => {
    setRawVariables([...rawVariables, response])
    onRawVariablesChange(rawVariables);
  };

  const showTimepicker = () => {
    setShowTimePicker(true);
  };

  return (
    <View>
        {rawVariables.map((rawVariable, index) => (
        <Text key={index} style={globalStyles.textLight}>
            {rawVariable.label}: {rawVariable.value}
        </Text>
        ))}
      <Text style={globalStyles.textLight}>{varTime.question}</Text>
      <View style={globalStyles.input}>
        <Text style={globalStyles.textLight}>Sélectionnez une heure :</Text>
        <TouchableOpacity onPress={showTimepicker}>
          <Text style={globalStyles.textLight}>
            {selectedTime.toLocaleTimeString('fr-FR', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </TouchableOpacity>

        {showTimePicker && (
          <DateTimePicker
            value={selectedTime}
            mode="time"
            display="spinner"
            onChange={handleTimeChange}
          />
        )}
     
      </View>
     
    </View>
  );
};

export default GetValueTime;
