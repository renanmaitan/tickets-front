import React, { useContext, useEffect, useState } from "react";
import { View, FlatList, Text, TextInput, ScrollView, TouchableOpacity, Platform, KeyboardAvoidingView } from "react-native";
import Item from "./Item";
import styles from "./style";
import { createInteraction } from "../../../services/createInteraction";
import { getInteractionsByTicket } from "../../../services/getInteractionsByTicket";
import AuthContext from "../../../contexts/auth";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function Messages() {

    const authContext = useContext(AuthContext);
    const [messages, setMessages] = useState([]);
    const [carregarMais, setCarregarMais] = useState(false);
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
    //     {
    //         "messageId": 3,
    //         "content": "Olá, bom dia!",
    //         "date": "2021-06-01T08:02:00",
    //         "user": {
    //             "userId": 1,
    //             "name": "João",
    //         },
    //         "role": "requester"
    //     },
    //     {
    //         "messageId": 4,
    //         "content": "Olá, bom dia!",
    //         "date": "2021-06-01T08:02:30",
    //         "user": {
    //             "userId": 2,
    //             "name": "Maria",
    //         },
    //         "role": "agent"
    //     },
    //     {
    //         "messageId": 5,
    //         "content": "Olá, bom dia!",
    //         "date": "2021-06-01T08:04:00",
    //         "user": {
    //             "userId": 1,
    //             "name": "João",
    //         },
    //         "role": "requester"
    //     },
    //     {
    //         "messageId": 6,
    //         "content": "Olá, bom dia! Olá, bom dia! Olá, bom dia! Olá, bom dia! Olá, bom dia! Olá, bom dia! Olá, bom dia! Olá, bom dia! Olá, bom dia! Olá, bom dia! Olá, bom dia! Olá, bom dia!",
    //         "date": "2021-06-01T09:00:00",
    //         "user": {
    //             "userId": 2,
    //             "name": "Maria",
    //         },
    //         "role": "agent"
    //     },
    //     {
    //         "messageId": 7,
    //         "content": "Olá, bom dia!",
    //         "date": "2021-06-01T09:10:00",
    //         "user": {
    //             "userId": 1,
    //             "name": "João",
    //         },
    //         "role": "requester"
    //     },
    //     {
    //         "messageId": 8,
    //         "content": "Olá, bom dia!",
    //         "date": "2021-06-01T09:20:00",
    //         "user": {
    //             "userId": 2,
    //             "name": "Maria",
    //         },
    //         "role": "agent"
    //     },
    //     {
    //         "messageId": 9,
    //         "content": "Olá, bom dia!",
    //         "date": "2021-06-01T09:30:00",
    //         "user": {
    //             "userId": 1,
    //             "name": "João",
    //         },
    //         "role": "requester"
    //     }
    // ]

    const hanldeGetInteractions = async () => {
        const response = await getInteractionsByTicket({ ticketId: "1", authContext: authContext });
        setMessages(response.data);
    }

    const form = {
        interaction: {
            content: "",
            date: new Date(),
            user: { userId: "1" },
            ticket: { ticketId: "1" }
        }
    }

    useEffect(() => {
        hanldeGetInteractions();
    }, [carregarMais])

    //indentificar o scroll para baixo e carregar mais mensagens
    const handleScroll = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.y;
        const scrollHeight = event.nativeEvent.contentSize.height;
        const screenHeight = event.nativeEvent.layoutMeasurement.height;
        if (scrollPosition < 100 && scrollHeight > screenHeight) {
            setCarregarMais(true);
        }
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                keyExtractor={item => item.interactionId}
                renderItem={({ item }) => <Item item={item} />}
                style={styles.flatlist}
                onScroll={handleScroll}
                onContentSizeChange={() => setCarregarMais(false)}
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
                    <TouchableOpacity style={{ marginHorizontal: "4%" }}>
                        <Icon name="send" size={26} color={"#182955"} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}