import {Alert, Text, View} from "react-native";
import getCurrentSession, {getCurrentActivity, navigate} from "../../../shared/libs/session";
import {useSessionStatusContext} from "../../../shared/contexts/SessionStatusContext";
import {router} from "expo-router";
import { AntDesign } from '@expo/vector-icons';
import Button from "../../../components/Button";
import RenderItem from "../../../components/RenderItem";
import React, { useEffect } from "react";
import { RawVariableType } from "../../../shared/types/SessionType";
import { VariableType } from "../../../shared/types/VariableType";
import GradientHeader from "../../../components/Activity/GradientHeader";
import { globalStyles } from "../../../shared/globalStyles";
import Title from "../../../components/Title";
import VariableTest from "../../../components/composantTest";
import { set } from "date-fns";
import RenderForm from "../../../components/RenderFormVariable";

export default function ValidateScreen() {
    


    const [rawVariables, setRawVariables] = React.useState<RawVariableType[]>([]);
    const { status, resetStatus, resetPayload } = useSessionStatusContext()
    const [ exitStatus, setExistStatus ] = React.useState(false);
    let [i, setI] = React.useState<number>(0);
    
    
    useEffect(() => {
        navigate(status || null, router)
    }, [status])
    
    try {
        const currentSession = getCurrentSession()
        const currentActivity = getCurrentActivity()
        // const newRawVariables: RawVariableType[] = [];
        const variables = currentActivity.variables;
        
        
        // const [currentVariable, setCurrentVariable] = React.useState<RawVariableType | null>(rawVariables[0]);
        
        if (rawVariables.length === 0) {
            const newRawVariables: RawVariableType[] = variables.map(variable => ({
                _id: variable._id,
                label: variable.question,
                type: variable.type,
                value: undefined
            }));
            setRawVariables(newRawVariables);
        }
        
        
        return (
            <View style={globalStyles.mainContainer}>
                <GradientHeader activity={currentActivity}>
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
                    <Title title={currentActivity.label} style={[globalStyles.textLight, globalStyles.textCenter]} size="lg" />
                </GradientHeader>

                <View style={[globalStyles.body, globalStyles.darkBg]}>
                    {rawVariables.length>0 && <RenderForm item={rawVariables[i]}
                        onRawVariablesChange={setRawVariables} 
                        onValidate={() => {
                            if(i < rawVariables.length - 1){
                                setI(i+1);
                            }
                            else{
                                Alert.alert("Fin de la session");
                            }
                        }}
                        onCancel={() => {
                            if(i > 0){
                                setI(i-1);
                            }
                        }}
                    />}
                </View>
            </View>
        )
    }
    catch (e) {
        if (!exitStatus) {
            const message = e instanceof Error ? e.message : "Erreur inconnue dans l'affichage de la vue session ."
            Alert.alert(message)
        }
        return null
    }

    
}