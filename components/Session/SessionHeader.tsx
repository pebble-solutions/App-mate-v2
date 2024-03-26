import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { globalStyles, variables } from '../../shared/globalStyles';


export function SessionHeader({label, description, date, id}: {label: string, description?: string, date: string, id: string}) {
    return (
        <View style={[globalStyles.ph2Container, localStyle.sessionHeader]}>
            <View style={globalStyles.mContainer}>
                <Text style={globalStyles.textLight}>{label}</Text>
                <Text style={globalStyles.textLightGrey}>{description}</Text>
                <Text style={globalStyles.textLightGrey}>{id}</Text>
            </View>
            <View style={globalStyles.mContainer}>
                <Text style={globalStyles.textLight}>{date}</Text>
            </View>
        </View>
    )
}

const localStyle = StyleSheet.create({
    
    sessionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: variables.contentMargin[2]
    }
})
    
