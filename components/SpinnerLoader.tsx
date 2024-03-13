import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
    },
});

export default SpinnerLoader;