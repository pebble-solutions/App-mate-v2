import {SequenceItemType} from "../../shared/types/SequenceType";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {globalStyles, variables} from "../../shared/globalStyles";
import {diffDateToTime} from "../../shared/libs/date";
import {Foundation} from "@expo/vector-icons";
import React, { useEffect } from "react";
import ButtonPrevNext from "../TunnelsButton";
import FormInput from "../Form/FormInput";

type SequenceItemOptions = {
    item: SequenceItemType
    editable?: boolean
}

export function SequenceItem({item}: SequenceItemOptions) {
    const [isEditable, setIsEditable] = React.useState(false);
    const [updatedItem0, setUpdatedItem0] = React.useState<Date>(item[0]);
    

    useEffect(() => {
        handleChangeValue(updatedItem0)
    }
    , [updatedItem0])
    
    
    const handlePressEdit = () => {
        setIsEditable((prev) => !prev)
    }
    const cancelChange = () => {
        setIsEditable(() => false)
    }
    const validateChange = () => {
        setIsEditable(() => false)
    }

    const handleChangeValue = (newVal: Date) => {
        setUpdatedItem0(newVal)
    }

    return (
        <>
        {!isEditable ? ( 
        <View style={[localStyle.container]}>
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
                <TouchableOpacity style={globalStyles.mvContainer} onPress={handlePressEdit}>
                    <Foundation name="pencil" size={16} color={'white'} />
                </TouchableOpacity>
        </View>
            
        ) : (
            <>
                <View style={localStyle.formGroup}>
                    <View style={localStyle.small}>
                        <FormInput
                            value={item[0]}
                            placeholder={updatedItem0.toLocaleTimeString()}
                            onChange={() => {handleChangeValue}}
                            labelStyle={[globalStyles.textLight, globalStyles.textXl]}
                            type="time"
                        />
                    </View>
                    <View style={localStyle.small}>
                        <FormInput
                            value={item[1]}
                            placeholder={item[0].toLocaleTimeString()}
                            onChange={() => {console.log("change fin")}}
                            labelStyle={[globalStyles.textLight, globalStyles.textXl]}
                            type="time"
                        />
                    </View>
                </View>
                <ButtonPrevNext
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
    container: {
        paddingHorizontal: variables.contentPadding[4],
        paddingVertical: variables.contentPadding[2],
        borderBottomWidth: 1,
        borderBottomColor: variables.color.grey,
        flexDirection: "row",
        alignItems: "center"
    },

    box: {
        flex: 1,
    },
    formGroup: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    small: {
        width: "40%",
    }
    
    
})