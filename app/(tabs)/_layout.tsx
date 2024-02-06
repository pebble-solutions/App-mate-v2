import {router, Tabs} from "expo-router";
import { Ionicons } from '@expo/vector-icons';


export default function TabsLayout() {
    return (
        <Tabs screenOptions={{
            headerShown: false
        }}>
             <Tabs.Screen name="variables/index" options={{
                title: "Variables", tabBarIcon: ({ color, size }) => (
                    <Ionicons name="checkmark-done-outline" size={size} color={color} />
                )
            }} />
            <Tabs.Screen name="activities" options={{
                title: "Activities", tabBarIcon: ({ color, size }) => (
                    <Ionicons name="albums" size={size} color={color} />
                )
            }} />
            <Tabs.Screen name="index" options={{
                title: "Session", tabBarIcon: ({ color, size }) => (
                    <Ionicons name="timer" size={30} color={color} />
                )
            }} />
            <Tabs.Screen name="summary" options={{
                title: "Summary", tabBarIcon: ({ color, size }) => (
                    <Ionicons name="stats-chart-outline" size={size} color={color} />
                )
            }} />
             <Tabs.Screen name="settings/index" options={{
                title: "Settings", tabBarIcon: ({ color, size }) => (
                    <Ionicons name="settings-outline" size={size} color={color} />
                )
            }} />
        </Tabs>
    )
}