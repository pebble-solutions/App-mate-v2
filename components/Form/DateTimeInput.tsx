import React, { useState,useEffect } from 'react';
import {View, Platform, StyleSheet, TouchableOpacity,Text} from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import {globalStyles} from '../../shared/globalStyles';
import {DateTimeInputOptions} from "./types/InputOptions";
import { dateToLiteral } from '../../shared/libs/date';
import { timeToLiteral } from '../../shared/libs/date';

const DateTimeInput = ({value, onChange, type, placeholder, id}: DateTimeInputOptions) => {

    type = type || 'datetime'

    const [currentValue, setCurrentValue] = useState<Date | undefined>(value || new Date())
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [showTimePicker, setShowTimePicker] = useState(false)
    const [selectedTime, setSelectedTime] = useState<Date>(value || new Date())  

    const useDate = ['date'].includes(type)
    const useTime = ['time'].includes(type)
    const useDateTime = ['datetime'].includes(type)

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
        setShowDatePicker(() => true)
    }

    const toggleTimePicker = () => {
        setShowTimePicker(() => true)
        
    }
 
    return (
        <>
            {(useDate || useDateTime ) && 
                <View style={[globalStyles.input, globalStyles.mb2Container]}>
        <Text>{id}</Text>

                    
                    {Platform.OS === 'android' && <TouchableOpacity onPress={()=> toggleDatePicker()}><Text> {dateToLiteral(selectedTime)}</Text></TouchableOpacity>}
                    {(Platform.OS === 'android') && (showDatePicker) && <DateTimePicker
                        value={selectedTime}
                        mode="date"
                        display='spinner'
                        onChange={handleDateChange}
                        />}
                        {Platform.OS === 'ios' && !showDatePicker && <DateTimePicker
                        value={selectedTime}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                        />}
                </View>
            }
            {(useTime || useDateTime) && 
                <View style={globalStyles.input}>
        <Text>{id}</Text>

                    {Platform.OS ==="android" && <TouchableOpacity onPress={()=> toggleTimePicker()}><Text>{timeToLiteral(selectedTime)}</Text></TouchableOpacity>}
                    {Platform.OS ==="android" && showTimePicker && (<DateTimePicker
                    value={selectedTime}
                    mode="time"
                    display='spinner'
                    onChange={handleTimeChange}
                    />)}
                    {Platform.OS ==="ios" && !showTimePicker && (<DateTimePicker
                    value={selectedTime}
                    mode="time"
                    display="default"
                    onChange={handleTimeChange}
                    />)}
                </View>
            }
        </>
    );
};

export default DateTimeInput;

