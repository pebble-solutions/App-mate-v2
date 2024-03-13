import React, { useState,useEffect } from 'react';
import {View, Platform, StyleSheet, TouchableOpacity,Text} from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import {globalStyles} from '../../shared/globalStyles';
import {DateTimeInputOptions} from "./types/InputOptions";

const DateTimeInput = ({value, onChange, type, placeholder}: DateTimeInputOptions) => {

    type = type || 'datetime'

    const [currentValue, setCurrentValue] = useState<Date | null>(value || new Date())
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [showTimePicker, setShowTimePicker] = useState(false)
    const [selectedTime, setSelectedTime] = useState<Date>(value || new Date())  

    const useDate = ['date', 'datetime'].includes(type)
    const useTime = ['time', 'datetime'].includes(type)
    // const [useDate, setUseDate] = useState(type === 'date' || type === 'datetime');
    // const [showTimePicker, setShowTimePicker] = useState(type === 'time' || type === 'datetime');
    useEffect(() => {
        if (onChange) onChange(currentValue || null)
        console.log(currentValue, 'datetimeinput')
    }, [currentValue]);
    useEffect(() => {
        handleTimeChange
    }
    , [selectedTime])

    const handleDateChange = (_: DateTimePickerEvent, newVal: Date) => {
        
        if (Platform.OS === 'android') {
            setShowDatePicker(() => false);
        }
        
    }
    
    const handleTimeChange = (_: DateTimePickerEvent, newVal: Date) => {
        
        if (Platform.OS === 'android') {
            setShowTimePicker(() => false);
        }
    
        setSelectedTime(newVal);
        setCurrentValue(selectedTime);
        console.log(selectedTime,  'selectedTime', currentValue, 'currentValue', newVal, 'newVal')
    }

    const toggleDatePicker = () => {
        setShowDatePicker((prev) => !prev)
    }

    const toggleTimePicker = () => {
        setShowTimePicker((prev) => !prev)
    }
 
    return (
        <View style={[globalStyles.input, localStyle.dateTimeInput]}>
            <TouchableOpacity onPress={()=> toggleTimePicker()}>
                <Text>{selectedTime.toLocaleTimeString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (<DateTimePicker
                value={selectedTime}
                mode="date"
                display="spinner"
                is24h={true}
                onChange={handleDateChange}
                
            />)}

            {showTimePicker && (<DateTimePicker
                value={selectedTime}
                mode="time"
                display="spinner"
                onChange={handleTimeChange}
            />)}
        </View>
    );
};

export default DateTimeInput;

const localStyle = StyleSheet.create({
    dateTimeInput: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start"
    }
})