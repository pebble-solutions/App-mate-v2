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
import {router} from "expo-router";
import {useSessionStatusContext} from "../../shared/contexts/SessionStatusContext";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export default function SessionScreen() {
    const [pressTimes, setPressTimes] = React.useState([{time: new Date(), label: "", index: 0}] as {time: Date, label: string, index: number}[]);

    const { activities, getActivityById } = useActivityContext()
    const { getStatus, setStatus, resetStatus, setPayload, resetPayload, getPayload } = useSessionStatusContext()

    
    const width = Dimensions.get('window').width;
    const pointing = async () => {
        const currentTime = new Date();
        const index = pressTimes.length +1;
        const newPressTime = {
            time: currentTime,
            label: getStatus(),
            index: index
        };
        const updatedPressTimes = [...pressTimes, newPressTime];
        setPressTimes(updatedPressTimes);
        console.log(pressTimes);
        // await savePressTimes(updatedPressTimes); // Sauvegarde des nouvelles données
    };
    
    let content;
    
    if (getStatus()) {
        const status = getStatus()
        
        const activityId = getPayload()
        
        if (!activityId || typeof activityId !== "string") {
            Alert.alert("Erreur : il n'y a pas d'ID d'activité précisée")
            resetPayload()
            resetStatus()
            return null
        }
        
        const activity = getActivityById(activityId);
        
        console.log(activity?.variables)

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
            <View style={globalStyles.topContainer}>
                    
                <Text style={globalStyles.textLight}>{activity._id} </Text>
                <Text style= {globalStyles.textLight}>statut: {status}</Text>
                <Text style={[globalStyles.headTitle, globalStyles.textLight]}>{activity.label} / {activity.description}</Text>

                    {status == "started" && 
                    <View style={globalStyles.cardSession}>

                    <Text style={[globalStyles.textXl, globalStyles.textLight]}>La session a commencé</Text>
                    <>
                    
                    {pressTimes.length >=1 && pressTimes.map((pressTime, index) => {
                        return (
                            <View key={index} >
                                <Text style={globalStyles.textLight}> - {pressTime.time.toLocaleTimeString()}</Text>
                                <Text style={globalStyles.textLight}>type: {pressTime.label}</Text>
                                <Text style={globalStyles.textLight}>valeur: {pressTime ? pressTime.index : ""}</Text>  
                            </View>
                        )       
                    }
                    )}
                    </>
                    <PointingSession/>
                    </View>
                    }    
                <ScrollView style={globalStyles.cardSession}>
                    { activity.variables.length== 0 && <Text style={[globalStyles.textXl, globalStyles.textLight]}>Il n'y a pas de variable associée à cette activité</Text>}
                    { activity.variables.length==1 && <Text style={[globalStyles.textXl, globalStyles.textLight]}>{activity.variables.length} variable associée à cette activité</Text>}
                    { activity.variables.length>1 && <Text style={[globalStyles.textXl, globalStyles.textLight]}>{activity.variables.length} variables associées à cette activité</Text>}
                    {activity.variables.map((variable, index) => {
                        return (
                            <View key={index} >
                                <Text style={globalStyles.textLight}> - {variable.label}</Text>
                                {/* <Text style={globalStyles.textLight}>type: {variable.type}</Text>
                                <Text style={globalStyles.textLight}>valeur: {variable.value}</Text> */}
                            </View>
                        )       
                    })}
                </ScrollView>

                    <RenderItem/>
                <View style={globalStyles.buttonContainer}>
                    <Button
                        style={[globalStyles.button, globalStyles.buttonAlert]}
                        title="Annuler"
                        onPress={() => {resetStatus(), resetPayload()}}
                        titleStyle={[{color: activity.color}]}
                        
                    />
                    <Button
                    style={[globalStyles.button, styles.test]} 
                    title="Commencer !" 
                    onPress={() => {setStatus("started"), pointing("started")}}
                    titleStyle={[{color: 'red'}]}
                    />
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
                                    setStatus("start")
                                    setPayload(item._id)
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
        backgroundColor: "white"
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