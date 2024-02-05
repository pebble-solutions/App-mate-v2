import React from "react";
import { globalStyles } from "../shared/globalStyles";import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from "./Button";
import { useSessionStatusContext } from "../shared/contexts/SessionStatusContext";
import { useSessionContext } from "../shared/contexts/SessionContext";  


export default function PointingSession({ }:object) {
    
    const sessionContext = useSessionContext()
    const { getStatus, setStatus, resetStatus, setPayload, resetPayload, getPayload } = useSessionStatusContext()
    const [pressTimes, setPressTimes] = React.useState([{time: new Date(), label: "début", index: 1}] as {time: Date, label: string, index: number}[]);
    const [intervalWork, setIntervalWork] = React.useState(0);
    const [intervalPause, setIntervalPause] = React.useState(0);
    const [rawDatas, setRawDatas] = React.useState([] as {time: Date, label: string, index: number}[]);


    const pointing = async () => {
        const currentTime = new Date();
        const index = pressTimes.length + 1;
      
        const getLabel = () => {
          if (pressTimes.length % 2 === 0)
            return "début";
          else
            return "fin";
        };
      
        const getLabelButton = () => {
          if (pressTimes.length % 2 === 0)
            return "reprendre";
          else
            return "valider";
        };
      
        const newPressTime = {
          time: currentTime,
          label: getLabel(),
          index: index,
        };
      
        const updatedPressTimes = [...pressTimes, newPressTime];
        setPressTimes(updatedPressTimes);
        if (pressTimes.length % 2 === 0) {
            const NewInterval: number = currentTime.getTime() - pressTimes[pressTimes.length - 1].time.getTime();
            setIntervalPause(intervalPause + NewInterval);
            console.log(intervalPause, pressTimes, 'intersetIntervalPause');

            console.log(updatedPressTimes, 'presstimes round 1');
            return intervalPause
        } else {
            const NewInterval: number = currentTime.getTime() - pressTimes[pressTimes.length - 1].time.getTime();
            setIntervalWork(intervalWork + NewInterval);
            console.log(intervalWork, pressTimes, 'intervalWork');
            console.log(updatedPressTimes, 'presstimes round 2');
            return intervalWork
          // await savePressTimes(updatedPressTimes); // Sauvegarde des nouvelles données
        }
        const Total: number = intervalWork + intervalPause;
      };
      


    return (
        <View>
                                <View style={globalStyles.buttonContainerSession}>
                                    <Text style={globalStyles.textLight}>durée session: {(intervalWork + intervalPause/1000)} s</Text>
                                </View>
                                <View style={globalStyles.buttonContainerSession}>
                                    <Text style={globalStyles.textLight}>durée travail: { intervalWork/1000 } s</Text>
                                </View>
                                <View style={globalStyles.buttonContainerSession}>
                                    <Text style={globalStyles.textLight}>durée pause: {intervalPause/1000} s</Text>
                                </View>
            {pressTimes.length >= 1 && pressTimes.map((pressTime, index) => {
                        return (
                            <View key={index}>
                                <View style={globalStyles.buttonContainerSession}>
                                    {/* <Text style={globalStyles.textLight}>{pressTime ? pressTime.index : ""}</Text>   */}
                                    <Text style={globalStyles.textLight}>{pressTime.label}</Text>
                                    <Text style={globalStyles.textLight}>{pressTime.time.toLocaleTimeString()}</Text>
                                </View>
                                {/* {pressTimes.length%2 === 0 && <Text style={globalStyles.textLight}>Début - {pressTime.time.toLocaleTimeString()}</Text>}
                                {pressTimes.length%2 === 1 && <Text style={globalStyles.textLight}>Fin - {pressTime.time.toLocaleTimeString()}</Text>} */}
                            </View>
                        )       
                    })}
            
            <View style={globalStyles.buttonContainerSession}>
                <Button
                        style={[globalStyles.button, globalStyles.buttonAlignSelfCenter]} 
                        title= {pressTimes.length%2 === 1 ? "en cours" : "reprendre"}
                        onPress={() => {pointing() }}
                        titleStyle={[{color: 'red'}]}
                        />

                {pressTimes.length%2 === 0 &&

                <Button
                    style={[globalStyles.button, globalStyles.buttonAlignSelfCenter]} 
                    title="valider"
                    onPress={() => {setStatus("validate"), pointing()}}
                    titleStyle={[{color: 'green'}]}
                    />
                }


            </View>
        </View>
                
    )
}