import { globalStyles } from "../shared/globalStyles";
import { Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { router } from "expo-router";

type HeaderScreenTitleType = {
    title: string,
    addButton: boolean
}

export default function HeaderScreenTitle({ title, addButton }: HeaderScreenTitleType) {
    return (
        <View style={globalStyles.topContainer}>
            <View style={globalStyles.headTitleActions}>
                <Text style={globalStyles.headTitle}>{title}</Text>
                {addButton && <TouchableOpacity
                    onPress={() => {
                        router.push({
                            pathname: "/activities/createActivityModal",
                        })
                    }}>
                    <AntDesign name="pluscircleo" size={26} color="black" />
                </TouchableOpacity>}
            </View>
        </View>
    )
}