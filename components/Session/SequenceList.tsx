import {SequenceType} from "../../shared/types/SequenceType";
import {FlatList, StyleSheet, View} from "react-native";
import {SequenceItem} from "./SequenceItem";
import Title from "../Title";
import {variables} from "../../shared/globalStyles";
import { globalStyles } from "../../shared/globalStyles";

type SequenceListOptions = {
    sequence: SequenceType,
    style?: object[],
}

export function SequenceList({sequence, style}: SequenceListOptions) {
    style = style || []


    return (
            <FlatList
                data={sequence}
                renderItem={({item}) => (
                    <SequenceItem item={item} />
                )}
                style={[localStyle.container, ...style]}
            />
    )
}

const localStyle = StyleSheet.create({
    container: {
        borderTopColor: variables.color.grey,
        borderTopWidth: 1,
        borderBottomColor: variables.color.grey,
        borderBottomWidth: 1,
        backgroundColor: variables.color.black,
        flex:1
    }
})