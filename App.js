import React from "react"

import { NavigationContainer } from "@react-navigation/native"
import { StatusBar } from "react-native"

import {AuthProvider} from "./src/contexts/auth"
import { RolesProvider } from "./src/contexts/roles"
import Routes from "./src/routes"
import ChatScreen from "./src/websocketTest"

export default function App() {
  const a = false
  return (
    a? <ChatScreen /> :
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
