import React, { useState, useRef } from "react";
import { Text, View, TouchableOpacity, Dimensions, StyleSheet, ScrollView} from "react-native"; // Importez Alert
import { useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { getRGBGradientColors } from "../../../shared/libs/color";
import { globalStyles, variables } from "../../../shared/globalStyles";
import { useActivityContext } from "../../../shared/contexts/ActivityContext";
import { useVariableContext } from "../../../shared/contexts/VariableContext";
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import { SessionType } from "../../../shared/types/SessionType";
import { ActivityType } from "../../../shared/types/ActivityType";
import { useSessionContext } from "../../../shared/contexts/SessionContext";
import { SummaryCard } from "../../../components/Summary/SummaryCard";
import Carousel from "react-native-reanimated-carousel";
import { set } from "date-fns";
import RenderItem from "../../../components/RenderItem";
import { AntDesign } from '@expo/vector-icons';
import { MetricSequence } from "../../../shared/classes/MetricSequence";



type SummaryScreenType = {
    sessions: SessionType[],
    activity: ActivityType,
    onPress: () => void,
    previous: (index: number) => void,  
    following: (index: number) => void,
}


export default function SummaryScreen() {
    const { getActivityById} = useActivityContext();
    const {getSessionsFromActivity} = useSessionContext();
    const { _id } = useLocalSearchParams<{ _id: string }>();
    const activity = _id ? getActivityById(_id) : null;
    const { variables } = useVariableContext();
    const {width} = Dimensions.get('window');
    const  [sessionsRender, setSessionsRender] = useState<SessionType[]>([]);
    const previous = (index :number) => {
        console.log(index, 'index')
    }
    const following = (index :number) => {
        console.log(index, 'index')
    }
    


    console.log(_id, 'id')
    if (!activity || !_id) {
        return (
            <View style={globalStyles.body}>
                <View style={globalStyles.contentContainer}>
                    <Text>Activité non trouvée</Text>
                </View>
            </View>
        );
    }
    const sessions = getSessionsFromActivity(_id);
    
    const [isSettingsVisible, setSettingsVisible] = useState(false);
    const colors = activity?.color ? getRGBGradientColors(activity.color) : ["#262729"];
    console.log(sessions, 'sessionsinDAY')
    function getSequences(sessions: SessionType[]) {
        for (let i = 0; i < sessions.length; i++) {
            const session = sessions[i];
            const sequences = session.raw_datas.records
            const sequencestype = typeof sequences
            for (let i = 0; i < sequences.length; i++) {
                const sequence = sequences[i]
                const sequencetype = typeof sequence
                const start = sequence.start
                const end = sequence.end
                const typestart = typeof start
                const typeend = typeof end
            }
            const variables = session.raw_variables
        }
    }
    getSequences(sessions);

    
    


    return (
        <LinearGradient
            colors={colors}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={globalStyles.body}>

            <View style={globalStyles.body}>
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
                <View>
                
                    <Text style={[globalStyles.sessionSubTitle, globalStyles.textLight, globalStyles.textCenter]}>{activity.label}</Text>
                    <Text style={[globalStyles.textLight, globalStyles.textCenter]}>{activity.description}</Text>
                    {sessions.length > 0 && (
                        <Text style={[globalStyles.textLight, globalStyles.textCenter]}>
                            {sessions.length} session{sessions.length > 1 && "s"} enregistrée{sessions.length > 1 && "s"}
                        </Text>
                        )}
                    
                            <Carousel
                            mode="parallax"
                            modeConfig={{
                                parallaxScrollingScale: 0.9,
                                parallaxScrollingOffset: 50,
                            }}
                            
                            pagingEnabled={true}
                            onSnapToItem={(index) => {console.log(index)}}
                            width={width}
                            data={sessions}
                            renderItem={({ item , index}) => 
                                <View>
                                    <View style={[ localStyle.container]}>
                                        <TouchableOpacity key={index-1} onPress={previous(index)}>
                                            <AntDesign name="left" size={24} color={'white'} />
                                        </TouchableOpacity>
                                                <Text style={[globalStyles.sessionSubTitle, globalStyles.textCenter, globalStyles.textLight]}>{index + 1} / {sessions.length}</Text>
                                        <TouchableOpacity key={index+1} onPress={following(index)}>
                                            <AntDesign name="right" size={24} color={'white'} />    
                                        </TouchableOpacity>
                                    </View>
                                    <SummaryCard key={index} session={item} sessionIndex={index}/>
                                </View>
                            }
                            />
                    {sessions.length === 0 && (
                        <Text style={[globalStyles.textLight, globalStyles.textCenter]}>Aucune session enregistrée</Text>
                    )}
                        
                </View>
            </View>
                
        </LinearGradient>
    )
}
const localStyle = StyleSheet.create({

    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        padding: variables.contentPadding[1],   
    },
    content: {
        borderRadius: variables.borderRadius[1],
        padding: variables.contentPadding[2],
        marginVertical: variables.contentMargin[1],
        justifyContent: 'center',
    },
    
    cardContent: {
        backgroundColor: '#00000010',
        borderRadius: variables.borderRadius[1],
        justifyContent: 'center',
        margin: variables.contentMargin[1],
        padding: variables.contentPadding[1],
    },
    card: {
        backgroundColor: "#00000010",
        borderRadius: variables.borderRadius[1],
        // justifyContent: 'center',
        margin: variables.contentMargin[1],
        padding: variables.contentPadding[1],

    },
    cardTitle: {
        fontSize: variables.fontSize[4],
        fontFamily: 'Inter_700Bold',
    },
    
    cardHeader: {
        maxWidth: '80%',
    },
    
    cardIconsContainer: {
        flexDirection: 'row',
        position: 'absolute',
        right: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    renderItem: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})
