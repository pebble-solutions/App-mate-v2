import { Text, View } from "react-native";
import { globalStyles } from "../../shared/globalStyles";
import TextInput from "./TextInput";
import NumberInput from "./NumberInput";
import DateTimeInput from "./DateTimeInput";
import BooleanInput from "./BooleanInput";
import {InputType} from "../types/InputType";
import {InputOptions} from "../types/InputOptions";

type FormInputOptions = InputOptions & {
    label?: string,
    type?: InputType
}

export default function FormInput({label, type, value, placeholder, onChange}: FormInputOptions) {

    let component;

    switch (type) {
        case "text":
            component = <TextInput value={value} onChange={onChange} placeholder={placeholder} />
            break
        case "textarea":
            component = <TextInput value={value} onChange={onChange} placeholder={placeholder} multiline={true} />
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
            component = <BooleanInput value={value} onChange={onChange} placeholder={placeholder} />
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
        <View style={globalStyles.VariableCardContent}>
            {label && <Text style={[globalStyles.CategoryTitle, globalStyles.textLight]}>{label}</Text>}
            {component}
        </View>
    )

}
