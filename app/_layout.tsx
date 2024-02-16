import { SplashScreen, Stack } from "expo-router";
import { useFonts, Inter_500Medium, Inter_300Light, Inter_700Bold, Inter_900Black } from '@expo-google-fonts/inter';
import { useEffect } from "react";
import ActivityContextProvider from "../shared/contexts/ActivityContext";
import VariableContextProvider from "../shared/contexts/VariableContext";
import SessionStatusContextProvider from "../shared/contexts/SessionStatusContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SessionContextProvider from "../shared/contexts/SessionContext";
import {SafeAreaView} from "react-native";
import {globalStyles} from "../shared/globalStyles";

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

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
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
        </GestureHandlerRootView>
    )
}