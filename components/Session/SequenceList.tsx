import {SequenceItemType, SequenceType} from "../../shared/types/SequenceType";
import {FlatList, StyleSheet, View} from "react-native";
import {SequenceItem, SequenceItemActions} from "./SequenceItem";
import {globalStyles, variables} from "../../shared/globalStyles";
import {createRef, forwardRef, ReactNode, useImperativeHandle, useRef} from "react";
import {ScrollList} from "../ScrollList/ScrollList";

type SequenceListOptions = {
    sequence: SequenceType,
    style?: object[],
    onValueChange?: (index: number, newVal: SequenceItemType) => void,
    editable?: boolean
}

export type SequenceListActions = {
    switchEditMode: (index: number, value: boolean) => void
}

export const SequenceList = forwardRef<SequenceListActions, SequenceListOptions>(({sequence, style, onValueChange, editable}, ref) => {
    style = style || []

    const sequenceItemsRef: SequenceItemActions[] = []

    const setRef = (ref: SequenceItemActions) => {
        sequenceItemsRef.push(ref)
    }

    const items: ReactNode[] = []

    const switchEditMode = (index: number, value: boolean) => {
        sequenceItemsRef[index]?.switchEditMode(value)
    }

    useImperativeHandle(ref, (): SequenceListActions => {
        return {switchEditMode}
    })

    for (let index=0; index < sequence.length; index++) {

        items.push(<SequenceItem
            item={sequence[index]}
            onChange={(newVal) => {
                if (onValueChange) onValueChange(index, newVal)
            }}
            editable={editable}
            ref={setRef}
        />)
    }

    return (
        <ScrollList items={items} style={style} />
    )
})
