import {Text, View, TouchableOpacity } from "react-native";  
import {globalStyles} from "../shared/globalStyles";




export default function renderItem() {
    
    return (
        <View style={globalStyles.cardSession}>
            <TouchableOpacity onPress={() => console.log("test")}>
                <Text style={globalStyles.textLight}>test GetValue</Text>
            </TouchableOpacity>
        </View>
                
    )
}