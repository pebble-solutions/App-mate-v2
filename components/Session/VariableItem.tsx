import {RawVariableType} from "../../shared/types/SessionType";
import {Text, View} from "react-native";
import {globalStyles} from "../../shared/globalStyles";

type VariableItemOptions = {
    variable: RawVariableType,
    containerStyle?: object[],
    theme?: "dark" | "light"
}

export default function VariableItem({variable, theme}: VariableItemOptions) {

    let value: string;

    const labelStyle = theme === "dark" ? globalStyles.textLightGrey : globalStyles.textGrey
    const valueStyle = variable.value ? (theme === "dark" ? globalStyles.textLight : {}) : labelStyle

    if (variable.value instanceof Date) {
        if (variable.type === "date") {
            value = variable.value.toLocaleDateString()
        }
        else if (variable.type === "time") {
            value = variable.value.toLocaleTimeString()
        }
        else {
            value = variable.value.toLocaleString()
        }
    }
    else {
        value = variable.value ? variable.value.toString() : "Non-renseigné"
    }

    return (<View style={globalStyles.mvContainer}>
        <Text style={labelStyle}>{variable.label}</Text>
        <Text style={valueStyle}>{value}</Text>
    </View>)
}