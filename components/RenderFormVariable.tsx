import React from "react";
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
// import ResponseDate from "./formVariable/variableDate";
// import ResponseTime from "./formVariable/variableTime";
// import ResponseDateTime from "./formVariable/variableDateTime";
// import ResponseDateRange from "./formVariable/variableDateRange";

interface RenderFormProps {
    item: VariableType
}

const RenderForm : FC<RenderFormProps>  = ({item}) => {
    
    console.log(item, ' item')
    if(item.type === 'text'){
        return (
            <View>
                <ResponseText  varText={item}/>
            </View>
        )
    }
    else if(item.type === 'textarea'){
        return (
            <ResponseTextArea  varTextArea={item}/>

        )
    }
    else if(item.type === 'number'){
        return (
            <ResponseNumber varNumber={item}/>

        )
    }
    else if(item.type === 'boolean'){
        return (
            <ResponseBoolean varBoolean={item} />
        )
    }
    else if(item.type === 'date'){
        return (
            <ResponseDate varDate={item}/>
      
        )
    }
    else if(item.type === 'time'){
        return (
            <ResponseTime varTime={item}/>
      
        )
    }
    else if(item.type === 'datetime'){
        return (
            <ResponseDateTime varDateTime={item}/>
      
        )
    }
    else if(item.type === 'daterange'){
        return (
            <ResponseDateRange varDateRange={item}/>
      
        )
    }
    else{
        return (
        <Text style={globalStyles.textLight}> Ce type de variable n'est pas traité dans cette application: {item.type} XXX</Text>
        )
    }
    
}


export default RenderForm