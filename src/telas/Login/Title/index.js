import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from './style';
import { FontAwesome5 } from '@expo/vector-icons';

export default function Title(){
    return(
        <View style={styles.boxTitle}>
            <FontAwesome5 name="user-alt" size={24} color="#86B862" />
            <Text style={styles.title}>Login</Text>
        </View>
    );
}