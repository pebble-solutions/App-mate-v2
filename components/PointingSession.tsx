import { globalStyles } from "../shared/globalStyles";import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ActivityType } from "../shared/types/ActivityType";


export default function PointingSession() {
    return (
        <View>
            <TouchableOpacity onPress={() => console.log("test")}>
                <Text style={globalStyles.textLight}>Pointage</Text>
            </TouchableOpacity>
        </View>
                
    )
}