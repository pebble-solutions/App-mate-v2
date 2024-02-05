import { VariableType } from "./VariableType"

export type ActivityType = {
    _id: string,
    label: string,
    description?: string,
    color: string,
    start: string,
    variables: VariableType[],
    status: string,
}

