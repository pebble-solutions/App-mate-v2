import React, { useState, useEffect} from "react";
import {StyleSheet, Switch, Text, View} from 'react-native';
import {globalStyles, variables} from "../../shared/globalStyles";
import {InputOptions} from "./types/InputOptions";

type BooleanInputOptions = Omit<InputOptions, 'value'> & {
    value?: boolean,
    trueLabel?: string,
    falseLabel?: string
}

const BooleanInput = ({value, onChange, trueLabel, falseLabel}: BooleanInputOptions) => {
    const [currentValue, setCurrentValue] = useState(value)
    const [label, setLabel] = useState(value ? trueLabel : falseLabel)

    useEffect(() => {
        if (onChange) onChange(currentValue)
        if (currentValue && trueLabel) setLabel(trueLabel)
        if (!currentValue && falseLabel) setLabel(falseLabel)
    }, [currentValue]);

    const toggle = () => {
        setCurrentValue((prev) => !prev)
    };

  return (
    <View style={[globalStyles.input, localStyle.booleanInput]}>
        <Switch
            trackColor={{ false: variables.color.grey, true: variables.color.success }}
            ios_backgroundColor={variables.color.grey}
            onValueChange={toggle}
            value={currentValue}
        />

        {label && <Text>{label}</Text>}
    </View>
  );
}

export default BooleanInput;

const localStyle = StyleSheet.create({
    booleanInput: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start"
    }
})