import React, { useState, useEffect} from "react";
import {StyleSheet, Switch, Text, View} from 'react-native';
import {globalStyles, variables} from "../../shared/globalStyles";
import {InputOptions} from "./types/InputOptions";

type BooleanInputOptions = Omit<InputOptions, 'value'> & {
    value?: boolean,
    trueLabel?: string,
    falseLabel?: string,
    id: string
}

const BooleanInput = ({value, onChange, trueLabel, falseLabel, id}: BooleanInputOptions) => {
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
    <View>
        <Text style={globalStyles.textLight}>{id}</Text>
        <View style={[globalStyles.input, localStyle.booleanInput]}>
            <Switch
                trackColor={{ false: variables.color.grey, true: variables.color.success }}
                ios_backgroundColor={variables.color.grey}
                onValueChange={toggle}
                value={currentValue}
                
                />

            {label && <Text>{label}</Text>}
        </View>
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