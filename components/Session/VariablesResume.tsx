import {RawVariableType} from "../../shared/types/SessionType";
import {View} from "react-native";
import VariableItem from "./VariableItem";
import Title from "../Title";
import {globalStyles} from "../../shared/globalStyles";

type VariablesResumeOptions = {
    variables: RawVariableType[],
    textStyle?: object[],
    theme?: "dark" | "light",
    containerStyle?: object[]
}

export default function VariablesResume({variables, containerStyle, theme}: VariablesResumeOptions) {

    const titleColor = theme === "dark" ? globalStyles.textLight : {}

    return (<View style={[containerStyle]}>
        <Title title={"Résumé des informations fournies"} style={[globalStyles.mb2Container, titleColor]} />
        {variables.map(variable => (
            <VariableItem
                variable={variable}
                theme={theme}
                key={variable._id}
            />
        ))}
    </View>)
}