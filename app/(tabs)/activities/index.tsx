import {FlatList, Text, TouchableOpacity, View} from "react-native";
import React, {useContext, useState} from "react";
import {globalStyles} from "../../../shared/globalStyles";
import ActivityCard from "../../../components/ActivityCard";
import { AntDesign } from '@expo/vector-icons';
import {router} from "expo-router";
import {useActivityContext} from "../../../shared/contexts/ActivityContext";
import HeaderScreenTitle from "../../../components/HeaderScreenTitle";


export default function ActivitiesScreen() {

    const {activities} = useActivityContext()

    return (
        <View style={globalStyles.body}>
            <HeaderScreenTitle title="Manage activities" addButton />

            <FlatList
                style={[globalStyles.body, globalStyles.mhContainer]}
                numColumns={1}
                data={activities}
                renderItem={({item}) => (
                    <View style={globalStyles.mContainer}>
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
                )} 
            />
        </View>
    )
}