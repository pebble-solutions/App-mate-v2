import {ActivityVariableType} from "./VariableType"

export type JsonActivityType = {
    _id: string,
    label: string,
    description?: string,
    color: string,
    start: string,
    variables: ActivityVariableType[],
    is_active: boolean
}

export type ActivityType = Omit<JsonActivityType, "start"> & {
    start: Date,
}

