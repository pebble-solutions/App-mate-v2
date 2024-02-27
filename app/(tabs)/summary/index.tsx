import React, { useEffect, useState } from "react";
import { Alert, Dimensions, StyleSheet, Text, View, FlatList } from "react-native";

import { useSessionContext } from "../../../shared/contexts/SessionContext";
import { globalStyles } from "../../../shared/globalStyles";
import moment from 'moment';
import 'moment/locale/fr';
import { useActivityContext } from "../../../shared/contexts/ActivityContext";
import HeaderScreenTitle from "../../../components/HeaderScreenTitle";
import Carousel from "react-native-reanimated-carousel";
import ActivityLabel from "../../../components/Activity/ActivityLabel";
import { LinearGradient } from "expo-linear-gradient";
import { getRGBGradientColors } from "../../../shared/libs/color";

moment.locale('fr');

export default function RecapScreen() {
    const { activities } = useActivityContext();
    const {fetchSessionsFromAPI, sessions } = useSessionContext();
    const width = Dimensions.get('window').width;
    const [selectedActivityColor, setSelectedActivityColor] = useState("");


    useEffect(() => {
        fetchSessionsFromAPI();
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
            <View style={globalStyles.body}>
                <HeaderScreenTitle title="Tableau de bord" addButton={false} />
                <Carousel
                    mode="parallax"
                    modeConfig={{
                        parallaxScrollingScale: 0.9,
                        parallaxScrollingOffset: 50,
                    }}
                    pagingEnabled={true}
                    width={width}
                    height={72}
                    data={activities}
                    onSnapToItem={(index) => handleActivitySelect(activities[index].color)}
                    renderItem={({ item }) => (
                        <ActivityLabel
                            activity={item}
                            key={item._id}
                        />

                    )}
                />
                <View style={globalStyles.recapContentContainer}>
                    <Carousel
                        mode="parallax"
                        modeConfig={{
                            parallaxScrollingScale: 0.91,
                            parallaxScrollingOffset: 50,
                        }}
                        pagingEnabled={true}
                        width={width}
                        
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
                                {/* <Text style={[globalStyles.sessionText, globalStyles.textCenter, globalStyles.textLight]}>Comment: {item.comment}</Text> */}
                                {/* <Text style={[globalStyles.sessionText, globalStyles.textCenter, globalStyles.textLight]}>Status: {item.status}</Text> */}
                                <Text style={[globalStyles.sessionText, globalStyles.textCenter, globalStyles.textLight]}>Start: {moment(item.start).format("DD/MM/YYYY HH:mm")}</Text>
                                {item.end && <Text style={[globalStyles.sessionText, globalStyles.textCenter, globalStyles.textLight]}>End: {moment(item.end).format("DD/MM/YYYY HH:mm")}</Text>}
                                <Text style={[globalStyles.sessionSubTitle, globalStyles.textCenter, globalStyles.textLight]}>Informations extrapolées :</Text>
                                {/* <Text style={[globalStyles.sessionText, globalStyles.textCenter, globalStyles.textLight]}>Durée: {calculateDuration(item.start, item.end)}</Text> */}
                                {/* <Text style={[globalStyles.sessionText, globalStyles.textCenter, globalStyles.textLight]}>Nombre de données brutes: {item.raw_datas.length}</Text> */}
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
                </View>
                

                <View style={globalStyles.recapContentContainer}>
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
                </View>
            </View>
        );
        
    }

    return <>{content}</>

}
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "lightgrey",
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
