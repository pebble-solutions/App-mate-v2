import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { variables } from '../shared/globalStyles';

type TitleOptions = {
    title: string;
    size?: "sm" | "md" | "lg" | "xl";
    style?: any[];
    color?: string;
};

export default function Title({ title, size, style, color }: TitleOptions) {
    size = size || "md";
    style = style || [];
    color = color || "black";

    return (
        <Text style={[localStyle.title, localStyle[size], { color }, ...style]}>{title}</Text>
    );
}

const localStyle = StyleSheet.create({
    title: {
        fontWeight: "bold"
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
    }
});
