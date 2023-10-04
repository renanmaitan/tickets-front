import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    containerRequester: {
        backgroundColor: "#D5D5D5",
        justifyContent: "center",
        marginTop: "1%",
        padding: 10,
        borderRadius: 10,
        marginStart: "20%",
        marginBottom: "1%",
        marginHorizontal: "5%",
    },
    containerAgent: {
        backgroundColor: "#ADD8E6",
        justifyContent: "center",
        marginTop: "1%",
        padding: 10,
        marginBottom: "1%",
        borderRadius: 10,
        marginHorizontal: "5%",
    },
    textRequester: {
        color: "#000",
        fontSize: 16
    },
    textAgent: {
        color: "#000",
        fontSize: 16
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
    }
});

export default styles;