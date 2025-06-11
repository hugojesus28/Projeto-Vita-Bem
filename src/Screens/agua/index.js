import React, {useState} from 'react';
import { View, StyleSheet, Pressable, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import colors from '../../color/color';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/stylesAgua';
import CircularProgress from 'react-native-circular-progress-indicator';
export default function Agua() {
  const navigation = useNavigation();
  const [agua, setAgua] = useState(0); 
  const [porcentagem, setPorcentagem] = useState(0);
const adicionarAguaConsumida = (quantidade) => {
  setAgua((prevAgua) => {
    const novaQuantidade = prevAgua + quantidade;
    setPorcentagem((novaQuantidade / 2000) * 100); 
    if (novaQuantidade >= 2000) {
      alert("Você já atingiu a quantidade máxima de água para hoje!");
      setPorcentagem(100); 
        }
    return novaQuantidade;
  });
}
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topo}>
        <View style={styles.titulo}>
          <Pressable style={styles.voltarContainer} onPress={() => navigation.goBack()}>
            <FontAwesome5 name="arrow-left" size={24} color={colors.primeira} />
          </Pressable>
          <Text style={styles.tituloText}>Água</Text>
        </View>
      </View>

    <View style={styles.containerProgresso}>
      <View style={{paddingBottom: 20}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color:colors.cinza, textAlign: 'center'}}>
          <Text style={{fontSize: 20, color:colors.azul, fontWeight: 'bold', textAlign: 'center'}}>    {(agua / 1000).toFixed(1)}L
 </Text> / 2.0L
        </Text>
      </View>
    <CircularProgress 
      radius={90}
      value={porcentagem}
      fontSize={20}
      textColor="#000"
      progressValueColor={'#c9c9c9'} 
      activeStrokeColor={colors.azul} 
      valueSuffix='%'
      inActiveStrokeColor={colors.vermelhoFraco}
      inActiveStrokeWidth={2}
      inActiveStrokeOpacity={0.2}
      duration={3000}
    />
  </View>
    <View style={styles.containerLiquidos}>
      <TouchableOpacity style={styles.boxLiquidos} onPress={() => adicionarAguaConsumida(50)}>
  <Image  style={{width: 60, height: 60}} source={require('../../../assets/copo-de-agua.png')} />        
          <Text style={styles.textoLiquidosValor}>{50} ml</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.boxLiquidos} onPress={() => adicionarAguaConsumida(250)}>
  <Image  style={{width: 60, height: 60}} source={require('../../../assets/garrafa-de-agua.png')} />        
        <Text style={styles.textoLiquidosValor}>{250} ml</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.boxLiquidos} onPress={() => adicionarAguaConsumida(500)}>
  <Image style={{width: 60, height: 60}} source={require('../../../assets/garrafaCopo.png')} />        
        <Text style={styles.textoLiquidosValor}>{500} ml</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.boxLiquidos} onPress={() => adicionarAguaConsumida(1000)}>
  <Image style={{width: 60, height: 60}} source={require('../../../assets/garrafaGarrafa.png')} />        
        <Text style={styles.textoLiquidosValor}>{1000} ml</Text>
      </TouchableOpacity>
    </View>

    </SafeAreaView>
  );
}


