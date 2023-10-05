import React from "react";

import { View, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import styles from "./style";

export default function Ticket({ route }) {
    const item = route.params.item;
    const dia = item.openingDate.substring(8, 10);
    const mes = item.openingDate.substring(5, 7);
    const ano = item.openingDate.substring(0, 4);
    const hora = item.openingDate.substring(11, 13);
    const minuto = item.openingDate.substring(14, 16);
    const data = dia + "/" + mes + "/" + ano + " às " + hora + ":" + minuto;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ alignItems: "center" }}>
                    <Text style={styles.title}>Chamado {item.ticketId}</Text>
                    <Text style={styles.date}>Criado em {data}</Text>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.status}>Status: </Text>
                        <Text style={[item.status.statusName == "Open" ? { color: '#BBB500' } : (item.status.statusName == "Closed" ? { color: "red" } : { color: "green" })]}>{item.status.statusName == "Open"? "Aberto": (item.status.statusName == "Closed"?"Fechado":"Resolvido")}</Text>
                    </View>
                </View>
                <Text style={styles.description}>Título:</Text>
                <Text>{item.title}</Text>
                <Text style={styles.description}>Descrição:</Text>
                <ScrollView style={{maxHeight: "60%", marginTop:"4%"}}>
                    <Text style={{textAlign: "justify", marginHorizontal: "4%"}}>{item.content}</Text>
                </ScrollView>
            </View>
        </View>
    )
}
