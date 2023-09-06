import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#F0F6EF',
        height: '100%',
        flex: 1,
    },
    input: {
        borderWidth: 1,
        borderColor: '#182955',
        borderRadius: 10,
        padding: "3.5%",
        marginBottom: "3.5%",
        width: '100%',
        backgroundColor: '#FEFEFE',
        paddingStart: "10%",
    },
    boxInput:{
        width: '80%',
    },
    boxButton:{
        marginBottom: "3%",
        width: '65%',
    },
    error:{
        color: 'red',
        fontWeight: 'bold',
        marginBottom: "3.5%",
    },
    boxMessage:{
        marginBottom: "3%",
        alignItems: 'center',
    },
    message:{
        textDecorationLine: 'underline',
        color: '#182955',
        marginVertical: '1%',
    },
    button:{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: "6%",
        backgroundColor: '#182955',
        borderRadius: 20,
    },
    textButton:{
        color: '#FEFEFE',
        fontFamily: 'sans-serif-light',
        fontWeight: 'bold',
        fontSize: 16,
    },
    logoImg: {
        height: "100%",
        width: "100%",
        resizeMode: "contain",  
    },

    logo: {
        marginTop: "15%",
        height: "20%",
        width: "100%",
        marginBottom: "10%",
    },
    copyright: {
        position: 'fixed',
        bottom: 0,
        top: '21%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    copyrightText:{
        fontFamily: 'sans-serif-light',
        fontSize: 12,
    }
});

export default styles;