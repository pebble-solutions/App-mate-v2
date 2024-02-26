import React, { useEffect, useState } from "react";
import { Alert, Dimensions, StyleSheet, Text, View, FlatList } from "react-native";

import { useSessionContext } from "../../../shared/contexts/SessionContext";
import { globalStyles } from "../../../shared/globalStyles";
import moment from 'moment';
import 'moment/locale/fr';

moment.locale('fr');

export default function RecapScreen() {
    const {fetchSessionsFromAPI, sessions } = useSessionContext();
    const width = Dimensions.get('window').width;

    // fetchSessionsFromAPI();

    let content;

    if (sessions.length === 0) {
        content = (
            <View style={globalStyles.contentContainer}>
                <Text>Aucune  session</Text>
            </View>
        );
    } else {
        content = (
            <View style={globalStyles.body}>
                

                <View style={globalStyles.recapContentContainer}>
                    <FlatList
                        data={sessions}
                        keyExtractor={item => item._id}
                        renderItem={({ item }) => (
                            <View >
                                <Text >{moment(item.start).format('LLLL')}</Text>
                                <Text>{item._id}</Text>
                                <Text>{item.label}</Text>
                                <Text>{item.type_id}</Text>
                                <Text> ____________</Text>
                            </View>
                        )}
                    />
                </View>
            </View>
        );
    }

    return <>{content}</>;
}