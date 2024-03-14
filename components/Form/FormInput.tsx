import {StyleSheet, Text, View} from "react-native";
import {globalStyles, variables} from "../../shared/globalStyles";
import TextInputC from "./TextInputC";
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
    index: number
}

export default function FormInput({label, type, value, placeholder, onChange, labelStyle, style, index}: FormInputOptions) {

    type = type || "text"

    let component;

    switch (type) {
        case "text":
            component = <TextInputC value={value} onChange={onChange} placeholder={placeholder} />
            break
        case "textarea":
            component = <TextInputC value={value} onChange={onChange} placeholder={placeholder} multiline={true} />
            break
        case "number":
            component = <NumberInput value={value} onChange={onChange} placeholder={placeholder} />
            break
        case "float":
            component = <NumberInput value={value} onChange={onChange} placeholder={placeholder} />
            break
        case "integer":
            component = <NumberInput value={value} onChange={onChange} placeholder={placeholder} />
            break
        case "boolean":
            component = <BooleanInput value={value} onChange={onChange} placeholder={placeholder} trueLabel={'OUI'} falseLabel="NON" />
            break
        case "date":
            component = <DateTimeInput value={value} onChange={onChange} placeholder={placeholder} type={"date"} />
            break
        case "time":
            component = <DateTimeInput value={value} onChange={onChange} placeholder={placeholder} type={"time"} />
            break
        case "datetime":
            component = <DateTimeInput value={value} onChange={onChange} placeholder={placeholder} type={"datetime"} />
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