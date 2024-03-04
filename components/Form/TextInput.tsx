import React, { useEffect, useState } from "react";
import { TextInput as ReactTextInput } from 'react-native';
import { globalStyles } from "../../shared/globalStyles";
import {InputOptions, TextInputOptions} from "./types/InputOptions";

const TextInput = ({value, onChange, placeholder, multiline}: TextInputOptions) => {

    const [currentValue, setCurrentValue] = useState(value)

    useEffect(() => {
        if (onChange) onChange(currentValue)
    }, [currentValue]);

    const handleChange = (newVal: string) => {
        setCurrentValue(() => newVal);
    };

    return (
        <ReactTextInput
            style={globalStyles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={handleChange}
            placeholderTextColor={'#ffffff80'}
            multiline={multiline}
        />
    );
};

export default TextInput;
