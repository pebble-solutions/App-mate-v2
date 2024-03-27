import {RawVariableType} from "../../shared/types/SessionType";
import {ViewStyle} from "react-native";
import VariableItem from "./VariableItem";
import {ScrollList} from "../ScrollList/ScrollList";
import {ReactNode} from "react";
import {VariableValueType} from "../../shared/types/VariableType";

type VariablesResumeOptions = {
    variables: RawVariableType[],
    style?: ViewStyle | ViewStyle[],
    theme?: "dark" | "light",
    onValueChange?: (variableId: string, value: VariableValueType) => void
}

export default function VariablesList({variables, style, theme, onValueChange}: VariablesResumeOptions) {
    console.log(variables, 'variables in list')
    const items: ReactNode[] = []

    const handleChangeValue = (variableId: string, newVal: VariableValueType) => {
        if (onValueChange) onValueChange(variableId, newVal)
    }

    variables.forEach((variable) => {
        
            items.push(<VariableItem
                id={variable._id}
                variable={variable}
                theme={theme}
                onChange={(newVal) => handleChangeValue(variable._id, newVal)}
            />)
        

    })

    return (
        <ScrollList items={items} style={style} />
    )
}
