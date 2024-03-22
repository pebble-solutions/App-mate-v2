import {router, Tabs} from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import {useEffect} from "react";
import {useSessionContext} from "../../shared/contexts/SessionContext";
import {useSessionStatusContext} from "../../shared/contexts/SessionStatusContext";
import {openSession} from "../../shared/libs/session";
import {useActivityContext} from "../../shared/contexts/ActivityContext";


export default function TabsLayout() {

    const sessionContext = useSessionContext()
    const {sessions, getStartedSessions } = sessionContext
    const statusContext = useSessionStatusContext()
    const { status } = statusContext
    const {loading} = useActivityContext()

    useEffect(() => {
        if (!status && !loading) {
            const startedSessions = getStartedSessions()
            if (startedSessions.length) {
                openSession(startedSessions[0]._id, sessionContext, statusContext)
            }
        }
    }, [sessions, loading]);

    return (
        <Tabs screenOptions={{
            headerShown: false
        }}>
            <Tabs.Screen name="variables/index" options={{
                title: "Variables",
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="checkmark-done-outline" size={size} color={color} />
                )
            }} />
            <Tabs.Screen name="activities" options={{
                title: "Activities",
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="albums" size={size} color={color} />
                )
            }} />
            <Tabs.Screen name="session" options={{
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
                title: "Settings",
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="settings-outline" size={size} color={color} />
                )
            }} />
            <Tabs.Screen name="index" options={{
                href: null
            }} />
        </Tabs>
    )
}