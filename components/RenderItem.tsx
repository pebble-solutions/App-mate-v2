import {Text, View, TouchableOpacity } from "react-native";  
import {globalStyles} from "../shared/globalStyles";




export default function renderItem({isVisible}: {isVisible: boolean}) {
    return(
        <View >
            {isVisible ? (
                <View >
                    <TouchableOpacity onPress={() => console.log("test")}>
                        <Text style={globalStyles.textLight}>ici tunnel</Text>
                    </TouchableOpacity>
                </View>
            ) : (   
                <View>
                    <Text style={globalStyles.textLight}>pas visible</Text>
                </View>
            )}
            <TouchableOpacity onPress={() => console.log("test")}>
                <Text style={globalStyles.textLight}>sans condition</Text>
            </TouchableOpacity>
        </View> 
    )

    
    
}