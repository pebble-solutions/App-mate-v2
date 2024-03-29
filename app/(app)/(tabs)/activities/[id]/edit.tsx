import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, ScrollView, TextInput, Modal, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getRGBGradientColors } from "../../../../../shared/libs/color";
import { globalStyles } from "../../../../../shared/globalStyles";
import { ActivityType } from "../../../../../shared/types/ActivityType";
import { useActivityContext } from "../../../../../shared/contexts/ActivityContext";
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import { Activity } from "../../../../../shared/classes/Activity";
import ActivityForm from "../../../../../components/Activity/ActivityForm";
import { useLocalSearchParams } from "expo-router";
import { Redirect } from "expo-router";

export default function EditScreen() {
    const { getActivityById, removeActivity, updateActivity } = useActivityContext();
    const { id } = useLocalSearchParams<{ id: string }>();

    const activityData = id ? getActivityById(id) : undefined
    const activity = activityData ? new Activity(activityData) : null;

    const handleValidate = (newActivity: Activity) => {
        updateActivity(newActivity)
        router.back();
    };

    const handleDeleteActivity = () => {
        if (activity) {
            Alert.alert(
                "Confirmer la suppression",
                "Êtes-vous sûr de vouloir supprimer cette activité ?",
                [
                    {
                        text: "Annuler",
                        style: "cancel",
                    },
                    {
                        text: "Oui",
                        onPress: () => {
                             removeActivity(activity._id);
                        },
                    },
                ],
                { cancelable: false }
            );
        }
    };

    if (!activity) {
        return <Redirect href="/activities" />
    }

    return (
        <LinearGradient
            colors={getRGBGradientColors(activity.color)}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={globalStyles.body}
        >

            <View style={globalStyles.contentContainer}>
                <View style={[globalStyles.headerIcons, { flexDirection: 'row', alignItems: 'center' }]}>
                    <TouchableOpacity
                        onPress={handleDeleteActivity}
                        style={{ marginTop: 15, marginRight: 10 }}
                    >
                        <Ionicons name="trash-outline" size={25} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => router.back()}
                        style={{ marginTop: 15 }}
                    >
                        <Ionicons name="close" size={30} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
            
            <ActivityForm 
                activity={activity} 
                onValidate={handleValidate} 
                title="Modifier l'activité" 
            />

        </LinearGradient>
    );
}
