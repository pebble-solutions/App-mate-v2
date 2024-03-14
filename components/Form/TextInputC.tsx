import React, { useEffect, useState } from "react";
import { globalStyles } from "../../shared/globalStyles";
import {InputOptions, TextInputOptions} from "./types/InputOptions";
import { TextInput } from "react-native";

const TextInputC = ({value, onChange, placeholder, multiline}: TextInputOptions) => {

    const [currentValue, setCurrentValue] = useState(value)
    console.log(multiline, 'multiline')

    // useEffect(() => {
    //     if (onChange) onChange(currentValue)
    // }, [currentValue]);

    const handleChange = (newVal: string) => {
        setCurrentValue(() => newVal);
        if (onChange) onChange(newVal);
    };
    return (
        <TextInput
            style={globalStyles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={handleChange}
            placeholderTextColor={'#ffffff80'}
            multiline={multiline}/>
    );
};

export default TextInputC;
