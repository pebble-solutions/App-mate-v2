import {TimelineOptions} from "./TimelineOptions";

export type ValidationButtonOptions = TimelineOptions & {
    size?: number,
    onPress?: () => void
}