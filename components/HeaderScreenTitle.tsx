import { globalStyles } from "../shared/globalStyles";
import { TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { router } from "expo-router";

import Title from "./Title";

type HeaderScreenTitleType = {
    title: string,
    addButton?: boolean
    grayedOut?: boolean
}

export default function HeaderScreenTitle({ title, addButton, grayedOut }: HeaderScreenTitleType) {
    return (
        <View style={globalStyles.topContainer}>
            <View style={globalStyles.headTitleActions}>
                <Title title={title} size="md" style={[globalStyles.headTitle, grayedOut ? globalStyles.grayedOut : null]} />
                {addButton && <TouchableOpacity
                    onPress={() => {
                        router.push({
                            pathname: "/activities/create",
                        });
                    }}>
                    <AntDesign name="pluscircleo" size={26} color="black" />
                </TouchableOpacity>}
            </View>
        </View>
    )
}
