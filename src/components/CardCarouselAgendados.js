import React, { useState, useEffect } from "react";
import { View, Text, Image, Dimensions, StyleSheet, Animated, Pressable } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import color from '../color/color';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get("window");

const data = [
    { id: "1", title: "Remedios", image: require("../../assets/remedio.png"), caminho: 'remedios' }, // Local
    { id: "2", title: "Tomar agua", image: require("../../assets/garrafa-de-agua.png") },
  { id: "3", title: "Dicas p/ Dormir", image: require("../../assets/dormindo.png") },
  { id: "8", title: "Mensagens Motivacionais", image: require("../../assets/mensagens.png"), caminho: "telaVacinas" },

];

const CardCarouselAgendados = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigation = useNavigation()

  // Estado para a animação de cada card
  
  return (

    
    <Carousel
      width={140}  // Ajuste o tamanho do Carousel para ocupar toda a largura da tela
      height={100}
      data={data}
      onSnapToItem={(index) => setSelectedIndex(index)}
      style={styles.CardCarousel} 
      renderItem={({ item, index }) => (
        <Pressable onPress={() => navigation.navigate(item.caminho)}>
        <Animated.View 
          style={styles.card}>
          <Image source={item.image} style={styles.imagemCard} />
          <Text style={styles.textCard}>{item.title}</Text>
        </Animated.View>
        </Pressable>
      )}
    />
  );
};

const styles = StyleSheet.create({
  CardCarousel: {
    overflow:'visible'
  },
  card: {
    backgroundColor: color.branco,
    height: 120,
    width: 120,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagemCard: {
    width: 70,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 10
  },
  textCard: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: color.primeira,
  },
});

export default CardCarouselAgendados;
