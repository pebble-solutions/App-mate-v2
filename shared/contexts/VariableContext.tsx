import React, {createContext, PropsWithChildren, useContext, useState} from "react";
import {VariableType} from "../types/VariableType";
import {useEffect} from "react";

type VariableContextType = {
    variables: VariableType[],
    addVariable: (variable: VariableType) => void,
    removeVariable: (id: string) => void,
    getVariableById: (id: string) => VariableType | undefined
  }
  
  const VariableContext = createContext<VariableContextType | null>(null);
  
  const VariableContextProvider = ({ children }: PropsWithChildren<{}>) => {
    const [variables, setVariables] = useState<VariableType[]>([]);
  
    const fetchVariablesFromAPI = async () => {
      try {
        const response = await fetch("https://api.pebble.solutions/v5/metric/variable/"); // Remplacez URL_DE_VOTRE_API par l'URL de votre API
        const data = await response.json();
        setVariables(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des variables depuis l'API:", error);
      }
    }
  
    useEffect(() => {
      fetchVariablesFromAPI();
    }, []); 
  
    const addVariable = (variable: VariableType) => {
      setVariables([...variables, variable]);
    }
  
    const removeVariable = (id: string) => {
      setVariables((prev) => {
        return prev.filter(e => e._id !== id);
      });
    }
  
    const getVariableById = (id: string) => {
      return variables.find(e => e._id === id);
    }
  
    return (
      <VariableContext.Provider value={{ variables, addVariable, removeVariable, getVariableById }}>
        {children}
      </VariableContext.Provider>
    )
  }
  
  export default VariableContextProvider;
  
  export const useVariableContext = () => {
    const context = useContext(VariableContext);
  
    if (!context) {
      throw new Error("useVariableContext must be used inside the VariableContextProvider");
    }
  
    return context;
  }