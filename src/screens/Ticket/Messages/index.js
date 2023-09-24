import React from "react";
import { View, FlatList, Text, TextInput, ScrollView } from "react-native";

import Item from "./Item";
import styles from "./Item/style";

export default function Messages() {

    const messages = [
        {
            "messageId": 1,
            "content": "Olá, bom dia!",
            "date": "2021-06-01T08:00:00",
            "user": {
                "userId": 1,
                "name": "João",
            },
            "role": "requester"
        },
        {
            "messageId": 2,
            "content": "Olá, bom dia!",
            "date": "2021-06-01T08:00:05",
            "user": {
                "userId": 2,
                "name": "Maria",
            },
            "role": "agent"
        },
        {
            "messageId": 3,
            "content": "Olá, bom dia!",
            "date": "2021-06-01T08:02:00",
            "user": {
                "userId": 1,
                "name": "João",
            },
            "role": "requester"
        },
        {
            "messageId": 4,
            "content": "Olá, bom dia!",
            "date": "2021-06-01T08:02:30",
            "user": {
                "userId": 2,
                "name": "Maria",
            },
            "role": "agent"
        },
        {
            "messageId": 5,
            "content": "Olá, bom dia!",
            "date": "2021-06-01T08:04:00",
            "user": {
                "userId": 1,
                "name": "João",
            },
            "role": "requester"
        },
        {
            "messageId": 6,
            "content": "Olá, bom dia! Olá, bom dia! Olá, bom dia! Olá, bom dia! Olá, bom dia! Olá, bom dia! Olá, bom dia! Olá, bom dia! Olá, bom dia! Olá, bom dia! Olá, bom dia! Olá, bom dia!",
            "date": "2021-06-01T09:00:00",
            "user": {
                "userId": 2,
                "name": "Maria",
            },
            "role": "agent"
        },
        {
            "messageId": 7,
            "content": "Olá, bom dia!",
            "date": "2021-06-01T09:10:00",
            "user": {
                "userId": 1,
                "name": "João",
            },
            "role": "requester"
        },
        {
            "messageId": 8,
            "content": "Olá, bom dia!",
            "date": "2021-06-01T09:20:00",
            "user": {
                "userId": 2,
                "name": "Maria",
            },
            "role": "agent"
        },
        {
            "messageId": 9,
            "content": "Olá, bom dia!",
            "date": "2021-06-01T09:30:00",
            "user": {
                "userId": 1,
                "name": "João",
            },
            "role": "requester"
        }
    ]

    return (
        <View style={{ width: "100%", alignItems: "center", flex: 1 }}>
            <FlatList
                data={messages}
                keyExtractor={item => item.messageId}
                renderItem={({ item }) => <Item item={item} />}
                style={{ width: "100%", height: "90%", marginBottom: "2%" }}
            />

            <View style={{ width: "100%", maxHeight: "40%" }}>
                <ScrollView style={{ width: "100%", marginVertical:"2%" }}>
                    <View style={{alignItems: "center"}}>
                        <TextInput
                            multiline={true}
                            style={styles.inputMessage}
                            placeholder="Digite sua mensagem"
                        />
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}