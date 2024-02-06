import { VariableType } from "./VariableType"

export type ActivityType = {
    _id: string,
    label: string,
    description?: string,
    color: string,
    start: Date ,
    variables: VariableType[],
    is_active: boolean
}

