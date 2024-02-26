import {View, Text, Alert} from "react-native";
import {globalStyles} from "../../../shared/globalStyles";
import Button from "../../../components/Button";
import PointingSession from "../../../components/PointingSession";
import React, {useEffect, useState} from "react";
import getCurrentSession, {getCurrentActivity, navigate} from "../../../shared/libs/session";
import {useSessionStatusContext} from "../../../shared/contexts/SessionStatusContext";
import {router} from "expo-router";
import Title from "../../../components/Title";
import { AntDesign } from '@expo/vector-icons';
import GradientHeader from "../../../components/Activity/GradientHeader";

export default function ClockScreen() {

    const { status, resetStatus, resetPayload } = useSessionStatusContext()
    const [ exitStatus, setExitStatus ] = useState(false)

    // If session status change, we run the navigate function from session library
    useEffect(() => {
        navigate(status || null, router)
    }, [status])

    try {
        const currentSession = getCurrentSession()
        const activity = getCurrentActivity()

        const variables = activity.variables;

        return (
            <View style={globalStyles.mainContainer}>
                <GradientHeader activity={activity}>
                    <Button
                        title="Quitter"
                        style={[globalStyles.transparentBg]}
                        onPress={() => {
                            setExitStatus(true)
                            resetStatus()
                            resetPayload()
                        }}
                        titleStyle={[globalStyles.textLight]}
                        icon={<AntDesign name="back" size={24} color="white" />}
                        options={{
                            displayTitle: false
                        }}
                    />
                    <Title title={activity.label} style={[globalStyles.textLight, globalStyles.textCenter]} size="lg" />
                </GradientHeader>

                <View style={[globalStyles.body, globalStyles.darkBg]}>
                    <Text style= {globalStyles.textLight}>statut: {status}</Text>
                    <PointingSession currentSession={currentSession}/>
                </View>
            </View>
        )
    }
    catch (e) {
        if (!exitStatus) {
            const message = e instanceof Error ? e.message : "Erreur inconnue dans l'affichage de la vue pointage."
            Alert.alert(message)
        }
        return null
    }
}