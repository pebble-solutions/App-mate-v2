import {SequenceType} from "../../shared/types/SequenceType";
import {FlatList, StyleSheet, View} from "react-native";
import {SequenceItem} from "./SequenceItem";
import {globalStyles, variables} from "../../shared/globalStyles";

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
                style={[globalStyles.sessionResumeContainer, ...style]}
            />
    )
}

