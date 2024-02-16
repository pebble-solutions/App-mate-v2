import {ActivityType} from "../../shared/types/ActivityType";
import {SafeAreaView, StyleSheet, View} from "react-native";
import {variables} from "../../shared/globalStyles";
import ActivityGradient from "./ActivityGradient";
import React, {ReactNode} from "react";

type MainHeaderOptions = {
    activity: ActivityType,
    children: ReactNode
}

export default function GradientHeader({activity, children}: MainHeaderOptions) {
    return (
        <ActivityGradient
            activity={activity}
        >
            <SafeAreaView>
                <View style={[localStyle.header]}>
                    {children}
                </View>
            </SafeAreaView>

            <View style={localStyle.diagonalFooter}></View>
        </ActivityGradient>
    )
}

const localStyle = StyleSheet.create({
    diagonalFooter: {
        position: 'absolute',
        left:0,
        width: "100%",
        bottom:0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderRightWidth: 1000,
        borderTopWidth: 30,
        borderRightColor: variables.color.dark,
        borderTopColor: 'transparent'
    },

    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: variables.contentPadding[3]
    }
})