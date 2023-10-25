import React, { useContext, useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from 'react-native-vector-icons';

import Ticket from "../screens/Ticket";
import Messages from "../screens/Ticket/Messages";
import RolesContext from "../contexts/roles";
import Options from "../screens/Ticket/Options";

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
  }
}

export default function MyTicketsRoutes({ route }) {
  const { roles } = useContext(RolesContext);
  const [analyst, setAnalyst] = useState(false);
  const item = route.params.item;

  useEffect(() => {
    if (roles) {
      if (roles.data.includes('analyst')) {
        setAnalyst(true);
      }
    }
  }, [roles])

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

  if (analyst) {
    screens.push({
      name: "Opçoes",
      component: Options,
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
