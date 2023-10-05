import React, { useContext, useEffect, useState } from "react";
import { View, FlatList, Text, TextInput, ScrollView, TouchableOpacity, Platform, KeyboardAvoidingView } from "react-native";
import Item from "./Item";
import styles from "./style";
import { createInteraction } from "../../../services/createInteraction";
import { getInteractionsByTicket } from "../../../services/getInteractionsByTicket";
import AuthContext from "../../../contexts/auth";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function Messages({ route }) {

    const ticket = route.params.item;
    const authContext = useContext(AuthContext);
    const {loggedUser} = authContext;
    const [messages, setMessages] = useState([]);
    const [form, setForm] = useState({
        interaction: {
            content: "",
            date: new Date(),
            user: { userId: loggedUser.data.userId },
            ticket: { ticketId: ticket.ticketId }
        }
    });
    // const messages = [
    //     {
    //         "messageId": 1,
    //         "content": "Olá, bom dia!",
    //         "date": "2021-06-01T08:00:00",
    //         "user": {
    //             "userId": 1,
    //             "name": "João",
    //         },
    //         "role": "requester"
    //     },
    //     {
    //         "messageId": 2,
    //         "content": "Olá, bom dia!",
    //         "date": "2021-06-01T08:00:05",
    //         "user": {
    //             "userId": 2,
    //             "name": "Maria",
    //         },
    //         "role": "agent"
    //     },
    // ]

    const hanldeGetInteractions = async () => {
        const response = await getInteractionsByTicket({ ticketId: "1", authContext: authContext });
        setMessages(response.data);
    }

    useEffect(() => {
        hanldeGetInteractions();
    }, [messages])

    async function handleCreateInteraction() {
        try {
            const response = await createInteraction({interaction: form, authContext: authContext});
            if (response.status == 201) {
                console.log("interação criada com sucesso");
            }
            else {
                console.log("erro ao criar interação");
            }
        }
        catch (error) {
            console.error(error);
        }
    }


    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                keyExtractor={item => item.interactionId}
                renderItem={({ item }) => <Item item={item} />}
                style={styles.flatlist}
            />

            <KeyboardAvoidingView
                behavior="padding"
                enabled={Platform.OS === "ios"}
                style={styles.inputContainer}>
                <View style={styles.input}>
                    <TextInput
                        multiline={true}
                        style={styles.inputMessage}
                        placeholder="Digite sua mensagem"
                    />
                    <TouchableOpacity 
                    style={{ marginHorizontal: "4%" }}
                    onPress={handleCreateInteraction}
                    >
                        <Icon name="send" size={26} color={"#182955"} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}