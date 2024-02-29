import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {globalStyles, variables} from "../shared/globalStyles";
import {ReactNode} from "react";

type ButtonType = {
    title: string,
    onPress: () => void,
    style?: any[],
    titleStyle?: any[],
    variant?: 'xl' | 'lg' | 'sm',
    icon?: ReactNode,
    options?: ButtonOptions
}

type ButtonOptions = {
    displayTitle?: boolean
    disabled?: boolean
}

export default function Button({title, onPress, style, titleStyle, variant, icon, options}: ButtonType) {

    style = style || []
    titleStyle = titleStyle || []

    options = {
        displayTitle: true,
        ...options
    }

    if (variant === 'lg') {
        style.push(localStyle.lg)
        titleStyle.push(globalStyles.textLg)
    }

    else if (variant === 'xl') {
        style.push(localStyle.xl)
        titleStyle.push(globalStyles.textXl)
    }

    if (options.disabled) {
        style.push(localStyle.disabled)
    }

    return (
        <TouchableOpacity
            onPress={() => {
                if (!options?.disabled) onPress()
            }}
            disabled={options.disabled}
        >
            <View
                style={[localStyle.button, ...style]}>
                {icon && icon}
                {options.displayTitle && <Text style={titleStyle}>{title}</Text>}
            </View>
        </TouchableOpacity>
    )
}

const localStyle = StyleSheet.create({
    button: {
        paddingVertical: variables.contentPadding[2],
        paddingHorizontal: variables.contentPadding[3],
        marginVertical: variables.contentMargin[1],
        borderRadius: variables.borderRadius[3],
        backgroundColor: "#cdcdcd",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },

    lg: {
        paddingVertical: variables.contentPadding[1],
        paddingHorizontal: variables.contentPadding[1]
    },

    xl: {
        paddingVertical: variables.contentPadding[2],
        paddingHorizontal: variables.contentPadding[3]
    },

    disabled: {
        opacity: .3
    }
})