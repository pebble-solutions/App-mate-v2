import {useState} from "react";
import { View } from "react-native";
import { ActivityType } from "../../shared/types/ActivityType";
import {globalStyles} from '../../shared/globalStyles';
import DateTimeInput from "../Form/DateTimeInput";

type CreationFormOptions = {
    activity: ActivityType
    onDateChange?: (newDate: Date | null) => void
}

export default function CreationForm({ activity, onDateChange }: CreationFormOptions) {
    const [selectedDate, setSelectedDate] = useState<Date | null>(activity.start ? activity.start : new Date());

    const handleDateChange = (newDate: Date | null) => {
        setSelectedDate(newDate);
        // onDateChange(newDate)
    };

    return (
        <View style={[globalStyles.input]}>
            <DateTimeInput 
                value={selectedDate}
                type="date"
                onChange={handleDateChange}
            />
        </View>
    );
}


