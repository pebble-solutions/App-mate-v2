import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { globalStyles } from "../shared/globalStyles";

type ResponseDateType = {
  onDateChange: (date: Date) => void;
    _id: string;
    label: string;
    question: string;
    mandatory: boolean;
};

const ResponseDate: React.FC<ResponseDateType> = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (date: Date) => {
    setShowDatePicker(false);
    setSelectedDate(date);
    onDateChange(date);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  return (
    <View>
      <Text >Sélectionnez une date :</Text>
      <TouchableOpacity onPress={showDatepicker}>
        <Text>
          {selectedDate.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DatePicker
          date={selectedDate}
          onDateChange={handleDateChange}
          mode="date"
        />
      )}
    </View>
  );
};

export default ResponseDate;
