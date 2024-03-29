import {Slot, Stack} from "expo-router";

export function RootLayout() {
    return <Stack>
        <Stack.Screen name="(app)" options={{
            headerShown: false
        }} />
    </Stack>
}