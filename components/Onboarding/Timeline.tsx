import {ReactNode} from "react";
import {StyleSheet, View} from "react-native";
import {variables} from "../../shared/globalStyles";
import {TimelineOptions} from "./types/TimelineOptions";

export default function Timeline({items, currentIndex, activeColor, inactiveColor}: TimelineOptions) {

    let nodes:ReactNode[] = []



    for (let i=0; i<items; i++) {
        let style: any[] = [{...localStyle.item, backgroundColor: inactiveColor || variables.color.grey}]
        if (currentIndex === i) {
            style.push({...localStyle.active, backgroundColor: activeColor || variables.color.active})
        }

        nodes.push((
            <View style={style} key={i}></View>
        ))
    }

    return (
        <View style={localStyle.container}>
            {nodes}
        </View>
    )

}

const localStyle = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },

    item: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: variables.contentMargin[1] / 2
    },

    active: {
        width: 20
    }
})