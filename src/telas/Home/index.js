import React, {useContext} from "react";
import AuthContext from "../../contexts/auth";
import { Button, View } from "react-native";

export default function Login() {
    const { signOut } = useContext(AuthContext);

    function handleSignOut() {
        signOut();
    }

    return (
        <View>
            <Button title="Sign Out" onPress={handleSignOut} />
        </View>
    );
}
