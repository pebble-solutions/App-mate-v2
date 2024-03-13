import {Alert, SafeAreaView, View, Text, StyleSheet} from "react-native";
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
import { SequenceList } from "../../../components/Session/SequenceList";
import Title from "../../../components/Title";
import { StopWatch } from "../../../components/Session/StopWatch";

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
    const sequence = currentSession.raw_datas.getSequence();

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
        const key = variable._id

        items.push((
            <View style={globalStyles.section}>
                <FormInput
                    type={type}
                    value={value}
                    onChange={(newVal) => setResponse(variable._id, newVal)}
                    label={label}
                    labelStyle={[globalStyles.textLight, globalStyles.textXl]}
                    key={key}
                />
            </View>
        ))
    })

    items.push((
        <View style={localStyle.containerLocal}>
            <StopWatch
            initialTime={currentSession.raw_datas.getTime()}
            style={[globalStyles.textLight, globalStyles.textCenter]}

            />
            <Title title={"Pointages"} style={[globalStyles.mb2Container, globalStyles.textLight]} />
            <SequenceList  sequence={sequence} />
            <Title title={"informations fournies"} style={[globalStyles.mb2Container, globalStyles.textLight]} />
            <VariablesResume
                variables={rawVariables}
                theme={"dark"}
                containerStyle={[globalStyles.body]}
            />
        </View>
    ))
    

    

    return (
        <SafeAreaView style={[globalStyles.mainContainer, globalStyles.darkBg]}>
            <View style={globalStyles.mt2Container}>
                <Text style={globalStyles.textLight}>{currentActivity.label}</Text>
                <Text style={globalStyles.textLight}>{currentSession.label}</Text>
                <Text style={globalStyles.textLight}>{currentSession.start.toLocaleDateString()}</Text>
            </View>
            <OnboardingController
                activeColor={currentActivity.color}
                items={items}
                validationIndex={items.length - 1}
            />
        </SafeAreaView>
    )
}
const localStyle = StyleSheet.create({
    containerLocal: {
        width: "100%",
        height: "100%",
        
    }
})
