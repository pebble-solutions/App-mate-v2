import {StyleSheet} from "react-native";

export const variables = {
    borderRadius: [0, 6, 12, 18],
    contentPadding: [0, 6, 12, 24, 32, 48],
    contentMargin: [0, 6, 12, 24, 32, 48],
    fontSize: [12, 16, 28, 32]
}

export const globalStyles = StyleSheet.create({
    headTitle: {
        fontFamily: 'Inter_700Bold',
        fontSize: variables.fontSize[2],
        marginVertical: 16
    },

    cardTitle: {
        fontFamily: 'Inter_700Bold',
    },

    cardDescription: {
        fontSize: 12,
    },

    text: {
        fontFamily: 'Inter_500Medium',
    },

    textLight: {
        color: 'white'
    },

    card: {
        borderRadius: variables.borderRadius[2],
        minHeight: 100,
    },

    cardLg: {
        borderRadius: variables.borderRadius[3]
    },

    cardContent: {
        margin: variables.contentMargin[2]
    },

    VariableCardContent: {

        backgroundColor: '#00000020',
        borderRadius: variables.borderRadius[1],
        padding: variables.contentPadding[2],
        marginVertical: variables.contentMargin[1],
    },

    pContainer: {
        paddingHorizontal: variables.contentMargin[1],
        paddingVertical: variables.contentMargin[1]
    },

    pvContainer: {
        paddingVertical: variables.contentMargin[1]
    },

    phContainer: {
        paddingHorizontal: variables.contentMargin[1]
    },

    pv2Container: {
        paddingVertical: variables.contentMargin[2]
    },

    ph2Container: {
        paddingHorizontal: variables.contentMargin[2]
    },

    mContainer: {
        marginHorizontal: variables.contentMargin[1],
        marginVertical: variables.contentMargin[1],
        flex: 1
    },

    mhContainer: {
        marginHorizontal: variables.contentMargin[1]
    },

    contentContainer: {
        marginHorizontal: variables.contentMargin[2]
    },

    topContainer: {
        marginHorizontal: variables.contentMargin[2],
        marginTop: variables.contentMargin[5],
        paddingHorizontal: variables.contentMargin[1],
        
    },

    body: {
        flex: 1
    },

    headTitleActions: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    button: {
        padding: variables.contentPadding[1],
        borderRadius: variables.borderRadius[2],
        backgroundColor: "#cdcdcd",
        color: "blue",
        fontSize: variables.fontSize[0]
    },

    buttonLg: {
        padding: variables.contentPadding[1],
        fontSize: variables.fontSize[1]
    },

    buttonXl: {
        padding: variables.contentPadding[2] / 1.5,
        fontSize: variables.fontSize[2] / 1.3
    },

    textLg: {
        fontSize: variables.fontSize[1]
    },

    textXl: {
        fontSize: variables.fontSize[2] / 1.3
    }
})