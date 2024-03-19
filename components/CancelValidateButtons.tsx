import React from "react";
import { TouchableOpacity, Text,View, StyleSheet } from 'react-native';
import { variables } from "../shared/globalStyles";
interface CancelValidateButtonsProps {
    onPress1: () => void,
    onPress2: () => void,
    buttonName1: string,
    buttonName2: string
}
const CancelValidateButtons: React.FC<CancelValidateButtonsProps> = ({ onPress1, onPress2, buttonName1, buttonName2}) => {
    return (
        <View style={localStyle.buttonContainerTunnel}>
            <TouchableOpacity style={localStyle.button} onPress={onPress1}>
                <Text style={localStyle.label}>{buttonName1}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={localStyle.button} onPress={onPress2}>
                <Text style={localStyle.label}>{buttonName2}</Text>
            </TouchableOpacity>
        </View>
    );
}



export default CancelValidateButtons;
export const localStyle = StyleSheet.create({
    buttonContainerTunnel: {
        flexDirection: 'row',
        backgroundColor: variables.color.dark,
        justifyContent: 'space-evenly',
    },
    button: {
        borderRadius: variables.borderRadius[1],
        borderWidth: 2,
        borderColor: variables.color.grey,
        width: "47%",
        margin: 5,
        padding: 5,
        alignItems: "center",
    },
    label: {
        fontSize: variables.fontSize[2],
        color: "white",
    }
})