import React from "react";
import {Text, View, TouchableOpacity, ScrollView} from "react-native";  
import {globalStyles} from "../shared/globalStyles";
import { VariableType } from "../shared/types/VariableType";
import { useSessionContext } from "../shared/contexts/SessionContext";
import { useSessionStatusContext } from "../shared/contexts/SessionStatusContext";
import RenderForm from "./RenderFormVariable";




export default function renderItem({variables}: {variables: VariableType[]}) {
    const sessionContext = useSessionContext()
    const { getStatus, setStatus, resetStatus, setPayload, resetPayload, getPayload } = useSessionStatusContext()
    const [isVisible, setIsVisible] = React.useState(true);
    const [formGetValue, setformGetValue] = React.useState(false);
    const [rawVariables, setRawVariables] = React.useState([] as {_id: string, comment_value:string, label: string, info: string, value: string |number}[]);
    const [selectedItem, setSelectedItem] = React.useState([]);
    
    
    const handlePress = (variable: VariableType) => {
        setIsVisible(!isVisible);
        setformGetValue(!formGetValue);
        setSelectedItem(variable)
    }
    const renderFormItem = () => {

        if(!selectedItem) return null;
        else{
            console.log('handlepress', selectedItem)
            return (
                <View style={globalStyles.cardSession}>
                    {formGetValue &&
                    <RenderForm item={selectedItem}/>
                    }
                </View>
            )   

        }

        
    }
    


    console.log(variables, 'variables'  )
    return(
        <ScrollView >
            {isVisible &&
                <View>
                    <View>
                        { variables.length== 0 && <Text style={[globalStyles.variableCardTitle, globalStyles.textLight]}>Il n'y a pas de variable associée à cette activité</Text>}
                        { variables.length==1 && <Text style={[globalStyles.variableCardTitle, globalStyles.textLight]}>{variables.length} variable associée à renseigner</Text>}
                        { variables.length>1 && <Text style={[globalStyles.variableCardTitle, globalStyles.textLight]}>{variables.length} variables à renseigner</Text>}
                    </View>
                        { variables.map((variable, index)  => {
                            return (
                                <View key={index} >
                                    <TouchableOpacity style={[globalStyles.cardSession]} onPress={() => handlePress(variable)}>
                                    <View>
                                        <Text style ={globalStyles.textLight}>{variable.question}</Text> 
                                        <Text style ={globalStyles.textLight}>{variable.type}</Text> 
                                        <Text style ={globalStyles.textLight}>{variable.mandatory}</Text>
                                    </View>
                                    </TouchableOpacity>
                                </View>
                            )       
                        })}
                        {/* <TouchableOpacity  onPress={handlePressAll} style={[ globalStyles.cardSession]}>
                            <Text style={globalStyles.textLight}>renseigner les variables</Text>   
                        </TouchableOpacity> */}
                        
                </View>
                }
                {renderFormItem()}
        </ScrollView>
    )
}




    
