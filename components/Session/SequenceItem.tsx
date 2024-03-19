import {SequenceItemType} from "../../shared/types/SequenceType";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {globalStyles, variables} from "../../shared/globalStyles";
import {diffDateToTime} from "../../shared/libs/date";
import {Foundation} from "@expo/vector-icons";
import React, { useEffect } from "react";
import CancelValidateButtons from "../CancelValidateButtons";
import FormInput from "../Form/FormInput";

type SequenceItemOptions = {
    item: SequenceItemType
    editMode?: boolean
}

export function SequenceItem({item}: SequenceItemOptions) {
    const [editMode, setEditMode] = React.useState(false);
    const [updatedDateStart, setUpdatedDateStart] = React.useState<Date>(item[0]);
    const [updatedDateEnd, setUpdatedDateEnd] = React.useState<Date>(item[1] || new Date());
    
    // à faire !! fonction onChange pour mettre à jour les dates dans le composant parent à la validation
    // useEffect(() => {
    //     handleChangeValue(updatedDateStart)
    // }
    // , [updatedDateStart])
    
    
    const handlePressEdit = () => {
        setEditMode((prev) => !prev)
    }
    const cancelChange = () => {
        setEditMode(() => false)
    }
    const validateChange = () => {
        setEditMode(() => false)
    }

    const handleChangeValueStart = (newVal: Date) => {
        setUpdatedDateStart(newVal)
    }
    const handleChangeValueEnd = (newVal: Date) => {
        setUpdatedDateEnd(newVal)
    }

    return (
        <>
        {!editMode ? ( 
        <View style={[globalStyles.sessionItemContainer]}>
            <View style={localStyle.box}>
                <TimeBox label={"Début"} date={item[0]} />
            </View>

            {item[1] ? (
                <>
                    <View style={localStyle.box}>
                        <Text style={globalStyles.textLightGrey}>{diffDateToTime(item[0], item[1], {hours: true, minutes: true, seconds: true})}</Text>
                    </View>

                    <View style={localStyle.box}>
                        <TimeBox label={"Fin"} date={item[1]} />
                    </View>
                </>
            ) : (
                <>
                    <View style={localStyle.box}>
                        <Text style={globalStyles.textGrey}>En cours...</Text>
                    </View>
                    <View style={localStyle.box}></View>
                </>
            )}
                <TouchableOpacity style={globalStyles.mhContainer} onPress={handlePressEdit}>
                    <Foundation name="pencil" size={16} color={'white'} />
                </TouchableOpacity>
        </View>
            
        ) : (
            <>
                <View style={localStyle.formGroup}>
                    <View style={localStyle.inputContainer}>
                        <FormInput
                            value={item[0]}
                            placeholder={updatedDateStart.toLocaleTimeString()}
                            onChange={() => {handleChangeValueStart}}
                            labelStyle={[globalStyles.textLight, globalStyles.textXl]}
                            type="time"
                        />
                    </View>
                    <View style={localStyle.inputContainer}>
                        <FormInput
                            value={item[1]}
                            placeholder={item[1]?.toLocaleTimeString() }
                            onChange={() => {handleChangeValueEnd}}
                            labelStyle={[globalStyles.textLight, globalStyles.textXl]}
                            type="time"
                        />
                    </View>
                </View>
                <CancelValidateButtons
                    onPress1={cancelChange}
                    onPress2={validateChange}
                    buttonName1="Annuler"
                    buttonName2="Valider"
                />
            </>
        )}

            
        
            </>
    )
}

type TimeBoxOptions = {
    label: string,
    date: Date
}

function TimeBox({label, date}: TimeBoxOptions) {
    return (
        <>
            <Text style={[globalStyles.textGrey]}>{label}</Text>
            <Text style={[globalStyles.textLightGrey]}>{date.toLocaleTimeString('fr-FR', {
                hour: "numeric",
                minute: "2-digit",
                second: "2-digit"
            })}</Text>
        </>
    )
}

const localStyle = StyleSheet.create({
    

    box: {
        flex: 1,
    },
    formGroup: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    inputContainer: {
        flex: 0.5,
        marginHorizontal: variables.contentPadding[2]
    }
    
    
})