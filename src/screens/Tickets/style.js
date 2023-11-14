import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#FFF",
    },
    section: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "left",
        margin: "2%",
        marginStart: "7.5%",
    },
    checkbox: {
        padding: "4%",
        marginEnd: "2%",
    },
    modal: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFF",
    },
    containerModal: {
        width: "85%",
        backgroundColor: "#fff",
        paddingHorizontal: "5%",
        paddingVertical: "2%",
        borderRadius: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#086972",
        flexDirection: "row",
        marginTop: "2%",
    },
    txt: {
        color: "#555",
        fontSize: 16,
        width: "100%",
        textAlign: "center",
    },
    headerModal: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#555",
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    modalTitle: {
        fontSize: 18,
        color: "#555",
    },
    modalCancel: {
        fontSize: 14,
        color: "#086972",
        fontWeight: "bold",
    },
    optionContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    optionTxt: {
        fontSize: 16,
        color: "#555",
    },
    backModal: {
        width: "10%",
    },
    button: {
        backgroundColor: "#182955",
        width: "85%",
        padding: "4%",
        borderRadius: 10,
        alignSelf: "center",
        marginVertical: "10%",
    },
    paragraph: {
        fontSize: 16,
        color: "#555",
    },
    noTickets: {
        fontSize: 16,
        color: "#555",
        textAlign: "center",
        marginTop: "5%",
    },
});

export default styles;