import {StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import Animated, {
    interpolate,
    interpolateColor,
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from "react-native-reanimated";
import {PanGestureHandler} from "react-native-gesture-handler";
import {globalStyles, variables} from "../shared/globalStyles";
import {LinearGradient} from "expo-linear-gradient";

const SWIPER_WIDTH = 6
const SWIPER_PADDING = 0

type SwiperToggleOptionsType = {
    onToggle?: (isToggled: boolean) => void,
    size?: number,
    height?: number,
    sizeInterpolation?: number,
    onLabel?: string,
    offLabel?: string,
    initialValue?: boolean,
    onColor?: string,
    offColor?: string
}

class SwiperToggleOptions implements SwiperToggleOptionsType {

    /**
     * Callback function that must be performed when the toggler is switched
     */
    onToggle?: (isToggled: boolean) => void

    /**
     * Handler size in pixel
     */
    size: number

    /**
     * Swiper height
     */
    height: number

    /**
     * Handler size coefficient between off and on status
     */
    sizeInterpolation: number

    /**
     * Label when toggler is on
     */
    onLabel: string

    /**
     * Label when toggler is off
     */
    offLabel: string

    /**
     * Initial toggle value
     */
    initialValue: boolean

    /**
     * Hexadecimal color for active handler
     */
    onColor: string

    /**
     * Hexadecimal color for inactive handler
     */
    offColor: string

    constructor(options: SwiperToggleOptionsType) {
        this.onToggle = options.onToggle
        this.size = options.size || 60
        this.sizeInterpolation = options.sizeInterpolation || 1.2
        this.height = options.height || 140
        this.onLabel = options.onLabel || "On"
        this.offLabel = options.offLabel || "Off"
        this.initialValue = options.initialValue || false
        this.onColor = options.onColor || "#FFE87C"
        this.offColor = options.offColor || variables.color.grey
    }
}

export default function SwiperToggle(options: SwiperToggleOptionsType) {

    const {
        onToggle,
        onLabel,
        offLabel,
        initialValue,
        sizeInterpolation,
        size,
        height,
        offColor,
        onColor
    } = new SwiperToggleOptions(options)

    const SWIPER_HEIGHT = height
    const HANDLER_SIZE = size
    const SWIPE_RANGE = SWIPER_HEIGHT - SWIPER_PADDING * 2 - HANDLER_SIZE

    const translateY = useSharedValue(initialValue ? -SWIPE_RANGE : 0)
    const isSliding = useSharedValue(false);

    const [toggled, setToggled] = useState(initialValue)
    const [handlerLabel, setHandlerLabel] = useState(initialValue ? onLabel : offLabel)

    const handleComplete = (isToggled: boolean) => {
        if (isToggled !== toggled) {
            setToggled(isToggled);
            setHandlerLabel(isToggled ? onLabel : offLabel)
            if (onToggle) onToggle(isToggled);
        }
    }

    const handlerGestureEvent = useAnimatedGestureHandler({
        onStart: (_, ctx) => {
            ctx.offsetY = translateY.value
        },
        onActive: (event, ctx) => {
            const offsetY = typeof ctx.offsetY === "number" ? ctx.offsetY : 0

            const clamp = (value: number, lowerBound: number, upperBound: number) => {
                return Math.min(Math.max(lowerBound, value), upperBound)
            }

            isSliding.value = true
            translateY.value = clamp(
                event.translationY + offsetY,
                (SWIPER_HEIGHT - HANDLER_SIZE) * -1,
                0
            )
        },
        onEnd: () => {
            isSliding.value = false

            const val = Math.abs(translateY.value)

            if (val < SWIPER_HEIGHT / 2 - HANDLER_SIZE / 2) {
                translateY.value = withSpring(0)
                runOnJS(handleComplete)(false)
            }
            else {
                translateY.value = withSpring((SWIPER_HEIGHT - HANDLER_SIZE) * -1)
                runOnJS(handleComplete)(true)
            }
        }
    })

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{translateY: translateY.value}],
            backgroundColor: interpolateColor(
                translateY.value,
                [0, SWIPE_RANGE * -1],
                [offColor, onColor],
            ),
            shadowRadius: interpolate(
                translateY.value,
                [0, SWIPE_RANGE * -1],
                [0, 20]
            ),
            shadowOpacity: interpolate(
                translateY.value,
                [0, SWIPE_RANGE * -1],
                [0, 0.5]
            ),
            width: interpolate(
                translateY.value,
                [0, SWIPE_RANGE * -1],
                [HANDLER_SIZE, HANDLER_SIZE * sizeInterpolation]
            ),
            height: interpolate(
                translateY.value,
                [0, SWIPE_RANGE * -1],
                [HANDLER_SIZE, HANDLER_SIZE * sizeInterpolation]
            ),
        };
    });

    const handlerVariableStyle = {
        width: HANDLER_SIZE,
        height: HANDLER_SIZE,
        borderRadius: HANDLER_SIZE / 2 * sizeInterpolation,
        backgroundColor: initialValue ? onColor : offColor,
        shadowColor: onColor
    }

    const containerVariableStyle = {
        width: HANDLER_SIZE * sizeInterpolation + SWIPER_PADDING,
        marginTop: HANDLER_SIZE / 2
    }

    const swiperVariableStyle = {
        height: SWIPER_HEIGHT
    }

    return (
        <View style={[localStyle.container, containerVariableStyle]}>
            <View style={[localStyle.swiper, swiperVariableStyle]}>
                <Text style={[localStyle.onLabel, globalStyles.mbContainer]}>{onLabel}</Text>
                <LinearGradient
                    colors={[variables.color.dark, variables.color.grey]}
                    start={{x: 0, y: 1}}
                    end={{x: 1, y: 0}}
                    style={localStyle.swiperGradient}></LinearGradient>
                <PanGestureHandler onGestureEvent={handlerGestureEvent}>
                    <Animated.View style={[localStyle.swiperHandler, animatedStyle, handlerVariableStyle]}>
                        <Text style={localStyle.handlerLabel}>{handlerLabel}</Text>
                    </Animated.View>
                </PanGestureHandler>
                <Text style={[localStyle.onLabel, globalStyles.mtContainer]}>{offLabel}</Text>
            </View>
        </View>
    )

}

const localStyle = StyleSheet.create({
    container: {
        alignItems: "center"
    },

    swiper: {
        padding: SWIPER_PADDING,
        alignItems: "center",
        justifyContent: "center"
    },

    swiperGradient: {
        flex: 1,
        width: SWIPER_WIDTH,
        borderRadius: SWIPER_WIDTH / 2,
    },

    swiperHandler: {
        position: "absolute",
        bottom: SWIPER_PADDING,
        alignItems: "center",
        justifyContent: "center",
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: 0.5
    },

    onLabel: {
        color: variables.color.grey
    },

    handlerLabel: {
        color: variables.color.dark
    }
})