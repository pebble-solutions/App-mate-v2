import React, { useState } from "react";
import { Text, View, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from "react-native"; // Importez Alert
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

export default function ActivityScreen() {
    const { getActivityById, removeActivity, editActivity } = useActivityContext();
    const { _id } = useLocalSearchParams<{ _id: string }>();
    const activity = _id ? getActivityById(_id) : null;
    const [isLoading, setIsLoading] = useState(false);

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
                        setIsLoading(true);
                        removeActivity(activity._id);
                        router.back();
                    },
                },
            ],
            { cancelable: false }
        );
    }

    const updateActivity = () => {
        setIsLoading(true);
        const updatedActivity = {
            _id: activity._id,
            label: settingsValues.label || activity.label,
            start: activity.start,
            description: settingsValues.description || activity.description,
            color: settingsValues.color || activity.color,
            variables: activity.variables,
            is_active: activity.is_active,
        };

        editActivity(activity._id, updatedActivity);
        setSettingsVisible(false);
        setIsLoading(false);

    }

    return (
        <LinearGradient
            colors={colors}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={globalStyles.body}>

            {isLoading && (
                <View style={globalStyles.loadingContainer}>
                    <ActivityIndicator size="large" color="#FFFFFF" />
                </View>
            )}
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
                            updateActivity();
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
                    <Text style={[globalStyles.CategoryTitle, globalStyles.textLight]}>Mes jolies variables :</Text>
                    {activity.variables.map((variable: VariableType, index: number) => (
                        <VariableCard
                            key={index}
                            label={variable.label}
                            description={variable.description}
                            mandatory={variable.mandatory}
                            displayRemoveIcon={true}
                            isMandatory={true}
                            activityId={activity._id}
                            variableId={variable._id}
                            onActionStart={() => setIsLoading(true)}
                            onActionEnd={() => setIsLoading(false)}
                        />
                    ))}
                </View>
                <View style={globalStyles.contentContainer}>
                    <Text style={[globalStyles.CategoryTitle, globalStyles.textLight]}>Autres variables disponibles :</Text>
                    {variables.map((variable: VariableType, index: number) => (
                        <VariableCard
                            key={index}
                            label={variable.label}
                            description={variable.description}
                            displayAddIcon={true}
                            activityId={activity._id}
                            variableId={variable._id}
                            onActionStart={() => setIsLoading(true)}
                            onActionEnd={() => setIsLoading(false)}
                        />
                    ))}
                </View>
            </ScrollView>
        </LinearGradient>
    )
}
