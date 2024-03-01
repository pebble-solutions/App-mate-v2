import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { globalStyles } from '../../shared/globalStyles';
import {format} from 'date-fns';
import {fr} from 'date-fns/locale';
import {DateTimeInputOptions} from "../types/InputOptions";

const DateTimeInput = ({value, placeholder, onChange, type}: DateTimeInputOptions) => {

    type = type || 'datetime'

    const [currentValue, setCurrentValue] = useState<Date | null>(value || new Date())
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [showTimePicker, setShowTimePicker] = useState(false)

    const useDate = ['date', 'datetime'].includes(type)
    const useTime = ['time', 'datetime'].includes(type)

    useEffect(() => {
        if (onChange) onChange(currentValue || null)
    }, [currentValue]);

    const handleDateChange = (_: DateTimePickerEvent, newVal?: Date) => {
        setCurrentValue(() => newVal || null);

        if (Platform.OS === 'android') {
            setShowDatePicker(() => false);
        }
    }

    const handleTimeChange = (_: DateTimePickerEvent, newVal?: Date) => {
        setCurrentValue(() => newVal || null);

        if (Platform.OS === 'android') {
            setShowTimePicker(() => false);
        }
    }

    const toggleDatePicker = () => {
        setShowDatePicker((prev) => !prev)
    }

    const toggleTimePicker = () => {
        setShowTimePicker((prev) => !prev)
    }
 
    return (
        <View>
            <Text style={globalStyles.textLight}>
                Sélectionnez une date et une heure :
            </Text>
            <View style={globalStyles.input}>
                {useDate && (<>
                    <TouchableOpacity onPress={toggleDatePicker}>
                        <Text style={globalStyles.textLight}>
                            {currentValue ? format(currentValue, 'PP', { locale: fr }) : placeholder || "Sélectionner une date"}
                        </Text>
                    </TouchableOpacity>

                    {showDatePicker && (
                        <DateTimePicker
                            value={currentValue || new Date()}
                            mode="date"
                            onChange={handleDateChange}
                        />
                    )}
                </>)}

                {useTime && (<>
                    <TouchableOpacity onPress={toggleTimePicker}>
                        <Text style={globalStyles.textLight}>
                            {currentValue ? format(currentValue, 'p', { locale: fr }) : placeholder || "Sélectionner un horaire"}
                        </Text>
                    </TouchableOpacity>

                    {showTimePicker && (
                        <DateTimePicker
                            value={currentValue || new Date()}
                            mode="time"
                            onChange={handleTimeChange}
                        />
                    )}
                </>)}
            </View>

        </View>
    );
};

export default DateTimeInput;
