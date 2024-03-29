import {ActivityType, JsonActivityType} from "../types/ActivityType";
import {ActivityVariableType, VariableType} from "../types/VariableType";
import {RawDataType} from "../types/SessionType";

export class Activity implements ActivityType {

    static DEFAULT_COLOR = "#262729";

    _id: string;
    label: string;
    description?: string;
    color: string;
    start: Date;
    variables: ActivityVariableType[];
    is_active: boolean;

    constructor(activity: any) {
        this._id = activity._id;
        this.label = activity.label;
        this.description = activity.description;
        this.color = !activity.color || !this.isValidColor(activity.color) ? Activity.DEFAULT_COLOR : activity.color;
        this.start = activity.start ? new Date(activity.start) : new Date();
        this.variables = activity.variables || [];
        this.is_active = activity.is_active || false;
    }

    setColor(color: string) {
        if (!this.isValidColor(color)) {
            throw new Error('La couleur n\'est pas valide. seuls les codes hexadécimaux sont autorisés.');
        }
        this.color = color;
    }

    isValidColor(color: string): boolean {
        return !!color.match(/^#[0-9a-fA-F]{3,6}$/);
    }

    json(): JsonActivityType {
        return {
            ...this,
            start: this.start.toISOString()
        }
    }
}
