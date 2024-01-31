export type SessionType = {
    _id: string,
    type: string,
    typeId: string,
    label: string,
    comment: string,
    start: Date,
    end: Date,
    status: string,
    owner: Array<{
        _id: string,
        firstName: string,
        lastName: string,
        matricule: string,
        }>,
    raw_datas: Array<[
        {
            index: number,
            start: Date,
            end: Date,
        }
    ]>,
    raw_variables: Array<[
        {
            _id: string,
            label: string,
            value: string | number | boolean | undefined,
        }
    ]>,
}
        
    
