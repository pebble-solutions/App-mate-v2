import {Stack} from "expo-router";

export default function SessionLayout() {
    return (
        <Stack>
            <Stack.Screen name="list" options={{
                headerShown: false
            }} />
            <Stack.Screen name="clock" options={{
                headerShown: false
            }} />
            <Stack.Screen name="validate" options={{
                presentation: "modal",
                headerShown: false
            }} />
        </Stack>
    )
}