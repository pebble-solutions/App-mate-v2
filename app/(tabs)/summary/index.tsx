import React, { useEffect, useState } from "react";
import { Alert, Dimensions, StyleSheet, Text, View } from "react-native";
import { useActivityContext } from "../../../shared/contexts/ActivityContext";
import Carousel from 'react-native-reanimated-carousel';
import ActivityLabel from "../../../components/ActivityLabel";
import { useSessionContext } from "../../../shared/contexts/SessionContext";
import { globalStyles } from "../../../shared/globalStyles";
import HeaderScreenTitle from "../../../components/HeaderScreenTitle";
import moment from 'moment';
import 'moment/locale/fr';
import { LinearGradient } from "expo-linear-gradient";
import {getRGBGradientColors} from "../../../shared/libs/color";
moment.locale('fr');

export default function RecapScreen() {
    const { activities } = useActivityContext();
    const { sessions, fetchSessionsFromAPI } = useSessionContext();
    const width = Dimensions.get('window').width;
    const [selectedActivityColor, setSelectedActivityColor] = useState("");

    useEffect(() => {
        fetchSessionsFromAPI();
    }, []);

    const handleActivitySelect = (color: string) => {
        setSelectedActivityColor(color);

    };
    const calculateDuration = (start: Date, end?: Date) => {
        if (!start || !end) {
            return 'Durée inconnue';
        }

        const durationInMillis = end.getTime() - start.getTime();

        // Convertir la durée en heures, minutes et secondes
        const hours = Math.floor(durationInMillis / (1000 * 60 * 60));
        const minutes = Math.floor((durationInMillis % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((durationInMillis % (1000 * 60)) / 1000);

        // Formater la durée
        let durationString = '';
        if (hours > 0) {
            durationString += `${hours} heures `;
        }
        if (minutes > 0) {
            durationString += `${minutes} minutes `;
        }
        if (seconds > 0) {
            durationString += `${seconds} secondes`;
        }

        return durationString.trim();
    };

    let content;

    if (activities.length === 0 && sessions.length === 0) {
        content = (
            <View style={globalStyles.contentContainer}>
                <Text>Aucune activité ou session</Text>
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

                            <LinearGradient
                                style={[globalStyles.RecapContentContainer]}
                                colors={getRGBGradientColors(selectedActivityColor)}
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 0 }}
                            >
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
                            </LinearGradient>



                        )}
                    />
                </View>
            </View>
        );
    }

    return <>{content}</>;
}
