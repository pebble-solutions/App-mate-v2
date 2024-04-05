import {JsonSessionType, RawDataType, RawVariableType, SessionProvidedBy, SessionType} from "../types/SessionType";
import {SequenceItemType, SequenceType} from "../types/SequenceType";
import {MetricSequence} from "./MetricSequence";

export class Session implements SessionType {

    _id: string;
    comment: string | null;
    end: Date | null;
    date_timezone: string | null;
    label: string;
    owner: string | null;
    raw_datas: MetricSequence;
    raw_variables: RawVariableType[];
    start: Date;
    readonly type: string;
    type_id: string;
    is_active: boolean
    provided_by: SessionProvidedBy

    constructor(session?: any) {

        if (session.type && session.type !== "activity") {
            console.warn("Le type de session ("+session.type+") n'est pas pris en charge, initialisation d'une " +
                "session vide.")
            session = {}
        }

        session = {
            start: new Date(),
            ...session
        }

        this.start = new Date(session.start)
        this.end = session.end ? new Date(session.end) : null
        this.date_timezone = session.date_timezone || null
        this._id = session._id
        this.comment = session.comment || ""
        this.label = session.label || "Pointage du "+this.start.toLocaleDateString()
        this.owner = session.owner || null
        this.raw_datas = session.raw_datas instanceof MetricSequence ? session.raw_datas : new MetricSequence()
        if (typeof session.raw_datas === "object" && !(session.raw_datas instanceof MetricSequence)) {
            let sequence: SequenceItemType[] = []

            session.raw_datas.forEach((e: {start: string, end?: string}) => {
                sequence.push([new Date(e.start), e.end ? new Date(e.end) : null])
            })

            this.raw_datas.addMany(sequence)
        }
        this.raw_variables = session.raw_variables || []
        this.type = "activity"
        this.type_id = session.type_id
        this.is_active = typeof session.is_active === "undefined" ? true : session.is_active
        this.provided_by = session.provided_by || null
    }

    /**
     * Add a new sequence item to the raw data sequence
     *
     * @param sequenceItem
     *
     * @return {number}         Return the item index
     */
    addSequenceItem(sequenceItem: SequenceItemType): number {
        return this.raw_datas.addOne(sequenceItem)
    }

    /**
     * Remove sequence item with its index
     */
    removeSequenceItem(index: number) {
        this.raw_datas.removeOne(index)
    }

    updateSequenceItem(index: number, sequenceItem: SequenceItemType) {
        this.raw_datas.updateOne(index, sequenceItem)
    }

    /**
     * Return true if the session is currently started
     *
     * Session is started when the last item of the sequence records has a start date and null end date
     */
    isStarted() {
        if (this.raw_datas.records.length) {
            const lastRecord = this.raw_datas.records[this.raw_datas.records.length-1]
            return !lastRecord.end
        }

        return false
    }

    json(): JsonSessionType {
        let raw_datas: RawDataType[] = []
        this.raw_datas.records.forEach(record => {
            raw_datas.push({
                start: record.start.toISOString(),
                end: record.end ? record.end.toISOString() : null
            })
        })

        return {
            ...this,
            start: this.start.toISOString(),
            end: this.end ? this.end.toISOString() : null,
            raw_datas
        }
    }
}