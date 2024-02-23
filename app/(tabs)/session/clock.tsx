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
import {SequenceItemType, SequenceType} from "../../../shared/types/SequenceType";
import {SequenceList} from "../../../components/Session/SequenceList";
import {SessionType} from "../../../shared/types/SessionType";
import {ActivityType} from "../../../shared/types/ActivityType";
import {useSessionContext} from "../../../shared/contexts/SessionContext";

export default function ClockScreen() {

    const { status, resetStatus, resetPayload } = useSessionStatusContext()
    const { removeSession } = useSessionContext()
    const [ exitStatus, setExistStatus ] = useState(false)

    // If session status change, we run the navigate function from session library
    useEffect(() => {
        navigate(status || null, router)
    }, [status])

    // At this point, we load the current session onto the local component
    let session, activity;

    try {
        session = getCurrentSession()
        activity = getCurrentActivity()
    }
    catch (e) {
        if (!exitStatus) {
            const message = e instanceof Error ? e.message : "Erreur inconnue dans l'affichage de la vue pointage."
            Alert.alert(message)
        }
    }

    const [ currentSession, setCurrentSession ] = useState<SessionType | null>(session || null)
    const [ currentActivity, setCurrentActivity ] = useState<ActivityType | null>(activity || null)

    const [started, setStarted] = useState(false)
    const [sequence, setSequence] = useState<SequenceType>([])
    const [currentItemIndex, setCurrentItemIndex] = useState<number | null>(null)

    // Initialize local sequence once current session is loaded
    useEffect(() => {
        if (currentSession) {
            setSequence(currentSession.raw_datas.getSequence())
        }
    }, [currentSession]);

    // Exit or error status
    if (!currentActivity || !currentSession) {
        return null
    }

    const exit = () => {
        setExistStatus(true)
        resetPayload()
        resetStatus()
    }

    const cancel = () => {
        setExistStatus(true)
        removeSession(currentSession._id)
        exit()
    }

    const start = () => {
        setStarted(true)
        setSequence((sequenceVal) => {
            const sequenceItem: SequenceItemType = [new Date(), null]
            const index = currentSession.raw_datas.addOne(sequenceItem)
            setCurrentItemIndex(index)
            sequenceVal.push(sequenceItem)
            return [...sequenceVal]
        })
    }

    const stop = () => {
        setStarted(false)
        setSequence((sequenceVal) => {
            let lastItem = sequenceVal.pop()
            if (lastItem) {
                lastItem = [lastItem[0], new Date()]
                if (currentItemIndex !== null) {
                    currentSession.raw_datas.updateOne(currentItemIndex, lastItem)
                    setCurrentItemIndex(null)
                }
                sequenceVal.push(lastItem)
            }
            return [...sequenceVal]
        })
    }

    return (
        <View style={globalStyles.mainContainer}>
            <GradientHeader activity={currentActivity}>
                <Button
                    title="Quitter"
                    style={[globalStyles.transparentBg]}
                    onPress={exit}
                    titleStyle={[globalStyles.textLight]}
                    icon={<AntDesign name="back" size={24} color="white" />}
                    options={{
                        displayTitle: false
                    }}
                />
                <Title title={currentActivity.label} style={[globalStyles.textLight, globalStyles.textCenter]} size="lg" />
            </GradientHeader>

            <View style={[globalStyles.body, globalStyles.darkBg]}>

                <View style={globalStyles.body}>
                    <View style={[globalStyles.centeredContainer, globalStyles.mv4Container]}>
                        <Text style={[globalStyles.textLightGrey, globalStyles.textCenter]}>Durée de la session</Text>
                        <StopWatch
                            style={[globalStyles.textLight, globalStyles.textCenter]}
                            started={started}
                            initialTime={currentSession.raw_datas.getTime()}
                        />
                    </View>

                    <SequenceList sequence={sequence} />

                </View>

                <SessionActionsBar
                    onCancel={cancel}
                    onExit={exit}
                    onValidate={() => {
                        console.log("validate")
                    }}
                    onEnd={stop}
                    onStart={start}
                    style={[globalStyles.mb3Container]}
                    sequence={sequence}
                />
            </View>
        </View>
    )
}