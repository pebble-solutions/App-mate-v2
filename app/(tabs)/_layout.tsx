import {router, Tabs} from "expo-router";
import {View} from "react-native";

export default function TabsLayout() {
    return (
        <Tabs screenOptions={{
            headerShown: false
        }}>
            <Tabs.Screen name="activities" options={{
                title: "Activities"
            }} />
            <Tabs.Screen name="index" options={{
                title: "Session"
            }} />
            <Tabs.Screen name="summary/index" options={{
                title: "Summary"
            }} />
            <Tabs.Screen name="settings/index" options={{
                title: "Settings"
            }} />
        </Tabs>
    )
}