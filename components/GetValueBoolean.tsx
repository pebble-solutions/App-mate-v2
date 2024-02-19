import React, { useState } from "react";
import { Switch as RNSwitch, View, Text, SwitchProps } from 'react-native';
import { globalStyles } from "../shared/globalStyles";
import { RawVariableType } from "../shared/types/SessionType";




type ResponseBooleanType = {
  varBoolean: RawVariableType;
  onRawVariablesChange: (rawVariables: RawVariableType[]) => void; // Fonction de rappel pour passer les rawVariables au composant parent

}

const GetValueBoolean: React.FC<ResponseBooleanType> = ({ varBoolean, onRawVariablesChange }) => {
  const [response, setResponse] = React.useState({
    _id: varBoolean._id,
    label: varBoolean.label,
    value: '',
  });
  const [rawVariables, setRawVariables] = useState<RawVariableType[]>([]);
  const handleChange = (text: string) => {
    setResponse(prev => ({ ...prev, value: text }));
  };
  

  const validate = () => {
    // Ajoute la réponse au tableau des réponses brutes
    setRawVariables(prev => [...prev, response]);
    console.log(response);
    onRawVariablesChange(rawVariables);

  };
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
     
    </View>
  );
}

export default GetValueBoolean;
function setRawVariables(arg0: (prev: any) => any[]) {
    throw new Error("Function not implemented.");
}

