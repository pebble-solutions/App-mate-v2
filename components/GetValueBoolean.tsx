import React, { useState } from "react";
import { Switch as RNSwitch, View, Text, SwitchProps } from 'react-native';
import { globalStyles } from "../shared/globalStyles";
import { VariableType } from "../shared/types/VariableType";
import ButtonPrevNext from "./TunnelsButton";
import { router } from "expo-router";

interface BooleanResponse {
  _id: string;
  label: string;
  question: string;
  // Ajoutez d'autres propriétés au besoin
}

interface ResponseBooleanProps {
  varBoolean: VariableType;
}

const ResponseBoolean: React.FC<ResponseBooleanProps> = ({ varBoolean }) => {
  const [response, setResponse] = React.useState<BooleanResponse>({
    _id: varBoolean._id,
    label: varBoolean.label,
    question: varBoolean.question,
    value: '',
  });

  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [displayText, setDisplayText] = useState<string>("Non");

  const toggleSwitch = () => {
    const newEnabledState = !isEnabled;

    setIsEnabled(newEnabledState);
    setDisplayText(newEnabledState ? "Oui" : "Non");
    setResponse((prevResponse) => ({
      ...prevResponse,
      value: newEnabledState.toString(),
    }));
  };

  return (
    <View>
      <Text style={globalStyles.textLight}>{varBoolean.question}</Text>
      <View style={globalStyles.input}>
        <Text style={globalStyles.textLight}>{displayText}</Text>
        <RNSwitch
          trackColor={{ false: '#767577', true: '	#90EE90' }}
          thumbColor={isEnabled ? '#7FFF00' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <ButtonPrevNext 
        onPress1={() =>  router.back() }
        onPress2={()=> console.log('suivant')}
        buttonName1="< Précédent"
        buttonName2="Suivant >"
        />  
    </View>
  );
}

export default ResponseBoolean;
