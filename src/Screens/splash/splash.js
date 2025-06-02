import { View, Text,Image } from "react-native";
import styles from '../../styles/stylesSplash';
import color from '../../color/color';
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
export default function Splash(){

    const navigation = useNavigation();
    let usuarioValidado = ''
    const verificarLogin = async () =>{
         usuarioValidado =  await AsyncStorage.getItem('logado')

    }

    useEffect(() =>{
        verificarLogin()
        setTimeout(() =>{
            console.log(usuarioValidado)

            if(usuarioValidado === '1'){
                navigation.navigate('telaHome')
                console.log('home')
            }else{
                console.log('login')
                navigation.navigate('telaLogin')

            }
        }, 2500)
    }, [])

    return(
        
            <LinearGradient colors={[color.primeira, color.vermelhoFraco]} 
                            style={styles.fundoSplash}
                            start={{x:0, y:1}} end={{x:1, y:0}}>
            <View style={styles.viewImagem}>
                <Image style={styles.imgVitaBem}
                source={require('../../../assets/logo-vita-bem.png')} />
            </View>
            </LinearGradient>
    );
}