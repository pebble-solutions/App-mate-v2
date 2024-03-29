import {DateTimeInputType, NumberInputType} from "./InputType";

export type InputOptions = {
    onChange?: (newVal: any) => void,
    value?: any,
    placeholder?: string,
    options?: InputCustomOptions,
    id: string
}

type InputCustomOptions = {
    secureTextEntry?: boolean
}

export type DateTimeInputOptions = Omit<InputOptions, 'value' | 'onChange'> & {
    value?: Date | null,
    onChange?: (newVal: Date | null) => void,
    type?: DateTimeInputType
    id: string
}

export type NumberInputOptions = Omit<InputOptions, 'value' | 'onChange'> & {
    value?: number | null,
    onChange?: (newVal: number | null) => void,
    type?: NumberInputType
    id: string
}

export type TextInputOptions = Omit<InputOptions, 'value'> & {
    value?: string,
    multiline?: boolean
    id: string
}