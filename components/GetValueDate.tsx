import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { globalStyles } from '../shared/globalStyles';
import { RawVariableType } from '../shared/types/SessionType';
import {format} from 'date-fns';
import {fr} from 'date-fns/locale';
import RNDateTimePicker from '@react-native-community/datetimepicker';

type ResponseDateType = {
//   onDateChange: (date: Date) => void;
  varDate: RawVariableType;
  onRawVariablesChange: (rawVariables: RawVariableType) => void; 
//   toLocaleDateString: (date: Date) => string;

}

const GetValueDate: React.FC<ResponseDateType> = ({ varDate, onRawVariablesChange}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const [response, setResponse] = useState<RawVariableType>({
      _id: varDate._id,
      label: varDate.label,
      value: selectedDate,
      type: varDate.type,
    });
    
    useEffect(() => {
        onRawVariablesChange(response);
      }, [response]);
    

    
    
    const handleDateChange = (_event: DateTimePickerEvent, date?: Date) => {
        if (Platform.OS === 'android') {
            setShowDatePicker(false);
        }
        if (date) {
            console.log(_event, 'event')
            console.log(date, 'date')
            let selectedDateCopy = { ...selectedDate };
            console.log(selectedDateCopy, 'selectedDateCopy')
            const selectedDateUpdate = new Date(date) as Date;
            console.log(selectedDateUpdate, 'selectedDateUpdate')   
            selectedDateCopy = selectedDateUpdate;
            console.log(selectedDateCopy, 'selectedDateCopy')   
            setSelectedDate(selectedDateUpdate);
            console.log(selectedDate, 'selectedDatedans hendleDateChange')
            const responseCopy = { ...response };
            const responseCopyUpdate = { ...responseCopy, value: selectedDateUpdate };
            setResponse(responseCopyUpdate);
            console.log(response, 'responsein handleDateChange')
        }
    };
    
  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  return (
    <View>
        

      <View >
        <TouchableOpacity style={globalStyles.input} onPress={showDatepicker}>
            <Text style={globalStyles.textLight}>Sélectionnez une date ..</Text>
            <Text style={globalStyles.textLight}>
                {format(selectedDate, 'PP', {locale: fr})}
            </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <RNDateTimePicker
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
