import {StyleSheet} from "react-native";

export const variables = {
    borderRadius: [0, 6, 12, 18],
    contentPadding: [0, 6, 12, 24, 32, 48],
    contentMargin: [0, 6, 12, 24, 32, 48],
    fontSize: [12, 14, 16, 20, 24, 28, 32]
}

export const globalStyles = StyleSheet.create({
    headTitle: {
        fontFamily: 'Inter_700Bold',
        fontSize: variables.fontSize[6],
        marginVertical: 16
    },
    headerIcons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        


    },
    CategoryTitle: {
        fontFamily: 'Inter_700Bold',
        fontSize: variables.fontSize[4],
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
    textCenter: {
        textAlign: 'center'
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
        justifyContent: 'center',
        
    },

    VariableCardHeader: {
        maxWidth: '80%',
    },

    VariableCardIconsContainer: {
        flexDirection: 'row',
        position: 'absolute',
        right: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },

    iconMargin: {
        marginHorizontal: 2,
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
    scrollContainer: {
        marginBottom: 48,
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
        color: "white",
        fontSize: variables.fontSize[0]
    },
    buttonAlignSelfCenter: {
        alignSelf: "center",
    },

    buttonLg: {
        padding: variables.contentPadding[1],
        fontSize: variables.fontSize[1]
    },

    buttonXl: {
        padding: variables.contentPadding[2] / 1.5,
        fontSize: variables.fontSize[2] / 1.3
    },
    cardSession: {
        flexDirection: "column",
        
        borderColor: "white",
        borderWidth: 1,
        borderRadius: variables.borderRadius[2],
        marginVertical: variables.contentMargin[1],
        padding: variables.contentPadding[1],
    },
    
    topCard: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        
        
    },
    topCardContent: {
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "space-between",
        
        
    },

    buttonAlert: {
        backgroundColor: "white",
    },
    textLg: {
        fontSize: variables.fontSize[1]
            },

    textXl: {
        fontSize: variables.fontSize[2] / 1.3
    },

    input: {
        padding: variables.contentPadding[3],
        borderRadius: variables.borderRadius[1],
        borderWidth: 1,
        borderColor: "#cdcdcd",
        marginVertical: variables.contentMargin[2],
        backgroundColor: "#FFFFFF10",
        color: "white",
        fontSize: variables.fontSize[1]
    },

    buttonContainer: {
        flexDirection: 'row',
        backgroundColor: '#00000050',
        paddingVertical: variables.contentPadding[2],
        paddingHorizontal: 20,
        marginVertical: 4,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    buttonText: {
        color: 'white', // Couleur du texte
        fontFamily: 'Inter_700Bold',
        fontSize: variables.fontSize[0],
    },

    headerCloseIcon: {  
        position: 'relative',
        justifyContent: 'flex-end',
        marginEnd: 10,
        marginTop: 20,
    },
    
    iconContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 36,
    },

    colorButton: {
        width: 55,
        height: 55,
        borderRadius: 14,
        borderWidth: 4,
        marginHorizontal: 7,
    },

    colorButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
        paddingHorizontal: 60,
    },
});