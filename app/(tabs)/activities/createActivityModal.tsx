import React, { useState } from "react";
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
import moment from 'moment';

export default function CreateActivityModal() {
    const { addActivity } = useActivityContext();
    const [settingsValues, setSettingsValues] = useState({
        label: '',
        description: '',
        color: '',
    });
    const colors = getRGBGradientColors("slategray");

    const [selectedColor, setSelectedColor] = useState("#262729");

    const colorOptions = [
        "#262729",
        "#701323",
        "#701348",
        "#671370",
        "#341370",
        "#133070",
        "#525252",
        "#13706d",
        "#0f572e",
        "#436903",
        "#b57c02",
        "#b81d06",
    ];

    const createActivity = () => {
        // Créez une nouvelle activité en utilisant les valeurs de settingsValues
        const newActivity = {
        _id: '', 
        start: moment().format('YYYY-MM-DD HH:mm:ss'),
        variables: [], 
        status: 'active',
        label: settingsValues.label,
        description: settingsValues.description,
        color: selectedColor,
        };

        // Appelez la fonction addActivity pour ajouter la nouvelle activité
        addActivity(newActivity);

        // Fermez la modal ou effectuez d'autres actions nécessaires
        router.back();
        alert("Activité crée !");
    };

    // Divisez le tableau colorOptions en deux parties
    const firstRowColors = colorOptions.slice(0, 6);
    const secondRowColors = colorOptions.slice(6, 12);

    return (
        <LinearGradient
            colors={colors}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={globalStyles.body}>

            <View style={globalStyles.contentContainer}>
                <View style={[globalStyles.headerCloseIcon, { justifyContent: 'flex-end', alignItems: 'flex-end' }]}>
                    <TouchableOpacity
                        onPress={() => {
                            router.back();
                        }}
                    >
                        <Text style={globalStyles.textLight}>annuler</Text>
                    </TouchableOpacity>
                </View>
                <Text style={[globalStyles.headTitle, globalStyles.textLight, globalStyles.textCenter]}>Nouvelle activité</Text>
            </View>

            <View style={globalStyles.contentContainer}>
                <TextInput
                    style={globalStyles.input}
                    onChangeText={(text) => setSettingsValues({ ...settingsValues, label: text })}
                    value={settingsValues.label}
                    placeholder="Saisissez un nom pour cette activité"
                    placeholderTextColor="white"
                />
            </View>
            <View style={globalStyles.contentContainer}>
                <TextInput
                    style={globalStyles.input}
                    onChangeText={(text) => setSettingsValues({ ...settingsValues, description: text })}
                    value={settingsValues.description}
                    placeholder="Saisissez une description"
                    placeholderTextColor="white"
                />
            </View>
            <View style={globalStyles.contentContainer}>

                <View style={globalStyles.colorButtonsParentContainer}>
                    {/* Première ligne de boutons de couleur */}
                    <View style={globalStyles.colorButtonsContainer}>
                        {firstRowColors.map((color, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    globalStyles.colorButton,
                                    { backgroundColor: color, borderColor: selectedColor === color ? 'white' : 'transparent' }
                                ]}
                                onPress={() => setSelectedColor(color)}
                            />
                        ))}
                    </View>
                    {/* Deuxième ligne de boutons de couleur */}
                    <View style={globalStyles.colorButtonsContainer}>
                        {secondRowColors.map((color, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    globalStyles.colorButton,
                                    { backgroundColor: color, borderColor: selectedColor === color ? 'white' : 'transparent' }
                                ]}
                                onPress={() => setSelectedColor(color)}
                            />
                        ))}
                    </View>
                </View>
            </View>

            <View style={globalStyles.iconContainer}>
                <TouchableOpacity
                    onPress={createActivity}
                >
                    <Ionicons name="add-circle" size={120} color="white" />
                </TouchableOpacity>
            </View>
        </LinearGradient>
    )
}
