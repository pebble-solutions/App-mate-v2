import React from "react";
import { TouchableOpacity, Text,View, StyleSheet } from 'react-native';
import {globalStyles, variables} from "../shared/globalStyles";
import Button from "./Button";
interface CancelValidateButtonsProps {
    onPress1: () => void,
    onPress2: () => void,
    buttonName1: string,
    buttonName2: string
}
const CancelValidateButtons: React.FC<CancelValidateButtonsProps> = ({ onPress1, onPress2, buttonName1, buttonName2}) => {
    return (
        <View style={localStyle.buttonContainerTunnel}>
            <Button title={buttonName1} onPress={onPress1} style={[localStyle.button]} />
            <Button title={buttonName2} onPress={onPress2} style={[localStyle.button] } />
        </View>
    );
}



export default CancelValidateButtons;
export const localStyle = StyleSheet.create({
    buttonContainerTunnel: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        flex:1,
    },
    label: {
        fontSize: variables.fontSize[2],
        color: "white",
    }
})