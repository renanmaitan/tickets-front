import React from "react";

import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import styles from "./style";

export default function Ticket({ route }) {
    const item = route.params.item;
    return (
        <View style={styles.container}>
            {/* fazer busca com o id do chamado qnd estiver disponivel no back para obeter as informações */}
            <Text style={styles.title}>Chamado {item.id}</Text>
            <Text style={styles.date}>Criado em {item.date}</Text>
            <View style={{ flexDirection: "row" }}>
                <Text>Status: </Text>
                <Text style={[styles.date, item.status == "Aberto" ? { color: 'yellow' } : (item.status == "Fechado" ? { color: "red" } : { color: "green" })]}>{item.status}</Text>
            </View>

            <Text style={styles.date}>Título: {item.title}</Text>
            <Text style={styles.description}>Descrição: {item.description}</Text>
        </View>
    )
}
