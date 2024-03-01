import {Alert, SafeAreaView, Text, View} from "react-native";
import getCurrentSession, {getCurrentActivity, navigate} from "../../../shared/libs/session";
import {useSessionStatusContext} from "../../../shared/contexts/SessionStatusContext";
import {useSessionContext} from "../../../shared/contexts/SessionContext";
import {router} from "expo-router";
import React, {ReactNode, useEffect, useState} from "react";
import {RawVariableType, SessionType} from "../../../shared/types/SessionType";
import { globalStyles } from "../../../shared/globalStyles";
import {ActivityType} from "../../../shared/types/ActivityType";
import OnboardingController from "../../../components/Onboarding/OnboardingController";
import FormInput from "../../../components/Form/FormInput";

export default function ValidateScreen() {
    

    const sessionContext = useSessionContext();
    const [rawVariables, setRawVariables] = React.useState<RawVariableType[]>([]);
    const { status, resetStatus, resetPayload, setStatus } = useSessionStatusContext()
    const [ exitStatus, setExitStatus ] = React.useState(false);
    let [i, setI] = React.useState<number>(0);
    const [isRaw_Variables, setIsRaw_Variables] = React.useState<boolean>(false);
    const [raw_variables, setRaw_variables] = React.useState<RawVariableType[]>([]);
    const [currentResponse, setCurrentResponse] = React.useState<RawVariableType>({} as RawVariableType);
    
    
    useEffect(() => {
        navigate(status || null, router)
    }, [status])

    useEffect(() => {
        if (i < rawVariables.length) {
            setCurrentResponse(rawVariables[i]);
        }
    }
    , [i]);

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

    // Exit or error status
    if (!currentActivity || !currentSession) {
        return null
    }

    const exit = () => {
        setExitStatus(true)
        resetPayload()
        resetStatus()
    }

    const variables = currentActivity.variables;

    if (rawVariables.length === 0) {
        const newRawVariables: RawVariableType[] = variables.map(variable => ({
            _id: variable._id,
            label: variable.question,
            type: variable.type,
            value: undefined
        }));
        setRawVariables(newRawVariables);
    }

    const postSession =  async (raw_variables: RawVariableType[]) => {
        sessionContext.updateSession(currentSession._id, {...currentSession, raw_variables: raw_variables});
        await sessionContext.postSession(currentSession._id, {...currentSession});
        exit()
    }

    let items: ReactNode[] = []

    rawVariables.forEach((variable) => {
        items.push((
            <FormInput
                type={variable.type}
                value={variable.value}
                onChange={(newVal) => console.log(newVal)}
                label={variable.label}
            />
        ))
    })

    return (
        <SafeAreaView style={[globalStyles.mainContainer, globalStyles.darkBg]}>
            <OnboardingController
                activeColor={currentActivity.color}
                items={items}
                validationIndex={items.length - 1}
            />
        </SafeAreaView>
    )

    
}