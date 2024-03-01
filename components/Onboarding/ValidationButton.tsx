import {ValidationButtonOptions} from "./types/ValidationButtonOptions";
import Svg, {Circle, G} from "react-native-svg";
import {StyleSheet, TouchableOpacity, View, Animated} from "react-native";
import {variables} from "../../shared/globalStyles";
import { Feather } from '@expo/vector-icons';
import {useEffect, useRef, useState} from "react";

export default function ValidationButton({items, currentIndex, inactiveColor, activeColor, size, onPress, validationColor, validationIndex}: ValidationButtonOptions) {

    const [actionColor, setActionColor] = useState(activeColor || variables.color.active)
    const getPercentage = () => (currentIndex + 1) * (100 / items)

    size = size || 100
    const strokeWidth = 2
    const center = size / 2
    const radius = center - strokeWidth / 2
    const circumference = 2 * Math.PI * radius

    const progressAnimation = useRef(new Animated.Value(0)).current
    const progressRef = useRef<Circle | null>(null)

    const isValidationTheme = () => typeof validationIndex !== "undefined" && currentIndex === validationIndex

    useEffect(() => {
        animation(getPercentage())
        setActionColor((prev) => {
            return isValidationTheme() ? validationColor || variables.color.success : activeColor || variables.color.active
        })
    }, [currentIndex]);

    useEffect(() => {
        progressAnimation.addListener((value) => {
            const strokeDashoffset = circumference - (circumference * value.value) / 100
            progressRef.current?.setNativeProps({strokeDashoffset})
        })

        return () => progressAnimation.removeAllListeners()
    }, [currentIndex]);

    const animation = (toValue: number) => {
        return Animated.timing(progressAnimation, {
            toValue,
            duration: 250,
            useNativeDriver: true
        }).start()
    }

    return (
        <View style={localStyle.container}>
            <Svg width={size} height={size}>
                <G rotation={-90} origin={center}>
                    <Circle
                        stroke={inactiveColor || variables.color.grey}
                        cx={center} cy={center}
                        r={radius}
                        strokeWidth={strokeWidth}
                        fill={"transparent"}
                    />
                    <Circle
                        stroke={actionColor}
                        cx={center} cy={center}
                        r={radius}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        fill={"transparent"}
                        ref={progressRef}
                    />
                </G>
            </Svg>
            <TouchableOpacity onPress={onPress} style={[localStyle.button, {backgroundColor: actionColor}]}>
                <Feather name="arrow-right" size={32} color="white" />
            </TouchableOpacity>
        </View>
    )
}

const localStyle = StyleSheet.create({
    button: {
        position: "absolute",
        borderRadius: 100,
        padding: 20
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})