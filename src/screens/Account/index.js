import React, {useContext, useState} from "react";
import { View, Text, TouchableOpacity} from "react-native";
import { FontAwesome5 } from 'react-native-vector-icons';

import styles from "./style";
import AuthContext from "../../contexts/auth";

export default function Account() {
    const { signOut } = useContext(AuthContext);

    function handleSignOut() {
        signOut();
    }

    return (
        <View style={styles.container}>
            <FontAwesome5 name="user-circle" color="#B1B1B1" size={100} style={{marginBottom: "15%", marginTop: "15%"}}/>
            <TouchableOpacity style={styles.containerField}>
                <View style={styles.labelField}>
                    <Text style={styles.titleField}>Nome</Text>
                    <Text style={styles.contentField}>Renan</Text>
                </View>
                <FontAwesome5 name="chevron-right" color="#B1B1B1" size={20} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.containerField}>
                <View style={styles.labelField}>
                    <Text style={styles.titleField}>Email</Text>
                    <Text style={styles.contentField}>renan@email.com</Text>
                </View>
                <FontAwesome5 name="chevron-right" color="#B1B1B1" size={20} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.containerField}>
                <View style={styles.labelField}>
                    <Text style={[styles.titleField, {paddingVertical: "3%"}]}>Senha</Text>
                </View>
                <FontAwesome5 name="chevron-right" color="#B1B1B1" size={20} />
            </TouchableOpacity>
            <TouchableOpacity 
            style={styles.button}
            onPress={handleSignOut}
            >
                <Text style={styles.buttonText}>Sair</Text>
            </TouchableOpacity>

        </View>
    )
}