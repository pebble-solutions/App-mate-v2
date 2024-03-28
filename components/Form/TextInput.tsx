import React, { useEffect, useState } from "react";
import { globalStyles } from "../../shared/globalStyles";
import {InputOptions, TextInputOptions} from "./types/InputOptions";
import {TextInput as ReactNativeTextInput, Text, View} from "react-native";

const TextInput = ({value, onChange, placeholder, multiline, id }: TextInputOptions) => {

    const [currentValue, setCurrentValue] = useState(value)
    // useEffect(() => {
    //     if (onChange) onChange(currentValue)
    // }, [currentValue]);

    const handleChange = (newVal: string) => {
        setCurrentValue(() => newVal);
        if (onChange) onChange(newVal);
    };
    return (
        <View>
        
            <Text style={globalStyles.textLight}>{id}</Text>
            <ReactNativeTextInput
                style={globalStyles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={handleChange}
                placeholderTextColor={'#ffffff80'}
                multiline={multiline}/>
        </View>
    );
};

export default TextInput;
