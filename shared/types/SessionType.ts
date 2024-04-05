import {MetricSequence} from "../classes/MetricSequence";

export type SessionProvidedBy = "manual" | "cron" | null

export type JsonSessionType = {
    _id: string,
    type: string,
    type_id: string,
    label: string,
    comment: string | null,
    start: string,
    end?: string | null,
    date_timezone: string | null,
    owner: string | null,
    raw_datas: RawDataType[],
    raw_variables: RawVariableType[],
    is_active: boolean
    provided_by: SessionProvidedBy
}

export type SessionType = Omit<JsonSessionType, "raw_datas" | "start" | "end"> & {
    start: Date,
    end?: Date | null,
    raw_datas: MetricSequence,
}

export type RawDataType = {
    start: string,
    end?: string | null,
}

export type RawVariableType = {
    variable_id: string,
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
    value?: string | number | boolean | Date | null,
}
