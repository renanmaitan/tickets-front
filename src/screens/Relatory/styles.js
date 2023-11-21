import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#FFF",
        alignItems: "center",
    },
    date: {
        flexDirection: "row",
        margin: "2%",
        alignItems: "center",
    },
    input: {
        margin: "1%",
        padding: "1%",
        borderWidth: 1,
        borderColor: "#444",
        borderRadius: 5,
        width: "15%",
    },
    button: {
        backgroundColor: "#086972",
        width: "90%",
        borderRadius: 5,
        padding: "4%",
        alignItems: "center",
        marginTop: "5%",
        marginBottom: "5%",
    },
    buttonText: {
        color: "white",
        fontSize: 15,
    },
    chart: {
        alignItems: "center",
    }
});

export default styles;