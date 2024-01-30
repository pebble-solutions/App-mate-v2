import {globalStyles} from "../shared/globalStyles";
import {Text, View} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import React from "react";

type HeaderScreenTitleType = {
    title: string,
    addButton?: boolean
}

export default function HeaderScreenTitle({title, addButton}: HeaderScreenTitleType) {
    return (
        <View style={globalStyles.topContainer}>
            <View style={globalStyles.headTitleActions}>
                <Text style={globalStyles.headTitle}>{title}</Text>
                <AntDesign name="pluscircleo" size={24} color="black" />
            </View>
        </View>
    )
}