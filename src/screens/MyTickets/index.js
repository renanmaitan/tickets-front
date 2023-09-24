import React from "react";

import { View, Text, TouchableOpacity, FlatList } from "react-native";
import styles from "./style";
import Item from "./Item";

export default function MyTickets() {

    const DATA = [
        {
            id: "1545",
            title: "Chamado 1dsadsa dasd asd sadd asdsadasda",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel elit nulla. Suspendisse viverra maximus urna, at tincidunt lacus placerat non. Curabitur sit amet lobortis augue. Etiam elementum ante urna, sed semper mi vestibulum quis. Cras id finibus odio, id facilisis est. Aenean tristique enim tortor, in convallis justo finibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel elit nulla. Suspendisse viverra maximus urna, at tincidunt lacus placerat non. Curabitur sit amet lobortis augue. Etiam elementum ante urna, sed semper mi vestibulum quis. Cras id finibus odio, id facilisis est. Aenean tristique enim tortor, in convallis justo finibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel elit nulla. Suspendisse viverra maximus urna, at tincidunt lacus placerat non. Curabitur sit amet lobortis augue. Etiam elementum ante urna, sed semper mi vestibulum quis. Cras id finibus odio, id facilisis est. Aenean tristique enim tortor, in convallis justo finibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel elit nulla. Suspendisse viverra maximus urna, at tincidunt lacus placerat non. Curabitur sit amet lobortis augue. Etiam elementum ante urna, sed semper mi vestibulum quis. Cras id finibus odio, id facilisis est. Aenean tristique enim tortor, in convallis justo finibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel elit nulla. Suspendisse viverra maximus urna, at tincidunt lacus placerat non. Curabitur sit amet lobortis augue. Etiam elementum ante urna, sed semper mi vestibulum quis. Cras id finibus odio, id facilisis est. Aenean tristique enim tortor, in convallis justo finibus.",
            status: "Aberto",
            date: "01/01/2021",
            first: true,
        },
        {
            id: "2545",
            title: "Chamado 2",
            description: "Descrição do chamado 2",
            status: "Fechado",
            date: "01/01/2021"
        },
        {
            id: "3545",
            title: "Chamado 3",
            description: "Descrição do chamado 3",
            status: "Resolvido",
            date: "01/01/2021"
        },
        {
            id: "4545",
            title: "Chamado 4",
            description: "Descrição do chamado 4",
            status: "Aberto",
            date: "01/01/2021"
        },
        {
            id: "5458",
            title: "Chamado 4",
            description: "Descrição do chamado 4",
            status: "Aberto",
            date: "01/01/2021"
        },
        {
            id: "6545",
            title: "Chamado 4",
            description: "Descrição do chamado 4",
            status: "Aberto",
            date: "01/01/2021"
        },
        {
            id: "7545",
            title: "Chamado 4",
            description: "Descrição do chamado 4",
            status: "Aberto",
            date: "01/01/2021"
        },
        {
            id: "8545",
            title: "Chamado 4",
            description: "Descrição do chamado 4",
            status: "Aberto",
            date: "01/01/2021"
        },
    ]

    return (
        <View style={styles.container}>
            <FlatList
                data={DATA}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={item => item.id}
                style={{ width: "100%" }}
            />
        </View>
    )
}