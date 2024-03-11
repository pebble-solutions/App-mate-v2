import {RawVariableType} from "../../shared/types/SessionType";
import {Text, View, TouchableOpacity, TextInput} from "react-native";
import {globalStyles} from "../../shared/globalStyles";
import { AntDesign } from '@expo/vector-icons';
import React, { useEffect } from "react";
import FormInput from "../Form/FormInput";
import ButtonPrevNext from "../TunnelsButton";


type VariableItemOptions = {
    variable: RawVariableType,
    containerStyle?: object[],
    theme?: "dark" | "light",
    editable?: boolean,
    onChange?: (newVal: string | Date | boolean | number) => void
}

export default function VariableItem({variable, theme, onChange}: VariableItemOptions) {
    const [editable, setEditable] = React.useState(false)
    
    let value: string;
    
    const labelStyle = theme === "dark" ? globalStyles.textLightGrey : globalStyles.textGrey
    const valueStyle = variable.value ? (theme === "dark" ? globalStyles.textLight : {}) : labelStyle
    
    if (variable.value instanceof Date) {
        if (variable.type === "date") {
            value = variable.value.toLocaleDateString()
        }
        else if (variable.type === "time") {
            value = variable.value.toLocaleTimeString()
        }
        else {
            value = variable.value.toLocaleString()
        }
    }
    else {
        value = variable.value ? variable.value.toString() : "Non-renseigné"
    }
    const [updatedValue, setUpdatedValue] = React.useState<string | Date | boolean | number>(value);
    
    const handlePressEdit = () => { 
        setEditable((prev) => !prev)
    }
    const handleChangeValue =(newVal: string | Date | boolean | number) => {
        setUpdatedValue(() => newVal)
    }
    useEffect(() => {
        if (onChange) onChange(updatedValue) 
    }
    , [updatedValue])
    const validateChange = () => {
        if (onChange) onChange(updatedValue)
        console.log(updatedValue)
        value = updatedValue.toString() 
        console.log(value)
        setEditable(() => false)
    }
    const cancelChange = () => {
        setEditable(() => false)
    }

    return (
        <>
            {!editable ? (
                <View style={[globalStyles.rowContainer]}>
                    <View style={globalStyles.mvContainer}>
                        <Text style={labelStyle}>{variable.label}</Text>
                        <Text style={valueStyle}>{value}</Text>
                    </View>
                    <TouchableOpacity style={globalStyles.mvContainer} onPress={handlePressEdit}>
                        <AntDesign name="form" size={24} color={'white'} />
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={globalStyles.mvContainer}>
                    <FormInput
                        label={variable.label}
                        type={variable.type}
                        value={value}
                        labelStyle={[globalStyles.textLight, globalStyles.textXl]}
                        onChange={handleChangeValue}
                        />
                        <ButtonPrevNext
                            onPress1={cancelChange}
                            onPress2={validateChange}
                            buttonName1="Annuler"
                            buttonName2="Valider"

                            />
                </View>
            )}
        </>
    )
}