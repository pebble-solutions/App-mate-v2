import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { globalStyles, variables } from '../../shared/globalStyles';


export function SessionHeader({label, description, date}: {label: string, description?: string, date: string}) {
    return (
        <View style={[globalStyles.pContainer, localStyle.sessionHeader]}>
            <View style={globalStyles.mContainer}>
                <Text style={globalStyles.textLightGrey}>{label}</Text>
                <Text style={globalStyles.textLightGrey}>{description}</Text>
            </View>
            <View style={globalStyles.mContainer}>
                <Text style={globalStyles.textLightGrey}>{date}</Text>
            </View>
        </View>
    )
}

const localStyle = StyleSheet.create({
    
    sessionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        //borderWidth: 1,
        //borderColor: variables.color.lightGrey,
        marginVertical: variables.contentMargin[3],
        borderRadius: variables.borderRadius[1],
    }
})
    
