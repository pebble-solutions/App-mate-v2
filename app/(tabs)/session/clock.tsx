import {View, Text, Alert} from "react-native";
import {globalStyles} from "../../../shared/globalStyles";
import Button from "../../../components/Button";
import React, {useEffect, useState} from "react";
import getCurrentSession, {getCurrentActivity, navigate} from "../../../shared/libs/session";
import {useSessionStatusContext} from "../../../shared/contexts/SessionStatusContext";
import {router} from "expo-router";
import Title from "../../../components/Title";
import { AntDesign } from '@expo/vector-icons';
import GradientHeader from "../../../components/Activity/GradientHeader";
import {SessionActionsBar} from "../../../components/Session/SessionActionsBar";
import {StopWatch} from "../../../components/Session/StopWatch";
import {SequenceType} from "../../../components/types/SequenceType";
import {SequenceList} from "../../../components/Session/SequenceList";

export default function ClockScreen() {

    const { status, resetStatus, resetPayload } = useSessionStatusContext()
    const [ exitStatus, setExistStatus ] = useState(false)

    const [started, setStarted] = useState(false)
    const [sequence, setSequence] = useState<SequenceType>([])

    // If session status change, we run the navigate function from session library
    useEffect(() => {
        navigate(status || null, router)
    }, [status])

    const cancel = () => {
        setExistStatus(true)
        resetStatus()
        resetPayload()
    }

    const start = () => {
        setStarted(true)
        setSequence((sequenceVal) => {
            sequenceVal.push([new Date(), null])
            return [...sequenceVal]
        })
    }

    const stop = () => {
        setStarted(false)
        setSequence((sequenceVal) => {
            let lastItem = sequenceVal.pop()
            if (lastItem) {
                lastItem = [lastItem[0], new Date()]
                sequenceVal.push(lastItem)
            }
            return [...sequenceVal]
        })
    }

    try {
        const currentSession = getCurrentSession()
        const activity = getCurrentActivity()

        return (
            <View style={globalStyles.mainContainer}>
                <GradientHeader activity={activity}>
                    <Button
                        title="Quitter"
                        style={[globalStyles.transparentBg]}
                        onPress={() => {
                            setExistStatus(true)
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

                    <View style={globalStyles.body}>
                        <View style={[globalStyles.centeredContainer, globalStyles.mv4Container]}>
                            <Text style={[globalStyles.textLightGrey, globalStyles.textCenter]}>Durée de la session</Text>
                            <StopWatch style={[globalStyles.textLight, globalStyles.textCenter]} started={started} />
                        </View>

                        <SequenceList sequence={sequence} />

                    </View>

                    <SessionActionsBar
                        onCancel={cancel}
                        onValidate={() => {
                            console.log("validate")
                        }}
                        onEnd={stop}
                        onStart={start}
                        style={[globalStyles.mb3Container]}
                    />
                </View>
            </View>
        )
    }

    //<PointingSession currentSession={currentSession}/>
    // globalStyles.centeredContainer, globalStyles.pb3Container

    catch (e) {
        if (!exitStatus) {
            const message = e instanceof Error ? e.message : "Erreur inconnue dans l'affichage de la vue pointage."
            Alert.alert(message)
        }
        return null
    }
}