import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { globalStyles } from '../shared/globalStyles';
import { RawVariableType } from '../shared/types/SessionType';
import {format} from 'date-fns';
import {fr} from 'date-fns/locale';

type ResponseDateType = {
//   onDateChange: (date: Date) => void;
  varDate: RawVariableType;
  onRawVariablesChange: (rawVariables: RawVariableType) => void; 
//   toLocaleDateString: (date: Date) => string;

}

const GetValueDate: React.FC<ResponseDateType> = ({ varDate, onRawVariablesChange}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [rawVariables, setRawVariables] = useState<RawVariableType>();
  const [response, setResponse] = useState<RawVariableType>({
    _id: varDate._id,
    label: varDate.label,
    value: undefined,
    type: varDate.type,
  });

//   const handleDateChange = (event: Event,date?: Date) => {
//     if (Platform.OS === 'android') {
//       setShowDatePicker(false);
//     }

//     if (date !== undefined) {
//       setSelectedDate(date);
//       setResponse({...prev, selectedDate });
//         onDateChange(date);
//         console.log(date, 'date');
//         console.log(response, 'response');
//         console.log(selectedDate, 'selectedDate');
//       validate()
//     }
//     console.log(date, 'date');
//   };
//   const validate = () => {
//     onRawVariablesChange(response);
//   };
const handleDateChange = (_event: DateTimePickerEvent, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }

    if (date !== undefined) {
      setSelectedDate(date);
    
      setResponse({...response, value: selectedDate});
      validate();
      
    }
  };
  const validate = () => {
    onRawVariablesChange(response);
  };
  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  return (
    <View>
        
    
      <View >
        <TouchableOpacity style={globalStyles.input} onPress={showDatepicker}>
          <Text style={globalStyles.textLight}>
            {format(selectedDate, 'PP', {locale: fr})}
          </Text>
        <Text style={globalStyles.textLight}>Sélectionnez une date ..</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="calendar"
            onChange={handleDateChange}
          />
        )}
        </View>
        
    </View>
  );
};

export default GetValueDate;
