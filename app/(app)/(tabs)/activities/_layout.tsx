import {Stack} from "expo-router";

export default function ActivitiesLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{
                headerShown: false
            }} />
            <Stack.Screen name="[id]" options={{
                presentation: "modal",
                headerShown: false
            }} />
            <Stack.Screen name="create" options={{
                presentation: "modal",
                headerShown: false
            }} />
        </Stack>
    )
}