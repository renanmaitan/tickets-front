import React from "react";

import { View, Text, TouchableOpacity } from "react-native";

import styles from "./style";

const Item = ({ item }) => (
    <TouchableOpacity style={styles.containerItem}>
        <View style={item.first === true ? styles.cardOne : styles.item}>
            <View style={styles.cardTop}>
                <Text style={styles.title} numberOfLines={1}>Cahamdo: {item.id}</Text>
                <Text style={styles.date}>Criado em: {item.date}</Text>
            </View>
            <View style={styles.cardBody}>
                <View style={{flexDirection: "row"}}><Text>Status: </Text><Text style={item.status=='Aberto'?{color: "yellow"}:(item.status=='Fechado'?{color: "red"}:{color: "green" })}>{item.status}</Text></View>
                <Text numberOfLines={1}>Título: {item.title}</Text>
                <Text style={{textDecorationLine: "underline"}}>Clique no card para abrir o chamado</Text>
            </View>
        </View>
    </TouchableOpacity>
);

export default Item;