import { StyleSheet } from "react-native";

export const variables = {
    borderRadius: [0, 6, 12, 18],
    contentPadding: [0, 6, 12, 24, 32, 48],
    contentMargin: [0, 6, 12, 24, 32, 48],
    fontSize: [12, 14, 16, 20, 24, 28, 32],
    color: {
        black: "#0b161e",
        dark: "#11212D",
        grey: "#2b4660",
        lightGrey: "#59759f",
        white: "#ffffff",
        danger: "#cb3c3c",
        success: "#5aab42",
        active: "#0184d5"
    }
}

export const globalStyles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },

    section: {
        paddingHorizontal: variables.contentPadding[2],
        width: "100%"
    },

    headTitle: {
        fontFamily: 'Inter_700Bold',
        fontSize: variables.fontSize[5],
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
        borderRadius: variables.borderRadius[3]
    },

    recapCarrouselCard: {
        borderRadius: variables.borderRadius[2],
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
    variableCardTitle: {
        fontSize: variables.fontSize[4],
        fontFamily: 'Inter_700Bold',
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

    ph3Container: {
        paddingHorizontal: variables.contentMargin[3]
    },

    ph4Container: {
        paddingHorizontal: variables.contentMargin[4]
    },

    pbContainer: {
        paddingBottom: variables.contentPadding[1]
    },

    pb2Container: {
        paddingBottom: variables.contentPadding[2]
    },

    pb3Container: {
        paddingBottom: variables.contentPadding[3]
    },

    pb4Container: {
        paddingBottom: variables.contentPadding[4]
    },

    mContainer: {
        marginHorizontal: variables.contentMargin[1],
        marginVertical: variables.contentMargin[1]
    },

    mbContainer: {
        marginBottom: variables.contentMargin[1]
    },

    mhContainer: {
        marginHorizontal: variables.contentMargin[1]
    },

    mh2Container: {
        marginHorizontal: variables.contentMargin[2]
    },

    mh3Container: {
        marginHorizontal: variables.contentMargin[3]
    },

    mh4Container: {
        marginHorizontal: variables.contentMargin[4]
    },

    mvContainer: {
        marginVertical: variables.contentMargin[1]
    },

    mv2Container: {
        marginVertical: variables.contentMargin[2]
    },

    mv3Container: {
        marginVertical: variables.contentMargin[3]
    },

    mv4Container: {
        marginVertical: variables.contentMargin[4]
    },

    mtContainer: {
        marginTop: variables.contentMargin[1]
    },

    mt2Container: {
        marginTop: variables.contentMargin[2]
    },

    mt3Container: {
        marginTop: variables.contentMargin[3]
    },

    mt4Container: {
        marginTop: variables.contentMargin[4]
    },

    msContainer: {
        marginLeft: variables.contentMargin[1]
    },

    meContainer: {
        marginRight: variables.contentMargin[1]
    },

    mb2Container: {
        marginBottom: variables.contentMargin[2]
    },

    mb3Container: {
        marginBottom: variables.contentMargin[3]
    },

    mb4Container: {
        marginBottom: variables.contentMargin[4]
    },

    sContainer: {
        flex: 1,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    contentContainer: {
        marginHorizontal: variables.contentMargin[2],
    },
    recapContentContainer: {
        marginHorizontal: variables.contentMargin[2],
        alignItems: 'center',
    },
    RecapContentContainer: {
        marginVertical: variables.contentMargin[1],
        marginHorizontal: variables.contentMargin[1],
        paddingVertical: variables.contentMargin[3],
        borderRadius: variables.borderRadius[2],
        borderColor: "lightgrey",
        borderWidth: 1,
        minHeight: "72%",
    },


    topContainer: {
        marginHorizontal: variables.contentMargin[2],
        marginTop: variables.contentMargin[5],
        paddingHorizontal: variables.contentMargin[1],

    },

    scrollContainer: {
        marginBottom: 200,
    },
    scrollContainerVariable: {
        
        marginBottom: 600,
    },

    body: {
        flex: 1,
    },

    recapBody: {
        flex: 1,
        paddingBottom: 250,
    },


    headTitleActions: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    transparentBg: {
        backgroundColor: "transparent"
    },

    darkBg: {
        backgroundColor: variables.color.dark
    },

    whiteBg: {
        backgroundColor: variables.color.white
    },

    buttonAlignSelfCenter: {
        alignSelf: "center",
    },

    cardSession: {
        flexDirection: "column",
        backgroundColor: '#00000050', // Changez la couleur de fond selon vos préférences
        borderRadius: variables.borderRadius[2],
        marginVertical: variables.contentMargin[1],
        padding: variables.contentPadding[1],
    },
    cardSessionContent: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        padding: variables.contentPadding[2],
    },
    
    topCard: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    topCardActivity: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
    },
    topCardActivityItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    
    topCardContent: {
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        padding: variables.contentPadding[2],
        
        
    },

    buttonAlert: {
        backgroundColor: "white",
    },
    textLg: {
        fontSize: variables.fontSize[1]
    },

    textXl: {
        fontSize: variables.fontSize[2]
    },

    input: {
        paddingHorizontal: variables.contentPadding[2],
        paddingVertical: variables.contentPadding[2],
        borderRadius: variables.borderRadius[2],
        borderWidth: 1,
        borderColor: variables.color.lightGrey,
        backgroundColor: variables.color.lightGrey,
        fontSize: variables.fontSize[1],
            
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
    buttonContainerTunnel: {
        flexDirection: 'row',
        backgroundColor: '#00000000',
        padding: variables.contentPadding[1],
        margin: variables.contentMargin[1],
        borderRadius: 5,
        justifyContent: 'space-evenly',

    },
    buttonTunnel: {
        padding: variables.contentPadding[2],
        margin: variables.contentMargin[1],
        borderRadius: variables.borderRadius[1],
        backgroundColor: "grey",
        color: "white",
        fontSize: variables.fontSize[0],
        width: "40%",
        alignItems: 'center',
    },
    buttonTextTunnel: {
        color: 'white', // Couleur du texte


        fontSize: variables.fontSize[2],
    },

    buttonText: {
        color: 'white', // Couleur du texte
        fontSize: variables.fontSize[1],
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
        width: "14%",
        aspectRatio: 1,
        borderRadius: 100,
        borderWidth: 4,
        marginHorizontal: "2%",
    },

    colorButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    colorButtonsParentContainer: {
        justifyContent: 'center',
        marginVertical: 10,
    },
    sessionContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    sessionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 15,
        marginBottom: 20,
        color: 'black',
    },

    sessionSubTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginVertical: 10,
        color: 'black',
    },
    sessionText: {
        fontSize: 16,
        color: 'black',
    },
    recapHeadTitle: {
        fontFamily: 'Inter_500Medium',
        fontSize: variables.fontSize[3],
        textAlign: 'center',
    },

    centeredContainer: {
        alignItems: "center"
    },

    textDanger: {
        color: variables.color.danger
    },

    textSuccess: {
        color: variables.color.success
    },

    textDark: {
        color: variables.color.dark
    },

    textGrey: {
        color: variables.color.grey
    },

    textLightGrey: {
        color: variables.color.lightGrey
    },

});