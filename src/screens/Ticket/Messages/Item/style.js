import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    containerRequester: {
        backgroundColor: "#D5D5D5",
        justifyContent: "center",
        margin: "5%",
        padding: 10,
        borderRadius: 10,
        marginStart: "20%",
        marginBottom: 0,
    },
    containerAgent: {
        backgroundColor: "#ADD8E6",
        justifyContent: "center",
        margin: "5%",
        padding: 10,
        marginBottom: 0,
        borderRadius: 10,
    },
    textRequester: {
        color: "#000",
        fontSize: 16,
        textAlign: "justify",
    },
    textAgent: {
        color: "#000",
        fontSize: 16,
        textAlign: "justify"
    },
    dateRequester: {
        color: "#000",
        fontSize: 12,
        textAlign: "right"
    },
    dateAgent: {
        color: "#000",
        fontSize: 12,
        textAlign: "right"
    },
    inputMessage: { 
        width: "95%",
        backgroundColor: "#fff",
        borderColor: "#000",
        borderWidth: 1,
        fontSize: 16,
        textAlign: "justify",
        padding: "3%",
        borderRadius: 10,
    }
});

export default styles;