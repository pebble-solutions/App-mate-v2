import {Alert, SafeAreaView, View, Text, StyleSheet, Platform, TouchableOpacity} from "react-native";
import getCurrentSession, {getCurrentActivity, navigate} from "../../../shared/libs/session";
import {useSessionStatusContext} from "../../../shared/contexts/SessionStatusContext";
import {Redirect, router} from "expo-router";
import React, {ReactNode, useEffect, useState, useContext} from "react";
import {RawVariableType, SessionType} from "../../../shared/types/SessionType";
import { globalStyles } from "../../../shared/globalStyles";
import {ActivityType} from "../../../shared/types/ActivityType";
import OnboardingController from "../../../components/Onboarding/OnboardingController";
import FormInput from "../../../components/Form/FormInput";
import { SessionHeader } from "../../../components/Session/SessionHeader";
import { dateToLiteral } from "../../../shared/libs/date";
import { Ionicons } from '@expo/vector-icons';
import SessionSummary from "../../../components/Session/SessionSummary";
import {VariableValueType} from "../../../shared/types/VariableType";
import {SequenceItemType} from "../../../shared/types/SequenceType";
import { Session } from "../../../shared/classes/Session";
import { useSessionContext } from "../../../shared/contexts/SessionContext";
import {patchRequest, postRequest} from "@pebble-solutions/api-request";
import {useRequestsContext} from "../../../shared/contexts/RequestsContext";




export default function ValidateScreen() {
    const [rawVariables, setRawVariables] = React.useState<RawVariableType[]>([]);
    const { status, resetStatus, resetPayload, exitStatus, setExitStatus } = useSessionStatusContext()
    const { updateSession, closeSession, updateSessionsState } = useSessionContext()
    const { requestsController} = useRequestsContext()
    
    useEffect(() => {
        navigate(status || null, router)
    }, [status])
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
    
    const [ currentSession ] = useState<SessionType | null>(session || null)
    const [ currentActivity ] = useState<ActivityType | null>(activity || null)
    
    // Exit or error status
    if (!currentActivity || !currentSession) {
        return null
    }
    const setResponse = (Id: string, response: VariableValueType) => {
        setRawVariables((prev) => {
            const newVars: RawVariableType[] = []
            
            prev.forEach((variable) => {
                if(variable._id) {
                    if (variable._id === Id) {
                        variable.value = response
                        newVars.push(variable)
                    }
                    else {
                        newVars.push(variable)
                    }
                }
            })
            currentSession.raw_variables = newVars
            return newVars
        })
    }
    
    const handleSequenceChange = (index: number, newVal: SequenceItemType) => {
        currentSession.raw_datas.updateOne(index, newVal)
    }
    
    const exit = () => {
        setExitStatus(() => true)
        resetPayload()
        resetStatus()
    }
    const validateSession = async () => {
        const sess = new Session(currentSession)

        try {
            await requestsController.addRequest(patchRequest("https://api.pebble.solutions/v5/metric/"+sess._id, sess.json())).send()
            await requestsController.addRequest(postRequest("https://api.pebble.solutions/v5/metric/"+sess._id+"/close")).send()

            sess.is_active = false
            sess.end = new Date()
            updateSessionsState([sess])

            exit()
        }
        catch (e) {
            Alert.alert("Erreur", "Erreur dans l'envoie de la requête de cloture")
            console.error(e)
        }
    }

    let items: ReactNode[] = []

    const variables = currentActivity.variables;
        if (variables.length !== 0) {
    
            if (rawVariables.length === 0) {
                const newRawVariables: RawVariableType[] = variables.map(variable => ({
                    _id: variable._id,
                    label: variable.question,
                    type: variable.type,
                    value: undefined,
                }));
                setRawVariables(newRawVariables);
            }
            
            rawVariables.forEach((variable) => {
                if (variable._id) {
                    const id = variable._id
                    const value = variable.value
                    const type = variable.type
                    const label = variable.label
                    
                    items.push((
                        <View style={globalStyles.section}>
                            <FormInput
                                type={type}
                                value={value}
                                onChange={(newVal) => setResponse(id, newVal)}
                                label={label}
                                labelStyle={[globalStyles.textLight, globalStyles.textLg]}
                                key={id}
                                />
                        </View>
                    ))
                }
                else {
                    items.push((
                        <Text style={[globalStyles.textLight, globalStyles.textCenter, globalStyles.textLg]}>
                            Cette variable n'est pas gérée par l'application
                        </Text>
                    ))  
                }
            })
        }
        items.push((
            <SessionSummary
                session={currentSession}
                theme={"dark"}
                onVariableChange={setResponse}
                onSequenceChange={handleSequenceChange}
                editable={true}
            />
        ))

    return (
        <SafeAreaView style={[globalStyles.mainContainer, globalStyles.darkBg]}>
            {Platform.OS === 'android' && 
                <TouchableOpacity onPress={() => {
                    router.back();
                }}>
                    <Ionicons name="close-outline" size={32} color="white" style={{ position: 'relative', right: 0, top: 18 }} />
                </TouchableOpacity>
            }
            <SessionHeader label={currentActivity.label} description={currentActivity.description} date={dateToLiteral(currentSession.start)} />    
            
            <OnboardingController
                activeColor={currentActivity.color}
                items={items}
                validationIndex={items.length - 1}
                validate={validateSession}
            />
        </SafeAreaView>
    )
}
