import {SessionType} from "../../shared/types/SessionType";
import {globalStyles, variables} from "../../shared/globalStyles";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { Ionicons } from '@expo/vector-icons';

type SessionCardOptions = {
    onPress?: () => void,
    session: SessionType
}

export function SessionCard({session, onPress}: SessionCardOptions) {
    return (
        <TouchableOpacity onPress={onPress} style={[globalStyles.card, globalStyles.whiteBg, localStyle.card, globalStyles.mvContainer]}>
            <View style={[globalStyles.cardContent, localStyle.container]}>
                <View>
                    <Text style={[globalStyles.textXl, globalStyles.textGrey]}>{session.label}</Text>
                    <Text style={[globalStyles.textLightGrey]}>Démarré le {session.start.toLocaleString()}</Text>
                </View>
                <View>
                    <Ionicons name="play" size={24} color={variables.color.success} />
                </View>
            </View>
        </TouchableOpacity>
    )
}

const localStyle = StyleSheet.create({
    card: {
        width: "100%",
        shadowColor: "black",
        shadowRadius: 12,
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: .2
    },

    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
})