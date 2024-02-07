import {Alert, Dimensions, FlatList, StyleSheet, Text, View, ScrollView} from "react-native";
import React from "react";
import Button from "../../components/Button";
import {useActivityContext} from "../../shared/contexts/ActivityContext";
import {globalStyles} from "../../shared/globalStyles";
import {LinearGradient} from "expo-linear-gradient";
import {getRGBGradientColors} from "../../shared/libs/color";
import Carousel from 'react-native-reanimated-carousel';
import ActivityOverview from "../../components/ActivityOverview";
import PointingSession from "../../components/PointingSession";
import RenderItem from "../../components/RenderItem";
import {useSessionStatusContext} from "../../shared/contexts/SessionStatusContext";
import {useSessionContext} from "../../shared/contexts/SessionContext";
import { startSession } from "../../shared/libs/session";

export default function SessionScreen() {

    const [pressTimes, setPressTimes] = React.useState([{time: new Date(), label: "", index: 0}] as {time: Date, label: string, index: number}[]);

    const { activities, getActivityById } = useActivityContext()
    const statusContext = useSessionStatusContext()
    const { getStatus, setStatus, resetStatus, setPayload, resetPayload, getPayload} = statusContext
    const sessionContext = useSessionContext()
    const { getSessionById } = sessionContext
    
    const width = Dimensions.get('window').width;
    let content;
    
    if (getStatus()) {
        const status = getStatus()
        
        const sessionId = getPayload()
        if (!sessionId || typeof sessionId !== "string") {
            Alert.alert("Erreur : il n'y a pas d'ID de session précisée")
            resetPayload()
            resetStatus()
            return null
        }
        const currentSession = getSessionById(sessionId);
        console.log(currentSession, 'current session');
        if(!currentSession) {
            Alert.alert("Erreur : session non trouvée")
            resetPayload()
            resetStatus()
            return null
        }

        const activityId = currentSession.type_id
        
        if (!activityId) {
            Alert.alert("Erreur : il n'y a pas d'ID d'activité précisée")
            resetPayload()
            resetStatus()
            return null
        }
        
        const activity = getActivityById(activityId);
        

        if (!activity) {
            Alert.alert("Erreur : activité non trouvée")
            resetPayload()
            resetStatus()
            return null
        }

        content = 
        <LinearGradient
        style={[globalStyles.body, globalStyles.card, globalStyles.topContainer]}
        colors={getRGBGradientColors(activity.color)}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
    >
            <View>
                
                    <View style={globalStyles.topCardContent}>
                        <Text style= {globalStyles.textLight}>statut: {status}</Text>
                        <Text style={ globalStyles.textLight}>{activity.label}</Text>
                        <Button
                            style={[globalStyles.button]}
                            title="Annuler"
                            onPress={() => {resetStatus(), resetPayload(), setPressTimes([])}}
                            titleStyle={[{color: activity.color}]}
                        />
                    </View>
                

                <View style={globalStyles.scrollContainer}>
                    {status == "started" && 
                    <View >
                        <Text style={[globalStyles.headTitle, globalStyles.textLight]}>{currentSession.label}</Text>
                        <View>
                            <PointingSession currentSession={currentSession}/>  
                        </View>
                    </View>
                    }    
                    <View style={globalStyles.cardSession}>
                        { activity.variables.length== 0 && <Text style={[globalStyles.cardTitle, globalStyles.textLight]}>Il n'y a pas de variable associée à cette activité</Text>}
                        { activity.variables.length==1 && <Text style={[globalStyles.cardTitle, globalStyles.textLight]}>{activity.variables.length} variable associée à cette activité</Text>}
                        { activity.variables.length>1 && <Text style={[globalStyles.cardTitle, globalStyles.textLight]}>{activity.variables.length} variables associées à cette activité</Text>}
                    { activity.variables.map((variable, index) => {
                            return (
                                <View key={index} >
                                    <Text style={[globalStyles.textLight, globalStyles.cardTitle]}>. {variable.label}</Text>
                                </View>
                            )       
                        })}
                    </View>
                </View>
            </View>
        </LinearGradient>
    }
    else {
        content = <View style={globalStyles.body}>
                    <Carousel
                        mode="parallax"
                        modeConfig={{
                            parallaxScrollingScale: 0.9,
                            parallaxScrollingOffset: 50,
                        }}
                        pagingEnabled={true}
                        width={width}
                        data={activities}
                        renderItem={({item}) => (
                            <ActivityOverview
                                activity={item}
                                action={() => {
                                    startSession(item._id, sessionContext, statusContext)
                                }}
                                buttonTitle="Démarrer"
                            />
                        )} />
                    </View>
    }

    return (<>{ content }</>)
}

const styles = StyleSheet.create({
    test: {
        backgroundColor: "white",
        alignSelf: "center",
    },
    localCardContent: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    
    

    buttonLight: {
        backgroundColor: "white"
    }
})