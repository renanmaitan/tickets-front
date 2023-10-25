import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/auth";
import { View, TouchableOpacity, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import RolesContext from "../../contexts/roles";

import styles from "./style";
import Logo from "./Logo";

export default function Home({ navigation }) {

    const { loggedUser } = useContext(AuthContext);
    const [userName, setUserName] = useState('Usuário');
    const {roles} = useContext(RolesContext);
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        if (loggedUser) {
            setUserName(loggedUser.data.userName)
        }
    }, [loggedUser])

    useEffect(() => {
        if (roles) {
            if (roles.data.includes('analyst')) {
                setAdmin(true);
            }
        }
    }, [roles])

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#FFF', 'transparent']}
                style={styles.container}
                start={{ x: 1, y: 0.2 }}
            >
                {/* <Text style={styles.title} numberOfLines={1}>{userName}</Text> */}
                <Logo />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.touchable}
                        onPress={() => navigation.navigate('OpenTicket')}
                    >
                        <LinearGradient
                            colors={['#182955', '#3f4557']}
                            style={styles.openTicket}
                        >
                            <Text style={styles.optionText}>Abrir um chamado</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    {admin ? (
                        <TouchableOpacity style={styles.touchable}
                            onPress={() => navigation.navigate('Tickets')}
                        >
                            <LinearGradient
                                colors={['#184455', '#3f4e57']}
                                style={styles.openTicket}
                            >
                                <Text style={styles.optionText}>Chamados</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    ) : (
                        <View></View>
                    )}
                    <TouchableOpacity style={styles.touchable}
                        onPress={() => navigation.navigate('MyTickets')}
                    >
                        <LinearGradient
                            colors={['#18554e', '#3f5754']}
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
