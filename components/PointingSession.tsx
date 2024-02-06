import React from "react";
import { globalStyles } from "../shared/globalStyles";import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from "./Button";
import { useSessionStatusContext } from "../shared/contexts/SessionStatusContext";
import { useSessionContext } from "../shared/contexts/SessionContext";  
import { SessionType } from "../shared/types/SessionType";
import RenderItem from "./RenderItem";


export default function PointingSession({currentSession}:{currentSession: SessionType}) {
    
    const sessionContext = useSessionContext()
    const { getStatus, setStatus, resetStatus, setPayload, resetPayload, getPayload } = useSessionStatusContext()
    const [pressTimes, setPressTimes] = React.useState([{time: new Date(), label: "début", index: 1}] as {time: Date, label: string, index: number}[]);
    const [intervalWork, setIntervalWork] = React.useState(0);
    const [intervalPause, setIntervalPause] = React.useState(0);
    const [rawDatas, setRawDatas] = React.useState([] as {end: Date, start: Date}[]);
    let sessionCopy = {...currentSession};
    
    const validate = async () => {
        const currentTime = new Date();
            sessionContext.updateSession(currentSession._id, {...currentSession, end: new Date(),   raw_datas: rawDatas});
            sessionContext.updateSession(currentSession._id, {...currentSession, end: new Date(),   raw_datas: rawDatas});
            setRawDatas([...rawDatas, {start: pressTimes[pressTimes.length - 1].time, end: currentTime}]);    
            console.log(rawDatas, 'rawDatas');
            sessionContext.postSession(currentSession._id, {...currentSession});
      }
    const pointing = async () => {
        const currentTime = new Date();
        const index = pressTimes.length + 1;
      
        const getLabel = () => {
          if (pressTimes.length % 2 === 0)
            return "début";
          else
            return "fin";
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
            console.log('apusetravaile en cours')
                  return intervalPause
        } else {
            const NewInterval: number = currentTime.getTime() - pressTimes[pressTimes.length - 1].time.getTime();
            setIntervalWork(intervalWork + NewInterval);
            setRawDatas([...rawDatas, {start: pressTimes[pressTimes.length - 1].time, end: new Date(currentTime)}]);    
            console.log(rawDatas, 'rawDatas');
            console.log('en pause')
            sessionContext.updateSession(sessionCopy._id, {...sessionCopy, raw_datas: rawDatas});

            return intervalWork
        }
      };
      


    return (
        <View>
            <View style={globalStyles.buttonContainerSession}>
                <Text style={globalStyles.textLight}>durée session: {Math.round(intervalWork + intervalPause/1000)} s</Text>
            </View>
            <View style={globalStyles.buttonContainerSession}>
                <Text style={globalStyles.textLight}>durée travail: { (intervalWork/1000) } s</Text>
            </View>
            <View style={globalStyles.buttonContainerSession}>
                <Text style={globalStyles.textLight}>durée pause: {(intervalPause/1000)} s</Text>
            </View>
            {pressTimes.length >= 1 && pressTimes.map((pressTime, index) => {
                return (
                    <View key={index}>
                        <View style={globalStyles.buttonContainerSession}>
                            {/* <Text style={globalStyles.textLight}>{pressTime ? pressTime.index : ""}</Text>   */}
                            <Text style={globalStyles.textLight}>{pressTime.label}</Text>
                            <Text style={globalStyles.textLight}>{pressTime.time.toLocaleTimeString()}</Text>
                        </View>
                        {/* {pressTimes.length%2 === 0 && <Text style={globalStyles.textLight}>Début - {pressTime.time.toLocaleTimeString()}</Text>} */}
                        {/* {pressTimes.length%2 === 1 && <Text style={globalStyles.textLight}>Fin - {pressTime.time.toLocaleTimeString()}</Text>}  */}
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
                    onPress={() => {setStatus("validate"), validate()}}
                    titleStyle={[{color: 'green'}]}
                    />
                }
            </View>
            <RenderItem />
        </View>
                
    )
}