import {RawVariableType} from "../../shared/types/SessionType";
import {View, StyleSheet, FlatList} from "react-native";
import VariableItem from "./VariableItem";
import Title from "../Title";
import {globalStyles, variables} from "../../shared/globalStyles";

type VariablesResumeOptions = {
    variables: RawVariableType[],
    textStyle?: object[],
    theme?: "dark" | "light",
    containerStyle?: object[]
}

export default function VariablesResume({variables, containerStyle, theme}: VariablesResumeOptions) {
    console.log(variables, 'variables')

    const titleColor = theme === "dark" ? globalStyles.textLight : {}

    return (<View style={[containerStyle]}>
        
        <FlatList
            data={variables}
            renderItem={({item}) => (
                <VariableItem id={item._id} variable={item} theme={theme} />
            )}
            style={localStyle.container} 
              
        />
    </View>)
}
const localStyle = StyleSheet.create({
    container: {
        borderTopColor: variables.color.grey,
        borderTopWidth: 1,
        borderBottomColor: variables.color.grey,
        borderBottomWidth: 1,
        backgroundColor: variables.color.black,
    }
})