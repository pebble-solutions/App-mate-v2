import {MetricSequence} from "../classes/MetricSequence";

export type SessionType = {
    _id: string,
    type: string,
    type_id: string,
    label: string,
    comment: string | null,
    start: Date,
    end?: Date | null,
    owner: OwnerType,
    raw_datas: MetricSequence,
    raw_variables: RawVariableType[],
    is_active: boolean
}
export type OwnerType = {
    _id: string,
    firstName: string,
    lastName: string,
    matricule: string,
}
export type RawDataType = {
    index?: number,
    start: Date,
    end?: Date | null,
}
export type RawVariableType = {
    _id: string,
    label: string,
    value: string | number | boolean | Date | undefined,
}


    
