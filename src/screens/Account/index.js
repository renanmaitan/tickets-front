import React, {useContext} from "react";
import { View, Text, TouchableOpacity} from "react-native";

import styles from "./style";
import AuthContext from "../../contexts/auth";

export default function Account() {

    const { signOut } = useContext(AuthContext);

    function handleSignOut() {
        signOut();
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity 
            style={styles.button}
            onPress={handleSignOut}
            >
                <Text style={styles.buttonText}>Sair</Text>
            </TouchableOpacity>

        </View>
    )
}