import {globalStyles, variables} from "../../shared/globalStyles";
import Title from "../Title";
import {SequenceList} from "./SequenceList";
import VariablesList from "./VariablesList";
import React, {useState} from "react";
import {SessionType} from "../../shared/types/SessionType";
import {VariableValueType} from "../../shared/types/VariableType";
import {SequenceItemType} from "../../shared/types/SequenceType";
import {Text, View} from "react-native";
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
        setTime(() => session.raw_datas.getTime())
    }

    return (
        <>
            <View style={globalStyles.mb2Container}>
                <Text style={styles.subTitle}>Durée de la session</Text>
                <Text style={[globalStyles.textLight, globalStyles.textCenter, globalStyles.textLg]}>{secondsToTimeString(time, {hours: true, minutes: true, seconds: true})}</Text>
            </View>
            <View style={[globalStyles.mb2Container, globalStyles.body, {width: "100%"}]}>
                <Title title={"Séquence"} style={[globalStyles.textLight, globalStyles.mbContainer, globalStyles.textCenter]} />
                <SequenceList
                    sequence={session.raw_datas.getSequence()}
                    onValueChange={handleSequenceChange}
                />
            </View>
            {session.raw_variables.length > 0 && 
            <View style={[globalStyles.mb2Container, globalStyles.body, {width: "100%"}]}>
                <Title title={"Informations fournies"} style={[globalStyles.textLight, globalStyles.mbContainer, globalStyles.textCenter]} />
                <VariablesList variables={session.raw_variables} theme={theme} onValueChange={onVariableChange} />
            </View>}
        </>
    )
}

const styles = {
    subTitle: {
        color: variables.color.lightGrey,
        fontSize: variables.fontSize[2],
    }

}