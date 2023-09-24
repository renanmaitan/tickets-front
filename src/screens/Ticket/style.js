import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D5D5D5",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#182955",
        textAlign: "center",
    },
    date: {
        fontSize: 16,
        color: "#182955",
        marginBottom: "4%",
    },
    description: {
        fontSize: 16,
        color: "#182955",
        marginTop: "4%",
        textAlign: "center",
    },
    header: {
        width: "90%",
        backgroundColor: "#D5D5D5",
        alignItems: "center",
        padding: "4%",
        boxShadowColor: "#000",
        boxShadowOffset: {
            width: 0,
            height: 1,
        },
        boxShadowOpacity: 0.25,
        boxShadowRadius: 3.84,
        elevation: 10,
    },
});

export default styles;