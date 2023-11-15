import React, { useContext, useState } from "react";

import { View, Text, ScrollView, TextInput, TouchableOpacity, Alert } from "react-native";
import styles from "./style";
import AuthContext from "../../contexts/auth";

import { createTicket } from "../../services/createTicket";
import Loading from "../../Components/Loading";
import Select from "../../Components/Select";
import moment from "moment-timezone";
import { getCategories } from "../../services/getCategories";

export default function OpenTicket({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState("");
    const { loggedUser } = useContext(AuthContext);
    const authContext = useContext(AuthContext);
    const [optionsCategories, setOptionsCategories] = useState([]);

    const [form, setForm] = useState({
        ticket: {
            title: "",
            requester: { userId: loggedUser.data.userId },
            content: "",
            priority: { priorityId: "1" },
            status: { statusId: "1" },
            openingDate: moment().tz("America/Sao_Paulo").format('YYYY-MM-DDTHH:mm:ss'),
            department: { departmentId: null },
            category: { categoryId: null },
        },
        authContext: useContext(AuthContext),
    });

    function handleCategoriesOptions(data) {
        const options = [];
        data.forEach((category) => {
            options.push({ id: category.categoryId, label: category.categoryName });
        });
        return options;
    }

    const departments = [
        { id: "1", label: "Pedagógico" },
        { id: "2", label: "Seleção" },
        { id: "3", label: "Social" },
        { id: "4", label: "Departamento Pessoal" },
        { id: "5", label: "Comercial" },
    ];

    async function onChangeSelectDepartment(id) {
        setForm({ ...form, ticket: { ...form.ticket, department: { departmentId: id } } })
        const response = await getCategories(authContext, id);
        const options = handleCategoriesOptions(response);
        setOptionsCategories(options);
    }

    async function handleCreateTicket() {
        setLoading(true);
        if (!form.ticket.title || !form.ticket.content || !form.ticket.department.departmentId || !form.ticket.category.categoryId) {
            setAlert("Preencha todos os campos!");
            setLoading(false);
            return;
        }
        try {
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
                        onChangeSelect={(value) => onChangeSelectDepartment(value)}
                        text="Selecione um departamento"
                    />
                    {form.ticket.department.departmentId && (
                        <Select
                            options={optionsCategories}
                            onChangeSelect={(value) => setForm({ ...form, ticket: { ...form.ticket, category: { categoryId: value } } })}
                            text="Selecione uma categoria"
                        />
                    )
                    }
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