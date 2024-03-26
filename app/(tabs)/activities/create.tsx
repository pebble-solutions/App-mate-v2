import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { getRGBGradientColors } from "../../../shared/libs/color";
import { globalStyles } from "../../../shared/globalStyles";
import { ActivityType } from "../../../shared/types/ActivityType";
import { useActivityContext } from "../../../shared/contexts/ActivityContext";
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import { TextInput } from "react-native-gesture-handler";
import { Activity } from "../../../shared/classes/Activity";
import ActivityForm from "../../../components/Activity/ActivityForm";

export default function CreateActivityModal() {
    const { addActivity } = useActivityContext();

    const handleValidate = (newActivity: Activity) => {
        addActivity(newActivity);
        router.back();
    }

    return (
        <LinearGradient
            colors={getRGBGradientColors('#262729')}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={globalStyles.body}
        >

            <View style={globalStyles.contentContainer}>
                <View style={[globalStyles.headerIcons, { flexDirection: 'row', alignItems: 'center' }]}>
                    <TouchableOpacity
                        onPress={() => router.back()}
                        style={{ marginTop: 15 }}
                    >
                        <Ionicons name="close" size={30} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
            
            <ActivityForm 
                activity={new Activity({is_active: true})}
                onValidate={handleValidate} 
                title="Nouvelle activité" 
            />

        </LinearGradient>
    )
}
