import React, { useEffect, useState } from "react";
import { globalStyles } from "../../shared/globalStyles";
import {InputOptions, TextInputOptions} from "./types/InputOptions";
import {TextInput as ReactNativeTextInput, Text, View} from "react-native";

const TextInput = ({value, onChange, placeholder, multiline, options}: TextInputOptions) => {

    const [currentValue, setCurrentValue] = useState(value)
    // useEffect(() => {
    //     if (onChange) onChange(currentValue)
    // }, [currentValue]);

    const handleChange = (newVal: string) => {
        setCurrentValue(() => newVal);
        if (onChange) onChange(newVal);
    };
    return (
        <ReactNativeTextInput
            style={globalStyles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={handleChange}
            placeholderTextColor={'#ffffff90'}
            multiline={multiline}
            {...options}
        />
    );
};

export default TextInput;