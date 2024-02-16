import {LinearGradient} from "expo-linear-gradient";
import {getRGBGradientColors} from "../../shared/libs/color";
import {Activity} from "../../shared/classes/Activity";
import {ReactNode} from "react";
import {ActivityType} from "../../shared/types/ActivityType";

type GradientOption = {
    activity?: ActivityType
    color?: string
    style?: object | object[]
    children?: ReactNode
}

export default function ActivityGradient({activity, style, color, children}: GradientOption) {

    color = activity ? activity.color : color || Activity.DEFAULT_COLOR

    const colors = getRGBGradientColors(color)

    return (
        <LinearGradient
            colors={colors}
            start={{x: 0, y: 1}}
            end={{x: 1, y: 0}}
            style={style}>
            {children}
        </LinearGradient>
    )
}