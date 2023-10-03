import React from "react";

import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import styles from "./style";

export default function Item({ item } ) {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            style={styles.containerItem}
            onPress={() => {
                navigation.navigate("TicketRoute", {
                    item: item
                });
            }}
        >
            <View style={item.first === true ? styles.cardOne : styles.item}>
                <View style={styles.cardTop}>
                    <Text style={styles.title} numberOfLines={1}>Chamado: {item.ticketId}</Text>
                    <Text style={styles.date}>Criado em: {item.openingDate}</Text>
                </View>
                <View style={styles.cardBody}>
                    <View style={{ flexDirection: "row" }}><Text>Status: </Text><Text style={item.status.statusName == 'Open' ? { color: "yellow" } : (item.status.statusName == 'Closed' ? { color: "red" } : { color: "green" })}>{item.status.statusName == "Open"? "Aberto": (item.status.statusName == "Fechado"? "Fechado": "Resolvido")}</Text></View>
                    <Text numberOfLines={1}>Título: {item.title}</Text>
                    <Text style={{ textDecorationLine: "underline" }}>Clique no card para abrir o chamado</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}