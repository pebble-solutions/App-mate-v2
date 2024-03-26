import {variables} from "../../shared/globalStyles";
import {StyleSheet, View} from "react-native";
import {PropsWithChildren} from "react";

export default function Item({children}: PropsWithChildren) {
    return (
        <View style={[styles.itemContainer]}>{children}</View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        paddingHorizontal: variables.contentPadding[3],
        paddingVertical: variables.contentPadding[2],
        borderBottomWidth: 1,
        borderBottomColor: variables.color.grey,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    }
})