import React from "react";
import {globalStyles, variables} from "../../shared/globalStyles";
import {getRGBGradientColors} from "../../shared/libs/color";
import {FlatList, StyleSheet, Text, Dimensions, TouchableOpacity, View, ScrollView} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {ActivityType} from "../../shared/types/ActivityType";
import {router} from "expo-router";
import {Href} from "expo-router/build/link/href";
import Button from "../Button";
import { Activity } from "../../shared/classes/Activity";
import ActivityGradient from "../Activity/ActivityGradient";
import {SessionType} from "../../shared/types/SessionType";
import {SessionCard} from "../Session/SessionCard";
import { Ionicons } from '@expo/vector-icons';
import { SummaryCard } from"./SummaryCard";
import Carousel from "react-native-reanimated-carousel";
import { useState } from "react";
import { set } from "date-fns";
import { useNavigation } from "@react-navigation/native";   
import GetValueDate from "../GetValueDate";
import SelectPeriod from "./selectPeriod";
import { is } from "date-fns/locale";


type SummaryOverviewType = {
    activity: ActivityType,
    onNewPress?: () => void,
    sessions?: SessionType[],
    onSessionPress?: (session: SessionType) => void
}

export default function SummaryOverview({ activity, onNewPress, onSessionPress, sessions }: SummaryOverviewType) {
    const [isVisible, setIsVisible] = useState(false);
    const {height, width} = Dimensions.get('window');

    const handleDay =()=> {
        const id = activity._id;
        console.log(id, 'id')
        router.push({
            pathname: "/summary/day/",
            params:activity
            
        })
    }
    const goSelectPeriod =()=> {
        setIsVisible(false);
        router.push({
            pathname: "/summary/period/",
            params:activity
            
        })
    }

    const onChange = (start: Date, end: Date) => {
        console.log(start, end, 'start end')
    }
    const handleWeek =()=> {
        setIsVisible(true);
    }
    const handleSelect =()=> {
        setIsVisible(true);
        const id = activity._id;
        console.log(id, 'id')
    }

    const renderItem = ({ item, index }: { item: any, index: number }) => {
        return (
            <View key={index}>
                console.log(activity._id, 'item')
            </View>
        );
    };
    const onChangeDate = (start: Date, end: Date) => {
        console.log(start, end, 'start end')
    }
    


    return (
        <ActivityGradient
            activity={activity}
            style={[globalStyles.body, globalStyles.card]}>
            <View style={[globalStyles.cardContent]}>
                <Text style={[globalStyles.headTitle, globalStyles.textLight,globalStyles.textCenter]}>{activity.label}</Text>
                {/* <Text style={[globalStyles.textLight, globalStyles.text,globalStyles.textCenter]}>{activity._id}</Text> */}
                        <View style={[globalStyles.pContainer, {opacity: .5}]}>
                <Text style={[globalStyles.textLight, globalStyles.text,globalStyles.textCenter]}>{activity.description}</Text>
                        </View>

                {sessions?.length ? (
                    <>
                    {/* //COMPOSANT sélection jour semaine ... */}
                    <Text style={[globalStyles.headTitle, globalStyles.textLight, globalStyles.textCenter]}>{sessions.length} session{sessions.length > 1 && "s"} enregistrées</Text>
                        {!isVisible &&
                        
                        <View style={[ styles.buttonContainerTunnel]}>
                                    <TouchableOpacity onPress={() => handleDay()}   
                                        style={[{backgroundColor: "white",  paddingVertical: 5, paddingHorizontal:15, borderRadius: 25}]}
                                    >
                                        <Ionicons name="eye" size={24} color={activity.color} />

                                    </TouchableOpacity>
                                    {/* <TouchableOpacity onPress={() => handleWeek()}
                                        style={[{backgroundColor: "white",  paddingVertical: 5, paddingHorizontal:15, borderRadius: 25}]}
                                    >
                                        <Text style={[globalStyles.textLight, {color: activity.color}]}>semaine</Text>
                                    </TouchableOpacity> */}
                                    <TouchableOpacity onPress={() => handleSelect()}
                                        style={[{backgroundColor: "white",  paddingVertical: 5, paddingHorizontal:15, borderRadius: 25}]}
                                    >
                                        <Ionicons name="calendar" size={24} color={activity.color} />
                                    </TouchableOpacity>
                                    
                        </View>
                        }
                        {isVisible && 
                        <View>

                            <SelectPeriod start={new Date()} end={new Date()} onChange={onChangeDate} />
                            <TouchableOpacity 
                                onPress={()=> goSelectPeriod()}
                                style={[{backgroundColor: "white", paddingVertical: 5, paddingHorizontal:15, borderRadius: 25, justifyContent: 'center', alignItems: 'center'}]}
                            >
                                <Ionicons name="eye" size={24} color={activity.color} />
                            </TouchableOpacity>
                        </View>            
            

                            }
                                
                                
                        
                    </>
                )
                : null}
                {sessions?.length === 0 && (
                    <Text style={[globalStyles.headTitle, globalStyles.textLight, globalStyles.textCenter]}>Aucune session enregistrée</Text>
                )}

                
            </View>
        </ActivityGradient>
    )
}

const styles = StyleSheet.create({
    localCardContent: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: variables.contentPadding[2]
    },

    buttonLight: {
        backgroundColor: "white",
    },
    buttonContainerTunnel: {
        flexDirection: 'row',
        backgroundColor: '#00000000',
        padding: variables.contentPadding[1],
        margin: variables.contentMargin[1],
        justifyContent: 'space-around',

    }
})