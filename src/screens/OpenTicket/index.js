import React from "react";

import { View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";
import styles from "./style";

export default function OpenTicket() {
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollview}>
                <View style={styles.formTop}>
                    <Text style={styles.label}>Título</Text>
                    <TextInput style={styles.input} placeholder="Ex: Acesso ao material" />
                    {/* requester id */}
                    <Text style={styles.label}>Conteúdo</Text>
                    <TextInput style={styles.input} placeholder="Descreva seu problema" multiline={true}/>
                </View>
                <View style={styles.formBottom}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Criar chamado</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}