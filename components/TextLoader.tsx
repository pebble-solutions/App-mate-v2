import {globalStyles} from "../shared/globalStyles";
import {ActivityIndicator, Text, View} from "react-native";

type TextLoaderOptions = {
    label?: string
}

export default function TextLoader({label}: TextLoaderOptions) {

    label = label || "Chargement..."

    return (
        <View style={[globalStyles.centeredContainer, globalStyles.my2Container, {flexDirection: "row"}]}>
            <ActivityIndicator />
            <Text style={[globalStyles.textLight, globalStyles.msContainer, {opacity: .5}]}>{label}</Text>
        </View>
    )
}