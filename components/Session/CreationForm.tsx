import {useState} from "react";
import { View , Text, StyleSheet } from "react-native";
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
        <View>
            {/* <Text style={[globalStyles.headTitle, globalStyles.textLight]}>{activity.label}</Text> */}
            <Text style={[globalStyles.textLight, globalStyles.mContainer]}> Choisissez une date de début </Text>
            <View style={globalStyles.card}>
                <DateTimeInput 
                    value={selectedDate}
                    type="date"
                    onChange={handleDateChange}
                    />
            </View>
        </View>
    );
}

 
const localStyle = StyleSheet.create({
    picker: {
        borderRadius: 100,
        color: "white"
        // width: "90%"
    }
})

