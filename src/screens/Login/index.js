import React, { useState, useContext } from "react"

import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native"

import styles from "./style"
import Title from "./Title/"
import Logo from "./Logo"
import AuthContext from "../../contexts/auth"
import Loading from "../../Components/Loading"

//instalar o react-native-vector-icons
//npm install react-native-vector-icons


export default function Login({ navigation }) {

    const [user, setUser] = useState(null)
    const [password, setPassword] = useState(null)
    const [error, setError] = useState(null)
    const { signed, signIn } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)

    async function validation() {
        if (user == null || password == null) {
            setError('Preencha os campos');
        } else if (user === "" || password === "") {
            setError('Preencha os campos');
        } else if (user.indexOf(' ') >= 0 || password.indexOf(' ') >= 0) {
            setError('Não use espaços em branco');
        } else {
            setError(null);
            setLoading(true);
            try {
                const response = await signIn({ username: user, password });
                if (response === false) {
                    setError('Usuário ou senha incorretos');
                }
                setLoading(false);
            } catch (error) {
                console.error(error);
                setError('Erro na autenticação');
                setLoading(false);
            }
        }
    }

    if (loading) {
        return <Loading />
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={styles.container} accessible={false}>
            <View style={styles.container}>
                <Logo />
                <View><Title /></View>
                <View>
                    <Text style={styles.error}>{error}</Text>
                </View>
                <View style={styles.boxInput}>
                    <TextInput
                        placeholder='CPF ou E-mail'
                        onChangeText={(text) => setUser(text.replace(' ', ''))}
                        value={user}
                        style={styles.input}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                    <TextInput
                        placeholder='Senha'
                        secureTextEntry={true}
                        onChangeText={(text) => setPassword(text.replace(' ', ''))}
                        value={password}
                        style={styles.input}
                        autoCapitalize="none"
                    />
                </View>
                <View style={styles.boxMessage}>
                    <Text
                        onPress={() => navigation.navigate('Home')}
                        style={styles.message}
                    >Esqueci minha senha</Text>
                </View>
                <View style={styles.boxButton}>
                    <TouchableOpacity
                        onPress={validation}
                        style={styles.button}
                    ><Text style={styles.textButton}>Entrar</Text></TouchableOpacity>
                </View>
                <View style={styles.boxMessage}>
                    <Text
                        onPress={() => navigation.navigate('Cadastro')}
                        style={styles.message}
                    >Ainda não possui conta? Cadastre-se</Text>
                </View>
                <View style={styles.copyright}>
                    <Text style={styles.copyrightText}>© 2023 - Todos os direitos reservados - ITEMM</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}
