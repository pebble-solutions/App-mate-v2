import React, {createContext, PropsWithChildren, useContext, useState} from "react";
import {VariableType} from "../types/VariableType";
import {useEffect} from "react";
import {useRequestsContext} from "./RequestsContext";

type VariableContextType = {
    variables: VariableType[],
    addVariable: (variable: VariableType) => void,
    removeVariable: (id: string) => void,
    getVariableById: (id: string) => VariableType | undefined,
    loading: boolean
}

const VariableContext = createContext<VariableContextType | null>(null);

const VariableContextProvider = ({ children }: PropsWithChildren<{}>) => {
    const [variables, setVariables] = useState<VariableType[]>([]);
    const {requestsController} = useRequestsContext()
    const [loading, setLoading] = useState(true)

    const fetchVariablesFromAPI = async () => {
        const request = requestsController.get("https://api.pebble.solutions/v5/metric/variable/")
        await request.send()
        const data = await request.content()
        setVariables(data)
    }

    useEffect(() => {
        setLoading(() => true)
        fetchVariablesFromAPI().finally(() => setLoading(() => false));
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
        <VariableContext.Provider value={{ variables, addVariable, removeVariable, getVariableById, loading }}>
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