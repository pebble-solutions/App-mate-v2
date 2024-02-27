import React from "react";
import { Text, View, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import { globalStyles } from "../shared/globalStyles";
import { VariableType } from "../shared/types/VariableType";
import { useSessionContext } from "../shared/contexts/SessionContext";
import { useSessionStatusContext } from "../shared/contexts/SessionStatusContext";
import RenderForm from "./RenderFormVariable";
import { RawVariableType, SessionType } from "../shared/types/SessionType";

type RenderItemOptions = {
    variables: VariableType[];
    session: SessionType;
};

export default function RenderItem( { variables, session }: RenderItemOptions) {
  const sessionContext = useSessionContext();
  const { getStatus, setStatus, resetStatus, setPayload, resetPayload, getPayload } = useSessionStatusContext();
  const [isVisible, setIsVisible] = React.useState(true);
  const [formGetValue, setformGetValue] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<VariableType | null>(null);
  const [rawVariables, setRawVariables] = React.useState<RawVariableType[]>([]);
    

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
      return (
        <View style={globalStyles.cardSession}>
          {formGetValue && <RenderForm item={selectedItem} onRawVariablesChange={handleRawVariablesChange} />}
        </View>
      );
    }
  };

  return (
    <SafeAreaView >
      {isVisible && (
        <View>
          <View>
            {variables.length == 0 && <Text style={[globalStyles.variableCardTitle, globalStyles.textLight]}>Il n'y a pas de variable associée à cette activité</Text>}
            {variables.length == 1 && <Text style={[globalStyles.variableCardTitle, globalStyles.textLight]}>{variables.length} variable associée à renseigner</Text>}
            {variables.length > 1 && <Text style={[globalStyles.variableCardTitle, globalStyles.textLight]}>{variables.length} variables à renseigner</Text>}
          </View>
          <ScrollView  >
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
    </SafeAreaView>
  );
}
