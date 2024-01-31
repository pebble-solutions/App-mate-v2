import { variables } from "../globalStyles"

export type ActivityType = {
    _id: string,
    label: string,
    description?: string,
    status: string,
    color: string,
    variables: [],
}