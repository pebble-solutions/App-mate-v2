import {useState} from "react";
import { View , Text, StyleSheet } from "react-native";
import { ActivityType } from "../../shared/types/ActivityType";
import {globalStyles} from '../../shared/globalStyles';
import DateTimeInput from "../Form/DateTimeInput";

type CreationFormOptions = {
    activity: ActivityType
    onDateChange: () => void
}

export default function CreationForm({ activity, onDateChange }: CreationFormOptions) {
    const [selectedDate, setSelectedDate] = useState<Date | null>(activity.start ? activity.start : new Date());

    const handleDateChange = (newDate: Date | null) => {
        setSelectedDate(newDate);
         onDateChange()
    };

    return (
        <View style = {localStyle.flex}>
            <Text style={[globalStyles.textLight, globalStyles.mContainer]}> Choisissez une date de début  
            </Text> 
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
    flex:{
        flex : 0.4
    }
})

