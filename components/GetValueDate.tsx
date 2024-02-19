import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { globalStyles } from '../shared/globalStyles';
import { RawVariableType } from '../shared/types/SessionType';

type ResponseDateType = {
  onDateChange: (date: Date) => void;
  varDate: RawVariableType;
  onRawVariablesChange: (rawVariables: RawVariableType[]) => void; 
  toLocaleDateString: (date: Date) => string;

}

const GetValueDate: React.FC<ResponseDateType> = ({ varDate, onRawVariablesChange, onDateChange}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [rawVariables, setRawVariables] = useState<RawVariableType[]>([]);
  const [response, setResponse] = useState<{ _id: string; label: string; value: Date | undefined}>({
    _id: varDate._id,
    label: varDate.label,
    value: undefined,
  });

  const handleDateChange = ( date?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }

    if (date !== undefined) {
      setSelectedDate(date);
      console.log(selectedDate, 'date');
    }
  };
  const validate = () => {
    setRawVariables(prev => [...prev, selectedDate]);
    console.log(selectedDate);
    onRawVariablesChange(rawVariables);
  };
  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  return (
    <View>
        
    
      <View style={globalStyles.input}>
        <TouchableOpacity onPress={showDatepicker}>
          <Text style={globalStyles.textLight}>
            
            {selectedDate.toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })}
          </Text>
        <Text style={globalStyles.textLight}>Sélectionnez une date ..</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="spinner"
            onChange={handleDateChange}
          />
        )}
        </View>
        
    </View>
  );
};

export default GetValueDate;
