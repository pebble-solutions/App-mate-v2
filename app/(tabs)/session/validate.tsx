import {Alert, Text, View} from "react-native";
import getCurrentSession, {getCurrentActivity, navigate} from "../../../shared/libs/session";
import {useSessionStatusContext} from "../../../shared/contexts/SessionStatusContext";
import {useSessionContext} from "../../../shared/contexts/SessionContext";
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
import RenderForm from "../../../components/RenderFormVariable";
import RenderRecapSession from "../../../components/RenderRecapSession";
import { set } from "date-fns";
import { setStatusBarBackgroundColor } from "expo-status-bar";

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
    const exit = () => {
        setExitStatus(true)
        resetPayload()
        resetStatus()
    }
    try {
        const currentSession = getCurrentSession()
        const currentActivity = getCurrentActivity()
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
        useEffect(() => {
            if (i < rawVariables.length) {
                setCurrentResponse(rawVariables[i]);
            }
        
        }
        , [i]);

        const postSession =  async (raw_variables: RawVariableType[]) => {
            sessionContext.updateSession(currentSession._id, {...currentSession, raw_variables: raw_variables});
            await sessionContext.postSession(currentSession._id, {...currentSession});
            exit()
            
        }
        
        return (
            <View style={globalStyles.mainContainer}>
                <GradientHeader activity={currentActivity}>
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
                    <Title title={currentActivity.label} style={[globalStyles.textLight, globalStyles.textCenter]} size="lg" />
                </GradientHeader>

                <View style={[globalStyles.body, globalStyles.darkBg]}>
                    <Text style={globalStyles.textLight}> {i+1} / {rawVariables.length} </Text>
                    <Text style={globalStyles.textLight}> {status} </Text>

                    {rawVariables.length > 0 && i <rawVariables.length  && isRaw_Variables === false &&
                        <RenderForm item={rawVariables[i]}
                            onRawVariablesChange={(newResponse: RawVariableType) => {
                                setCurrentResponse(newResponse);
                                console.log(newResponse, 'newResponsevalidate');
                            }}
                            onValidate={() => {
                                console.log(currentResponse, 'currentResponse');
                                console.log(raw_variables, 'raw_variables');
                                // vérifie si la réponse est déjà enregistrée
                                const responseExists = raw_variables.some(item => item._id === currentResponse._id);
                                if(responseExists) {
                                    const newRawVariables = raw_variables.map(item => {
                                        if (item._id === currentResponse._id) {
                                            return currentResponse;
                                        }
                                        return item;
                                    });
                                    setRaw_variables(newRawVariables);
                                }
                                else {
                                    setRaw_variables([...raw_variables, currentResponse]);
                                }
                                console.log(raw_variables, 'raw_variables');
                                
                                if (i < rawVariables.length - 1) {
                                    setI(i + 1);
                                }
                                else {
                                    Alert.alert("Fin de la session", "Voulez-vous valider ces informations ?", [
                                        {
                                            text: "Annuler",
                                            onPress: () => {
                                                setIsRaw_Variables(false);
                                                setRaw_variables([]);
                                                setI(0);
                                            }
                                        },
                                        {
                                            text: "OK",
                                            onPress: () => {
                                                setIsRaw_Variables(true);
                                                sessionContext.updateSession(currentSession._id, {...currentSession, raw_variables: raw_variables}); 
                                                console.log(currentSession, 'session après ok');
                                            }
                                        },
                                    ]);

                                }
                            }}
                            onCancel={() => {
                                if (i > 0) {
                                    setI(i - 1);
                                }
                            }}
                        />
                    }
                    <RenderRecapSession raw_variables={raw_variables} />
                    {isRaw_Variables && 
                        <Button
                            title="Valider cette sesssion"
                            onPress={async () => {
                                await postSession(raw_variables);
                            }
                            // onPress= {() => {
                            //     console.log(raw_variables, 'raw_variables');
                            //     }
                            }
                    />
                    }
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