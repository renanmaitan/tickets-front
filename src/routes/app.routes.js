import React from "react";
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from 'react-native-vector-icons';

import Home from "../screens/Home"
import OpenTicket from "../screens/OpenTicket";
import Account from "../screens/Account";
import MyTickets from "../screens/MyTickets";
import MyTicketsRoutes from "./mytickets.routes";
import Tickets from "../screens/Tickets";
import Cadastro from "../screens/Cadastro";
import Relatory from "../screens/Relatory";
import ManageUser from "../screens/ManageUser";
import User from "../screens/User";

const AppStack = createStackNavigator()
const Tab = createBottomTabNavigator()

const options = {
  headerShown: false,
  tabBarStyle: {
    backgroundColor: "#182955",
    height: 60,
  },
  tabBarActiveTintColor: "#FFF",
  tabBarInactiveTintColor: "#4B5C88",
  tabBarLabelStyle: {
    fontSize: 14,
  },
  tabBarIconStyle: {
    marginTop: 5,
  },
  tabBarHideOnKeyboard: true,
}


function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      backBehavior="history"
      screenOptions={options}
    >
      <Tab.Screen
        name="HomeTab"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="home" color={color} size={size} />
          ),
          tabBarLabel: () => { return null }
        }}
      />
      <Tab.Screen
        name="Minha Conta"
        component={Account}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user-cog" color={color} size={size} />
          ),
          headerShown: true,
          title: "Configurações da Conta",
          headerStyle: styles.header,
          headerTintColor: '#FFF',
          tabBarLabel: () => { return null }
        }}
      />
    </Tab.Navigator>
  )
}

export default function AppRoutes() {
  return (
    <AppStack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="Home" component={Tabs} />
      <AppStack.Screen name="OpenTicket" component={OpenTicket} options={{
        headerShown: true,
        title: "Abrir Chamado",
        headerStyle: styles.header,
        headerTintColor: '#FFF',
      }} />
      <AppStack.Screen name="MyTickets" component={MyTickets} options={{
        headerShown: true,
        title: "Meus Chamados",
        headerStyle: styles.header,
        headerTintColor: '#FFF',
      }} />
      <AppStack.Screen name="TicketRoute" component={MyTicketsRoutes} options={{
        headerShown: true,
        title: "Chamado",
        headerStyle: styles.header,
        headerTintColor: '#FFF',
      }} />
      <AppStack.Screen name="Tickets" component={Tickets} options={{
        headerShown: true,
        title: "Chamados",
        headerStyle: styles.header,
        headerTintColor: '#FFF',
      }} />
      <AppStack.Screen name="Cadastro" component={Cadastro} options={{
        headerShown: true,
        title: "Cadastro",
        headerStyle: styles.header,
        headerTintColor: '#FFF',
      }} />
      <AppStack.Screen name="Relatory" component={Relatory} options={{
        headerShown: true,
        title: "Relatório",
        headerStyle: styles.header,
        headerTintColor: '#FFF',
      }} />
      <AppStack.Screen name="ManageUser" component={ManageUser} options={{
        headerShown: true,
        title: "Gerenciar Usuários",
        headerStyle: styles.header,
        headerTintColor: '#FFF',
      }} />
      <AppStack.Screen name="User" component={User} options={{
        headerShown: true,
        title: "Usuário",
        headerStyle: styles.header,
        headerTintColor: '#FFF',
      }} />
    </AppStack.Navigator>
  )
}

const styles = {
  header: {
    backgroundColor: "#182955",
  }
}

