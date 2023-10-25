import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    containerRequester: {
        backgroundColor: "#ADD8E6",
        justifyContent: "center",
        marginTop: "1%",
        padding: 10,
        borderRadius: 20,
        marginStart: "20%",
        marginBottom: "1%",
        marginHorizontal: "5%",
        borderBottomRightRadius: 0,
    },
    containerAgent: {
        backgroundColor: "#D5D5D5",
        justifyContent: "center",
        marginTop: "1%",
        padding: 10,
        marginBottom: "1%",
        borderRadius: 20,
        marginHorizontal: "5%",
        borderBottomLeftRadius: 0,
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