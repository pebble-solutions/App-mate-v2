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

export default function VariableItem({variable, theme, onChange}: VariableItemOptions) {
    const [editMode, setEditMode] = React.useState(false)
    
    const labelStyle = theme === "dark" ? globalStyles.textLight : globalStyles.textGrey
    const valueStyle = theme === "dark" ? globalStyles.textLightGrey : globalStyles.textDark
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

    // useEffect(() => {
    //     setValue(() => valueToString(variable.value, variable.type))
    // }, [variable.value])

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
        setUpdatedValue(() => variable.value || null)
        setEditMode(() => false)
    }
    
    return (
        <>
            {!editMode ? (
                <View style={localStyle.readBox}>
                    <View style={{flex: 1}}>
                        <Text style={labelStyle}>{variable.label}</Text>
                        <Text style={valueStyle}>{value}</Text>
                    </View>
                    <TouchableOpacity onPress={handlePressEdit}>
                        <Foundation name="pencil" size={16} color={'white'} />
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={[globalStyles.mvContainer, {width: "100%"}]}>
                    <FormInput      
                        label={variable.label}
                        type={variable.type}
                        value={updatedValue}
                        labelStyle={[globalStyles.textLight, globalStyles.textMd]}
                        onChange={handleChangeValue}
                        id={variable.variable_id}
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
    readBox: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flex: 1
    }
})

