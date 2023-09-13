import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    containerItem: {
        width: "100%",
        alignItems: "center",
    },
    item: {
        backgroundColor: '#86B862',
        width: "90%",
        borderRadius: 10,
        marginVertical: "2%",
    },
    title: {
        fontSize: 16,
        color: "#F0F6EF",
        width: "50%",
    },
    cardOne:{
        backgroundColor: '#86B862',
        width: "90%",
        borderRadius: 10,
        marginVertical: "2%",
        marginTop: "10%",
    },
    cardTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#374C2C",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: "2%",
    },
    date: {
        fontSize: 15,
        color: "#F0F6EF",
    },
    cardBody: {
        padding: "5%",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        alignItems: "center",
    },
});

export default styles;