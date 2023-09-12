import React, { useContext } from "react";
import AuthContext from "../../contexts/auth";
import { View, TouchableOpacity, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import styles from "./style";
import Logo from "./Logo";

export default function Home({navigation}) {
    return (
        <View style={styles.container}>
            <LinearGradient
                start={{ x: 0.0, y: 0.0 }} end={{ x: 1.2, y: 1.2 }}
                colors={['#374C2C', 'transparent']}
                style={styles.scrollview}
            >
                <View style={styles.titleContainer}>
                    <Text style={styles.title} numberOfLines={1}>Whinderson</Text>
                    <Logo />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.touchable}
                    onPress={() => navigation.navigate('OpenTicket')}
                    >
                        <LinearGradient
                            start={{ x: 0.0, y: 0.0 }} end={{ x: 1.0, y: 1.0 }}
                            colors={['#374C2C', '#86B862']}
                            style={styles.openTicket}
                        >
                            <Text style={styles.optionText}>Abrir um chamado</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touchable}
                    
                    >
                        <LinearGradient
                            start={{ x: 0.0, y: 0.0 }} end={{ x: 1.6, y: 1.6 }}
                            colors={['#182955', 'transparent']}
                            style={styles.openTicket}
                        >
                            <Text style={styles.optionText}>Meus Chamados</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </View>
    );
}
