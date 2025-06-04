import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, Alert,Modal,TouchableHighlight,FlatList, TextInput } from 'react-native';
import styles from '../../styles/stylesComida.js';
import { Pressable } from 'react-native';
import colors from '../../color/color.js';
import React, { useState, useEffect } from 'react';

import NavComponent from '../../components/nav.js';

import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// const API_URL = "https://trackapi.nutritionix.com/v2/natural/nutrients";


export const apiFruta = async (query) => {
  try {
    const response = await axios.post(
      "https://trackapi.nutritionix.com/v2/search/instant",
      { query },
      {
        headers: {
          "Content-Type": "application/json",
          "x-app-id":'59b2da82' ,
          "x-app-key": 'ff97df75244eb96a4165c2423e651ff0',
        },
      } 
    );
    console.error("sucesso");

    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados nutricionais:", error);
    return error    ;
  }
};
export default function Frutas() {

  const [fruta, setFruta] = useState("")
  const [resultados, setResultados] = useState([]);

  async function buscarFruta() {
    if (fruta == ""){
      window.alert("digite algo")
    }else{
      setModalVisible(true)
      const resposta = await apiFruta(fruta);
      setModalVisible(false)
      setResultados(resposta.branded);
    }
   
   
  }
  useEffect(() => {
  },
  [resultados],
  console.log(resultados[0])
);
const [modalVisible, setModalVisible] = useState(false);
const navigation = useNavigation()
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topo}>
      <View style={styles.titulo}>
                          <Pressable  style={styles.voltarContainer} onPress={() => navigation.goBack()}>
                                                    <FontAwesome5 name="arrow-left" size={24} color={colors.branco} />
                            
                            </Pressable>
                          <Text style={styles.tituloText}>Entenda sobre Frutas</Text>
      
                      
                      
      </View>

      <View style={styles.container_input}>
        <Text style={styles.label}>Digite o nome do alimento</Text>
        <TextInput
          style={styles.input}
          value={fruta}
          onChangeText={(texto) => setFruta(texto)}
        />
        <Pressable style={styles.button} onPress={buscarFruta} >
          <Text style={styles.buttonText}>Ver calorias</Text>
        </Pressable>
      </View>
      </View>
      
      <View style={styles.container_info}>
        {/* <View style={styles.card_alimentos}>
          <View style={styles.container_imgcard}>
            <Image source={require('./assets/maca.jpeg')} style={styles.imagemCard} />
          </View>
          <View style={styles.card_infos}>
            <Text style={styles.infos_cards}>nome: alimento foda</Text>
            <Text style={styles.infos_cards}>Calorias: 200,00</Text>
          </View>
        </View> */}
        <FlatList
          style={styles.FlatList}
          data={resultados}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card_alimentos}>
              <View style={styles.container_imgcard}>

                <Image source={{uri:item.photo.thumb }} style={styles.imagemCard} />
              </View>
              <View style={styles.card_infos}>
                <Text style={styles.infos_cards } numberOfLines={1} ellipsizeMode="tail">nome: {item.brand_name}</Text>
                <Text style={styles.infos_cards}>Calorias: {item.nf_calories}</Text>
            </View>
            </View>
          )}
        />
      </View>
       <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            window.alert('Modal has been closed.');
          }}>
          <View style={{ flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#0000006d'}}>
        <View>
              

           
                
 <Image 
        source={{ uri: 'https://www.simondecyrene.org/wp-content/themes/simon-de-cyrene/assets/images/loader.gif' }} 
        style={{width:100,height:100}} 
      />
            </View>
          </View>
        </Modal> 

    </SafeAreaView>
  );

}

