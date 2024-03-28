import React, { useState, useEffect} from "react";
import { TextInput , Text, View} from 'react-native';
import { globalStyles } from "../../shared/globalStyles";
import {NumberInputOptions} from "./types/InputOptions";

const NumberInput = ({value, placeholder, onChange, type, id}: NumberInputOptions) => {
    const [currentValue, setCurrentValue] = useState(value)

    useEffect(() => {
        if (onChange) onChange(currentValue || 0)
    }, [currentValue])

    const handleChange = (newVal: string) => {
        setCurrentValue(() => Number(newVal));
    }

    return (
        <View>
            <Text style={globalStyles.textLight}>{id}</Text>
            <TextInput
                style={globalStyles.input}
                placeholder={placeholder}
                inputMode="decimal"
                keyboardType="numeric"
                value={value?.toString()}
                onChangeText={handleChange}
                placeholderTextColor={'#ffffff80'}
            />
        </View>
    )
}

export default NumberInput;
