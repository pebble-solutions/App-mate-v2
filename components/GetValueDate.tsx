import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { globalStyles } from '../shared/globalStyles';
import ButtonPrevNext from './TunnelsButton';
import { router } from 'expo-router';
import { VariableType } from '../shared/types/VariableType';
import { RawVariableType } from '../shared/types/SessionType';

type ResponseDateType = {
  onDateChange: (date: Date) => void;
  varDate: VariableType;
  onRawVariablesChange: (rawVariables: RawVariableType[]) => void; 

}

const ResponseDate: React.FC<ResponseDateType> = ({ onDateChange, varDate, onRawVariablesChange }) => {
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
      onDateChange(date);
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
         {rawVariables.map((rawVariable, index) => (
        <Text key={index} style={globalStyles.textLight}>
            {rawVariable.label}: {rawVariable.value}
        </Text>
        ))}
      <Text style={globalStyles.textLight}>{varDate.question}</Text>
      <View style={globalStyles.input}>
        <Text style={globalStyles.textLight}>Sélectionnez une date :</Text>
        <TouchableOpacity onPress={showDatepicker}>
          <Text style={globalStyles.textLight}>
            {selectedDate.toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })}
          </Text>
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
        <ButtonPrevNext
        onPress1={() => router.back()}
        onPress2={validate}
        buttonName1="< ANNULER"
        buttonName2="VALIDER >"
      />
    </View>
  );
};

export default ResponseDate;
