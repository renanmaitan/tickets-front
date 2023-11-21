import { StyleSheet } from "react-native";

// #86B862 verde claro
// #374C2C verde escuro
// #F0F6EF verde bem claro
// #182955 azul escuro
// #FEFEFE branco

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
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
        marginTop: "3%",
        width: '65%',
    },
    error:{
        color: 'red',
        fontWeight: 'bold',
        marginBottom: "3.5%",
    },
    boxMessage:{
        marginBottom: "10%",
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
        padding: "7%",
        backgroundColor: '#182955',
        borderRadius: 20,
    },
    textButton:{
        color: '#FEFEFE',
        fontFamily: 'sans-serif-light',
        fontWeight: 'bold',
        fontSize: 16,
    },
    scrollview: {
        backgroundColor: '#F0F6EF',
    },
    copyright: {
        position: 'absolute',
        bottom: 15,
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