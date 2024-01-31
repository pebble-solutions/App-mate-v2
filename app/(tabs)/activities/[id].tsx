import React from "react";
import { Text, View } from "react-native";
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

export default function ActivityScreen() {
    const { getActivityById } = useActivityContext();
    const { _id } = useLocalSearchParams<ActivityType>();
    const activity = _id ? getActivityById(_id) : null;

    const { variables } = useVariableContext();

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
                <Text style={[globalStyles.headTitle, globalStyles.textLight, globalStyles.textCenter]}>{activity.label}</Text>
            </View>

            <View style={[globalStyles.contentContainer]}>
                <Text style={[globalStyles.textLight,  globalStyles.textCenter]}>
                    Crée le {format(new Date(activity.start), 'dd.MM.yyyy')}
                </Text>
                <Text style={[globalStyles.textLight,  globalStyles.textCenter]}>{activity.description}</Text>
            </View>

            <View style={globalStyles.contentContainer}>
                <Text style={[globalStyles.CategoryTitle, globalStyles.textLight]}>Mes jolies variables :</Text>
                {activity.variables.map((variable: { label: string, description: string }, index: number) => (
                    <VariableCard
                        key={index}
                        label={variable.label}
                        description={variable.description}
                        color=""
                    />
                ))}
            </View>
            <View style={globalStyles.contentContainer}>
                <Text style={[globalStyles.CategoryTitle, globalStyles.textLight]}>Autres variables disponibles :</Text>

                {variables.map((variable: VariableType, index: number) => (
                    <VariableCard
                        key={index}
                        label={variable.label}
                        description={variable.description} // Vous pouvez ajouter la description si elle est disponible
                        color=""
                    />
                ))}
            </View>
        </LinearGradient>
    )
}
