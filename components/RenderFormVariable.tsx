import React, { useState } from "react";
import { FC } from "react";
import { Text, View, TextInput } from "react-native";
import { globalStyles } from "../shared/globalStyles";
import ResponseTextArea from "./GetValueTextarea";
import ResponseText from "./GetValueText";
import ResponseNumber from "./GetValueNumber";
import ResponseBoolean from "./GetValueBoolean";
import { VariableType } from "../shared/types/VariableType";
import ResponseDate from "./GetValueDate";
import ResponseDateRange from "./GetValueDateRange";
import ResponseDateTime from "./GetValueDateTime";
import ResponseTime from "./getValueTime";
import { RawVariableType } from "../shared/types/SessionType";

type RenderFormType = {
    item: VariableType;
  onRawVariablesChange: (rawVariables: RawVariableType[]) => void; // Fonction de rappel pour passer les rawVariables au composant parent

}

const RenderForm : FC<RenderFormType>  = ({item, onRawVariablesChange}) => {
    // State pour suivre les réponses brutes
    const [rawVariables, setRawVariables] = useState<RawVariableType[]>([]);

    // Fonction de rappel pour recevoir les valeurs de rawVariables des composants enfants
    const handleRawVariablesChange = (newRawVariables: RawVariableType[]) => {
        // Mettre à jour les rawVariables dans le state
        setRawVariables(newRawVariables);
    };

    console.log(item, ' item')
    if(item.type === 'text'){
        return (
            <ResponseText varText={item} onRawVariablesChange={handleRawVariablesChange} />
        )
    }
    else if(item.type === 'textarea'){
        return (
            <ResponseTextArea varTextArea={item} onRawVariablesChange={handleRawVariablesChange} />
        )
    }
    else if(item.type === 'number'){
        return (
            <ResponseNumber varNumber={item} onRawVariablesChange={handleRawVariablesChange} />
        )
    }
    else if(item.type === 'boolean'){
        return (
            <ResponseBoolean varBoolean={item} onRawVariablesChange={handleRawVariablesChange} />
        )
    }
    else if(item.type === 'date'){
        return (

            <ResponseDate varDate={item} onRawVariablesChange={handleRawVariablesChange} />
        )
    }
    else if(item.type === 'time'){
        return (

            <ResponseTime varTime={item} onRawVariablesChange={handleRawVariablesChange} />
        )
    }
    else if(item.type === 'datetime'){
        return (

            <ResponseDateTime varDateTime={item} onRawVariablesChange={handleRawVariablesChange} />
        )
    }
    else if(item.type === 'daterange'){
        return (

            <ResponseDateRange varDateRange={item} onRawVariablesChange={handleRawVariablesChange} />
        )
    }
    else{
        return (
            <Text style={globalStyles.textLight}> Ce type de variable n'est pas traité dans cette application: {item.type} XXX</Text>
        )
    }
}

export default RenderForm;
