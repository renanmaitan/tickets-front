import React, { useContext, useState } from "react"

import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList } from "react-native"

import MaskInput, { Masks } from 'react-native-mask-input'

import styles from "./style"
import Title from "./Title/"
import Logo from "./Logo"
import { createUser } from "../../services/createUser"
import AuthContext from "../../contexts/auth"

export default function Cadastro({ navigation }) {

    const [form, setForm] = React.useState({
        userName: '',
        email: '',
        cpf: '',
        phoneNumber: '',
        birthDate: '',
        cep: '',
        active: true,
    });
    const authContext = useContext(AuthContext);

    const handleForm = (key, value) => {
        setForm((currentForm) => ({
            ...currentForm,
            [key]: value,
        }));
    };

    const transformToDesiredFormat = (input) => {
        const [day, month, year] = input.split('/');
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    };

    const removeSpecialCharacters = (input) => {
        const onlyNumbers = input.replace(/[^\d]/g, '');
        return onlyNumbers;
    }

    const submitForm = () => {
        form.birthDate = transformToDesiredFormat(form.birthDate);
        form.phoneNumber = removeSpecialCharacters(form.phoneNumber);
        form.cpf = removeSpecialCharacters(form.cpf);
        form.cep = removeSpecialCharacters(form.cep);
        if (validation()) {
            createUser({ user: form, authContext: authContext })
                .then((response) => {
                    if (response) {
                        navigation.navigate('Home')
                        alert('Cadastro realizado com sucesso!')
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    const [error, setError] = useState(null)

    function validation() {
        if (form.userName == "" || form.email == "" || form.cpf == "" || form.phoneNumber == "" || form.birthDate == "" || form.cep == "") {
            setError('Preencha os campos*')
            return false;
        }
        if (form.userName == null || form.email == null || form.cpf == null || form.phoneNumber == null || form.birthDate == null || form.cep == null) {
            setError('Preencha os campos')
            return false;
        }
        setError(null);
        return true;
    }

    return (
        <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollview}
        >
            <View style={styles.container}>
                <Logo />
                <View><Title /></View>
                <View>
                    <Text style={styles.error}>{error}</Text>
                </View>
                <View style={styles.boxInput}>
                    <TextInput
                        style={styles.input}
                        id="name"
                        name="name"
                        placeholder="Nome Completo"
                        onChangeText={(value) => handleForm('userName', value)}
                        value={form.userName}
                    />
                    <TextInput
                        style={styles.input}
                        name="email"
                        keyboardType="email-address"
                        placeholder='E-mail'
                        onChangeText={(value) => handleForm('email', value)}
                        autoCapitalize="none"
                        value={form.email}
                    />
                    <MaskInput
                        style={styles.input}
                        placeholder="Telefone"
                        onChangeText={(value) => {
                            handleForm('phoneNumber', value)
                        }}
                        keyboardType="numeric"
                        mask={Masks.BRL_PHONE}
                        value={form.phoneNumber}
                        maxLength={15}
                    />
                    <MaskInput
                        style={styles.input}
                        name="cpf"
                        placeholder="CPF"
                        onChangeText={(value) => handleForm('cpf', value)}
                        value={form.cpf}
                        mask={Masks.BRL_CPF}
                        keyboardType="numeric"
                        maxLength={14}
                    />
                    <MaskInput
                        style={styles.input}
                        name="birthDate"
                        placeholder="Data de nascimento"
                        onChangeText={(value) => handleForm('birthDate', value)}
                        value={form.birthDate}
                        keyboardType="numeric"
                        mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                        maxLength={10}
                    />
                    <MaskInput
                        style={styles.input}
                        placeholder="CEP"
                        onChangeText={(value) => handleForm('cep', value)}
                        value={form.cep}
                        keyboardType="numeric"
                        mask={Masks.ZIP_CODE}
                        maxLength={9}
                    />
                </View>
                <View style={styles.boxButton}>
                    <TouchableOpacity
                        onPress={submitForm}
                        style={styles.button}
                    ><Text style={styles.textButton}>Cadastrar</Text></TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}
