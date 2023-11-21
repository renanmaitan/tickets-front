import React, { useContext, useEffect, useState } from "react";
import { View, TouchableOpacity, Text, Modal, TextInput, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./style";
import { FontAwesome5 } from "@expo/vector-icons"
import { getUserById } from "../../services/getUserById";
import AuthContext from "../../contexts/auth";

export default function ManageUser({ navigation }) {

    const [visibleId, setVisibleId] = useState(false);
    const [id, setId] = useState(null);
    const authContext = useContext(AuthContext);

    const findUserById = () => {
        if (id === null || id === '') {
            alert('Digite o id do usuário que deseja encontrar.');
        } else {
            getUserById(authContext, id).then((response) => {
                if (response) {
                    setVisibleId(false);
                    setId(null);
                    navigation.navigate('User', { item: response });
                } else {
                    alert('Usuário não encontrado.');
                }
            });
        }
    }

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                visible={visibleId}
                onRequestClose={() => setVisibleId(false)}
            >
                <SafeAreaView>
                    <View style={styles.headerModal}>
                        <TouchableOpacity onPress={() => setVisibleId(false)} style={styles.backModal}>
                            <FontAwesome5 name="chevron-left" size={20} color="#555" style={{ padding: "1%" }} />
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>Buscar por id</Text>
                        <TouchableOpacity onPress={() => setVisibleId(false)}>
                            <Text style={styles.modalCancel}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.modalContent}>
                        <Text>Digite o id do usuário que deseja encontrar:</Text>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Id do usuário"
                            placeholderTextColor="#555"
                            keyboardType="numeric"
                            onChangeText={(text) => setId(text)}
                            value={id}
                        />
                        <TouchableOpacity style={styles.modalButton} onPress={() => findUserById()}>
                            <Text style={styles.optionText}>Buscar</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </Modal>
            <LinearGradient
                colors={['#FFF', 'transparent']}
                style={styles.container}
                start={{ x: 1, y: 0.2 }}
            >
                <Text style={styles.title} numberOfLines={1}>Encontrar Usuário</Text>
                <View style={styles.buttonContainer}>
                    <View style={styles.line}>
                        <TouchableOpacity style={styles.touchable}
                            onPress={() => setVisibleId(true)}
                        >
                            <LinearGradient
                                colors={['#182955', '#3f4557']}
                                style={styles.openTicket}
                            >
                                <Text style={styles.optionText}>Buscar por id</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touchable}
                            onPress={() => alert('Em desenvolvimento')}
                        >
                            <LinearGradient
                                colors={['#184455', '#3f4e57']}
                                style={styles.openTicket}
                            >
                                <Text style={styles.optionText}>Buscar por nome</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.line}>
                        <TouchableOpacity style={styles.touchable}
                            onPress={() => alert('Em desenvolvimento')}
                        >
                            <LinearGradient
                                colors={['#18554e', '#3f5754']}
                                style={styles.openTicket}
                            >
                                <Text style={styles.optionText}>Buscar por CPF</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touchable}
                            onPress={() => alert('Em desenvolvimento')}
                        >
                            <LinearGradient
                                colors={['#182955', '#3f4557']}
                                style={styles.openTicket}
                            >
                                <Text style={styles.optionText}>Buscar por email</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
}
