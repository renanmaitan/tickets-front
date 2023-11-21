import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, SafeAreaView, TextInput } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from '@expo/vector-icons';
import Loading from '../../Components/Loading';
import { putUserStatus } from '../../services/putUserStatus';
import AuthContext from '../../contexts/auth';
import { putUser } from '../../services/putUser';

import styles from "./style";

export default function User({ route, navigation }) {
    useEffect(() => {
        navigation.setOptions({
            title: "Usuário #" + route.params.item.data.userId,
        });
    }, []);

    const user = route.params.item.data;
    const [loading, setLoading] = useState(false);
    const authContext = useContext(AuthContext);
    const [visible, setVisible] = useState(false);
    const [target, setTarget] = useState('');
    const [id, setId] = useState(null);
    const [newUser, setNewUser] = useState({
        "userId": user.userId,
        "userName": user.userName,
        "email": user.email,
        "cpf": user.cpf,
        "phoneNumber": user.phoneNumber,
        "birthDate": user.birthDate,
        "cep": user.cep,
        "active": user.active
    });

    if (loading) {
        return <Loading />
    }

    function handleDisableUser() {
        setLoading(true);
        putUserStatus(authContext, user.userId).then((response) => {
            if (response) {
                setLoading(false);
                navigation.navigate('ManageUser');
                const string = user.active? "desativado" : "ativado";
                alert(`Usuário ${string} com sucesso.`);
            } else {
                setLoading(false);
                alert('Erro ao desativar usuário.');
            }
        });
    }
    const formatDate = (date) => {
        const dateArray = date.split('-');
        const newDate = dateArray[2] + '/' + dateArray[1] + '/' + dateArray[0];
        return newDate;
    }

    const formatCep = (cep) => {
        const cepArray = cep.split('');
        const newCep = cepArray[0] + cepArray[1] + cepArray[2] + cepArray[3] + cepArray[4] + '-' + cepArray[5] + cepArray[6] + cepArray[7];
        return newCep;
    }

    const formatPhone = (phone) => {
        const phoneArray = phone.split('');
        const newPhone = '(' + phoneArray[0] + phoneArray[1] + ') ' + phoneArray[2] + phoneArray[3] + phoneArray[4] + phoneArray[5] + phoneArray[6] + '-' + phoneArray[7] + phoneArray[8] + phoneArray[9] + phoneArray[10];
        return newPhone;
    }

    const formatCpf = (cpf) => {
        const cpfArray = cpf.split('');
        const newCpf = cpfArray[0] + cpfArray[1] + cpfArray[2] + '.' + cpfArray[3] + cpfArray[4] + cpfArray[5] + '.' + cpfArray[6] + cpfArray[7] + cpfArray[8] + '-' + cpfArray[9] + cpfArray[10];
        return newCpf;
    }

    function handlePutUser() {
        setLoading(true);
        putUser(authContext, newUser).then((response) => {
            if (response) {
                setLoading(false);
                navigation.navigate('ManageUser');
                alert('Usuário alterado com sucesso.');
            } else {
                setLoading(false);
                alert('Erro ao alterar usuário.');
            }
        });
    }

    function changeUserForm(newContent) {
        if (id === null || id === '') {
            alert('Digite o id do usuário que deseja encontrar.');
        } else {
            if (id === 1) {
                setNewUser({
                    ...newUser,
                    "userName": newContent
                })
            } else if (id === 2) {
                setNewUser({
                    ...newUser,
                    "email": newContent
                })
            } else if (id === 3) {
                setNewUser({
                    ...newUser,
                    "cpf": newContent
                })
            } else if (id === 4) {
                setNewUser({
                    ...newUser,
                    "phoneNumber": newContent
                })
            } else if (id === 5) {
                setNewUser({
                    ...newUser,
                    "birthDate": newContent
                })
            } else if (id === 6) {
                setNewUser({
                    ...newUser,
                    "cep": newContent
                })
            } else {
                alert('Id inválido.');
            }
        }
    }

    const list = [
        { id: 1, name: "Nome", content: newUser.userName },
        { id: 2, name: "Email", content: newUser.email },
        { id: 3, name: "CPF", content: formatCpf(newUser.cpf) },
        { id: 4, name: "Telefone", content: formatPhone(newUser.phoneNumber) },
        { id: 5, name: "Data de Nascimento", content: formatDate(newUser.birthDate) },
        { id: 6, name: "CEP", content: formatCep(newUser.cep) },
        //{ id: 7, name: "Senha", content: "********" },
    ]

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                visible={visible}
                onRequestClose={() => setVisible(false)}
            >
                <SafeAreaView>
                    <View style={styles.headerModal}>
                        <TouchableOpacity onPress={() => setVisible(false)} style={styles.backModal}>
                            <FontAwesome5 name="chevron-left" size={20} color="#555" style={{ padding: "1%" }} />
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>Mudar {target}</Text>
                        <TouchableOpacity onPress={() => setVisible(false)}>
                            <Text style={styles.modalCancel}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.modalContent}>
                        <Text>Digite o(a) novo(a) {target}:</Text>
                        <TextInput
                            style={styles.modalInput}
                            placeholder={target}
                            placeholderTextColor="#555"
                            onChangeText={(text) => changeUserForm(text)}
                            autoCapitalize='none'
                        />
                    </View>
                </SafeAreaView>
            </Modal>
            <ScrollView
                style={{ width: "100%" }}
            >
                <LinearGradient
                    colors={['#086972', 'transparent']}
                    style={styles.scrollview}
                >
                    <Text style={styles.title}>Alterar Dados</Text>
                    {list.map((item) => {
                        return (
                            <TouchableOpacity key={item.id} style={styles.containerField} onPress={() => {
                                setTarget(item.name);
                                setVisible(true);
                                setId(item.id);
                            }} >
                                <View style={styles.labelField}>
                                    <Text style={styles.titleField}>{item.name}</Text>
                                    <Text style={styles.contentField}>{item.content}</Text>
                                </View>
                                <FontAwesome5 name="chevron-right" color="#B1B1B1" size={20} />
                            </TouchableOpacity>
                        )
                    })}
                    <View style={styles.containerField}>
                        <View style={styles.labelField}>
                            <Text style={styles.titleField}>Status do Usuário</Text>
                            <Text style={styles.contentField}>{user.active ? "Ativo" : "Desativado"}</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={[styles.button, {backgroundColor: "#086972"}]}
                        onPress={() => handlePutUser()}
                    >
                        <Text style={styles.buttonText}>Salvar Alterações</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, {marginBottom: "15%"}]}
                        onPress={handleDisableUser}
                    >
                        <Text style={styles.buttonText}>{user.active ? "Desativar" : "Ativar"} Usuário</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </ScrollView>
        </View>
    )
}