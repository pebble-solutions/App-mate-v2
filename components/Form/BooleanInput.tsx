import React, { useState, useEffect} from "react";
import { Switch, View} from 'react-native';
import {globalStyles, variables} from "../../shared/globalStyles";
import {InputOptions} from "../types/InputOptions";

type BooleanInputOptions = Omit<InputOptions, 'value'> & {
    value?: boolean
}

const BooleanInput = ({value, placeholder, onChange}: BooleanInputOptions) => {
    const [currentValue, setCurrentValue] = useState(value)

    useEffect(() => {
        if (onChange) onChange(currentValue)
    }, [currentValue]);

    const toggle = () => {
        setCurrentValue((prev) => !prev)
    };

  return (
    <View style={globalStyles.input}>
        <Switch
            trackColor={{ false: variables.color.grey, true: variables.color.success }}
            thumbColor={currentValue ? variables.color.success : '#f4f3f4'}
            ios_backgroundColor={variables.color.grey}
            onValueChange={toggle}
            value={currentValue}
        />
    </View>
  );
}

export default BooleanInput;

