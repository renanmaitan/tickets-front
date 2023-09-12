import React from "react";

import { View, Text, ScrollView, TextInput } from "react-native";
import styles from "./style";

export default function OpenTicket() {
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollview}>
                <View>
                    
                </View>
                <View style={styles.formTop}>
                    <Text style={styles.label}>Título</Text>
                    <TextInput style={styles.input} placeholder="Ex: Chamado" />
                    {/* requester id */}
                    <Text>Conteúdo</Text>
                    <TextInput style={styles.input} placeholder="Conteúdo" multiline={true}/>
                    <TextInput style={styles.input} placeholder="Título" />
                    <TextInput style={styles.input} placeholder="Título" />
                    <TextInput style={styles.input} placeholder="Título" />
                    <TextInput style={styles.input} placeholder="Título" />
                    <TextInput style={styles.input} placeholder="Título" />
                    <TextInput style={styles.input} placeholder="Título" />
                    <TextInput style={styles.input} placeholder="Título" />
                    <TextInput style={styles.input} placeholder="Título" />
                    <TextInput style={styles.input} placeholder="Título" />
                    <TextInput style={styles.input} placeholder="Título" />
                    <TextInput style={styles.input} placeholder="Título" />
                    <TextInput style={styles.input} placeholder="Título" />
                </View>
            </ScrollView>
        </View>
    )
}