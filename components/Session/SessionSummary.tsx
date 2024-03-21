import {globalStyles} from "../../shared/globalStyles";
import Title from "../Title";
import {SequenceList} from "./SequenceList";
import VariablesList from "./VariablesList";
import React, {useState} from "react";
import {SessionType} from "../../shared/types/SessionType";
import {VariableValueType} from "../../shared/types/VariableType";
import {SequenceItemType} from "../../shared/types/SequenceType";
import {Text} from "react-native";
import {secondsToTimeString} from "../../shared/libs/date";

type SessionSummaryOptions = {
    session: SessionType,
    theme: "dark" | "light",
    onVariableChange?: (variableId: string, value: VariableValueType) => void,
    onSequenceChange?: (index: number, newVal: SequenceItemType) => void
}

export default function SessionSummary({session, theme, onVariableChange, onSequenceChange}: SessionSummaryOptions) {
    const [time, setTime] = useState(session.raw_datas.getTime())

    const handleSequenceChange = (index: number, newVal: SequenceItemType) => {
        if (onSequenceChange) onSequenceChange(index, newVal)
        console.log(session.raw_datas.getTime())
        setTime(() => session.raw_datas.getTime())
    }

    return (
        <>
            <Title title={"Durée totale de la session"} style={[globalStyles.mtContainer, globalStyles.textLight, globalStyles.textCenter]} />
            <Text style={[globalStyles.textLight, globalStyles.textCenter]}>{secondsToTimeString(time)}</Text>
            <Title title={"Séquence"} style={[globalStyles.mtContainer, globalStyles.textLight, globalStyles.textCenter]} />
            <SequenceList
                sequence={session.raw_datas.getSequence()}
                onValueChange={handleSequenceChange}
            />

            <Title title={"Informations fournies"} style={[globalStyles.mtContainer, globalStyles.textLight, globalStyles.textCenter]} />
            <VariablesList variables={session.raw_variables} theme={theme} onValueChange={onVariableChange} />
        </>
    )
}