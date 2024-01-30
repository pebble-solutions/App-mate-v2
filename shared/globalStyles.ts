import {StyleSheet} from "react-native";

export const variables = {
    borderRadius: [0, 6, 12, 18],
    contentPadding: [0, 12, 24, 32],
    contentMargin: [0, 6, 12, 24]
}

export const globalStyles = StyleSheet.create({
    headTitle: {
        fontFamily: 'Inter_700Bold',
        fontSize: 28,
        marginVertical: 16,
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
        borderRadius: variables.borderRadius[2]
    },

    cardContent: {
        margin: variables.contentMargin[2]
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
        marginTop: variables.contentMargin[3]
    },

    body: {
        flex: 1
    },

    headTitleActions: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: variables.contentMargin[3]
    }
})