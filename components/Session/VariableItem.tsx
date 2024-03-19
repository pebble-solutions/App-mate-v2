import {RawVariableType} from "../../shared/types/SessionType";
import {Text, View, TouchableOpacity, TextInput, StyleSheet} from "react-native";
import {globalStyles, variables} from "../../shared/globalStyles";
import { Foundation } from '@expo/vector-icons';
import React, { useEffect } from "react";
import FormInput from "../Form/FormInput";
import CancelValidateButtons from "../CancelValidateButtons";


type VariableItemOptions = {
    variable: RawVariableType,
    containerStyle?: object[],
    theme?: "dark" | "light",
    editMode?: boolean,
    onChange?: (newVal: string | Date | boolean | number | null) => void
    id:string
}

export default function VariableItem({variable, theme, onChange, id}: VariableItemOptions) {
    const [editMode, setEditMode] = React.useState(false)
    
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
    
    useEffect(() => {
        setValue(() => valueToString(variable.value, variable.type))
    }, [variable.value])

    const handlePressEdit = () => { 
        setEditMode((prev) => !prev)
    }
    const handleChangeValue =(newVal: string | Date | boolean | number) => {
        setUpdatedValue(() => newVal)
    }
    
    const validateChange = () => {
        if (onChange) onChange(updatedValue)
        setValue(() => valueToString(updatedValue, variable.type))
        setEditMode(() => false)
    }
    const cancelChange = () => {
        setEditMode(() => false)
    }

    return (
        <>
            {!editMode ? (
                <View style={[globalStyles.sessionItemContainer]}>
                    <View style={[globalStyles.mhContainer]}>
                        <Text style={labelStyle}>{variable.label}</Text>
                        <Text style={valueStyle}>{value}</Text>
                    </View>
                    <TouchableOpacity style={[globalStyles.mhContainer]} onPress={handlePressEdit}>
                        <Foundation name="pencil" size={16} color={'white'} />
                    </TouchableOpacity>
                    
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
                    <CancelValidateButtons
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
const localStyle = StyleSheet.create({
    box: {
        flex: 1,
    },
    
})

