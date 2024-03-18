import React from "react";
import {globalStyles, variables} from "../../shared/globalStyles";
import {StyleSheet, Text, Dimensions, TouchableOpacity, View} from "react-native";
import {ActivityType} from "../../shared/types/ActivityType";
import {router} from "expo-router";
import ActivityGradient from "../Activity/ActivityGradient";
import {SessionType} from "../../shared/types/SessionType";
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";
import SelectPeriod from "./selectPeriod";


type SummaryOverviewType = {
    activity: ActivityType,
    onNewPress?: () => void,
    sessions?: SessionType[],
    onSessionPress?: (session: SessionType) => void
}

export default function SummaryOverview({ activity, onNewPress, onSessionPress, sessions }: SummaryOverviewType) {
    const [isVisible, setIsVisible] = useState(false);

    const handleDay =()=> {
        const id = activity._id;
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
    
    const handleSelect =()=> {
        setIsVisible(true);
        const id = activity._id;
    }
    
    const onChangeDate = (start: Date, end: Date) => {
    }
    

    return (
        <ActivityGradient
            activity={activity}
            style={[globalStyles.body, globalStyles.card]}>
            <View style={[globalStyles.cardContent]}>
                <Text style={[globalStyles.headTitle, globalStyles.textLight,globalStyles.textCenter]}>{activity.label}</Text>
                <Text style={[globalStyles.textLight, globalStyles.text,globalStyles.textCenter]}>{activity._id}</Text>
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