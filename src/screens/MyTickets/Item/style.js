import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    containerItem: {
        width: "100%",
        alignItems: "center",
    },
    item: {
        backgroundColor: '#rgba(235,241,234,1)',
        width: "90%",
        borderRadius: 10,
        marginVertical: "2%",
        elevation: 5,
        padding: "4%",
    },
    title: {
        fontSize: 16,
        color: "#333",
        fontWeight: "bold",
    },
    cardOne:{
        backgroundColor: '#86B862',
        width: "90%",
        borderRadius: 10,
        marginVertical: "2%",
        marginTop: "10%",
    },
    date: {
        fontSize: 15,
        color: "#333",
        marginHorizontal: "2%",
    },
    cardBody: {
    },
    top:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    ticketTitle: {
        fontSize: 16,
        color: "#000",
        marginVertical: "1%",
    },
    analyst: {
        fontSize: 14,
        color: "#333",
        marginVertical: "1%",
    },
});

export default styles;