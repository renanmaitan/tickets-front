import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#9DAF8F',
        flex: 1,
        justifyContent: 'center',
    },
    openTicket:{
        width: "95%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        paddingVertical: "30%",
    },
    touchable:{
        width: "50%",
        alignItems: "center",
        backgroundColor: "transparent",
        marginVertical: "2%",
    },
    optionText:{
        fontSize: 20,
        fontFamily : "sans-serif",
        color: "#FEFEFE",
    },
    buttonContainer:{
        justifyContent: "center",
        alignItems: "center",
    },
    line:{
        flexDirection: "row",
        width: "90%",
        alignItems: "center",
    },
    title:{
        fontSize: 30,
        fontFamily: "sans-serif",
        color: "black",
        alignSelf: "center",
        marginBottom: "10%",
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
    modalContent: {
        alignItems: "center",
        paddingVertical: "10%",
    },
    modalInput: {
        width: "80%",
        backgroundColor: "#fff",
        paddingHorizontal: "5%",
        paddingVertical: "2%",
        borderRadius: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#086972",
        marginTop: "1%",
    },
    modalButton: {
        width: "80%",
        alignItems: "center",
        backgroundColor: "#086972",
        paddingVertical: "2%",
        borderRadius: 10,
        marginTop: "5%",
    },
});

export default styles;