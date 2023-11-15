import React from "react";
import { createStackNavigator } from "@react-navigation/stack"
import { StyleSheet } from "react-native"

import Login from "../screens/Login/"

const AuthStack = createStackNavigator()

export default function AuthRoutes() {
    return (
        <AuthStack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name="Login" component={Login} />
        </AuthStack.Navigator>
    )
}


const styles = StyleSheet.create({
    header: {
        backgroundColor: "#182955",
    },
})
