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
    start?: string | null,
    end?: string | null,
    question?: string | null,
    description?: string | null,
    type: string |null,
    example?: string | null,
    min_value?: number | null,
    max_value?: number | null,
    default_value?: string | null
    min_length?: number | null,
    max_length?: number | null,
    file_upload_guide?: string | null,
    file_upload_required?: boolean | null,
    file_upload_enabled?: boolean | null,
    comment_guide?: string | null,
    comment_enabled?: boolean | null,
    comment_required?: boolean | null,
    ref_in?: string | null,
    ref_out?: string | null,
    list_params?: string | null,
    interval?: number | null,
    value: string | number | boolean | Date | undefined,
}
export type itemType = {
    _id: string,
    label: string,
    type: string,
    value: string,
}


    
