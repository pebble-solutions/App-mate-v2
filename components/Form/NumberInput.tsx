import React, { useState, useEffect} from "react";
import { TextInput } from 'react-native';
import { globalStyles } from "../../shared/globalStyles";
import {NumberInputOptions} from "../types/InputOptions";

const NumberInput = ({value, type, placeholder, onChange}: NumberInputOptions) => {
    const [currentValue, setCurrentValue] = useState(value)

    useEffect(() => {
        if (onChange) onChange(currentValue || 0)
    }, [currentValue])

    const handleChange = (newVal: string) => {
        setCurrentValue(() => Number(newVal));
    }

    return (
        <TextInput
            style={globalStyles.input}
            placeholder={placeholder}
            keyboardType="numeric"
            inputMode="numeric"
            value={currentValue?.toString()}
            onChangeText={handleChange}
            placeholderTextColor={'#ffffff80'}
        />
    )
}

export default NumberInput;
