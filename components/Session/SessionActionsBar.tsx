import {StyleSheet, View} from "react-native";
import Button from "../Button";
import {globalStyles, variables} from "../../shared/globalStyles";
import {Ionicons} from "@expo/vector-icons";
import SwiperToggle from "../SwiperToggle";
import {useState} from "react";

type ActionsBarOptions = {
    onStart?: () => void,
    onEnd?: () => void,
    onCancel?: () => void,
    onValidate?: () => void,
    started?: boolean,
    style?: object[]
}

export function SessionActionsBar({onStart, onEnd, onCancel, onValidate, started, style}: ActionsBarOptions) {

    style = style || []
    const [isStarted, setStarted] = useState(typeof started !== "undefined" ? started : false)

    const toggleStatus = (newVal: boolean) => {
        setStarted(newVal)
        if (newVal && onStart) onStart()
        if (!newVal && onEnd) onEnd()
    }

    return (
        <View style={[localStyle.actionsContainer, ...style]}>
            <View style={[localStyle.buttonContainer, localStyle.startContainer]}>
                {!isStarted && <Button
                    title="Annuler"
                    onPress={() => {
                        if (onCancel) onCancel()
                    }}
                    style={[globalStyles.transparentBg]}
                    titleStyle={[globalStyles.textDanger]}
                    icon={<View style={globalStyles.meContainer}><Ionicons name="remove-circle-outline" size={24} color={variables.color.danger} /></View>}
                />}
            </View>

            <View style={[localStyle.swiperContainer]}>
                <SwiperToggle
                    height={180}
                    sizeInterpolation={1.8}
                    initialValue={isStarted}
                    onToggle={toggleStatus}
                    onLabel="Démarré"
                    offLabel="Pause"
                />
            </View>

            <View style={[localStyle.buttonContainer, localStyle.endContainer]}>
                {!isStarted && <Button
                    title="Valider"
                    onPress={() => {
                        if (onValidate) onValidate()
                    }}
                    style={[globalStyles.transparentBg]}
                    titleStyle={[globalStyles.textSuccess]}
                    icon={<View style={globalStyles.meContainer}><Ionicons name="checkmark" size={24} color={variables.color.success} /></View>}
                />}
            </View>
        </View>
    )
}

const localStyle = StyleSheet.create({
    actionsContainer: {
        flexDirection: "row",
        alignItems: "flex-end"
    },

    swiperContainer: {
        flex:1,
        alignItems: "center"
    },

    buttonContainer: {
        flexDirection: "row",
        flex:1,
        alignItems: "center"
    },

    startContainer: {
        justifyContent: "flex-start"
    },

    endContainer: {
        justifyContent: "flex-end"
    },
})