import {SequenceItemType, SequenceType} from "../../shared/types/SequenceType";
import {FlatList, StyleSheet, View} from "react-native";
import {SequenceItem} from "./SequenceItem";
import {globalStyles, variables} from "../../shared/globalStyles";
import {ReactNode} from "react";
import {ScrollList} from "../ScrollList/ScrollList";

type SequenceListOptions = {
    sequence: SequenceType,
    style?: object[],
    onValueChange?: (index: number, newVal: SequenceItemType) => void,
    editable?: boolean
    editableMode? : boolean
}

export function SequenceList({sequence, style, onValueChange, editable, editableMode}: SequenceListOptions) {
    style = style || []

    const items: ReactNode[] = []

    for (let index=0; index < sequence.length; index++) {
        items.push(<SequenceItem
            item={sequence[index]}
            onChange={(newVal) => {
                if (onValueChange) onValueChange(index, newVal)
            }}
            editable={editable}
            editableMode={editableMode}
        />)
    }

    sequence.forEach((item) => {

    })


    return (
        
        <ScrollList items={items} style={style} />
    )
}

