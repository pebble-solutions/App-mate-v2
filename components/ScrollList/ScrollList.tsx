import {FlatList, StyleSheet, ViewStyle} from "react-native";
import {variables} from "../../shared/globalStyles";
import {ReactNode} from "react";
import Item from "./Item";

type SequenceListOptions = {
    items: ReactNode[],
    style?: ViewStyle | ViewStyle[],
}

export function ScrollList({items, style}: SequenceListOptions) {
    style = style || []

    return (
        <FlatList
            data={items}
            renderItem={({item}) => (
                <Item>{item}</Item>
            )}
            style={[styles.listContainer, style]}
        />
    )
}

const styles = StyleSheet.create({
    listContainer: {
        borderTopColor: variables.color.grey,
        borderTopWidth: 1,
        borderBottomColor: variables.color.grey,
        borderBottomWidth: 1,
        backgroundColor: variables.color.black,
        width: "100%"
    }
})

