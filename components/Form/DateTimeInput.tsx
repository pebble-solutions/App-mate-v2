import React, { useState,useEffect } from 'react';
import {View, Platform, StyleSheet, TouchableOpacity,Text} from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import {globalStyles} from '../../shared/globalStyles';
import {DateTimeInputOptions} from "./types/InputOptions";

const DateTimeInput = ({value, onChange, type, placeholder}: DateTimeInputOptions) => {

    type = type || 'datetime'

    const [currentValue, setCurrentValue] = useState<Date | undefined>(value || new Date())
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [showTimePicker, setShowTimePicker] = useState(false)
    const [selectedTime, setSelectedTime] = useState<Date>(value || new Date())  

    const useDate = ['date', 'datetime'].includes(type)
    const useTime = ['time', 'datetime'].includes(type)
    // const [useDate, setUseDate] = useState(type === 'date' || type === 'datetime');
    // const [showTimePicker, setShowTimePicker] = useState(type === 'time' || type === 'datetime');
    useEffect(() => {
        if (onChange) onChange(currentValue || null)
    }, [currentValue]);
    useEffect(() => {
        handleTimeChange
    }
    , [selectedTime])

    const handleDateChange = (_: DateTimePickerEvent, newVal: Date | undefined) => {
        
        if (Platform.OS === 'android') {
            setShowDatePicker(() => false);
        }
        setCurrentValue(newVal);
        setSelectedTime(newVal || new Date())
    }
    
    const handleTimeChange = (_: DateTimePickerEvent, newVal: Date | undefined) => {
        
        if (Platform.OS === 'android') {
            setShowTimePicker(() => false);
        }
        setCurrentValue(newVal);
        setSelectedTime(newVal || new Date())
    }

    const toggleDatePicker = () => {
        setShowDatePicker((prev) => !prev)
    }

    const togglePicker = () => {
        if (useTime)  {
            setShowTimePicker((prev) => !prev)
        
        }
        else if (useDate) {
            setShowDatePicker((prev) => !prev)
        }
        
    }
 
    return (
        <>
            {useDate && 
                <View style={[globalStyles.input, globalStyles.mb2Container]}>
                    <TouchableOpacity onPress={()=> toggleDatePicker()}><Text>{selectedTime.toLocaleDateString()}</Text></TouchableOpacity>
                    {showDatePicker && useDate && (<DateTimePicker
                        value={selectedTime}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'default' : 'spinner'}
                        onChange={handleDateChange}
                        />)}
                </View>
            }
            {useTime && 
                <View style={globalStyles.input}>
                    <TouchableOpacity onPress={()=> togglePicker()}><Text>{selectedTime.toLocaleTimeString()}</Text></TouchableOpacity>
                    {showTimePicker && useTime && (<DateTimePicker
                    value={selectedTime}
                    mode="time"
                    display={Platform.OS === 'ios' ? 'default' : 'spinner'}
                    onChange={handleTimeChange}
                    />)}
                </View>
            }
        </>
    );
};

export default DateTimeInput;

