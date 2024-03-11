import {SequenceItemType} from "../types/SequenceType";

export class MetricSequenceRecord {
    index: number
    start: Date 
    end: Date | null 

    constructor(sequenceRecord: SequenceItemType, index: number) {
        this.index = index
        this.start = sequenceRecord[0]
        this.end = sequenceRecord[1]
    }
}