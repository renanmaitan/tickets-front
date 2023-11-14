import React from "react";

import { View, Text, TouchableOpacity, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import styles from "./style";

export default function Item({ item }) {
    const navigation = useNavigation();

    let iconName = ""
    if (item.department.departmentName === "Pedagógico") {
        iconName = "school-outline"
    } else if (item.department.departmentName === "Seleção") {
        iconName = "file-sign"
    } else if (item.department.departmentName === "Social") {
        iconName = "account-group"
    } else if (item.department.departmentName === "Departamento Pessoal") {
        iconName = "account-tie"
    } else if (item.department.departmentName === "Comercial") {
        iconName = "shopping"
    } else {
        iconName = "account-question"
    }

    let iconStatus = ""
    let statusName = ""
    let colorStatus = ""
    if (item.status.statusName === "Open") {
        iconStatus = "timer-sand"
        colorStatus = "#FFD700"
        statusName = "Aberto"
    }else if (item.status.statusName === "Closed") {
        iconStatus = "lock-check"
        colorStatus = "#FF0000"
        statusName = "Fechado"
    }else if (item.status.statusName === "Solved") {
        iconStatus = "check"
        colorStatus = "#008000"
        statusName = "Resolvido"
    }else if (item.status.statusName === "Pending") {
        iconStatus = "timer-sand"
        colorStatus = "#FFD700"
        statusName = "Pendente"
    }else if (item.status.statusName === "On Hold") {
        iconStatus = "hand-front-left"
        colorStatus = "#FFD700"
        statusName = "Atribuído"
    }

    const dia = item.openingDate.substring(8, 10)
    const mes = item.openingDate.substring(5, 7)
    const ano = item.openingDate.substring(0, 4)
    const hora = item.openingDate.substring(11, 16)
    openingDate = dia + "/" + mes + "/" + ano + " às " + hora

    return (
        <Pressable
            style={styles.containerItem}
            onPress={() => {
                navigation.navigate("TicketRoute", {
                    item: item
                });
            }}
        >
            <View style={item.first === true ? styles.cardOne : styles.item}>
                <View style={styles.top}>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Icon name={iconName} size={26} color="#444" style={{marginRight: "6%"}}/>
                        <Text style={styles.title} numberOfLines={1}>#{item.ticketId}</Text>
                    </View>
                    <Text style={styles.date}>{openingDate}</Text>
                </View>
                <View style={styles.cardBody}>
                    <Text numberOfLines={1} style={styles.ticketTitle}>{item.title}</Text>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Icon name="account-plus" size={16} color="#444" style={{marginRight: "1%"}}/>
                        <Text style={styles.analyst}>{item.requester.userName}</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginVertical: "1%" }}>
                        <Text>{statusName}</Text>
                        <Icon name={iconStatus} size={16} color={colorStatus} style={{ marginLeft: "1%" }} />
                    </View>
                    <Text style={{ textDecorationLine: "underline", textAlign: "center", color: "#333" }}>Clique no card para abrir o chamado</Text>
                </View>
            </View>
        </Pressable>
    )
}