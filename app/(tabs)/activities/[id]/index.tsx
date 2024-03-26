import React, { useState } from "react";
import { Text, View, ScrollView, TouchableOpacity, Alert, Modal, StyleSheet } from "react-native"; // Importez Alert
import { useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { getRGBGradientColors } from "../../../../shared/libs/color";
import { globalStyles, variables } from "../../../../shared/globalStyles";
import { useActivityContext } from "../../../../shared/contexts/ActivityContext";
import { VariableType } from "../../../../shared/types/VariableType";
import { useVariableContext } from "../../../../shared/contexts/VariableContext";
import VariableCard from "../../../../components/VariableCard";
import { format } from 'date-fns';
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import { TextInput } from "react-native-gesture-handler";
import SpinnerLoader from "../../../../components/ScreenCoverLoader";
import { Activity } from "../../../../shared/classes/Activity";

export default function ActivityScreen() {
    const { getActivityById, removeActivity, updateActivity } = useActivityContext();
    const { _id } = useLocalSearchParams<{ _id: string }>();
    const activity = _id ? getActivityById(_id) : null;
    const [isLoading, setIsLoading] = useState(false);

    const { variables } = useVariableContext();

    const [settingsValues, setSettingsValues] = useState({
        label: '',
        description: '',
        color: '',
    });

    if (!activity) {
        return (
            <View style={globalStyles.body}>
                <View style={globalStyles.contentContainer}>
                    <Text>Activité non trouvée</Text>
                </View>
            </View>
        );
    }

    const colors = activity?.color ? getRGBGradientColors(activity.color) : ["#262729"];

    const handleDeleteActivity = async () => {
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
                        setIsLoading(true);
                        removeActivity(activity._id);
                        router.back();
                        setIsLoading(false);
                    },
                },
            ],
            { cancelable: false }
        );
    };


    const handleUpdateActivity = () => {
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

        try {
            updateActivity(new Activity(updatedActivity));
        } catch (error) {
            Alert.alert("Erreur lors de la mise à jour de l'activité:", (error as Error).message);
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <LinearGradient
            colors={colors}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={globalStyles.body}>

            {isLoading && <SpinnerLoader />}

            <View style={globalStyles.contentContainer}>
                <View style={globalStyles.headerIcons}>
                    <TouchableOpacity
                        onPress={() => {
                            router.push("/activities/"+activity._id+"/edit")
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
            <ScrollView>
                <View style={globalStyles.contentContainer}>
                    <Text style={[globalStyles.CategoryTitle, globalStyles.textLight, globalStyles.textCenter]}>Variables liées à l'activité :</Text>
                    {activity.variables.map((variable: VariableType, index: number) => (
                        <VariableCard
                            key={index}
                            displayRemoveIcon={true}
                            activityId={activity._id}
                            variable={variable}
                        />
                    ))}
                </View>
                <View style={globalStyles.contentContainer}>
                    <Text style={[globalStyles.CategoryTitle, globalStyles.textLight]}>Autres variables disponibles :</Text>
                    {variables.map((variable: VariableType, index: number) => (
                        <VariableCard
                            key={index}
                            displayAddIcon={true}
                            activityId={activity._id}
                            variable={variable}
                            grayedOut={activity.variables.some((v) => v._id === variable._id)}
                            isChecked
                        />
                    ))}
                </View>
            </ScrollView>


        </LinearGradient>
    )

}
const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: variables.color.alphaDark,
    },
    modalContainer: {
        backgroundColor: variables.color.dark,
        width: '80%',
        borderRadius: variables.borderRadius[2],
        padding: variables.contentPadding[4],
        alignItems: 'center',
        ...variables.shadow,
    },
});
