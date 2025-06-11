import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Pressable, Text, TouchableOpacity, FlatList, Button, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import colors from '../../color/color';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/stylesMusica';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';




export default function Musicas() {

  const sound = useRef(new Audio.Sound());
  const [isPlaying, setIsPlaying] = useState(false);
  const som = useRef(null);
  const [duracao, setDuracao] = useState(0);
  const [posicao, setPosicao] = useState(0);
  const [indiceAtual, setIndiceAtual] = useState(0);

  const intervalo = useRef(null);

  const musica = {
    titulo: 'SoundHelix Song 1',
    artistaMusica: 'SoundHelix',
    uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    imagem: require('../../../assets/vacinas.png'),
  }

async function carregarMusica(indice) {
  if (som.current) {
    await som.current.unloadAsync(); // descarrega a anterior corretamente
  }

  const musica = listaMusicas[indice];
  const { sound: novaMusica, status } = await Audio.Sound.createAsync(
    musica.uri,
    { shouldPlay: true }
  );

  som.current = novaMusica;
  setDuracao(status.durationMillis);
  setIsPlaying(true);
  novaMusica.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
}
async function proximaMusica() {
  const novoIndice = (indiceAtual + 1) % listaMusicas.length;
  setIndiceAtual(novoIndice);
  await carregarMusica(novoIndice);
}

async function musicaAnterior() {
  const novoIndice = (indiceAtual - 1 + listaMusicas.length) % listaMusicas.length;
  setIndiceAtual(novoIndice);
  await carregarMusica(novoIndice);
}



  function onPlaybackStatusUpdate(status) {
    if (status.isLoaded) {
      setPosicao(status.positionMillis);
      setDuracao(status.durationMillis);
      if (status.didJustFinish) {
        setIsPlaying(false);
      }
    }
  }

async function togglePlayPause() {
  if (som.current) {
    if (isPlaying) {
      await som.current.pauseAsync();
      setIsPlaying(false);
    } else {
      await som.current.playAsync();
      setIsPlaying(true);
    }
  } else {
    await carregarMusica(indiceAtual);
  }
}

async function seek(value) {
  if (som.current) {
    await som.current.setPositionAsync(value);
  }
}


useEffect(() => {
  return () => {
    if (som.current) {
      som.current.unloadAsync();
    }
  };
}, []);





  const navigation = useNavigation();
  const [mensagens, setMensagens] = useState(null);
  console.log(mensagens)

  function millisToMinutesAndSeconds(millis) {
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }


const listaMusicas = [
  {
    titulo: 'Hourglass',
    artista: 'Peter Yohannan',
    uri: require('../../services/musicas/lofi1.mp3'),
    imagem: require('../../../assets/capaLofi1.jpg'),

  },
  {
    titulo: 'Sugar Haze',
    artista: 'Peter Yohannan',
    uri: require('../../services/musicas/lofi2.mp3'),
    imagem: require('../../../assets/capaLofi2.jpg'),

  },
  {
    titulo: 'Rap do Minecraft',
    artista: 'Player Tauz',
    uri: require('../../services/musicas/rapMine.mp3'),
    imagem: require('../../../assets/capaMinecraft.jpg'),

  },
];


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topo}>
        <View style={styles.titulo}>
          <Pressable style={styles.voltarContainer} onPress={() => navigation.goBack()}>
            <FontAwesome5 name="arrow-left" size={24} color={colors.primeira} />
          </Pressable>
          <Text style={styles.tituloText}>Musicas</Text>
        </View>
      </View>

      <View style={styles.containerMensagens}>
        <View style={styles.containerImg}>
          <View style={styles.boxImg}>
            <Image style={styles.imagem} resizeMode='contain' source={listaMusicas[indiceAtual].imagem} />
          </View>
        </View>
        <View>
          <View style={styles.boxTitulo}>
            <Text style={styles.tituloMusica}>{listaMusicas[indiceAtual].titulo}</Text>
          </View>
          <View style={styles.timeContainer}>
            <Text style={{color: colors.cinza}}>{millisToMinutesAndSeconds(posicao)}</Text>
            <Text style={{color: colors.cinza}}>{millisToMinutesAndSeconds(duracao)}</Text>
          </View>
          <View style={styles.containerSlider}>
            <Slider
              style={{ width: 400, height: 10, marginBottom: 20 }}
              minimumValue={0}
              maximumValue={duracao}
              value={posicao}
              onSlidingComplete={seek}
              minimumTrackTintColor={colors.primeira}
              maximumTrackTintColor={colors.cinza}
              thumbTintColor={colors.primeira}  

            />
          </View>
        </View>


        <View style={styles.containerBotoes}>
          <TouchableOpacity style={styles.botao} onPress={musicaAnterior}>
            <FontAwesome5 name="step-backward" size={24} color={colors.primeira} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.botao} onPress={togglePlayPause}>
            {isPlaying ? (
              <FontAwesome5 name="pause" size={24} color={colors.primeira} />
            ) : (
              <FontAwesome5 name="play" size={24} color={colors.primeira} />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.botao} onPress={proximaMusica}>
            <FontAwesome5 name="step-forward" size={24} color={colors.primeira} />
          </TouchableOpacity>
        
        </View>



      </View>
    </SafeAreaView>
  );
}


