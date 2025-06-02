import {View, Text, Image, FlatList, Modal, Pressable} from 'react-native';
import styles from '../../styles/stylesPressao';
import color from '../../color/color';
import { useEffect, useState } from 'react';
export default function Pressao(){

    

    return(
        <View style={styles.container}>
            
            <View style={styles.header}> 
                <View style={styles.boxImgHeader}> <Text>Pressão</Text> </View>
                <View style={styles.titPag}> <Text>Pressão</Text> </View>
            </View>

            <View>
                
            </View>
        </View>

        
    );
}