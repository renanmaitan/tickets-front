import React from 'react';
import {View, Image} from 'react-native';
import styles from '../style';

export default function Logo(){
    return(
        <View style={styles.logo}>
            <Image style={styles.logoImg} source={require('../../../imgs/logoITEMM.png')}/>
        </View>
    )
}