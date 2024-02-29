import React, { useEffect, useState } from "react";
import { Alert, Dimensions, StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";
import { useSessionContext } from "../../../shared/contexts/SessionContext";
import { globalStyles } from "../../../shared/globalStyles";
import moment from 'moment';
import 'moment/locale/fr';
import { useActivityContext } from "../../../shared/contexts/ActivityContext";
import ActivityOverview from "../../../components/Activity/ActivityOverview";
import {navigate, newSession, openSession} from "../../../shared/libs/session";
import HeaderScreenTitle from "../../../components/HeaderScreenTitle";
import Carousel from "react-native-reanimated-carousel";
import ActivityLabel from "../../../components/Activity/ActivityLabel";
import { LinearGradient } from "expo-linear-gradient";
import { getRGBGradientColors } from "../../../shared/libs/color";
import {useSessionStatusContext} from "../../../shared/contexts/SessionStatusContext";
import {router} from "expo-router";
import SummaryOverview from "../../../components/Summary/SummaryOverView";



moment.locale('fr');

export default function RecapScreen() {
    const { activities, loading } = useActivityContext();
    const {fetchSessionsFromAPI, sessions } = useSessionContext();
    const {getSessionsFromActivity} = useSessionContext();
    const width = Dimensions.get('window').width;
    const [selectedActivityColor, setSelectedActivityColor] = useState("");
    const [sessionsLoaded, setSessionsLoaded] = useState(false);

    useEffect( () => {
        fetchSessionsFromAPI().then(() => {
            setSessionsLoaded(true);
        });
    }, []);
    const handleActivitySelect = (color: string | null ) => {
        if (color) {
            setSelectedActivityColor(color);
        }
        setSelectedActivityColor("#4287f5");

    };

    let content;

    if (sessions.length === 0) {
        content = (
            <View style={globalStyles.contentContainer}>
                <Text>Aucune  session</Text>
            </View>
        );
    } else {
        content = (
            <SafeAreaView style={globalStyles.body}>
                <HeaderScreenTitle title="Tableau de bord" addButton={false} />
                {sessionsLoaded ?
                    <Carousel
                        mode="parallax"
                        modeConfig={{
                            parallaxScrollingScale: 0.9,
                            parallaxScrollingOffset: 50,
                        }}
                        pagingEnabled={true}
                        width={width}
                        data={activities}
                        onSnapToItem={(index) => handleActivitySelect(activities[index].color)}
                    
                        renderItem={({item}) => (
                            <SummaryOverview
                                activity={item}
                                sessions={getSessionsFromActivity(item._id)}
                                onNewPress={() => {
                                    newSession(item._id, useSessionContext(), useSessionStatusContext())
                                }}
                                onSessionPress={(session) => {
                                    openSession(session._id, useSessionContext(), useSessionStatusContext())
                                }}
                            />
                        )}
                    /> : <View><Text>Chargement des sessions ...</Text></View>
                }
                
                {/* <View style={globalStyles.recapContentContainer}>
                    <Carousel
                        mode="parallax"
                        modeConfig={{
                            parallaxScrollingScale: 0.91,
                            parallaxScrollingOffset: 40,
                        }}
                        pagingEnabled={true}
                        width={width}
                        height={450}

                        
                        data={sessions}
                        renderItem={({ item }) => (

                            <View key={item._id} style={[globalStyles.RecapContentContainer, styles.container]}>
                        
                                <Text style={[globalStyles.sessionTitle, globalStyles.textCenter, globalStyles.textLight]}>
                                    {moment(item.start).format("dddd DD MMMM YYYY")
                                        .replace(/^\w/, (c) => c.toUpperCase())
                                        .replace(/(?<=\s)\w/g, (c) => c.toUpperCase())
                                    }
                                </Text>
                                <Text style={[globalStyles.sessionText, globalStyles.textCenter, globalStyles.textLight]}>Label: {item.label}</Text>
                                <Text style={[globalStyles.sessionText, globalStyles.textCenter, globalStyles.textLight]}>Comment: {item.comment}</Text>
                                <Text style={[globalStyles.sessionText, globalStyles.textCenter, globalStyles.textLight]}>Status: {item.status}</Text>
                                <Text style={[globalStyles.sessionText, globalStyles.textCenter, globalStyles.textLight]}>Start: {moment(item.start).format("DD/MM/YYYY HH:mm")}</Text>
                                {item.end && <Text style={[globalStyles.sessionText, globalStyles.textCenter, globalStyles.textLight]}>End: {moment(item.end).format("DD/MM/YYYY HH:mm")}</Text>}
                                <Text style={[globalStyles.sessionSubTitle, globalStyles.textCenter, globalStyles.textLight]}>Informations extrapolées :</Text>
                                <Text style={[globalStyles.sessionText, globalStyles.textCenter, globalStyles.textLight]}>Durée: {calculateDuration(item.start, item.end)}</Text>
                                <Text style={[globalStyles.sessionText, globalStyles.textCenter, globalStyles.textLight]}>Nombre de données brutes: {item.raw_datas.length}</Text>
                                <Text style={[globalStyles.sessionText, globalStyles.textCenter, globalStyles.textLight]}>Nombre de variables brutes: {item.raw_variables.length}</Text>
                                
                                <Text style={[globalStyles.sessionSubTitle, globalStyles.textCenter, globalStyles.textLight]}>Statistiques :</Text>
                                <Text style={[globalStyles.sessionText, globalStyles.textCenter, globalStyles.textLight]}>Ici de jolies statistiques</Text>
                                <Text style={[globalStyles.sessionText, globalStyles.textCenter, globalStyles.textLight]}>Ici de jolies statistiques</Text>
                                <Text style={[globalStyles.sessionSubTitle, globalStyles.textCenter, globalStyles.textLight]}>Vaviables déclarées :</Text>
                                <Text style={[globalStyles.sessionText, globalStyles.textCenter, globalStyles.textLight]}>Frais kilométriques : 67€</Text>
                                <Text style={[globalStyles.sessionText, globalStyles.textCenter, globalStyles.textLight]}>Forfait hotel : 1</Text>
                                <Text style={[globalStyles.sessionText, globalStyles.textCenter, globalStyles.textLight]}>Repas : 2</Text>
                            </View>



                        )}
                    />
                </View> */}
                

                {/* <View style={globalStyles.recapContentContainer}>
                    <FlatList
                        data={sessions}
                        keyExtractor={item => item._id}
                        renderItem={({ item }) => (
                            <View >
                                <Text >{moment(item.start).format('LLLL')}</Text>
                                <Text>{item._id}</Text>
                                <Text>{item.label}</Text>
                                <Text>{item.type_id}</Text>
                                <Text> ____________</Text>
                            </View>
                        )}
                    />
                </View> */}
            </SafeAreaView>
        );
        
    }

    return <>{content}</>

}
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "grey",
        alignItems: "center",
        justifyContent: "center",
        color: "black",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
});
