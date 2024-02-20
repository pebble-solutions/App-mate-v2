import {SequenceItemType} from "../types/SequenceType";
import {StyleSheet, Text, View} from "react-native";
import {globalStyles, variables} from "../../shared/globalStyles";

type SequenceItemOptions = {
    item: SequenceItemType
}

export function SequenceItem({item}: SequenceItemOptions) {
    return (
        <View style={[localStyle.container]}>
            <View style={localStyle.box}>
                <TimeBox label={"Début"} date={item[0]} />
            </View>

            {item[1] ? (
                <>
                    <View style={localStyle.box}><Text>Durée</Text></View>

                    <View style={localStyle.box}>
                        <TimeBox label={"Fin"} date={item[1]} />
                    </View>
                </>
            ) : (
                <>
                    <View style={localStyle.box}>
                        <Text style={globalStyles.textGrey}>En cours...</Text>
                    </View>
                    <View style={localStyle.box}></View>
                </>
            )}
        </View>
    )
}

type TimeBoxOptions = {
    label: string,
    date: Date
}

function TimeBox({label, date}: TimeBoxOptions) {
    return (
        <>
            <Text style={[globalStyles.textGrey]}>{label}</Text>
            <Text style={[globalStyles.textLightGrey]}>{date.toLocaleTimeString('fr-FR', {
                hour: "numeric",
                minute: "2-digit",
                second: "2-digit"
            })}</Text>
        </>
    )
}

const localStyle = StyleSheet.create({
    container: {
        paddingHorizontal: variables.contentPadding[4],
        paddingVertical: variables.contentPadding[2],
        borderBottomWidth: 1,
        borderBottomColor: variables.color.grey,
        flexDirection: "row",
        alignItems: "center"
    },

    box: {
        flex: 1
    }
})