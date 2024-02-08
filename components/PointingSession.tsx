import React from "react";
import { globalStyles } from "../shared/globalStyles";import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from "./Button";
import { useSessionStatusContext } from "../shared/contexts/SessionStatusContext";
import { useSessionContext } from "../shared/contexts/SessionContext";  
import { SessionType } from "../shared/types/SessionType";
import RenderItem from "./RenderItem";
import { numberToTimeString } from "../shared/libs/date";

export default function PointingSession({currentSession}:{currentSession: SessionType}) {
    
    const sessionContext = useSessionContext()
    const { getStatus, setStatus, resetStatus, setPayload, resetPayload, getPayload } = useSessionStatusContext()
    const [pressTimes, setPressTimes] = React.useState([{time: new Date(), label: "début", index: 1}] as {time: Date, label: string, info:string, index: number}[]);
    const [intervalWork, setIntervalWork] = React.useState(0);
    const [intervalPause, setIntervalPause] = React.useState(0);
    const [rawDatas, setRawDatas] = React.useState([] as {end: Date, start: Date}[]);
    const [rawVariables, setRawVariables] = React.useState([] as {_id: string, comment_value:string, label: string, info: string, value: string |number}[]);
    const [isVisible, setIsVisible] = React.useState(false);
    let sessionCopy = {...currentSession};
    
    const validate = async () => {
        const currentTime = new Date();
            sessionContext.updateSession(currentSession._id, {...currentSession, end: new Date(),   raw_datas: rawDatas});
            sessionContext.updateSession(currentSession._id, {...currentSession, end: new Date(),   raw_datas: rawDatas});
            setRawDatas([...rawDatas, {start: pressTimes[pressTimes.length - 1].time, end: currentTime}]);  
            setRawVariables([...rawVariables, ]);  
            console.log(rawDatas, 'rawDatas');
            sessionContext.postSession(currentSession._id, {...currentSession});
      }
    const pointing = async () => {
        const currentTime = new Date();
        const index = pressTimes.length + 1;
        console.log(currentSession, 'currentSession')
        console
      
        const getLabel = () => {
          if (pressTimes.length % 2 === 0)
            return "Début";
          else
            return "Fin";
        };
        const getInfo = () => {
            if (pressTimes.length % 2 === 0)
              return "pointage en cours";
            else
              return "en pause";
          }


      
        const newPressTime = {
          time: currentTime,
          label: getLabel(),
          index: index,
          info: getInfo()
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
            <View >
                <View style={globalStyles.cardSession}>

                    <Text style={[globalStyles.headTitle, globalStyles.textLight]}>Session du {currentSession.start.toLocaleDateString()}</Text>
                    <Text style={[globalStyles.headTitle, globalStyles.textLight]}>début :{currentSession.start.toLocaleTimeString()}</Text>

                    {pressTimes.length >=1 && 
                        <View>
                            <Text style={[globalStyles.headTitle, globalStyles.textLight]}>dernier pointage : {pressTimes[pressTimes.length -1].time.toLocaleTimeString()}</Text>
                            <Text style={[globalStyles.headTitle, globalStyles.textLight]}>{pressTimes[pressTimes.length -1].info}</Text>
                        </View>
                    }
                </View>
                <Button
                    style={[globalStyles.button, globalStyles.buttonAlignSelfCenter]} 
                    title= {pressTimes.length%2 === 1 ? "STOP" : "REPRENDRE"}
                    onPress={() => {pointing() }}
                    titleStyle={[{color: 'red'}]}
                    />

                <View style={globalStyles.cardSession}>
                    <Text style={globalStyles.textLight}>Activité: { (intervalWork/1000) } s</Text>
                    <Text style={globalStyles.textLight}>pause: {(intervalPause/1000)} s... {numberToTimeString(intervalPause)} </Text>
                    <Text style={[globalStyles.textLight, globalStyles.cardTitle]}>Total session: {Math.round(intervalWork/1000 + intervalPause/1000)} s</Text>
                </View>
            </View>
            <View style={globalStyles.cardSession}>
                {/* {pressTimes.length >= 1 && pressTimes.map((pressTime, index) => {
                    return (
                        <View key={index} style={globalStyles.cardSessionContent}>
                                <Text style={globalStyles.textLight}>{pressTime ? pressTime.index : ""}</Text>  
                                <Text style={globalStyles.textLight}>{pressTime.label}</Text>
                                <Text style={globalStyles.textLight}>{pressTime.time.toLocaleTimeString()}</Text>
                        </View>
                        )       
                    })} */}
                {/* {rawDatas.length >= 1 && rawDatas.map((rawData, index) => {
                    return (
                        <View key={index} style={globalStyles.cardSessionContent}>
                                <Text style={globalStyles.textLight}>de {rawData.start.toLocaleTimeString()}</Text>  
                                <Text style={globalStyles.textLight}>à {rawData.end.toLocaleTimeString()}</Text>
                        </View>
                        )       
                    }
                )
                } */}
            </View>
        
            
            <View style={globalStyles.buttonContainerSession}>

                {pressTimes.length%2 === 0 &&
                    <Button
                        style={[globalStyles.button, globalStyles.buttonAlignSelfCenter]} 
                        title="valider les horaires"
                        onPress={() => {setStatus("validate"), validate()}}
                        titleStyle={[{color: 'green'}]}
                        />
                    }
            </View>
        
                <RenderItem isVisible={isVisible}/>
            

            
        </View>
                
    )
}