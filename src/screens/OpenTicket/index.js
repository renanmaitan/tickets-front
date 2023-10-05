import React, { useContext, useState } from "react";

import { View, Text, ScrollView, TextInput, TouchableOpacity, Alert } from "react-native";
import styles from "./style";
import AuthContext from "../../contexts/auth";

import { createTicket } from "../../services/createTicket";
import Loading from "../../Components/Loading";
import Select from "../../Components/Select";


export default function OpenTicket({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState("");
    const { loggedUser } = useContext(AuthContext);

    const [form, setForm] = useState({
        ticket: {
            title: "",
            requester: { userId: loggedUser.data.userId },
            content: "",
            priority: { priorityId: "1" },
            status: { statusId: "1" },
            openingDate: new Date(),
            modificationDate: new Date(),
            department: { departmentId: "1" },
            teamUser: { teamUserId: "1" },
        },
        authContext: useContext(AuthContext),
    });

    const departments = [
        { id: "1", label: "Pedagógico" },
        { id: "2", label: "Seleção" },
        { id: "3", label: "Social" },
        { id: "4", label: "Departamento Pessoal" },
        { id: "5", label: "Comercial" },
    ];

    // send multipart file react native

    async function handleCreateTicket() {
        setLoading(true);
        try {
            console.log(form);
            const response = await createTicket(form);
            if (response.status == 201) {
                setAlert(null);
                navigation.navigate("Home");
                Alert.alert("Chamado criado com sucesso!");
            }
            else {
                setAlert("Erro ao criar chamado!");
            }
            setLoading(false);
        }
        catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

    if (loading) {
        return <Loading />
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollview}>
                <View style={styles.formTop}>
                    <Text style={styles.label}>Título</Text>
                    <TextInput
                        onChangeText={(text) => setForm({ ...form, ticket: { ...form.ticket, title: text } })}
                        style={styles.input}
                        placeholder="Ex: Acesso ao material"
                        value={form.ticket.title}
                    />
                    {/* requester id */}
                    <Text style={styles.label}>Conteúdo</Text>
                    <TextInput
                        onChangeText={(text) => setForm({ ...form, ticket: { ...form.ticket, content: text } })}
                        style={styles.input}
                        placeholder="Descreva seu problema" multiline={true}
                        value={form.ticket.content}
                    />
                    <Text style={styles.label}>Departamento</Text>
                    <Select
                        options={departments}
                        onChangeSelect={(value) => setForm({ ...form, ticket: { ...form.ticket, department: { departmentId: value } } })}
                        text="Selecione um departamento"
                    />
                </View>
                <View style={styles.alertContainer}><Text style={styles.alert}>{alert}</Text></View>
                <View style={styles.formBottom}>
                    <TouchableOpacity
                        onPress={handleCreateTicket}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Criar chamado</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}