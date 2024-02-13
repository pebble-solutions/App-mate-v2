import React from "react";
import { TouchableOpacity, Text,View } from 'react-native';
import { globalStyles } from "../shared/globalStyles";
interface ButtonPrevNextProps {
    onPress1: () => void,
    onPress2: () => void,
    buttonName1: string,
    buttonName2: string
}
const ButtonPrevNext: React.FC<ButtonPrevNextProps> = ({ onPress1, onPress2, buttonName1, buttonName2}) => {
    return (
        <View style={globalStyles.buttonContainerTunnel}>
            <TouchableOpacity style={globalStyles.buttonTunnel} onPress={onPress1}>
                <Text style={globalStyles.buttonTextTunnel}>{buttonName1}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={globalStyles.buttonTunnel} onPress={onPress2}>
                <Text style={globalStyles.buttonTextTunnel}>{buttonName2}</Text>
            </TouchableOpacity>
        </View>
    );
}



export default ButtonPrevNext;