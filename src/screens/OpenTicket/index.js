import React from "react";

import { View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";
import styles from "./style";
import createTicket  from "../../services/ticket";
import AuthContext from "../../contexts/auth"
export default function OpenTicket() {
    const { access_token } = React.useContext(AuthContext);

    const [ticket, setTicket] = React.useState({
        title: '',
        content: '',
        requester: { userId: '1' },
        status: { statusId: '1' },
        priority: { priorityId: '1' },
        openingDate: new Date(),
        department: { departmentId: '1' },
        category: { categoryId: undefined }
    });

    async function handleTicketForms() {
        if (ticket.title == '') {
            alert('Preencha o campo título');
            return;
        }

        if (ticket.content == '') {
            alert('Preencha o campo conteúdo');
            return;
        }
        
        await createTicket(ticket, access_token);
    }



    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollview}>
                <View style={styles.formTop}>
                    <Text style={styles.label}>Título</Text>
                    <TextInput onChangeText={(value) => {
                        setTicket({
                            ...ticket,
                            title: value
                        })
                    }}
                        value={ticket.title}
                        style={styles.input} placeholder="Ex: Acesso ao material" />
                    
                    <Text style={styles.label}>Conteúdo</Text>
                    <TextInput onChangeText={(value) => {
                        setTicket({
                            ...ticket,
                            content: value
                        })
                    }}
                        value={ticket.content}
                        style={styles.input} placeholder="Descreva seu problema" multiline={true} />
                </View>
                <View style={styles.formBottom}>
                    <TouchableOpacity
                        onPress={() => {
                            handleTicketForms();
                        }}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Criar chamado</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}