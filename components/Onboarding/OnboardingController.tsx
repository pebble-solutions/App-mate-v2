import Timeline from "./Timeline";
import {Animated, FlatList, StyleSheet, useWindowDimensions, View} from "react-native";
import ValidationButton from "./ValidationButton";
import {globalStyles, variables} from "../../shared/globalStyles";
import {ReactNode, useRef, useState} from "react";
import Button from "../Button";
import {Feather} from "@expo/vector-icons";

type OnboardingControllerOptions = {
    activeColor?: string,
    inactiveColor?: string,
    items: ReactNode[]
}

export default function OnboardingController({activeColor, inactiveColor, items}: OnboardingControllerOptions) {

    const [currentIndex, setCurrentIndex] = useState(0)
    const { width } = useWindowDimensions()

    const scrollX = useRef(new Animated.Value(0)).current

    const goToIndex = (index: number) => {
        if (index >= 0 && index < 6) {
            setCurrentIndex(() => index)
        }
    }

    const nextStep = () => goToIndex(currentIndex + 1)

    const prevStep = () => goToIndex(currentIndex - 1)

    return (
        <View style={localStyle.container}>
            
            <FlatList
                data={items}
                renderItem={({item}) => <View style={[localStyle.itemContainer, {width}]}>{item}</View>}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                scrollEnabled={true}
                bounces={false}
                onScroll={Animated.event([{
                    nativeEvent: {
                        contentOffset: {
                            x: scrollX
                        }
                    }
                }], { useNativeDriver: false })}
            />
            
            <Timeline
                items={6}
                currentIndex={currentIndex}
                activeColor={activeColor}
                inactiveColor={inactiveColor}
            />

            <View style={localStyle.actionsContainer}>
                <View style={localStyle.buttonContainer}>
                    {currentIndex > 0 && <Button
                        title="Précédent"
                        onPress={prevStep}
                        options={{
                            displayTitle: false
                        }}
                        style={[globalStyles.transparentBg]}
                        icon={<Feather name="arrow-left" size={24} color="white" />}
                    />}
                </View>

                <View style={localStyle.buttonContainer}>
                    <ValidationButton
                        items={6}
                        currentIndex={currentIndex}
                        activeColor={activeColor}
                        inactiveColor={inactiveColor}
                        onPress={nextStep}
                    />
                </View>

                <View style={localStyle.buttonContainer}></View>
            </View>
        </View>

    )
}

const localStyle = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },

    actionsContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: variables.contentMargin[3]
    },

    buttonContainer: {
        flexDirection: "row",
        flex:1,
        alignItems: "center"
    },

    itemContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})