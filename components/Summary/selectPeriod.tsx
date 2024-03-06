
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { format, set } from 'date-fns';
import { fr } from 'date-fns/locale';
import { globalStyles } from '../../shared/globalStyles';
import RNDateTimePicker from '@react-native-community/datetimepicker';

type SelectPeriodType = {
  start: Date;
  end: Date
  onChange: (start: Date, end: Date) => void; 
}

const SelectPeriod: React.FC<SelectPeriodType> = ({ start, end, onChange }) => {
    const [selectedStartDate, setSelectedStartDate] = useState<Date>(new Date());
    const [selectedEndDate, setSelectedEndDate] = useState<Date>(new Date());
    const [showDatePickerStart, setShowDatePickerStart] = useState<boolean>(false);
    const [showDatePickerEnd, setShowDatePickerEnd] = useState<boolean>(false);


  useEffect(() => {
    onChange(selectedStartDate, selectedEndDate);
  }, [selectedStartDate, selectedEndDate]);

    

  const handleDateStartChange = (_event: DateTimePickerEvent, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePickerStart(false);
    }
    if (date) {
      setSelectedStartDate(date);
    }
  };
  const handleDateEndChange = (_event: DateTimePickerEvent, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePickerEnd(false);
    }
    if (date) {
      setSelectedEndDate(date);
    }
  };
  
  const showDatepickerStart = () => {
    setShowDatePickerStart(true);
  };
  const showDatepickerEnd = () => {
    setShowDatePickerEnd(true);
  };
  return (
    <View>
      <View>
        <Text style={globalStyles.textLight}>Sélectionnez une date de début</Text>
        <TouchableOpacity style={globalStyles.input} onPress={showDatepickerStart}>
          <Text style={globalStyles.textLight}>
            {format(selectedStartDate, 'PP', { locale: fr })}
          </Text>
        </TouchableOpacity>

        {showDatePickerStart && (
          <RNDateTimePicker
            value={selectedStartDate}
            mode="date"
            display="calendar"
            onChange={handleDateStartChange}
          />
        )}
        <Text style={globalStyles.textLight}>Sélectionnez une date de fin</Text>

        <TouchableOpacity style={globalStyles.input} onPress={showDatepickerEnd}>
          <Text style={globalStyles.textLight}>
            {format(selectedEndDate, 'PP', { locale: fr })}
          </Text>
        </TouchableOpacity>
        {showDatePickerEnd && (
          <RNDateTimePicker
            value={selectedEndDate}
            mode="date"
            display="calendar"
            onChange={handleDateEndChange}
          />
        )}
      </View>
    </View>
  );
};

export default SelectPeriod;
