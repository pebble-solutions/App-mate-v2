import React from "react";
import { Text, View, TextInput } from "react-native";
import { globalStyles } from "../shared/globalStyles";
import ResponseTextArea from "./GetValueTextarea";
import ResponseText from "./GetValueText";
import ResponseNumber from "./GetValueNumber";
import ResponseBoolean from "./GetValueBoolean";
// import ResponseDate from "./formVariable/variableDate";
// import ResponseTime from "./formVariable/variableTime";
// import ResponseDateTime from "./formVariable/variableDateTime";
// import ResponseDateRange from "./formVariable/variableDateRange";



const RenderForm = ({item}) => {
    // const [inputValueText, setInputValueText] = React.useState("");
    // const handleChangeValue = (text) => {
    //     setInputValueText(text);
    // }
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
            <Text> value in parent: {item.type} </Text>
      
        )
    }
    else if(item.type === 'time'){
        return (
            // <ResponseTime varTime={item}/>
            <Text> value in parent: {item.type} </Text>
      
        )
    }
    else if(item.type === 'dateTime'){
        return (
            // <ResponseDateTime varDateTime={item}/>
            <Text> value in parent: {item.type} </Text>
      
        )
    }
    else if(item.type === 'dateRange'){
        return (
            // <ResponseDateRange varDateRange={item}/>
            <Text> value in parent: {item.type} </Text>
      
        )
    }
    else{
        return (
        <Text> value in parent: {item.type} XXX</Text>
        )
    }
    
}


export default RenderForm