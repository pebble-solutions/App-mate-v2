import {RawVariableType, SessionType} from "../../shared/types/SessionType";
import {globalStyles, variables} from "../../shared/globalStyles";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import {format} from 'date-fns';
import {fr} from 'date-fns/locale';
import { Session } from "../../shared/classes/Session";
import { VariableType } from "../../shared/types/VariableType";
import { SequenceType } from "../../shared/types/SequenceType";
import { useState } from "react";

type SummaryCardOptions = {
    onPress?: () => void,
    session: SessionType,
}

export function SummaryCard({session}: SummaryCardOptions) {
    console.log(session, 'session') 

    const renderItemValue = (item: RawVariableType) => {
        console.log(item, 'itemincard')
        if (item.value instanceof Date) {
            console.log(item.value)
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
                <View style={[ localStyle.container]}>
                    <AntDesign name="left" size={24} color={'white'} />
                        <Text style={[globalStyles.sessionSubTitle, globalStyles.textCenter, globalStyles.textLight]}>
                            {format(session.start, ' d MMM yyy', {locale: fr})}
                        </Text>
                        
                    <AntDesign name="right" size={24} color={'white'} />
                </View>
                
            </View>
            <View style={[localStyle.card]}>
                <Text style={[globalStyles.textCenter, globalStyles.textLight]}>Informations et variables</Text>
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
        backgroundColor: "#00000050",
        borderRadius: variables.borderRadius[1],
        justifyContent: 'center',
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