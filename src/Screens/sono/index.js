import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Pressable, Text, TouchableOpacity, FlatList, Button, Image, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import colors from '../../color/color';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/stylesSono';




export default function Musicas() {




  const navigation = useNavigation();
  const abrirLink = (url) => {
    Linking.canOpenURL(url)
  .then((supported) => {
    if (supported) {
      Linking.openURL(url);
    } else {
      console.log("Não é possível abrir esse link.");
    }
  });
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topo}>
        <View style={styles.titulo}>
          <Pressable style={styles.voltarContainer} onPress={() => navigation.goBack()}>
            <FontAwesome5 name="arrow-left" size={24} color={colors.primeira} />
          </Pressable>
          <Text style={styles.tituloText}>Cuide do Seu Sono</Text>
        </View>
      </View>
      <View style={styles.containerConteudo}>
       <View style={styles.containerImagem}>
        <View style={styles.boxImagem}>
          <Image style={styles.imagem} source={require('../../../assets/dormirImg.png')} />
        </View>
      </View>

      <View style={styles.containerTexto}>
        <Text   style={styles.texto}>
          O sono é essencial para uma boa saúde fisica e mental. Segue abaixo dicas de como manter um bom sono:
        </Text>
      </View>

      <View style={styles.containerDicas}>
        <Text style={styles.textoDicas}>
          1. Mantenha uma rotina de sono consistente, indo para a cama e acordando no mesmo horário todos os dias.
          {'\n'}
          2. Crie um ambiente propício ao sono, com um quarto escuro, silencioso e fresco.
          {'\n'}
          3. Evite o uso de eletrônicos antes de dormir, pois a luz azul pode interferir na produção de melatonina.
          {'\n'}
          4. Pratique técnicas de relaxamento, como meditação ou respiração profunda, para acalmar a mente antes de dormir.
        </Text>
        <View style={styles.containerLink}>
        <Text style={styles.tituloLink}>
          Para mais dicas, acesse:
        </Text>
        <TouchableOpacity>
            <Text style={styles.textoLink} onPress={() => abrirLink('https://www.cuf.pt/mais-saude/10-conselhos-para-dormir-melhor')}>Entenda mais a qualidade do sono</Text>
        </TouchableOpacity>
        </View>
      </View>
</View> 

    </SafeAreaView>
  );
}


