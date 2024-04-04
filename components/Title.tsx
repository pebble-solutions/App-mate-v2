import { StyleSheet, Text } from "react-native";
import { variables } from "../shared/globalStyles";

type TitleOptions = {
    title: string,
    size?: "sm" | "md" | "lg" | "xl",
    style?: any[],
    center?: boolean, // Ajoutez une prop center
}

export default function Title({ title, size, style, center }: TitleOptions) {
    size = size || "md"
    style = style || []

    return (
        <Text style={[localStyle.title, localStyle[size], center && localStyle.center, ...style]}>{title}</Text> // Appliquez les styles de centrage si la prop center est vraie
    )
}

const localStyle = StyleSheet.create({
    title: {
        fontWeight: "bold",
        marginVertical: variables.contentMargin[2]
    },

    sm: {
        fontSize: variables.fontSize[3]
    },

    md: {
        fontSize: variables.fontSize[4]
    },

    lg: {
        fontSize: variables.fontSize[5]
    },

    xl: {
        fontSize: variables.fontSize[6]
    },

    center: {
        textAlign: "center",
    },
})
