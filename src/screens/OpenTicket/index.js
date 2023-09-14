import React, { useContext } from "react";

import { View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";
import styles from "./style";
import AuthContext from "../../contexts/auth";

import { createTicket } from "../../services/createTicket";

export default function OpenTicket() {

    
    const { access_token } = useContext(AuthContext);
    const form = {
        ticket: {
            title: "",
            requester : {id : ""},
            content: "",
            priority: "1",
            status: "open",
            openingDate: new Date(),
            modificationDate: new Date(),
            department: {id: "1"},
            teamUser: {id: "1"},
        },
        access_token: access_token
    }

    async function handleCreateTicket() {
        const response = await createTicket(form);
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