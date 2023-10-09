import React, { useContext, useEffect, useState } from "react";
import { View, Text, Dimensions } from "react-native";
import styles from "./style";
import AuthContext from "../../../../contexts/auth";

export default function Item({ item }) {
  const messageLength = item.content.length;
  const minContainerWidth = 100; // Largura mínima do balão
  const maxContainerWidth = 300; // Largura máxima do balão
  const sreenWidth = Dimensions.get("window").width; // Largura da tela
  const {loggedUser} = useContext(AuthContext);
  // Calcule a largura do balão com base no comprimento da mensagem
  const containerWidth = Math.min(
    maxContainerWidth,
    Math.max(minContainerWidth, messageLength * 13) // 10 é um fator arbitrário
  );
  
  return (
    <View style={{ width: "100%" }}>
      <View
        style={item.user.userId === loggedUser.data.userId? ([styles.containerRequester, {marginStart: sreenWidth-(containerWidth+0.05*sreenWidth)}]) : ([styles.containerAgent, {width: containerWidth}])}
      >
        <Text
          style={item.user.userId === loggedUser.data.userId? styles.textRequester : styles.textAgent}
        >
          {item.content}
        </Text>
        <Text
          style={
            item.user.userId === loggedUser.data.userId ? styles.dateRequester : styles.dateAgent
          }
        >
          {item.createdAt.substring(11, 16)}
        </Text>
      </View>
    </View>
  );
}
