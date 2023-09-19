import React, { useContext, useState } from "react";

import { View, Text, ScrollView, TextInput, TouchableOpacity, Alert } from "react-native";
import styles from "./style";
import AuthContext from "../../contexts/auth";

import { createTicket } from "../../services/createTicket";
import Loading from "../../Components/Loading";

export default function OpenTicket({ navigation}) {
    const [loading, setLoading] = useState(false);
    const { access_token } = useContext(AuthContext);
    const [alert, setAlert] = useState("");
    const form = {
        ticket: {
            title: "",
            requester : {userId : "1"},
            content: "",
            priority: {priorityId: "1"},
            status: {statusId: "1"},
            openingDate: new Date(),
            modificationDate: new Date(),
            department: {departmentId: "1"},
            teamUser: {teamUserId: "1"},
        },
        access_token: access_token
    }   

    // send multipart file react native

    async function handleCreateTicket() {
        setLoading(true);
        try{
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
        catch(error){
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
                    onChangeText={(text) => form.ticket.title = text}
                    style={styles.input} 
                    placeholder="Ex: Acesso ao material" 
                    />
                    {/* requester id */}
                    <Text style={styles.label}>Conteúdo</Text>
                    <TextInput 
                    onChangeText={(text) => form.ticket.content = text}
                    style={styles.input} 
                    placeholder="Descreva seu problema" multiline={true}
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