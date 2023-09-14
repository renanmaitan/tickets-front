import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#F0F6EF',
        height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent : 'center',
    },
    scrollview: {
        backgroundColor: '#DFEDEB',
        width: '100%',
        flex: 1,
    },
    formTop:{
        width: "100%",
        alignItems: "center",
        marginTop: "10%",
    },
    input: {
        width: "90%",
        backgroundColor: "#FFF",
        borderRadius: 10,
        margin: "2%",
        padding: "4%",
        fontFamily : "sans-serif",
        color: "#000",
    },
    label:{
        textAlign: "center",
        width: "100%",
    },
    formBottom:{
        width: "100%",
        alignItems: "center",
    },
    button: {
        width: "90%",
        backgroundColor: "#182955",
        borderRadius: 10,
        margin: "2%",
        padding: "4%",
        alignItems: "center",
    },
    buttonText: {
        color: "#FFF",
        fontSize: 18,
    },
    alertContainer: {
        width: "100%",
        alignItems: "center",
        marginTop: "3%",
        marginBottom: "3%",
    },
    alert: {
        color: "#FF0000",
    }
});

export default styles;