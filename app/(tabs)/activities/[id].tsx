import React, { useState } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { getRGBGradientColors } from "../../../shared/libs/color";
import { globalStyles } from "../../../shared/globalStyles";
import { ActivityType } from "../../../shared/types/ActivityType";
import { useActivityContext } from "../../../shared/contexts/ActivityContext";
import { VariableType } from "../../../shared/types/VariableType";
import { useVariableContext } from "../../../shared/contexts/VariableContext";
import VariableCard from "../../../components/VariableCard";
import { format } from 'date-fns';
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";

export default function ActivityScreen() {
    const { getActivityById } = useActivityContext();
    const { _id } = useLocalSearchParams<ActivityType>();
    const activity = _id ? getActivityById(_id) : null;
    const { variables } = useVariableContext();

    const [isSettingsVisible, setSettingsVisible] = useState(false);

    if (!activity) {
        return (
            <View style={globalStyles.body}>
                <View style={globalStyles.contentContainer}>
                    <Text>Not found</Text>
                </View>
            </View>
        );
    }

    const colors = activity?.color ? getRGBGradientColors(activity.color) : ["#fff"];

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
                    Crée le {format(new Date(activity.start), 'dd.MM.yyyy')}
                </Text>
                <Text style={[globalStyles.textLight, globalStyles.textCenter]}>{activity.description}</Text>
            </View>

            {isSettingsVisible && (
                <View style={globalStyles.contentContainer}>
                    <Text style={[globalStyles.textLight, globalStyles.textCenter]}>Settings Dropdown</Text>
                </View>
            )}

            {isSettingsVisible && (
                <TouchableOpacity
                    style={globalStyles.contentContainer}
                    onPress={() => {
                        setSettingsVisible(false);
                    }}
                >
                    <Text style={[globalStyles.textLight, globalStyles.textCenter]}>Valider les changements</Text>
                </TouchableOpacity>
            )}
            <ScrollView>
                <View style={globalStyles.contentContainer}>
                    <Text style={[globalStyles.CategoryTitle, globalStyles.textLight]}>Mes jolies variables :</Text>
                    {activity.variables.map((variable: { label: string, description: string, mandatory: boolean }, index: number) => (
                        <VariableCard
                            key={index}
                            label={variable.label}
                            description={variable.description}
                            mandatory={variable.mandatory}
                            displayRemoveIcon={true}
                            isMandatory={true}
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
                        />
                    ))}
                </View>
            </ScrollView>
        </LinearGradient>
    )
}
