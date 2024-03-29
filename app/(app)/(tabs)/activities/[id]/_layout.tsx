import {Stack} from "expo-router";

export default function ActivitiesLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{
                headerShown: false
            }} />
            <Stack.Screen name="edit" options={{
                presentation: "modal",
                headerShown: false
            }} />
        </Stack>
    )
}