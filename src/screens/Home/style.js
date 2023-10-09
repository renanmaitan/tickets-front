import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#9DAF8F',
        flex: 1,
        justifyContent: 'center',
    },
    openTicket:{
        width: "90%",
        alignItems: "center",
        justifyContent: "center",
        padding: "4%",
        paddingVertical: "10%",
        borderRadius: 10,
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
        color: "#222",
        // textShadowColor: '#000',
        // textShadowOffset: {width: 0, height: 2},
        // textShadowRadius: 3.84,
        marginTop: "5%",
        textAlign: "center",
    },
    titleContainer:{
        width: "100%",
        alignItems: "left",
        justifyContent: "center",
        justifyContent: "space-between",
        flexDirection: "row",
    },
    buttonContainer:{
        justifyContent: "center",
        width: "100%",
        bottom: "7%",
        marginTop: "10%",
    },
    logoImg: {
        height: "100%",
        resizeMode: "contain",
    },
    logo: {
        height: "40%",
        alignItems: "center",
    },
});

export default styles;