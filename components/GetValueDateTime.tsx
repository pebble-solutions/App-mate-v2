import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { globalStyles } from '../shared/globalStyles';
import ButtonPrevNext from './TunnelsButton';
import { router } from 'expo-router';
import { VariableType } from '../shared/types/VariableType';
import { RawVariableType } from '../shared/types/SessionType';

type ResponseDateTimeType = {
  onDateTimeChange: (dateTime: Date) => void;
  onRawVariablesChange: (rawVariables: RawVariableType[]) => void; // Fonction de rappel pour passer les rawVariables au composant parent
 
  varDateTime: VariableType; 
}

const ResponseDateTime: React.FC<ResponseDateTimeType> = ({ onDateTimeChange, varDateTime, onRawVariablesChange }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<Date>(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState<boolean>(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState<boolean>(false);
  const [rawVariables, setRawVariables] = useState<RawVariableType[]>([]);


  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };

  const handleDateChange = (event: Event, date?: Date) => {
    hideDatePicker();

    if (date !== undefined) {
      setSelectedDate(date);
      showTimePicker();
      console.log(selectedDate, 'selectedDate')
    }
  };

  const handleTimeChange = (event: Event, time?: Date) => {
    hideTimePicker();

    if (time !== undefined) {
      setSelectedTime(time);
      const dateTime = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), time.getHours(), time.getMinutes());
      onDateTimeChange(dateTime);
      console.log(dateTime, 'dateTime')
    }
  };
  const validate = () => {
    // setRawVariables([...rawVariables, selectedDate, selectedTime])
    onRawVariablesChange(rawVariables);
  };
  return (
    <View>
      <Text style={globalStyles.textLight}>{varDateTime.question}</Text>
      <Text style={globalStyles.textLight}>{varDateTime.description}</Text>

      <View style={globalStyles.input}>
        <TouchableOpacity onPress={showDatePicker}>
          <Text style={globalStyles.textLight}>
        <Text style={globalStyles.textLight}>
          Sélectionnez une date et une heure :
        </Text>
            {/* {selectedDate.toLocaleDateString('fr-FR') +
              ' ' +
              selectedTime.toLocaleTimeString('fr-FR', {
                hour: '2-digit',
                minute: '2-digit',
              })} */}
              VVVV
          </Text>
        </TouchableOpacity>

        {isDatePickerVisible && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="spinner"
            onChange={handleDateChange}
          />
        )}

        {isTimePickerVisible && (
          <DateTimePicker
            value={selectedTime}
            mode="time"
            display="spinner"
            onChange={handleTimeChange}
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

export default ResponseDateTime;
