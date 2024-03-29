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
    style?: object[],
    id?: string
}

export default function FormInput({label, type, value, placeholder, onChange, labelStyle, style, options, id}: FormInputOptions) {

    type = type || "text"

    let component;

    switch (type) {
        case "text":
            component = <TextInput value={value} onChange={onChange} placeholder={placeholder} options={options} id={id} />
            break
        case "textarea":
            component = <TextInput value={value} onChange={onChange} placeholder={placeholder} multiline={true} options={options} id={id} />
            break
        case "number":
            component = <NumberInput value={value} onChange={onChange} placeholder={placeholder} id={id}/>
            break
        case "float":
            component = <NumberInput value={value} onChange={onChange} placeholder={placeholder} id={id}/>
            break
        case "integer":
            component = <NumberInput value={value} onChange={onChange} placeholder={placeholder} id={id}/>
            break
        case "boolean":
            component = <BooleanInput value={value} onChange={onChange} placeholder={placeholder} trueLabel={'OUI'} falseLabel="NON"id={id} />
            break
        case "date":
            component = <DateTimeInput value={value} onChange={onChange} placeholder={placeholder} type={"date"} id={id}/>
            break
        case "time":
            component = <DateTimeInput value={value} onChange={onChange} placeholder={placeholder} type={"time"} id={id}/>
            break
        case "datetime":
            component = <DateTimeInput value={value} onChange={onChange} placeholder={placeholder} type={"datetime"} id={id}/>
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