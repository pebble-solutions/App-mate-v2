import {RawVariableType} from "../../shared/types/SessionType";
import {Text, View, TouchableOpacity, TextInput, StyleSheet} from "react-native";
import {globalStyles, variables} from "../../shared/globalStyles";
import { Foundation } from '@expo/vector-icons';
import React, { useEffect } from "react";
import FormInput from "../Form/FormInput";
import ButtonPrevNext from "../TunnelsButton";


type VariableItemOptions = {
    variable: RawVariableType,
    containerStyle?: object[],
    theme?: "dark" | "light",
    editable?: boolean,
    onChange?: (newVal: string | Date | boolean | number | null) => void
    id:string
}

export default function VariableItem({variable, theme, onChange, id}: VariableItemOptions) {
    const [editable, setEditable] = React.useState(false)
    
    
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
        setEditable((prev) => !prev)
    }
    const handleChangeValue =(newVal: string | Date | boolean | number) => {
        setUpdatedValue(() => newVal)
    }
    
    const validateChange = () => {
        if (onChange) onChange(updatedValue)
        console.log(updatedValue, 'updatedValue')
        setValue(() => valueToString(updatedValue, variable.type))
        setEditable(() => false)
    }
    const cancelChange = () => {
        setEditable(() => false)
    }

    return (
        <>
            {!editable ? (
                <View style={[localStyle.rowContainer]}>
                    <View style={globalStyles.mvContainer}>
                        <Text style={labelStyle}>{variable.label}</Text>
                        <Text style={valueStyle}>{value}</Text>
                        <Text style={valueStyle}>{variable._id}</Text>
                    </View>
                    <TouchableOpacity style={[globalStyles.mvContainer, globalStyles.mh2Container]} onPress={handlePressEdit}>
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
                        index={0}
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

const localStyle = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: variables.color.grey,
    },

})
