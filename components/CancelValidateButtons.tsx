import React from "react";
import { View, StyleSheet } from 'react-native';
import { variables } from "../shared/globalStyles";
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
            <View style={localStyle.buttonWrapper}>
                <Button title={buttonName1} onPress={onPress1} />
            </View>
            <View style={localStyle.buttonWrapper}>
                <Button title={buttonName2} onPress={onPress2} />
            </View>
        </View>
    );
}

export default CancelValidateButtons;

export const localStyle = StyleSheet.create({
    buttonContainerTunnel: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Modifié pour 'space-between'
        width: "100%",
        paddingHorizontal: variables.contentPadding[1],
    },
    buttonWrapper: {
        // Ajout d'un wrapper pour contrôler l'espace autour des boutons
        flex: 1,
        marginHorizontal: variables.contentMargin[1],
    },
    button: {
        marginHorizontal: variables.contentMargin[1], // Conserver une petite marge
    },
    label: {
        fontSize: variables.fontSize[2],
        color: "white",
    }
})
