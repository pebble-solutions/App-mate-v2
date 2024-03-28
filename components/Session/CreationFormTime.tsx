import React, {useEffect, useState} from "react";
import {View, Text} from "react-native";
import {globalStyles} from "../../../shared/globalStyles";
import Title from "../../../components/Title";
import GradientHeader from "../../../components/Activity/GradientHeader";
import {ActivityType} from "../../../shared/types/ActivityType";
import {ActivityType} from "../../../shared/types/ActivityType";
import Button from "../Button";


export default function CreationFormTime() {

    return(
        <View style={globalStyles.mainContainer}>
            <GradientHeader activity={activity.id}>
                <Button
                    title="Quitter"
                    style={[globalStyles.transparentBg]}
                    onPress={exit}
                    titleStyle={[globalStyles.textLight]}
                    icon={<AntDesign name="back" size={24} color="white" />}
                    options={{
                        displayTitle: false,
                        disabled: started
                    }}
                />
                <Title title={activity.label} style={[globalStyles.textLight, globalStyles.textCenter]} size="lg" />
            </GradientHeader>

        </View>
    )

}
