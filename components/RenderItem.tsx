import {Text, View, TouchableOpacity } from "react-native";  
import {globalStyles} from "../shared/globalStyles";
import { ActivityType } from "../shared/types/ActivityType";    

type RenderItemType = {
    activity: ActivityType;
    title: string;
};

export default function renderItem({}) {
    
    return (
        <View style={globalStyles.pContainer}>
            <Text style={globalStyles.text}>Variables</Text>
        
            <TouchableOpacity onPress={() => console.log("test")}>
                <Text style={globalStyles.text}>test</Text>
            </TouchableOpacity>
        </View>
                
    )
}