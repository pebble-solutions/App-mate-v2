import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {globalStyles} from "../shared/globalStyles";

type ButtonType = {
    title: string,
    onPress: () => void,
    style?: any[],
    titleStyle?: any[],
    variant?: 'xl' | 'lg' | 'sm',
}

export default function Button({title, onPress, style, titleStyle, variant}: ButtonType) {

    style = style || []
    titleStyle = titleStyle || []


    if (variant === 'lg') {
        style.push(globalStyles.buttonLg)
        titleStyle.push(globalStyles.textLg)
    }

    else if (variant === 'xl') {
        style.push(globalStyles.buttonXl)
        titleStyle.push(globalStyles.textXl)
    }

    return (
        <TouchableOpacity
            onPress={() => onPress()}
        >
            <View
                style={[globalStyles.button, ...style]}>
                <Text style={titleStyle}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}