import React from "react";
import { createStackNavigator } from "@react-navigation/stack"

import Home from "../telas/Home/"

const AppStack = createStackNavigator()

export default function AppRoutes() {
    return (
        <AppStack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <AppStack.Screen name="Home" component={Home} />
        </AppStack.Navigator>
    )
}
