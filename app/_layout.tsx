import 'react-native-get-random-values'
import { SplashScreen, Stack } from "expo-router";
import { useFonts, Inter_500Medium, Inter_300Light, Inter_700Bold, Inter_900Black } from '@expo-google-fonts/inter';
import {useEffect, useState} from "react";
import ActivityContextProvider from "../shared/contexts/ActivityContext";
import VariableContextProvider from "../shared/contexts/VariableContext";
import SessionStatusContextProvider from "../shared/contexts/SessionStatusContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SessionContextProvider from "../shared/contexts/SessionContext";
import {Alert} from "react-native";
import RequestsContextProvider from "../shared/contexts/RequestsContext";
import AuthContextProvider from "../shared/contexts/AuthContext";
import {getMessage} from "../shared/libs/error";

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {

    const [fontsLoaded, fontError] = useFonts({
        Inter_500Medium, Inter_300Light, Inter_700Bold, Inter_900Black
    })

    useEffect(() => {
        if (fontsLoaded || fontError) {
            SplashScreen.hideAsync()
        }
    }, [fontsLoaded, fontError])

    if (!fontsLoaded && !fontError) {
        return null
    }

    const handleRequestsError = (e: any) => {
        const message = getMessage(e)
        Alert.alert("Erreur de requête API", message || "Erreur inconnue")
    }

    return (
        <AuthContextProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <RequestsContextProvider onError={handleRequestsError}>
                    <SessionContextProvider>
                        <SessionStatusContextProvider>
                            <VariableContextProvider>
                                <ActivityContextProvider>
                                    <Stack>
                                        <Stack.Screen name="(tabs)" options={{
                                            headerShown: false
                                        }} />
                                    </Stack>
                                </ActivityContextProvider>
                            </VariableContextProvider>
                        </SessionStatusContextProvider>
                    </SessionContextProvider>
                </RequestsContextProvider>
            </GestureHandlerRootView>
        </AuthContextProvider>
    )
}