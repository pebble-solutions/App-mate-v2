import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { variables } from '../shared/globalStyles';

const SpinnerLoader = () => (
    <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFFFFF" />
    </View>
);

const styles = StyleSheet.create({
    loadingContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: variables.color.alphaDark,
        zIndex: 1000,
    },
});

export default SpinnerLoader;