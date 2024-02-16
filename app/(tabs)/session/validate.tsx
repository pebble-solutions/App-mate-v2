import {Text, View} from "react-native";
import {getCurrentActivity} from "../../../shared/libs/session";
import RenderItem from "../../../components/RenderItem";
import React from "react";

export default function ValidateScreen() {

    const activity = getCurrentActivity()
    const variables = activity.variables

    return (
        <RenderItem variables={variables} />
    )
}