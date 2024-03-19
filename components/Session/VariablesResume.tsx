import {RawVariableType} from "../../shared/types/SessionType";
import { FlatList} from "react-native";
import VariableItem from "./VariableItem";
import {globalStyles} from "../../shared/globalStyles";

type VariablesResumeOptions = {
    variables: RawVariableType[],
    textStyle?: object[],
    theme?: "dark" | "light",
    containerStyle?: object[]
}

export default function VariablesResume({variables, containerStyle, theme}: VariablesResumeOptions) {
    
    const titleColor = theme === "dark" ? globalStyles.textLight : {}

    return (
        
        <FlatList
            data={variables}
            renderItem={({item}) => (
                <VariableItem id={item._id} variable={item} theme={theme} />
            )}
            style={globalStyles.sessionResumeContainer} 
              
        />
    )
}
