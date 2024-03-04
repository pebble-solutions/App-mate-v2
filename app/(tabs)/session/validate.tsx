import {Alert, SafeAreaView, View} from "react-native";
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
import VariablesResume from "../../../components/Session/VariablesResume";

export default function ValidateScreen() {
    const sessionContext = useSessionContext();
    const [rawVariables, setRawVariables] = React.useState<RawVariableType[]>([]);
    const { status, resetStatus, resetPayload, setStatus } = useSessionStatusContext()
    const [ exitStatus, setExitStatus ] = React.useState(false)

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

    const setResponse = (variableId: string, response: any) => {
        setRawVariables((prev) => {
            const newVars: RawVariableType[] = []

            prev.forEach((variable) => {
                if (variable._id === variableId) variable.value = response
                newVars.push(variable)
            })

            return newVars
        })
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

        const value = variable.value
        const type = variable.type
        const label = variable.label

        items.push((
            <View style={globalStyles.section}>
                <FormInput
                    type={type}
                    value={value}
                    onChange={(newVal) => setResponse(variable._id, newVal)}
                    label={label}
                    labelStyle={[globalStyles.textLight, globalStyles.textXl]}
                />
            </View>
        ))
    })

    items.push((
        <VariablesResume
            variables={rawVariables}
            theme={"dark"}
            containerStyle={[globalStyles.body, globalStyles.mv3Container, globalStyles.mh3Container]}
        />
    ))

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