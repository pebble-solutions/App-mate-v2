import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

type RawVariableType = {
  label: string;
  value: string | Date;
};

type SessionType = {
  _id: string;
  start: Date;
  raw_datas: { records: any[] };
  raw_variables: RawVariableType[];
};

type SummaryCardOptions = {
  onPress?: () => void;
  session: SessionType;
};

export function SummaryCard({ session }: SummaryCardOptions) {
  const [expandedVariables, setExpandedVariables] = useState(
    new Array(session.raw_variables.length).fill(false)
  );

  const toggleAccordion = (index: number) => {
    setExpandedVariables((prevExpandedVariables) => {
      const updatedExpandedVariables = [...prevExpandedVariables];
      updatedExpandedVariables[index] = !updatedExpandedVariables[index];
      return updatedExpandedVariables;
    });
  };

  const renderItemValue = (item: RawVariableType, index: number) => {
    return (
      <TouchableOpacity
        key={index}
        style={localStyle.cardContent}
        onPress={() => toggleAccordion(index)}
      >
        <Text style={globalStyles.textLight}>{item.label}: </Text>
        <Text style={globalStyles.textLight}>
          {item.value instanceof Date
            ? item.value.toLocaleString()
            : item.value}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View style={[localStyle.card]}>
        <View style={[localStyle.container]}>
          <TouchableOpacity onPress={() => console.log("previous", session._id)}>
            <AntDesign name="left" size={24} color={"white"} />
          </TouchableOpacity>
          <Text
            style={[
              globalStyles.sessionSubTitle,
              globalStyles.textCenter,
              globalStyles.textLight,
            ]}
          >
            {format(session.start, " d MMM yyy", { locale: fr })}
          </Text>
          <TouchableOpacity onPress={() => console.log("following", session._id)}>
            <AntDesign name="right" size={24} color={"white"} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[localStyle.card]}>
        <Text
          style={[
            globalStyles.sessionSubTitle,
            globalStyles.textCenter,
            globalStyles.textLight,
          ]}
        >
          Informations et variables
        </Text>
        {session.raw_variables.length > 0 ? (
          <View>
            <Text style={[globalStyles.textLight, globalStyles.textCenter]}>
              Nombre de variables: {session.raw_variables.length}
            </Text>
            {session.raw_variables.map((variable, index) => (
              <View key={index}>
                {renderItemValue(variable, index)}
                {expandedVariables[index] && (
                  <View style={localStyle.cardContent}>
                    {/* Ajoutez ici le contenu supplémentaire pour chaque variable si nécessaire */}
                  </View>
                )}
              </View>
            ))}
          </View>
        ) : (
          <View style={[localStyle.content]}>
            <Text style={[globalStyles.textLight]}>Pas de variable</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const globalStyles = StyleSheet.create({
  textLight: {
    color: "white",
  },
  sessionSubTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textCenter: {
    textAlign: "center",
  },
});

const localStyle = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
  },
  content: {
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    justifyContent: "center",
  },

  cardContent: {
    backgroundColor: "#00000010",
    borderRadius: 10,
    justifyContent: "center",
    margin: 10,
    padding: 10,
  },
  card: {
    backgroundColor: "#00000010",
    borderRadius: 10,
    justifyContent: "center",
    margin: 10,
    padding: 10,
  },
});
