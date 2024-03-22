import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, ScrollView, TextInput, Modal, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getRGBGradientColors } from "../../../../shared/libs/color";
import { globalStyles } from "../../../../shared/globalStyles";
import { ActivityType } from "../../../../shared/types/ActivityType";
import { useActivityContext } from "../../../../shared/contexts/ActivityContext";
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import { Activity } from "../../../../shared/classes/Activity";
import { VariableType } from "../../../../shared/types/VariableType";
import { useVariableContext } from "../../../../shared/contexts/VariableContext";
import VariableCard from "../../../../components/VariableCard";
import { format } from 'date-fns';
import SpinnerLoader from "../../../../components/ScreenCoverLoader";
import ActivityForm from "../../../../components/Activity/ActivityForm";
import { useLocalSearchParams } from "expo-router";
import { Redirect } from "expo-router";

export default function EditScreen() {
    const { getActivityById, removeActivity, editActivity } = useActivityContext();
    const { id } = useLocalSearchParams<{ id: string }>(); // Assurez-vous que cette ligne est toujours appelée avant tout autre hook

    const activity = id ? new Activity(getActivityById(id)) : null;

    if (!activity) {
        return <Redirect href="/activities" />
    }

    const handleValidate = (newActivity: Activity) => {
        editActivity(activity._id, newActivity)
        router.back();
    };

    const handleDeleteActivity = async () => {
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
                        onPress: async () => {
                            await removeActivity(activity._id);
                            router.back();
                        },
                    },
                ],
                { cancelable: false }
            );
        }
    };

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
