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
    onChange?: (newVal: string | Date | boolean | number | null) => void
}

export default function VariableItem({variable, theme, onChange}: VariableItemOptions) {
    const [editable, setEditable] = React.useState(false)
    
    let initialValue: string | Date | boolean | number | null = variable.value || null;
    
    const labelStyle = theme === "dark" ? globalStyles.textLightGrey : globalStyles.textGrey
    const valueStyle = variable.value ? (theme === "dark" ? globalStyles.textLight : {}) : labelStyle
    
    const valueToString = (value?: string | Date | number | boolean | null, type?: string | null) => {
        let str: string;
        if (value instanceof Date) {
            if (type === "date") {
                str = value.toLocaleDateString()
            }
            else if (type === "time") {
                str = value.toLocaleTimeString()
            }
            else {
                str = value.toLocaleString()
            }
        }
        else {
            str = value ? value.toString() : "Non-renseigné"
        }
        return str
    }
    const [updatedValue, setUpdatedValue] = React.useState<string | Date | boolean | number | null>(variable.value || null);
    const [value, setValue] = React.useState(valueToString(variable.value, variable.type));
    
    const handlePressEdit = () => { 
        setEditable((prev) => !prev)
    }
    const handleChangeValue =(newVal: string | Date | boolean | number) => {
        setUpdatedValue(() => newVal)
    }
    
    const validateChange = () => {
        if (onChange) onChange(updatedValue)
        console.log(updatedValue)
        setValue(() => valueToString(updatedValue, variable.type))
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
                    <TouchableOpacity style={globalStyles.mvContainer} onPress={handlePressEdit}>
                        <AntDesign name="form" size={24} color={'white'} />
                    </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <View style={globalStyles.mvContainer}>
                    <FormInput
                        label={variable.label}
                        type={variable.type}
                        value={updatedValue}
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