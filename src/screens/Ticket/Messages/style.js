import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    inputMessage: {
        width: "85%",
        fontSize: 16,
        paddingLeft: "4%",
        backgroundColor: "#FFF",
        borderRadius: 20,
        padding: "2%",
        borderColor: "#000",
        borderWidth: 1,
    },
    container: {
        width: "100%",
        alignItems: "center",
        flex: 1
    },
    flatlist: { 
        width: "100%", 
        height: "90%"
    },
    inputContainer: { 
        width: "100%", 
        maxHeight: "30%",
        backgroundColor: "transparent",
        padding: "2%",
    },
    input: {
        flexDirection: "row", 
        justifyContent: "space-between", 
        width: "100%", 
        alignItems: "center",
        marginBottom: "2%",
    }
});

export default styles;