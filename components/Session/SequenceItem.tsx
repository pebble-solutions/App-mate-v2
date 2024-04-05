import {SequenceItemType} from "../../shared/types/SequenceType";
import {Alert, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {globalStyles, variables} from "../../shared/globalStyles";
import {diffDate, diffDateToTime} from "../../shared/libs/date";
import {Foundation} from "@expo/vector-icons";
import React, {forwardRef, useEffect, useImperativeHandle} from "react";
import CancelValidateButtons from "../CancelValidateButtons";
import FormInput from "../Form/FormInput";

type SequenceItemOptions = {
    item: SequenceItemType
    editableMode?: boolean
    onChange?: (newVal: SequenceItemType) => void,
    editable?: boolean
}

export type SequenceItemActions = {
    switchEditMode: (value: boolean) => void
}

export const SequenceItem = forwardRef<SequenceItemActions, SequenceItemOptions>(({item, onChange, editable, editableMode}, ref) => {
    const [editMode, setEditMode] = React.useState(editableMode);
    const [updatedDateStart, setUpdatedDateStart] = React.useState<Date>(item[0]);
    const [updatedDateEnd, setUpdatedDateEnd] = React.useState<Date>(item[1] || item[0]);
    const [savedDateStart, setSavedDateStart] = React.useState(item[0])
    const [savedDateEnd, setSavedDateEnd] = React.useState(item[1])

    useEffect(() => {
        setSavedDateStart(() => item[0])
        setSavedDateEnd(() => item[1])
    }, [item]);

    const handlePressEdit = () => {
        setEditMode((prev) => !prev)
    }
    const cancelChange = () => {
        setUpdatedDateStart(() => item[0])
        setUpdatedDateEnd(() => item[1] || item[0])
        setEditMode(() => false)
    }
    const validateChange = () => {
        if (diffDate(updatedDateStart, updatedDateEnd) < 0) {
            Alert.alert("L'heure de fin ne peut pas être antérieure à l'heure de début")
            return
        }

        if (onChange) onChange([updatedDateStart, updatedDateEnd])
        setSavedDateStart(updatedDateStart)
        setSavedDateEnd(updatedDateEnd)
        setEditMode(() => false)
    }
    
    const handleChangeValueStart = (newVal: Date) => {
        setUpdatedDateStart(newVal)

    }
    const handleChangeValueEnd = (newVal: Date) => {
        setUpdatedDateEnd(newVal)
    }

    const switchEditMode = (value: boolean) => {
        setEditMode(() => value)
    }

    useImperativeHandle(ref, (): SequenceItemActions => {
        return {switchEditMode}
    })

    return (
        <>
            {!editMode ? (
                <>
                    <View style={localStyle.box}>
                        <TimeBox label={"Début"} date={savedDateStart} />
                    </View>

                    {savedDateEnd ? (
                        <>
                            <View style={localStyle.box}>
                                <Text style={globalStyles.textLightGrey}>{diffDateToTime(savedDateStart, savedDateEnd, {hours: true, minutes: true, seconds: true})}</Text>
                            </View>

                            <View style={localStyle.box}>
                                <TimeBox label={"Fin"} date={savedDateEnd} />
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
                    { editable && <TouchableOpacity style={globalStyles.mhContainer} onPress={handlePressEdit}>
                            <Foundation name="pencil" size={16} color={'white'} />
                    </TouchableOpacity>}
                    
                    
                </>
            ) : (
                <View style={{flexDirection: "column", width: "100%"}}>
                    <View style={localStyle.formGroup}>
                        <View style={[localStyle.inputContainer, localStyle.box]}>
                            <FormInput
                                value={savedDateStart}
                                placeholder={updatedDateStart.toLocaleTimeString()}
                                onChange={handleChangeValueStart}
                                labelStyle={[globalStyles.textLight, globalStyles.textXl]}
                                type="time"
                            />
                        </View>
                        <View style={[localStyle.inputContainer, localStyle.box]}>
                            <FormInput
                                value={savedDateEnd}
                                placeholder={updatedDateEnd.toLocaleTimeString() }
                                onChange={handleChangeValueEnd}
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
                </View>  
            )}
        </>
    )
})

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
        marginHorizontal: variables.contentPadding[1]
    }
    
    
})