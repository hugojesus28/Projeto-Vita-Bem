import {Text, View, Image, Platform, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import styles from '../../styles/stylesHome.js';
import CardCarousel from "../../components/CardCarousel.js"; // Importando o componente
import CardCarouselAgendados from "../../components/CardCarouselAgendados.js"; // Importando o componente
import axios from 'axios';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

import global from '../../../global.js';
export default function Home() {
  const [idUser, setIdUser] = useState(null)
  const [nomeUser, setNomeUser] = useState('')

  useEffect(() => {
    const pegarDados = async () => {
      const id = await AsyncStorage.getItem('idUser');
      setIdUser(id); 
      
    };

    pegarDados();
  }, []);

  
    useEffect(() =>{
      console.log(idUser)
      axios.get(`http://${global}:8000/api/usuario/${idUser}`)
      .then(resposta =>{
        let user = resposta.data.usuario
        console.log(resposta)
        
        setNomeUser(user.nome_usuario)
      })
      .catch((error) => {
        console.log(error);
      });
    }, [idUser])

  const getUser = async () => {
   

  }
  
  const navigation = useNavigation();

  return (
    <SafeAreaProvider>

    <SafeAreaView style={[styles.container , { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }]}>
          <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <View style={styles.topo}>
        <View style={styles.viewLogo}>
        <Image style={{width: '90%', height: '90%', objectFit: 'cover'}} source={require('../../../assets/logo-vita-bem2.png')}/>
        </View>
      </View>
      <View style={styles.container_fundoHome}>
      <View style={styles.container_bemvindo}>
        <Text style={styles.bemvindo}>Bem vindo <Text style={styles.spanBemvindo}>{nomeUser}</Text></Text>
      </View>
      <Text style={styles.titulocarousel}>Agendados</Text>
      <View style={styles.containercarousel}><CardCarouselAgendados  /></View>
      <Text style={styles.titulocarousel}>Sua Saúde</Text>
      <View style={styles.containercarousel}><CardCarousel  /></View>

      </View>
      
  </SafeAreaView>
  </SafeAreaProvider>

  );
  
}

