import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from '@expo/vector-icons';
import Loading from '../../Components/Loading';
import { putUserStatus } from '../../services/putUserStatus';
import AuthContext from '../../contexts/auth';

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

    if (loading) {
        return <Loading />
    }

    function handleDisableUser() {
        setLoading(true);
        putUserStatus(authContext, user.userId).then((response) => {
            if (response) {
                setLoading(false);
                navigation.navigate('ManageUser');
                alert('Usuário desativado com sucesso.');
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

    const list = [
        { id: 1, name: "Nome", content: user.userName },
        { id: 2, name: "Email", content: user.email },
        { id: 3, name: "CPF", content: formatCpf(user.cpf) },
        { id: 4, name: "Telefone", content: formatPhone(user.phoneNumber) },
        { id: 5, name: "Data de Nascimento", content: formatDate(user.birthDate) },
        { id: 6, name: "CEP", content: formatCep(user.cep) },
        { id: 7, name: "Senha", content: "********" },
    ]

    return (
        <View style={styles.container}>
            <ScrollView
                style={{ width: "100%" }}
            >
                <LinearGradient
                    colors={['#086972', 'transparent']}
                    style={styles.scrollview}
                >
                    <FontAwesome5 name="user-circle" color="#B1B1B1" size={100} style={{ marginBottom: "5%", marginTop: "5%" }} />
                    <Text style={styles.title}>Alterar Dados</Text>
                    {list.map((item) => {
                        return (
                            <TouchableOpacity key={item.id} style={styles.containerField}>
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
                        style={styles.button}
                        onPress={handleDisableUser}
                    >
                        <Text style={styles.buttonText}>{user.active? "Desativar" : "Ativar"} Usuário</Text>
                    </TouchableOpacity>

                </LinearGradient>
            </ScrollView>
        </View>
    )
}