import { StyleSheet } from "react-native-web";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0F6EF",
        alignItems: "center",
    },
    button: {
        backgroundColor: "#B30000",
        // vermelho escuro #B30000
        width: "90%",
        borderRadius: 5,
        padding: "4%",
        alignItems: "center",
        marginTop: "5%",
        borderColor: "#B1B1B1",
        borderWidth: 1,
        boxShadowColor: "#000",
        boxShadowOffset: {
            width: 0,
            height: 2,
        },
        boxShadowOpacity: .25,
        boxShadowRadius: 3.84,
        elevation: 1,
        marginBottom: "3%",
    },
    buttonText: {
        color: "white",
        fontSize: 18,
    },
    containerField: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#FEFEFE",
        padding: "2%",
        marginVertical: "2%",
        paddingHorizontal: "5%",
        boxShadowColor: "#000",
        boxShadowOffset: {
            width: 0,
            height: 2,
        },
        boxShadowOpacity: .25,
        boxShadowRadius: 3.84,
        elevation: 1,
    },
    titleField: {
        fontSize: 16,
        fontWeight: "bold",
        fontFamily: "sans-serif-light",
    },
});