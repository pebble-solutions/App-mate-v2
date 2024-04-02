import {StyleSheet, Text, View} from "react-native";
import {globalStyles, variables} from "../../shared/globalStyles";
import TextInput from "./TextInput";
import NumberInput from "./NumberInput";
import DateTimeInput from "./DateTimeInput";
import BooleanInput from "./BooleanInput";
import {InputType} from "./types/InputType";
import {InputOptions} from "./types/InputOptions";

type FormInputOptions = InputOptions & {
    label?: string,
    type?: InputType,
    labelStyle?: object[]
    style?: object[]
}

export default function FormInput({
    type,
    labelStyle,
    label,
    ...rest
}: FormInputOptions) {

    type = type || "text"

    let component;

    switch (type) {
        case "text":
            component = <TextInput {...rest} />
            break
        case "textarea":
            component = <TextInput {...rest} multiline={true} />
            break
        case "number":
            component = <NumberInput {...rest} />
            break
        case "float":
            component = <NumberInput {...rest} />
            break
        case "integer":
            component = <NumberInput {...rest} />
            break
        case "boolean":
            component = <BooleanInput {...rest} trueLabel={'OUI'} falseLabel="NON" />
            break
        case "date":
            component = <DateTimeInput {...rest} type={"date"} />
            break
        case "time":
            component = <DateTimeInput {...rest} type={"time"} />
            break
        case "datetime":
            component = <DateTimeInput {...rest} type={"datetime"} />
            break
        default:
            component = <Text style={globalStyles.textLight}>Ce type de variable n'est pas traité dans cette application: {type}</Text>
    }

    return (
        <View style={localStyle.formGroup}>
            {label && <Text style={[localStyle.label, labelStyle]}>{label}</Text>}
            {component}
        </View>
    )

}

const localStyle = StyleSheet.create({
    label: {
        marginBottom: variables.contentMargin[1]
    },

    formGroup: {
        width: "100%",
        marginVertical: variables.contentMargin[2]
    }
})