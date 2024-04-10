import React, { useState, useEffect} from "react";
import { TextInput , Text, View} from 'react-native';
import { globalStyles } from "../../shared/globalStyles";
import {NumberInputOptions} from "./types/InputOptions";

const NumberInput = ({value, placeholder, onChange}: NumberInputOptions) => {
    const [currentValue, setCurrentValue] = useState(value)

    useEffect(() => {
        if (onChange) onChange(currentValue? currentValue : 0)
    }, [currentValue])

    const handleChange = (newVal: string) => {
        setCurrentValue(() => Number(newVal));
        // if (onChange) onChange(Number(newVal));

    }

    return (
        <View>
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
