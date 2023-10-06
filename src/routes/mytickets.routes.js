import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from 'react-native-vector-icons';

import Ticket from "../screens/Ticket";
import Messages from "../screens/Ticket/Messages";

const MyTicketsTabs = createBottomTabNavigator()

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

export default function MyTicketsRoutes({ route }) {
  role = "user"
  const item = route.params.item;

  const screens = [
    {
      name: "Ticket",
      component: Ticket,
      initialParams: { item: item },
      options: {
        tabBarLabel: "Detalhes",
        tabBarIcon: ({ color, size }) => (
          <FontAwesome5 name="ticket-alt" color={color} size={size} />
        ),
      },
    },
    {
      name: "Mensagens",
      component: Messages,
      initialParams: { item: item },
      options: {
        tabBarIcon: ({ color, size }) => (
          <FontAwesome5 name="comment" color={color} size={size} />
        ),
        headerStyle: styles.header,
        headerTintColor: '#FFF',
        tabBarLabel: "Mensagens",
      },
    },
  ];

  if (role === "analyst") {
    screens.push({
      name: "Opçoes",
      component: Messages,
      initialParams: { item: item },
      options: {
        tabBarIcon: ({ color, size }) => (
          <FontAwesome5 name="cog" color={color} size={size} />
        ),
        headerStyle: styles.header,
        headerTintColor: '#FFF',
      },
    });
  }

  return (
    <MyTicketsTabs.Navigator
      initialRouteName="Ticket"
      backBehavior="none"
      screenOptions={options}
    >
      {screens.map((screen) => (
        <MyTicketsTabs.Screen key={screen.name} {...screen} />
      ))}
    </MyTicketsTabs.Navigator>
  );
}


const styles = {
  header: {
    backgroundColor: "#182955",
  }
}
