import {Alert, Button, Dimensions, FlatList, StyleSheet, Text, View} from "react-native";
import {useActivityContext} from "../../shared/contexts/ActivityContext";
import {globalStyles} from "../../shared/globalStyles";
import {LinearGradient} from "expo-linear-gradient";
import {getRGBGradientColors} from "../../shared/libs/color";
import Carousel from 'react-native-reanimated-carousel';
import ActivityOverview from "../../components/ActivityOverview";
import {router} from "expo-router";
import {useSessionStatusContext} from "../../shared/contexts/SessionStatusContext";
import GetValueText from "../../components/GetValueText"

export default function SessionScreen() {

    const { activities, getActivityById } = useActivityContext()
    const { getStatus, setStatus, resetStatus, setPayload, resetPayload, getPayload } = useSessionStatusContext()

    const width = Dimensions.get('window').width;

    let content;
    console.log(getStatus())

    if (getStatus()) {
        const status = getStatus()

        const activityId = getPayload()

        if (!activityId || typeof activityId !== "string") {
            Alert.alert("Erreur : il n'y a pas d'ID d'activité précisée")
            resetPayload()
            resetStatus()
            return null
        }

        const activity = getActivityById(activityId)

        if (!activity) {
            Alert.alert("Erreur : activité non trouvée")
            resetPayload()
            resetStatus()
            return null
        }

        content = <View style={globalStyles.topContainer}>
            <Text>Une session est démarrée : {status}</Text>

            <Text>Vous avez démarré l'activité : {activity.label}</Text>

            <GetValueText varText='toto' />

            <Button title="Stopper tout !" onPress={() => {
                resetStatus()
                resetPayload()
            }} />
        </View>
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
                            setStatus("started")
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
        flex: 1
    }
})