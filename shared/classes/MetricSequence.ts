import {MetricSequenceRecord} from "./MetricSequenceRecord";
import {SequenceItemType, SequenceType} from "../types/SequenceType";
import {diffDate} from "../libs/date";

export class MetricSequence {

    currentIndex: number

    records: MetricSequenceRecord[]

    constructor() {
        this.currentIndex = 0
        this.records = []
    }

    /**
     * Add new sequence item onto the metric sequence
     *
     * @param sequenceItem
     *
     * @return              Return the generated item index
     */
    addOne(sequenceItem: SequenceItemType) {
        this.records.push(new MetricSequenceRecord(sequenceItem, this.currentIndex))
        this.currentIndex += 1
        return this.currentIndex - 1
    }

    /**
     * Add multiple sequence item onto the metric sequence
     *
     * @param sequenceItems
     *
     * @return              List of generated index
     */
    addMany(sequenceItems: SequenceItemType[]) {
        let indexes: number[] = []
        sequenceItems.forEach(e => {
            const i = this.addOne(e)
            indexes.push(i)
        })
        return indexes
    }

    /**
     * Get sequence item with the provided index
     *
     * @param index
     */
    getOne(index: number) {
        return this.records.find(e => e.index === index)
    }

    /**
     * Get records from a list of indexes
     *
     * @param indexes
     */
    getMany(indexes: number[]) {
        return this.records.filter(e => indexes.includes(e.index))
    }

    /**
     * Remove sequence item with the provided index
     *
     * @param index
     */
    removeOne(index:number) {
        const i = this.records.findIndex(e => e.index === index)

        if (i !== -1) {
            this.records.splice(i, 1)
        }
    }

    /**
     * Remove items from a list of indexes
     *
     * @param indexes
     */
    removeMany(indexes: number[]) {
        indexes.forEach(i => {
            this.removeOne(i)
        })
    }

    /**
     * Update an existing record with new sequence item values (replace all values)
     *
     * @param index
     * @param sequenceItem
     */
    updateOne(index: number, sequenceItem: SequenceItemType) {
        const record = this.getOne(index)

        if (record) {
            record.start = sequenceItem[0]
            record.end = sequenceItem[1]
        } else {
            throw new Error("Index not found ("+index+")")
        }
    }

    /**
     * Update multiple records with new sequence item values (replace multiple values)
     *
     * @param indexes         List of indexes of records to update
     * @param sequenceItems   List of new sequence items
     */
    updateMany(indexes: number[], sequenceItems: SequenceItemType[]) {
        if (indexes.length !== sequenceItems.length) {
            console.log("Indexes : ", indexes);
            console.log("SequenceItems : ", sequenceItems);
            throw new Error("Length mismatch between indexes and sequence items");
        }

        indexes.forEach((index, i) => {
            this.updateOne(index, sequenceItems[i]);
        });
    }

     /**
      * Update all records with new sequence item values (replace all values)
      *
      * @param sequenceItems   List of new sequence items
      */
     updateAll(sequenceItems: SequenceItemType[]) {
         const indexesToUpdate: number[] = this.records.map(record => record.index);

         this.updateMany(indexesToUpdate, sequenceItems);
     }

    /**
     * Convert all records onto session sequence.
     */
    getSequence(): SequenceType {
        let sequence: SequenceType = []

        this.records.forEach(record => {
            sequence.push([record.start, record.end])
        })

        return sequence
    }

    /**
     * Return the duration of all sequence items
     *
     * @return          Number of seconds
     */
    getTime(): number {
        let timer = 0

        this.records.forEach(record => {
            timer += diffDate(record.start, record.end || new Date()) / 1000
        })

        return timer
    }
}