import React from "react";

import { View, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import styles from "./style";

export default function Ticket({ route }) {
    const item = route.params.item;
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {/* fazer busca com o id do chamado qnd estiver disponivel no back para obeter as informações */}
                {/* cor em hexadecimal para um amarelo mais escuro doq #FFC300: #FFD700 */}
                <View style={{ alignItems: "center" }}>
                    <Text style={styles.title}>Chamado {item.id}</Text>
                    <Text style={styles.date}>Criado em {item.date}</Text>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.status}>Status: </Text>
                        <Text style={[item.status == "Aberto" ? { color: '#BBB500' } : (item.status == "Fechado" ? { color: "red" } : { color: "green" })]}>{item.status}</Text>
                    </View>
                </View>
                <Text style={styles.description}>Título:</Text>
                <Text>{item.title}</Text>
                <Text style={styles.description}>Descrição:</Text>
                <ScrollView style={{maxHeight: "60%", marginTop:"4%"}}>
                    <Text style={{textAlign: "justify", marginHorizontal: "4%"}}>{item.description}</Text>
                </ScrollView>
            </View>
        </View>
    )
}
