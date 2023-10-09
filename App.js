import React from "react"

import { NavigationContainer } from "@react-navigation/native"
import { StatusBar } from "react-native"

import {AuthProvider} from "./src/contexts/auth"
import { RolesProvider } from "./src/contexts/roles"
import Routes from "./src/routes"

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <RolesProvider>
          <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
          <Routes />
        </RolesProvider>
      </AuthProvider>
    </NavigationContainer>
  )
}
