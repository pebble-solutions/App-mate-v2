import {RawVariableType, SessionType} from "../../shared/types/SessionType";
import {globalStyles, variables} from "../../shared/globalStyles";
import {ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import {format, set} from 'date-fns';
import {fr} from 'date-fns/locale';
import { Session } from "../../shared/classes/Session";
import { VariableType } from "../../shared/types/VariableType";
import { SequenceItemType, SequenceType } from "../../shared/types/SequenceType";
import { useEffect, useState } from "react";
import { SequenceList } from "../Session/SequenceList";
import { MetricSequenceRecord } from "../../shared/classes/MetricSequenceRecord";
import { FlatList } from "react-native-gesture-handler";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

type SummaryCardOptions = {
    onPress?: () => void,
    session: SessionType,
    currentSession?: SessionType | null,
    currentSequence?: SequenceType | null,
    currentSequenceIndex?: number | null,
    sessionIndex: number,
    sequence: SequenceType,
    
}

export function SummaryCard({session, sessionIndex}: SummaryCardOptions) {
    const [sequences, setSequences] = useState<[index: number, start:Date, end:Date |null]>([0, new Date(), new Date()])
    
    const [currentSequence, setCurrentSequence] = useState<SequenceType>(session.raw_datas.getSequence())
    
    const renderItemValue = (item: RawVariableType) => {
        if (item.value instanceof Date) {
            return  <View style={localStyle.cardContent}>
                        <Text style={globalStyles.textLight}>{item.label}: </Text>
                        <Text style={globalStyles.textLight}>{item.value.toLocaleString()}</Text>;
                    </View>
        }
        else return  <View style={localStyle.cardContent}>
                    <Text style={globalStyles.textLight}>{item.label}: </Text>
                    <Text style={globalStyles.textLight}>{item.value}</Text>
                </View>
    }
    


    return (
        <View>
            
            <View style={[localStyle.card]}>
                    <Text style={[globalStyles.sessionSubTitle, globalStyles.textCenter, globalStyles.textLight]}>
                        {format(session.start, ' d MMM yyy', {locale: fr})}
                    </Text>

                <Text style={[globalStyles.sessionSubTitle, globalStyles.textCenter, globalStyles.textLight]}>Séquences</Text>
                <Text style={[globalStyles.textLight,globalStyles.textCenter]}>Nombre de séquences: {session.raw_datas.records.length}</Text>
                <Text>raw_datas record{JSON.stringify(session.raw_datas.records)}</Text>
                
                {/* {session.raw_datas.records.map((sequence) => (
                    <View key={sequence.index} style={[localStyle.cardContent]}>
                        <Text style={globalStyles.textLight}>séquence  </Text>
                        <Text style={globalStyles.textLight}>Nombre de données: {JSON.stringify(sequence)}</Text>
                        <Text style={globalStyles.textLight}>Début: {sequence.start? format(sequence.start, ' d MMM yyy', {locale: fr}): 'en cours'}</Text> 
                        <Text style={globalStyles.textLight}>Fin: {sequence.end ? format(sequence.end, ' d MMM yyy', {locale: fr}) : "en cours"}</Text> 
                    </View>
                ))} */}
                
            </View>
            <View style={[localStyle.card]}>
                <View>
                    {session.raw_datas && (
                        <SequenceList sequence={currentSequence} />
                    )}
                <Text style={[globalStyles.sessionSubTitle, globalStyles.textCenter, globalStyles.textLight]}>Informations et variables</Text>
                {session.raw_variables.length > 0 && (
                    <View >
                        <Text style={[globalStyles.textLight,globalStyles.textCenter]}>Nombre de variables: {session.raw_variables.length}</Text>
                        {session.raw_variables.map((variable, index) => (
                            <>
                            {renderItemValue(variable as RawVariableType)}
                            </>
                        ))}
                    </View>
                )}
                {session.raw_variables.length === 0 && (
                    <View style={[ localStyle.content]}>
                        <Text style={[globalStyles.textLight]}>Pas de variable</Text>
                    </View>
                )}
                </View>
            </View>
        </View>

    )
}

const localStyle = StyleSheet.create({

    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        padding: variables.contentPadding[1],   
    },
    content: {
        borderRadius: variables.borderRadius[1],
        padding: variables.contentPadding[2],
        marginVertical: variables.contentMargin[1],
        justifyContent: 'center',
    },
    
    cardContent: {
        backgroundColor: '#00000010',
        borderRadius: variables.borderRadius[1],
        justifyContent: 'center',
        margin: variables.contentMargin[1],
        padding: variables.contentPadding[1],
    },
    card: {
        backgroundColor: "#00000010",
        borderRadius: variables.borderRadius[1],
        // justifyContent: 'center',
        margin: variables.contentMargin[1],
        padding: variables.contentPadding[1],

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
    renderItem: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})