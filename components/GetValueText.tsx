import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {globalStyles} from "../shared/globalStyles";


type ResponseTextType = {
    varText: string

}


export default function ResponseText({ varText }: ResponseTextType) {
    console.log(varText, ' varText')
  
    
    
  return (
    <View>
     
        <Text>
            {varText}
        </Text>
        <Text>{"Toto"}</Text>
        <TextInput
         
          placeholder="Saisissez votre réponse ici "
          
    
          value={""}
        />
      
    </View>
  );
}


