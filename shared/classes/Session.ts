import {OwnerType, RawDataType, RawVariableType, SessionType} from "../types/SessionType";

export class Session implements SessionType {

    _id: string;
    comment: string;
    end?: Date;
    label: string;
    owner: OwnerType;
    raw_datas: RawDataType[];
    raw_variables: RawVariableType[];
    start: Date;
    status: string;
    readonly type: string;
    type_id: string;

    constructor(session?: any) {

        if (session.type && session.type !== "activity") {
            console.warn("Le type de session n'est ("+session.type+") pas pris en charge, initialisation d'une " +
                "session vide.")
            session = {}
        }

        session = {
            start: new Date(),
            ...session
        }
        this.start = new Date(session.start)
        this.end = session.end ? new Date(session.end) : undefined
        this._id = session._id
        this.comment = session.comment
        this.label = session.label
        this.owner = session.owner
        this.raw_datas = session.raw_datas
        this.raw_variables = session.raw_variables
        this.status = session.status
        this.type = "activity"
        this.type_id = session.type_id
    }
}