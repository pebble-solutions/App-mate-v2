import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { globalStyles } from '../shared/globalStyles';
import { VariableType } from '../shared/types/VariableType';

interface ResponseDateRangeProps {
  onDateRangeChange: (startDate: Date, endDate: Date) => void;
  varDateRange: VariableType; 
}

const ResponseDateRange: React.FC<ResponseDateRangeProps> = ({ onDateRangeChange, varDateRange }) => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState<boolean>(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState<boolean>(false);

  const handleStartDateChange = (event: Event, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowStartDatePicker(false);
    }

    if (date !== undefined) {
      setStartDate(date);
      onDateRangeChange(date, endDate);
    }
  };

  const handleEndDateChange = (event: Event, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowEndDatePicker(false);
    }

    if (date !== undefined) {
      setEndDate(date);
      onDateRangeChange(startDate, date);
    }
  };

  const showStartDatepicker = () => {
    setShowStartDatePicker(true);
  };

  const showEndDatepicker = () => {
    setShowEndDatePicker(true);
  };

  return (
    <View>
      <Text>{varDateRange.question}</Text>
      <View style={globalStyles.input}>
        <Text style={globalStyles.textLight}>
          Sélectionnez une date de début :
        </Text>
        <TouchableOpacity onPress={showStartDatepicker}>
          <Text style={globalStyles.textLight}>
            {startDate.toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })}
          </Text>
        </TouchableOpacity>

        {showStartDatePicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="spinner"
            onChange={handleStartDateChange}
          />
        )}

        <Text style={globalStyles.textLight}>
          Sélectionnez une date de fin :
        </Text>
        <TouchableOpacity onPress={showEndDatepicker}>
          <Text style={globalStyles.textLight}>
            {endDate.toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })}
          </Text>
        </TouchableOpacity>

        {showEndDatePicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display="spinner"
            onChange={handleEndDateChange}
          />
        )}
      </View>
    </View>
  );
};

export default ResponseDateRange;
