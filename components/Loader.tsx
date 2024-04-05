import {StyleSheet, Text} from "react-native";
import {LoaderOptions} from "./types/LoaderOptions";
import {variables} from "../shared/globalStyles";

export default function Loader({message, variant, color}: LoaderOptions) {

    variant = variant || "md"
    message = message || "Chargement en cours..."
    color = color || "black"

    return (
        <Text style={[localStyle[variant], localStyle[color]]}>{message}</Text>
    )
}

const localStyle = StyleSheet.create({
    sm: {
        fontSize: variables.fontSize[0]
    },

    md: {
        fontSize: variables.fontSize[1]
    },

    lg: {
        fontSize: variables.fontSize[2]
    },

    xl: {
        fontSize: variables.fontSize[3]
    },
    lightGrey: {
        color: variables.color.lightGrey
    },
    white: {
        color: variables.color.white
    },
    black: {
        color: variables.color.black
    },
})