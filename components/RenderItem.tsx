import React from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { globalStyles } from "../shared/globalStyles";
import { VariableType } from "../shared/types/VariableType";
import { useSessionContext } from "../shared/contexts/SessionContext";
import { useSessionStatusContext } from "../shared/contexts/SessionStatusContext";
import RenderForm from "./RenderFormVariable";
import { RawVariableType, SessionType } from "../shared/types/SessionType";

export default function RenderItem({ variables }: { variables: VariableType[] }, currentSession: SessionType) {
  const sessionContext = useSessionContext();
  const { getStatus, setStatus, resetStatus, setPayload, resetPayload, getPayload } = useSessionStatusContext();
  const [isVisible, setIsVisible] = React.useState(true);
  const [formGetValue, setformGetValue] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<VariableType | null>(null);
  const [rawVariables, setRawVariables] = React.useState<RawVariableType[]>([]);
  let sessionCopy = {...currentSession};


  const handleRawVariablesChange = (newRawVariables: RawVariableType[]) => {
    setRawVariables(newRawVariables);
  };

  const handlePress = (variable: VariableType) => {
    setIsVisible(!isVisible);
    setformGetValue(!formGetValue);
    setSelectedItem(variable);
  };

  const renderFormItem = () => {
    if (!selectedItem) return null;
    else {
      console.log('handlepress', selectedItem);
      return (
        <View style={globalStyles.cardSession}>
          {rawVariables.map((rawVariable, index) => (
            <Text key={index} style={globalStyles.textLight}>
                {rawVariable.label}: {rawVariable.value}
            </Text>
            ))}
          {formGetValue && <RenderForm item={selectedItem} onRawVariablesChange={handleRawVariablesChange} />}
        
        </View>
      );
    }
  };

  console.log(variables, 'variables');
  return (
    <View >
        
      {isVisible && (
        <View>
          <View>
            {variables.length == 0 && <Text style={[globalStyles.variableCardTitle, globalStyles.textLight]}>Il n'y a pas de variable associée à cette activité</Text>}
            {variables.length == 1 && <Text style={[globalStyles.variableCardTitle, globalStyles.textLight]}>{variables.length} variable associée à renseigner</Text>}
            {variables.length > 1 && <Text style={[globalStyles.variableCardTitle, globalStyles.textLight]}>{variables.length} variables à renseigner</Text>}
          </View>
          <ScrollView style={globalStyles.scrollContainerVariable} >
          {variables.map((variable, index) => {
            return (
                <View key={index}>
                    <TouchableOpacity style={[globalStyles.cardSession]} onPress={() => handlePress(variable)}>
                    <View>
                        <Text style={globalStyles.textLight}>{variable.question}</Text>
                        <Text style={globalStyles.textLight}>{variable.type}</Text>
                        <Text style={globalStyles.textLight}>{variable.mandatory}</Text>
                    </View>
                    </TouchableOpacity>
                </View>
            );
        })}
        </ScrollView>
        </View>
      )}
      {renderFormItem()}
    </View>
  );
}
