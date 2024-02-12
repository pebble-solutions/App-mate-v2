import React, { useState } from "react";
import { Switch as RNSwitch, View, Text } from 'react-native';
import { globalStyles } from "../shared/globalStyles";

const ResponseBoolean = ({ varBoolean }) => {
  const [response, setResponse] = React.useState({
    'id': varBoolean._id,
    'label': varBoolean.label,
    'value': '',
  });
  console.log(response, ' response')
  const [isEnabled, setIsEnabled] = useState();
  const [displayText, setDisplayText] = useState("Non");

  const toggleSwitch = () => {
    const newEnabledState = !isEnabled;

    setIsEnabled(newEnabledState);
    setDisplayText(newEnabledState ? "Oui" : "Non");
    setResponse((prevResponse) => ({
      ...prevResponse,
      value: newEnabledState,

    }));
    console.log(newEnabledState, 'value finale')
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
    </View>
  );
}

export default ResponseBoolean;


  
