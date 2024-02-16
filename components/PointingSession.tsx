import React, { useEffect } from "react";
import { globalStyles } from "../shared/globalStyles";import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from "./Button";
import { useSessionStatusContext } from "../shared/contexts/SessionStatusContext";
import { useSessionContext } from "../shared/contexts/SessionContext";  
import { SessionType } from "../shared/types/SessionType";
import { numberToTimeString } from "../shared/libs/date";   

export default function PointingSession({currentSession}:{currentSession: SessionType}) {
    
    const sessionContext = useSessionContext()
    const { getStatus, setStatus, resetStatus, setPayload, resetPayload, getPayload } = useSessionStatusContext()
    const [pressTimes, setPressTimes] = React.useState([{time: new Date(), label: "début", index: 1}] as {time: Date, label: string, info:string, index: number}[]);
    const [intervalWork, setIntervalWork] = React.useState(0);
    const [intervalPause, setIntervalPause] = React.useState(0);
    const [rawDatas, setRawDatas] = React.useState([] as {end: Date, start: Date}[]);
    const [isVisible, setIsVisible] = React.useState(false);
    const [elapsedTime, setElapsedTime] = React.useState(0);
    let sessionCopy = {...currentSession};
    
    useEffect(() => {
        const timer = setInterval(() => {
            setElapsedTime(prevElapsedTime => prevElapsedTime + 1000);
        }, 1000);
        return () => clearInterval(timer);
    },[]);
    
    
    const validate = async () => {
        const currentTime = new Date();
            setRawDatas([...rawDatas, {start: pressTimes[pressTimes.length - 1].time, end: currentTime}]);  
            console.log(rawDatas, 'rawDatas');
            sessionContext.updateSession(currentSession._id, {...currentSession, end: new Date(),   raw_datas: rawDatas});
            sessionContext.postSession(currentSession._id, {...currentSession});
      }
    const pointing = async () => {
        const currentTime = new Date();
        const index = pressTimes.length + 1;
        console.log(currentSession, 'currentSession')
        
      
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
            return intervalPause/1000
        } else {
            const NewInterval: number = currentTime.getTime() - pressTimes[pressTimes.length - 1].time.getTime();
            setIntervalWork(intervalWork + NewInterval);
            setRawDatas([...rawDatas, {start: pressTimes[pressTimes.length - 1].time, end: new Date(currentTime)}]);    
            console.log(rawDatas, 'rawDatas');
            // sessionContext.updateSession(sessionCopy._id, {...sessionCopy, raw_datas: rawDatas});
            sessionContext.updateSession(currentSession._id, {...currentSession, raw_datas: rawDatas});
            return intervalWork/1000
        }
      };
      
      
      
      return (
          <View style={[globalStyles.body]}>
            <View style={[globalStyles.body]}>
                <View style={globalStyles.cardSession}>

                    <Text style={[globalStyles.headTitle, globalStyles.textLight]}>{currentSession.start.toLocaleString('fr-FR')}</Text>
                    <Text style={globalStyles.textLight}>Session: {numberToTimeString(elapsedTime)}</Text>
                    <Text style={globalStyles.textLight}>Activité: { numberToTimeString(intervalWork)}</Text>
                    {/* <Text style={[globalStyles.headTitle, globalStyles.textLight]}>début :{currentSession.start.toLocaleTimeString('fr-FR')}</Text> */}

                    {pressTimes.length >=1 && 
                        <View>
                            <Text style={[globalStyles.headTitle, globalStyles.textLight]}>{pressTimes[pressTimes.length -1].info} </Text>
                            <Text style={[globalStyles.headTitle, globalStyles.textLight]}>depuis {pressTimes[pressTimes.length -1].time.toLocaleTimeString('fr-FR')}</Text>
                        </View>
                    }
                </View>
            </View>

              <View style={localStyle.buttonsBox}>
                  <Button
                      title= {pressTimes.length%2 === 1 ? "STOP" : "REPRENDRE"}
                      onPress={async () => {
                          await pointing()
                      }}
                      titleStyle={[{color: 'red'}]}
                  />

                  {pressTimes.length%2 === 0 &&
                      <Button
                          title="valider les horaires"
                          onPress={async () => {
                              setStatus("validate");
                              await validate()
                          }}
                          titleStyle={[{color: 'green'}]}
                      />
                  }
              </View>
            
        </View>
                
    )
}

const localStyle = StyleSheet.create({
    buttonsBox: {
        flexDirection: "row-reverse",
        alignItems: "center"
    }
})