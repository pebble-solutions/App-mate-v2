import {Stack} from "expo-router";

export default function SummaryLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{
                headerShown: false
            }} />
            <Stack.Screen name="day" options={{
                headerShown: false
            }} />
        </Stack>
    )
}