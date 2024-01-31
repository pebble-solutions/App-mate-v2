import {Alert, Dimensions, FlatList, StyleSheet, Text, View} from "react-native";
import Button from "../../components/Button";
import {useActivityContext} from "../../shared/contexts/ActivityContext";
import {globalStyles} from "../../shared/globalStyles";
import {LinearGradient} from "expo-linear-gradient";
import {getRGBGradientColors} from "../../shared/libs/color";
import Carousel from 'react-native-reanimated-carousel';
import ActivityOverview from "../../components/ActivityOverview";
import SessionForm from "../../components/SessionForm";
import {router} from "expo-router";
import {useSessionStatusContext} from "../../shared/contexts/SessionStatusContext";

export default function SessionScreen() {

    const { activities, getActivityById } = useActivityContext()
    const { getStatus, setStatus, resetStatus, setPayload, resetPayload, getPayload } = useSessionStatusContext()

    
    const width = Dimensions.get('window').width;
    
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
                    
                <Text style= {globalStyles.textLight}>statut: {status}</Text>
                <Text style={globalStyles.textLight}>{activity._id} </Text>
                <Text style={globalStyles.textLight}>{activity.description}</Text>
                <Text style={[globalStyles.headTitle, globalStyles.textLight]}>Nouvelle session : {activity.label}</Text>
                <SessionForm activity={activity}  title = {activity.label} variables={activity?.variables}/>
                

                {activity.variables.map((variable) => {
                    return (
                        <View style={globalStyles.pContainer}>
                            <Text style={globalStyles.textLight}>variable: {variable.label}</Text>
                            <Text style={globalStyles.textLight}>type: {variable.type}</Text>
                            <Text style={globalStyles.textLight}>valeur: {variable.value}</Text>
                        </View>
                    )       
                })}
                
                <View style={globalStyles.buttonContainer}>
                    <Button
                        style={[globalStyles.button, globalStyles.buttonAlert]}
                        title="Annuler"
                        onPress={() => {resetStatus(), resetPayload()}}
                    />
                    <Button
                    style={[globalStyles.button, styles.test]} 
                    title="Commencer !" 
                    onPress={() => {setStatus("started")}}
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
        color: "white"
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