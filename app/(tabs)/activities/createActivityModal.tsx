import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { getRGBGradientColors } from "../../../shared/libs/color";
import { globalStyles } from "../../../shared/globalStyles";
import { ActivityType } from "../../../shared/types/ActivityType";
import { useActivityContext } from "../../../shared/contexts/ActivityContext";
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import { TextInput } from "react-native-gesture-handler";

export default function CreateActivityModal() {
    const { addActivity } = useActivityContext();
    const [settingsValues, setSettingsValues] = useState({
        label: '',
        description: '',
        color: '',
    });
    const colors = getRGBGradientColors("slategray");

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
                <Text style={[globalStyles.headTitle, globalStyles.textLight, globalStyles.textCenter]}>Nouvelle activité : </Text>
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
            <View style={globalStyles.iconContainer}>
                <TouchableOpacity
                    onPress={() => { }}
                >
                    <Ionicons name="add-circle" size={120} color="white" />
                </TouchableOpacity>
            </View>
        </LinearGradient>
    )
}
