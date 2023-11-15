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
    let statusName = ""
    let colorStatus = ""
    if (item.status.statusName === "Aberto") {
        colorStatus = "#BBB500"
        statusName = "Aberto"
    }else if (item.status.statusName === "Fechado") {
        colorStatus = "#FF0000"
        statusName = "Fechado"
    }else if (item.status.statusName === "Resolvido") {
        colorStatus = "#008000"
        statusName = "Resolvido"
    }else if (item.status.statusName === "Aguardando Cliente") {
        colorStatus = "#BBB500"
        statusName = "Aguardando Cliente"
    }else if (item.status.statusName === "Em andamento") {
        colorStatus = "#BBB500"
        statusName = "Atribuído para:"
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ alignItems: "center" }}>
                    <Text style={styles.title}>Chamado {item.ticketId}</Text>
                    <Text style={[styles.date, {marginBottom: 0}]}>Criado em {data}</Text>
                    <Text style={[styles.date, {marginTop: 0}]}>por {item.requester.userName}</Text>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ color: colorStatus}}>{statusName}<Text style={{color: "black"}}> {item.status.statusName=== "Em andamento"?  item.teamUser?.user?.userName || "Nenhum" : ""}</Text></Text>
                    </View>
                </View>
                <Text style={styles.description}>Título:</Text>
                <Text>{item.title}</Text>
                <Text style={styles.description}>Descrição:</Text>
                <ScrollView style={{maxHeight: "60%"}}>
                    <Text style={{textAlign: "justify", marginHorizontal: "4%"}}>{item.content}</Text>
                </ScrollView>
            </View>
        </View>
    )
}
