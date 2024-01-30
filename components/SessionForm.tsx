import { globalStyles } from "../shared/globalStyles";import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { ActivityType } from "../shared/types/ActivityType";
import RenderItem from "./RenderItem";
import ActivityCard from "./ActivityCard";

type SessionFormType = {
    activity: ActivityType;
    title: string;
    variable : Array<object>;
};

export default function SessionForm({ activity, title }: SessionFormType) {
    console.log(activity.variables, 'variables')
    

    return (
        <View style={globalStyles.pContainer}>
            <Text style={globalStyles.text}>SessionFormTEST</Text>
            <Text style={globalStyles.text}>{title}</Text>
            <RenderItem/>
        </View>
    )
}