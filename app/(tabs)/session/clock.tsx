import {View, Text, Alert, ViewStyle} from "react-native";
import {globalStyles} from "../../../shared/globalStyles";
import Button from "../../../components/Button";
import React, {useEffect, useRef, useState} from "react";
import getCurrentSession, {getCurrentActivity, navigate} from "../../../shared/libs/session";
import {useSessionStatusContext} from "../../../shared/contexts/SessionStatusContext";
import {router} from "expo-router";
import Title from "../../../components/Title";
import { AntDesign } from '@expo/vector-icons';
import GradientHeader from "../../../components/Activity/GradientHeader";
import {SessionActionsBar} from "../../../components/Session/SessionActionsBar";
import {StopWatch} from "../../../components/Session/StopWatch";
import {SequenceItemType, SequenceType} from "../../../shared/types/SequenceType";
import {SequenceList, SequenceListActions} from "../../../components/Session/SequenceList";
import {ActivityType} from "../../../shared/types/ActivityType";
import {useSessionContext} from "../../../shared/contexts/SessionContext";
import {Session} from "../../../shared/classes/Session";
import {useRequestsContext} from "../../../shared/contexts/RequestsContext";
import {patchRequest} from "@pebble-solutions/api-request";
import { dateToLiteral, secondsToTimeString } from "../../../shared/libs/date";

export default function ClockScreen() {

    const {
        status,
        resetStatus,
        resetPayload,
        setStatus,
        exitStatus,
        setExitStatus
    } = useSessionStatusContext()
    const { removeSession } = useSessionContext()
    const { pushRequest } = useRequestsContext()

    const sequenceListRef = useRef<SequenceListActions>(null)

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

    const [ currentSession, setCurrentSession ] = useState<Session | null>(session || null)
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

    useEffect(() => {
        if (currentSession.provided_by === "manual") {
            sequenceListRef.current?.switchEditMode(sequence.length-1, true)
        }
    }, [sequence]);
    
    const [time, setTime] = useState(currentSession.raw_datas.getTime())

    const exit = () => {
        setExitStatus(() => true)
        resetPayload()
        resetStatus()
    }

    const cancel = () => {
        setExitStatus(true)
        removeSession(currentSession._id)
        exit()
    }

    const validate = () => {
        setStatus("validate")
    }

    const start = () => {
        setStarted(true)
        setSequence((sequenceVal) => {
            const sequenceItem: SequenceItemType = [new Date(), null]
            const index = currentSession.raw_datas.addOne(sequenceItem)
            pushRequest(patchRequest("https://api.pebble.solutions/v5/metric/"+currentSession._id, currentSession.json()))
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
                    pushRequest(patchRequest("https://api.pebble.solutions/v5/metric/"+currentSession._id, currentSession.json()))
                    setCurrentItemIndex(null)
                }
                sequenceVal.push(lastItem)
            }
            return [...sequenceVal]
        })
    }
    const createSequence = () => {
        setSequence((sequenceVal) => {
            const sequenceItem: SequenceItemType = [new Date(), new Date()]
            const index = currentSession.raw_datas.addOne(sequenceItem)
            pushRequest(patchRequest("https://api.pebble.solutions/v5/metric/"+currentSession._id, currentSession.json()))
            setCurrentItemIndex(index)
            sequenceVal.push(sequenceItem)
            return [...sequenceVal]
        })
    }
    const handleSequenceChange = (index: number, newVal: SequenceItemType) => {
        currentSession.raw_datas.updateOne(index, newVal)

        setTime(() => currentSession.raw_datas.getTime())
    }

    const actionsBarStyles: ViewStyle[] = [globalStyles.mb3Container]

    if (currentSession.provided_by === "manual") actionsBarStyles.push(globalStyles.mt3Container)
    

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
                        displayTitle: false,
                        disabled: started
                    }}
                />
                <Title title={currentActivity.label} style={[globalStyles.textLight, globalStyles.textCenter]} size="lg" />
            </GradientHeader>
            
            <View style={[globalStyles.body, globalStyles.darkBg]}>

                <View style={globalStyles.body}>
                    <View style={[globalStyles.centeredContainer, globalStyles.mv4Container]}>
                        <Text style={[globalStyles.textLightGrey, globalStyles.textCenter]}>{dateToLiteral(currentSession.start)}</Text>
                        <Text style={[globalStyles.textLightGrey, globalStyles.textCenter]}>Durée de la session</Text>
                        {currentSession.provided_by === "manual" ? <Text style={[globalStyles.textLight, globalStyles.textCenter, globalStyles.textLg]}>
                            {secondsToTimeString(time, {hours: true, minutes: true, seconds: true})}
                        </Text> : <StopWatch
                            style={[globalStyles.textLight, globalStyles.textCenter]}
                            started={started}
                            initialTime={currentSession.raw_datas.getTime()}
                            size={"xl"}
                        />}
                    </View>

                    <SequenceList
                        sequence={sequence}
                        editable={currentSession.provided_by === "manual"}
                        onValueChange={handleSequenceChange}
                        ref={sequenceListRef}
                    />
                </View>
                
                <SessionActionsBar 
                    displayMode={currentSession.provided_by}
                    onCancel={cancel}
                    onExit={exit}
                    onValidate={validate}
                    onEnd={stop}
                    onStart={start}
                    onCreate={createSequence}
                    style={actionsBarStyles}
                    sequence={sequence}
                />

            </View>
        </View>
    )
}