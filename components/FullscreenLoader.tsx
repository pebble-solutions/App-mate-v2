import {ActivityIndicator, SafeAreaView, StyleSheet, View} from "react-native";
import Loader from "./Loader";
import {globalStyles} from "../shared/globalStyles";
import {LoaderOptions} from "./types/LoaderOptions";

export default function FullscreenLoader({message}: LoaderOptions) {
    return (
        <SafeAreaView style={[globalStyles.mainContainer, localStyle.loader]}>
            <View style={globalStyles.mb2Container}>
                <ActivityIndicator />
            </View>

            <Loader message={message} variant="xl" />
        </SafeAreaView>
    )
}

const localStyle = StyleSheet.create({
    loader: {
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center"
    }
})