import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { globalStyles } from '../shared/globalStyles';
import ButtonPrevNext from './TunnelsButton';
import { router } from 'expo-router';

const ResponseDateTime = ({ onDateTimeChange, varDateTime }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);

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

  const handleDateChange = (event, date) => {
    hideDatePicker();

    if (date !== undefined) {
      setSelectedDate(date);
      showTimePicker();
    }
  };

  const handleTimeChange = (event, time) => {
    hideTimePicker();

    if (time !== undefined) {
      setSelectedTime(time);
      onDateTimeChange(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), time.getHours(), time.getMinutes()));
    }
  };

  return (
    <View>
        <Text>{varDateTime.question}</Text>
        <View style={globalStyles.input}>
            <Text style={globalStyles.textLight}>
                Sélectionnez une date et une heure :
            </Text>
            <TouchableOpacity onPress={showDatePicker}>
                <Text style={globalStyles.textLight}>
                {selectedDate.toLocaleDateString('fr-FR') +
                    ' ' +
                    selectedTime.toLocaleTimeString('fr-FR', {
                    hour: '2-digit',
                    minute: '2-digit',
                    })}
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
             <ButtonPrevNext 
                onPress1={() =>  router.back() }
                onPress2={()=> console.log('suivant')}
                buttonName1="< Précédent"
                buttonName2="Suivant >"
            />  
        </View>
  </View>
  
  );
};

export default ResponseDateTime;