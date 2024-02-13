import React from "react";
import { FC } from "react";
import { Text, View, TextInput } from "react-native";
import { globalStyles } from "../shared/globalStyles";
import ResponseTextArea from "./GetValueTextarea";
import ResponseText from "./GetValueText";
import ResponseNumber from "./GetValueNumber";
import ResponseBoolean from "./GetValueBoolean";
import { VariableType } from "../shared/types/VariableType";
// import ResponseDate from "./formVariable/variableDate";
// import ResponseTime from "./formVariable/variableTime";
// import ResponseDateTime from "./formVariable/variableDateTime";
// import ResponseDateRange from "./formVariable/variableDateRange";

interface RenderFormProps {
    item: VariableType
    // {
    //     _id: string,
    //     label: string,
    //     type: string,
    //     min_length: number,
    //     max_length: number,
    //     question: string,
    //     mandatory: boolean,
    //     min_value: number,
    //     max_value: number,
    //     min_date: string,
    //     max_date: string,
    //     min_time: string,
    //     max_time: string,
    //     min_dateTime: string,
    //     max_dateTime: string,
    //     min_dateRange: string,
    //     max_dateRange: string,
    // }
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
            // <ResponseDate varDate={item}/>
            <Text style={globalStyles.textLight}> le type {item.type} n'est pas géré par l'app </Text>
      
        )
    }
    else if(item.type === 'time'){
        return (
            // <ResponseTime varTime={item}/>
            <Text style={globalStyles.textLight}> le type {item.type} n'est pas géré par l'app </Text>
      
        )
    }
    else if(item.type === 'dateTime'){
        return (
            // <ResponseDateTime varDateTime={item}/>
            <Text style={globalStyles.textLight}> le type {item.type} n'est pas géré par l'app </Text>
      
        )
    }
    else if(item.type === 'dateRange'){
        return (
            // <ResponseDateRange varDateRange={item}/>
            <Text style={globalStyles.textLight}> le type {item.type} n'est pas géré par l'app</Text>
      
        )
    }
    else{
        return (
        <Text style={globalStyles.textLight}> Ce type de varaible n'est pas reconnu: {item.type} XXX</Text>
        )
    }
    
}


export default RenderForm