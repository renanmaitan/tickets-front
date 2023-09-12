import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#F0F6EF',
        height: '100%',
        flex: 1,
    },
    openTicket:{   
        width: "90%",
        alignItems: "center",
        justifyContent: "center",
        padding: "4%",
        paddingVertical: "10%",
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 3.84,
    },
    touchable:{
        width: "100%",
        alignItems: "center",
        backgroundColor: "transparent",
        marginVertical: "2%",
    },
    optionText:{
        fontSize: 20,
        fontFamily : "sans-serif",
        color: "#FEFEFE",
    },
    scrollview: {
        backgroundColor: '#DFEDEB',
        width: '100%',
        alignItems: 'center',
        flex: 1,
    },
    title:{
        fontSize: 20,
        fontFamily : "sans-serif",
        color: "#FFF",
        textShadowColor: '#000',
        textShadowOffset: {width: 0, height: 2},
        textShadowRadius: 3.84,
        margin: "5%",
        width: "40%",
    },
    titleContainer:{
        width: "100%",
        alignItems: "left",
        justifyContent: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        height: "10%",
    },
    buttonContainer:{
        justifyContent: "center",
        width: "100%",
        height: "100%",
        bottom: "7%",
    },
    logoImg: {
        height: "100%",
        width: "100%",
        resizeMode: "contain",  
    },
    logo: {
        height: "100%",
        width: "20%",
    },
});

export default styles;