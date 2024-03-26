import React, { useState } from "react";
import { Text, View, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { getRGBGradientColors } from "../../../shared/libs/color";
import { globalStyles } from "../../../shared/globalStyles";
import { useActivityContext } from "../../../shared/contexts/ActivityContext";
import { VariableType } from "../../../shared/types/VariableType";
import { useVariableContext } from "../../../shared/contexts/VariableContext";
import VariableCard from "../../../components/VariableCard";
import { format } from 'date-fns';
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import { TextInput } from "react-native-gesture-handler";
import {Activity} from "../../../shared/classes/Activity";

export default function ActivityScreen() {
    const { getActivityById, removeActivity, updateActivity } = useActivityContext();
    const { _id } = useLocalSearchParams<{ _id: string }>();
    const activity = _id ? getActivityById(_id) : null;

    const { variables } = useVariableContext();
    if (!activity) {
        return (
            <View style={globalStyles.body}>
                <View style={globalStyles.contentContainer}>
                    <Text>Activité non trouvée</Text>
                </View>
            </View>
        );
    }

    const [isSettingsVisible, setSettingsVisible] = useState(false);
    const [settingsValues, setSettingsValues] = useState({
        label: '',
        description: '',
        color: '',
    });

    const colors = activity?.color ? getRGBGradientColors(activity.color) : ["#262729"];

    const showConfirmDeleteDialog = () => {
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
                        router.back();
                    },
                },
            ],
            { cancelable: false }
        );
    }

    const editActivity = () => {
        const updatedActivity = {
            _id: activity._id,
            label: settingsValues.label || activity.label,
            start: activity.start,
            description: settingsValues.description || activity.description,
            color: settingsValues.color || activity.color,
            variables: activity.variables,
            is_active: activity.is_active,
        };

        updateActivity(new Activity(updatedActivity));
        setSettingsVisible(false);
    }

    return (
        <LinearGradient
            colors={colors}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={globalStyles.body}>

            <View style={globalStyles.contentContainer}>
                <View style={globalStyles.headerIcons}>
                    <TouchableOpacity
                        onPress={() => {
                            setSettingsVisible(!isSettingsVisible);
                        }}
                    >
                        <Ionicons name="settings-outline" size={28} color="white" style={{ position: 'relative', left: 5, top: 19 }} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            router.back();
                        }}
                    >
                        <Ionicons name="close-outline" size={32} color="white" style={{ position: 'relative', right: 0, top: 18 }} />
                    </TouchableOpacity>
                </View>
                <Text style={[globalStyles.headTitle, globalStyles.textLight, globalStyles.textCenter]}>{activity.label}</Text>
            </View>

            <View style={[globalStyles.contentContainer]}>
                <Text style={[globalStyles.textLight, globalStyles.textCenter]}>
                    Crée le {activity.start ? format(activity.start, 'dd.MM.yyyy') : ''}
                </Text>
                <Text style={[globalStyles.textLight, globalStyles.textCenter]}>{activity.description}</Text>
            </View>
            <View style={globalStyles.contentContainer}>
                {isSettingsVisible && (
                    <View>
                        <Text style={[globalStyles.CategoryTitle, globalStyles.textCenter, globalStyles.textLight]}>Réglages de l'activité :</Text>
                        <TextInput
                            style={globalStyles.input}
                            placeholder={`Nom de l'activité :  ${activity.label}`}
                            placeholderTextColor="#FFFFFF"
                            value={settingsValues.label}
                            onChangeText={(text) => setSettingsValues({ ...settingsValues, label: text })}
                        />
                        <TextInput
                            style={globalStyles.input}
                            placeholder={`Description de l'activité :  ${activity.description}`}
                            placeholderTextColor="#FFFFFF"
                            value={settingsValues.description}
                            onChangeText={(text) => setSettingsValues({ ...settingsValues, description: text })}
                        />
                    </View>
                )}

                {isSettingsVisible && (
                    <TouchableOpacity

                        onPress={() => {
                            editActivity();
                            setSettingsVisible(false);
                        }}
                    >
                        <View style={globalStyles.buttonContainer}>
                            <Text style={globalStyles.buttonText}>Valider les changements </Text>
                            <Ionicons name="checkmark" size={20} color="white" style={{ position: 'absolute', right: 5 }} />
                        </View>
                    </TouchableOpacity>
                )}

                {isSettingsVisible && (
                    <TouchableOpacity
                        onPress={showConfirmDeleteDialog}
                    >
                        <View style={globalStyles.buttonContainer}>
                            <Text style={globalStyles.buttonText}>Supprimer cette activité </Text>
                            <Ionicons name="trash-outline" size={20} color="white" style={{ position: 'absolute', right: 5 }} />
                        </View>
                    </TouchableOpacity>
                )}
            </View>
            <ScrollView>
                <View style={globalStyles.contentContainer}>
                    <Text style={[globalStyles.CategoryTitle, globalStyles.textLight, globalStyles.textCenter]}>Variables liées à l'activité :</Text>
                    {activity.variables.map((variable: VariableType, index: number) => (
                        <VariableCard
                            key={index}
                            displayRemoveIcon={true}
                            isMandatory={true}
                            activityId={activity._id}
                            variable={variable}
                        />
                    ))}
                </View>
                <View style={globalStyles.contentContainer}>
                    <Text style={[globalStyles.CategoryTitle, globalStyles.textLight, globalStyles.textCenter]}>Autres variables pour cette activité :</Text>
                    {variables.map((variable: VariableType, index: number) => {
                        const isVariableLinked = activity.variables.some((v: VariableType) => v.label === variable.label);
                        return (
                            <View key={index}>
                                <VariableCard
                                    variable={variable}
                                    displayAddIcon={!isVariableLinked}
                                    activityId={activity._id}
                                    grayedOut={isVariableLinked}
                                    isChecked
                                />
                            </View>
                        );
                    })}
                </View>
            </ScrollView>


        </LinearGradient>
    )
}
