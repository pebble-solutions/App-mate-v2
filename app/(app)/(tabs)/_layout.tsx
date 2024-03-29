import {router, Tabs} from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import {useEffect} from "react";
import {useSessionContext} from "../../../shared/contexts/SessionContext";
import {useSessionStatusContext} from "../../../shared/contexts/SessionStatusContext";
import {openSession} from "../../../shared/libs/session";
import {useActivityContext} from "../../../shared/contexts/ActivityContext";


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
        <Tabs initialRouteName={"session"} screenOptions={{
            headerShown: false
        }}>
            <Tabs.Screen name="index" options={{
                href: null
            }} />
            <Tabs.Screen name="variables/index" options={{
                href: null
            }} />
            <Tabs.Screen name="activities" options={{
                title: "Activités",
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="albums" size={size} color={color} />
                )
            }} />
            <Tabs.Screen name="session" options={{
                title: "Session", tabBarIcon: ({ color, size }) => (
                    <Ionicons name="timer" size={30} color={color} />
                )
            }} />
            <Tabs.Screen name="account" options={{
                title: "Compte", tabBarIcon: ({ color, size }) => (
                    <Ionicons name="person-circle" size={size} color={color} />
                )
            }} />
            <Tabs.Screen name="summary" options={{
                href: null
            }} />
            <Tabs.Screen name="settings/index" options={{
                href: null
            }} />
        </Tabs>
    )
}