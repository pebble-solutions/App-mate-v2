import {Text, View, TouchableOpacity } from "react-native";  
import {globalStyles} from "../shared/globalStyles";
import { ActivityType } from "../shared/types/ActivityType";    

type RenderItemType = {
    activity: ActivityType;
    title: string;
};

export default function renderItem({} : RenderItemType) {
    
    return (
        <View style={globalStyles.pContainer}>
            <Text style={globalStyles.text}>composants render item</Text>
        
            <TouchableOpacity onPress={() => console.log("test")}>
                <Text style={globalStyles.text}>test</Text>
            </TouchableOpacity>
        </View>
                
    )
}