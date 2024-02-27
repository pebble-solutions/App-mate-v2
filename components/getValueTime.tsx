import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { globalStyles } from '../shared/globalStyles';  
import { RawVariableType } from '../shared/types/SessionType';

type ResponseTimeType = {
  onRawVariablesChange: (rawVariables: RawVariableType) => void; // Fonction de rappel pour passer les rawVariables au composant parent
  varTime: RawVariableType; // Assurez-vous de définir correctement le type de varTime
}

const GetValueTime: React.FC<ResponseTimeType> = ({ varTime, onRawVariablesChange }) => {
    const [response, setResponse] = React.useState({
        '_id': varTime._id,
        'label': varTime.label,
        'value': new Date(),
        'type': varTime.type,
        
    });
  const [selectedTime, setSelectedTime] = useState<Date>(new Date());
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);

    useEffect(() => {
        onRawVariablesChange(response);
        }   
        , [response]);

    useEffect(() => {
        handleTimeChange;
        }
        , [selectedTime]);


const handleTimeChange = (event: DateTimePickerEvent ,time?: Date) => {
    if (Platform.OS === 'android') {
        setShowTimePicker(false);
    }
    if (time !== undefined) {
        setSelectedTime(time);
        console.log(time, 'time');
        setResponse(prev => ({ ...prev, value: time }));
    }
  };


  const showTimepicker = () => {
    setShowTimePicker(true);
  };

  return (
    <View>
    
        <Text style={globalStyles.textLight}>Sélectionnez une heure :</Text>
      <View style={globalStyles.input}>
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
