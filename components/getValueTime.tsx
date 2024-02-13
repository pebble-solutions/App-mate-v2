import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { globalStyles } from '../shared/globalStyles';  

const ResponseTime = ({ onTimeChange, varTime }) => {
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleTimeChange = (time) => {
    if (Platform.OS === 'android') {
      setShowTimePicker(false);
    }

    if (time !== undefined) {
      setSelectedTime(time);
      onTimeChange(time);
    }
  };

  const showTimepicker = () => {
    setShowTimePicker(true);
  };

  return (
    <View>
      <Text>{varTime.question}</Text>
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

export default ResponseTime;
