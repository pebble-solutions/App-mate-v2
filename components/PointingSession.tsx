import React from "react";
import { globalStyles } from "../shared/globalStyles";import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from "./Button";
import { useSessionStatusContext } from "../shared/contexts/SessionStatusContext";


export default function PointingSession() {
    const { getStatus, setStatus, resetStatus, setPayload, resetPayload, getPayload } = useSessionStatusContext()
    const [pressTimes, setPressTimes] = React.useState([{time: new Date(), label: "", index: 0}] as {time: Date, label: string, index: number}[]);

    const pointing = async () => {
        const currentTime = new Date();
        const index = pressTimes.length +1;
        const newPressTime = {
            time: currentTime,
            label: getStatus(),
            index: index
        };
        const updatedPressTimes = [...pressTimes, newPressTime];
        setPressTimes(updatedPressTimes);
        console.log(pressTimes, 'in session');
        // await savePressTimes(updatedPressTimes); // Sauvegarde des nouvelles données
    }


    return (
        <View>
            {pressTimes.length >= 1 && pressTimes.map((pressTime, index) => {
                        return (
                            <View key={index} >
                                <Text style={globalStyles.textLight}> - {pressTime.time.toLocaleTimeString()}</Text>
                                <Text style={globalStyles.textLight}>type: {pressTime.label}</Text>
                                <Text style={globalStyles.textLight}>index: {pressTime ? pressTime.index : ""}</Text>  
                            </View>
                        )       
                    })}
            
            <View style={globalStyles.buttonContainer}>
                <Button
                        style={[globalStyles.button, globalStyles.buttonAlignSelfCenter]} 
                        title={getStatus() === "started" ? "en cours" : "reprendre"}
                        onPress={() => {setStatus("started"), pointing("started")}}
                        titleStyle={[{color: 'red'}]}
                        />

                {pressTimes.length%2 === 0 &&

                <Button
                    style={[globalStyles.button, globalStyles.buttonAlignSelfCenter]} 
                    title="valider"
                    onPress={() => {setStatus("validate"), pointing("validate")}}
                    titleStyle={[{color: 'green'}]}
                    />
                }


            </View>
        </View>
                
    )
}