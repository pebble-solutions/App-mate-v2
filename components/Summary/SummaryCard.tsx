import {SessionType} from "../../shared/types/SessionType";
import {globalStyles, variables} from "../../shared/globalStyles";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { AntDesign } from '@expo/vector-icons';

type SummaryCardOptions = {
    onPress?: () => void,
    session: SessionType
}

export function SummaryCard({session, onPress}: SummaryCardOptions) {
    return (
        <TouchableOpacity onPress={onPress} style={[localStyle.cardContent]}>
                <View style={[ localStyle.container]}>
                    <AntDesign name="left" size={24} color={variables.color.success} />
                        <Text style={[globalStyles.textLight]}>{session.start.toLocaleDateString()}</Text>
                    <AntDesign name="right" size={24} color={variables.color.success} />
                </View>
                <View style={[ localStyle.container]}>
                    <Text style={[globalStyles.textLight]}>Timeline</Text>
                    <Text style={[globalStyles.textLight]}>MetricSeqeunce</Text>
                </View>
                <>

                {session.raw_variables.length > 0 && (
                    <View style={[ localStyle.content]}>
                        <Text style={[globalStyles.textLight]}>Nombre de variables brutes: {session.raw_variables.length}</Text>
                        {session.raw_variables.map((variable, index) => (
                            <>
                            <Text key={index} style={[globalStyles.textLight]}>{variable.label} : {variable.value}</Text>
                            </>
                            
                        ))}
                    </View>
                )}
                {session.raw_variables.length === 0 && (
                    <View style={[ localStyle.content]}>
                        <Text style={[globalStyles.textLight]}>Pas de variable</Text>
                    </View>
                )}
                </>
        </TouchableOpacity>
    )
}

const localStyle = StyleSheet.create({
    card: {
        width: "100%",
        backgroundColor: "transparent",
        shadowRadius: 12,
        shadowOffset: {
            width: 0,
            height: 10
        },
    },

    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    content: {
        borderRadius: variables.borderRadius[1],
        padding: variables.contentPadding[2],
        marginVertical: variables.contentMargin[1],
        justifyContent: 'center',
    },

    
    cardContent: {
        backgroundColor: '#00000020',
        borderRadius: variables.borderRadius[1],
        padding: variables.contentPadding[2],
        marginVertical: variables.contentMargin[2],
        justifyContent: 'center',
    },
    cardTitle: {
        fontSize: variables.fontSize[4],
        fontFamily: 'Inter_700Bold',
    },
    
    cardHeader: {
        maxWidth: '80%',
    },
    
    cardIconsContainer: {
        flexDirection: 'row',
        position: 'absolute',
        right: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
})