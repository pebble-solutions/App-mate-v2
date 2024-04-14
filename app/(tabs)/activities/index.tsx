import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";
import { globalStyles } from "../../../shared/globalStyles";
import ActivityCard from "../../../components/Activity/ActivityCard";
import { AntDesign } from '@expo/vector-icons';
import { router } from "expo-router";
import { useActivityContext } from "../../../shared/contexts/ActivityContext";
import HeaderScreenTitle from "../../../components/HeaderScreenTitle";
import {useRequestsContext} from "../../../shared/contexts/RequestsContext";

export default function ActivitiesScreen() {
    const { activities } = useActivityContext();
    const {auth} = useRequestsContext()

    const isManager = auth.tokenData?.roles.includes("manager")

    const activeActivities = activities.filter(activity => activity.is_active);
    const inactiveActivities = activities.filter(activity => !activity.is_active);
    const allActivities = activeActivities.concat(inactiveActivities);

    return (
        <SafeAreaView style={globalStyles.body}>
            <FlatList
                style={globalStyles.body}
                data={allActivities}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View>
                        {index === 0 && <HeaderScreenTitle title="Activités" addButton={isManager} />}
                        {index === activeActivities.length && <HeaderScreenTitle title="Activités terminées" grayedOut/>}
                        <View style={[globalStyles.mContainer, index >= activeActivities.length ? globalStyles.grayedOut : null]}>
                            <TouchableOpacity
                                onPress={() => {
                                    router.push({
                                        pathname: "/activities/[id]",
                                        params: item
                                    })
                                }}>
                                <ActivityCard title={item.label} color={item.color} description={item.description} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    )
}
