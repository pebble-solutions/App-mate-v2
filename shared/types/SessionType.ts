export type SessionType = {
    _id: string,
    type: string,
    type_id: string,
    label: string,
    comment: string,
    start: Date,
    end?: Date,
    status: string,
    owner: OwnerType,
    raw_datas: RawDataType[],
    raw_variables: RawVariableType[],
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
    end: Date,
}
export type RawVariableType = {
    _id: string,
    label: string,
    value: string | number | boolean | Date | undefined,
    type:  string | number | boolean | Date | undefined,


    
