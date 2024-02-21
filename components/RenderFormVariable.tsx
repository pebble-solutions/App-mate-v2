import React, { useState } from "react";
import { FC } from "react";
import { Text, View, TextInput } from "react-native";
import { globalStyles } from "../shared/globalStyles";
import GetValueText from "./GetValueText";
import GetValueTextArea from "./GetValueTextarea";
import GetValueBoolean from "./GetValueBoolean";
import GetValueNumber from "./GetValueNumber";
import GetValueTime from "./getValueTime";
import GetValueDate from "./GetValueDate";
import GetValueDateTime from "./GetValueDateTime";
import GetValueDateRange from "./GetValueDateRange";
import { RawVariableType } from "../shared/types/SessionType";
import ButtonPrevNext from "./TunnelsButton";
import { set } from "date-fns";

type RenderFormType = {
    item: RawVariableType ; // La variable à afficher
    onRawVariablesChange: (rawVariables: RawVariableType) => void; // Fonction de rappel pour passer les rawVariables au composant parent
    onValidate: (rawVariables: RawVariableType[]) => void;
    onCancel: () => void;

}

const RenderForm : FC<RenderFormType>  = ({item, onRawVariablesChange, onValidate, onCancel}) => {
    // State pour suivre les réponses brutes
    const [rawVariables, setRawVariables] = useState<RawVariableType[]>([]);
    const [response, setResponse] = useState<RawVariableType>({} as RawVariableType);

    // Fonction de rappel pour recevoir les valeurs de rawVariables des composants enfants
    const handleRawVariablesChange = (response: RawVariableType) => {
        // Mettre à jour les rawVariables dans le state
        //setRawVariables(newRawVariables);
        setResponse(response);
        onRawVariablesChange(response);
    };

    let component;

    if(item.type === 'text'){
        component = (
            <GetValueText varText={item} onRawVariablesChange={handleRawVariablesChange} />
        )
    }
    else if(item.type === 'textarea'){
        component = (
            <GetValueTextArea varTextArea={item} onRawVariablesChange={handleRawVariablesChange} />
        )
    }
    else if(item.type === 'number'){
        component = (
            <GetValueNumber varNumber={item} onRawVariablesChange={handleRawVariablesChange} />
        )
    }
    else if(item.type === 'boolean'){
        component = (
            <GetValueBoolean varBoolean={item} onRawVariablesChange={handleRawVariablesChange} />
        )
    }
    else if(item.type === 'date'){
        component =  (

            <GetValueDate varDate={item} onRawVariablesChange={handleRawVariablesChange} />
        )
    }
    else if(item.type === 'time'){
        component =  (

            <GetValueTime varTime={item} onRawVariablesChange={handleRawVariablesChange} />
        )
    }
    else if(item.type === 'datetime'){
        component =  (

            <GetValueDateTime varDateTime={item} onRawVariablesChange={handleRawVariablesChange} />
        )
    }
    else if(item.type === 'daterange'){
        component =  (

            <GetValueDateRange varDateRange={item} onRawVariablesChange={handleRawVariablesChange} />
        )
    }
    else{
        component =  (
            <Text style={globalStyles.textLight}> Ce type de variable n'est pas traité dans cette application: {item.type} XXX</Text>
        )
    }
    return (
        //label
        <View>
            <Text style={[globalStyles.CategoryTitle, globalStyles.textLight]}>{item.label}</Text>
            {component}
            <ButtonPrevNext
                onPress2={() => onValidate(rawVariables)}
                onPress1={() => onCancel()}
                buttonName1="< retour"
                buttonName2="Valider >"
            />
            
        </View>
    )
    // ici on affiche les boutons suiv et précédent
    // suivant déclenche la fonction on validate et et passe la valeur active de la réponse en paramètre onValidate(newValue)
    // précédent déclenche la fonction onCancel et ne passe rien en paramètre

}

export default RenderForm;
