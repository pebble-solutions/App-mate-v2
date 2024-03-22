import {DateTimeInputType, NumberInputType} from "./InputType";

export type InputOptions = {
    onChange?: (newVal: any) => void,
    value?: any,
    placeholder?: string
}

export type DateTimeInputOptions = Omit<InputOptions, 'value' | 'onChange'> & {
    value?: Date | null,
    onChange?: (newVal: Date | null) => void,
    type?: DateTimeInputType,
    min?: Date | null,
    max?: Date | null
}

export type NumberInputOptions = Omit<InputOptions, 'value' | 'onChange'> & {
    value?: number | null,
    onChange?: (newVal: number | null) => void,
    type?: NumberInputType
}

export type TextInputOptions = Omit<InputOptions, 'value'> & {
    value?: string,
    multiline?: boolean
}