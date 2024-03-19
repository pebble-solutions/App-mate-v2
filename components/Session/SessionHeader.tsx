import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../../shared/globalStyles';


export function SessionHeader({label, description, date}: {label: string, description?: string, date: string}) {
    return (
        <View style={[globalStyles.pContainer, localStyle.sessionHeader]}>
            <View style={globalStyles.mContainer}>
                <Text style={globalStyles.textLight}>{label}</Text>
                <Text style={globalStyles.textLight}>{description}</Text>
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
    }
})
    
