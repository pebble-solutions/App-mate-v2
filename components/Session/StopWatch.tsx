import {useEffect, useRef, useState} from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";

type StopWatchOptions = {
    started?: boolean,
    dispatchAction?: ActionsType,
    style?: object[],
    initialTime?: number,
}

type ActionsType = "start" | "pause" | "reset"

export function StopWatch({started, dispatchAction, style, initialTime}: StopWatchOptions) {

    style = style || []
    initialTime = initialTime || 0

    const [time, setTime] = useState(initialTime)

    const intervalRef = useRef<any>(null)
    const startTimeRef = useRef(0)

    useEffect(() => {
        if (started) start()
        else pause()
    }, [started])

    useEffect(() => {
        if (dispatchAction === "start") start()
        else if (dispatchAction === "pause") pause()
        else if (dispatchAction === "reset") reset()
    }, [dispatchAction]);

    useEffect(() => {
        console.log(initialTime)
        setTime(initialTime)
    }, [initialTime]);

    const displayableTime = (time: number) => {
        return new Date(time * 1000).toISOString().substring(11, 19)
    }

    const start = () => {
        startTimeRef.current = Date.now() - time * 1000;
        intervalRef.current = setInterval(() => {
            setTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
        }, 1000);
    };

    const pause = () => {
        clearInterval(intervalRef.current);
    };

    const reset = () => {
        clearInterval(intervalRef.current);
        setTime(0);
    };

    return (
        <Text style={[styles.timeText, ...style]}>{displayableTime(time)}</Text>
    );
}

const styles = StyleSheet.create({
    timeText: {
        fontSize: 48,
    }
});