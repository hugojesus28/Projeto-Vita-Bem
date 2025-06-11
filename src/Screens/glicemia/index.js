
import styles from "../../styles/stylesGlicemia";
import color from "../../color/color";
import axios from "axios";
import {
  Pressable, View,
  Text,
  Image,
  FlatList,
  Modal,
  TextInput,
  Alert,
  ActivityIndicator
} from "react-native";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { ScrollView } from "react-native";
import globalAndroid from "../../../global";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropdownFiltro from "../../components/dropdonws/DropdownFiltros";
export default function Glicemia() {
  const [modalVisible, setModalVisible] = useState(false);
  const [carregamento, setCarregamento] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [pesquisa, onChangePesquisa] = useState('');
  const [medidaGlicose, onChangemedidaGlicose] = useState('');
  const [observacao, onChangeObservacao] = useState('');
  const [horario, onChangeHoriro] = useState('');
  const [dia, onChangeDia] = useState('');
  const [glicemia, setGlicemia] = useState([]);
  const [idUser, setIdUser] = useState(null)
  const [isAlteracao, setIsAlteracao] = useState(false);
  const [idGlicemia, onChangeIdGlicemia] = useState(null)
  const [mostrarModalHorario, setMostrarModalHorario] = useState(false);
  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [filtro, setFiltro] = useState('');


  function filtrarItens(medidas, filtro) {
    const copia = [...medidas];
    console.log(copia)
    switch (filtro) {
      case 'rec':
        return copia.sort((a, b) => {
          const dataHoraA = new Date(`${a.data_registro}T${a.horario_registro}`);
          const dataHoraB = new Date(`${b.data_registro}T${b.horario_registro}`);
          return dataHoraB - dataHoraA;
        });
      case 'maior':
        return copia.sort((a, b) => b.nivel_glicose - a.nivel_glicose);
      case 'menor':
        return copia.sort((a, b) => a.nivel_glicose - b.nivel_glicose);
      default:
        return medidas;
    }
  }

  const id = null;

    const navigation = useNavigation()
  async function pickImage() {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      console.log(result)
      setIsAlteracao(false)
    }
  }
  function salvar() {

    const glicemia = new FormData();
    try{
    if (image) {
      if (image.startsWith("data:image")) {
        const base64Data = image.split(',')[1];
        glicemia.append("imgGlicemia", {
          uri: `data:image/jpeg;base64,${base64Data}`,
          name: `foto_glicemia_${Date.now()}.jpg`,
          type: 'image/jpeg'
        });
      } else if (image.startsWith("file://")) {
        glicemia.append("imgGlicemia", {
          uri: image,
          name: image.split('/').pop() || `foto_glicemia_${Date.now()}.jpg`,
          type: 'image/jpeg'
        });
      }
    }



  


  } catch (error) {
    console.error('Erro completo:', error);
    
    if (error.response) {
      console.error('Detalhes do erro:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      });
      Alert.alert("Erro", error.response.data.message || "Falha no cadastro");
    } else {
      Alert.alert("Erro", "Não foi possível conectar ao servidor");
    }
  }
  console.log(idUser, dataSelecionada, medidaGlicose, observacao)
  const data = {
    idUsuario: idUser,
    dataRegistro: dataSelecionada,
    nivelGlicose: medidaGlicose,
    observacao: observacao,
   
  }
  Object.entries({...data}).forEach(([key, value]) => {
      glicemia.append(key, value);
    });
    
  console.log(glicemia)
    salvarBanco(glicemia)
  }

  async function salvarBanco(data) {
    setCarregamento(true)
    console.log(globalAndroid)
    try {
      
      console.log(data instanceof FormData); // deve ser true
      const url = `http://${globalAndroid}:8000/api/diabete`;
      console.log('URL da API:', url);
    const resposta = await axios.post(`http://${globalAndroid}:8000/api/diabete`, data, {
        headers: {
        'Content-Type': 'multipart/form-data',
      },
      });

      console.log('Resposta da API:', resposta);

      listarGlicemia(idUser);
      setCarregamento(false)
      console.log("remedio cadastrado"
      )
    } catch (error) {
      setCarregamento(false)
      console.log(error, '11')
    }
  }
  async function listarGlicemia(id) {
    try {
      console.log('id p user', id)
      const resultados = await axios.get(`http://${globalAndroid}:8000/api/diabete/${id}`);
      setCarregamento(false)
      
      setGlicemia(resultados.data.diabete);

    } catch {
      return error
      console.log(error)
    }
  }
  async function pesquisar() {
    try{
      if(pesquisa.length >0){
        setCarregamento(true)
        const resultados = await axios.get(`http://${globalAndroid}:8000/api/glicemia/${pesquisa}/${idUser}`)
        setGlicemia(resultados.data)
        setCarregamento(false)

      }
    }catch{
      return error
      console.log(error)
    }
  }
  useEffect(() => {
    const carregarIdUsuario = async () => {
      try {
        const id = await AsyncStorage.getItem('idUser');
        console.log('ID recuperado do AsyncStorage:', id);
        if (id) {
          await setIdUser(id);
          await listarGlicemia(id); 
        }
      } catch (error) {
        console.error('Erro ao carregar idUser:', error);
      }
    };
    
    carregarIdUsuario();
  }, []);
        console.log(globalAndroid)

  const abrirModalEdit = (id) => {
    const glicemiaSelecionado = glicemia.find((r) => r.id === id);
    console.log(glicemiaSelecionado)
    setIsAlteracao(true)
    setModalEditVisible(true)
    onChangemedidaGlicose(glicemiaSelecionado.nivel_glicose);
    onChangeObservacao(glicemiaSelecionado.observacao);
    onChangeHoriro(glicemiaSelecionado.horario_registro);
    onChangeDia(glicemiaSelecionado.termino);
    onChangeIdGlicemia(glicemiaSelecionado.id);
    setImage(glicemiaSelecionado.img_glicose);
  }

  const alterarRemedio = async () => {
    setCarregamento(true)
    const glicemia = new FormData();
    try{
   if (image) {
  if (image.startsWith("data:image")) {
    const base64Data = image.split(',')[1];
    glicemia.append("imgGlicemia", {
      uri: `data:image/jpeg;base64,${base64Data}`,
      name: `foto_glicemia_${Date.now()}.jpg`,
      type: 'image/jpeg'
    });
  } else if (image.startsWith("file://")) {
    glicemia.append("imgGlicemia", {
      uri: image,
      name: image.split('/').pop() || `foto_glicemia_${Date.now()}.jpg`,
      type: 'image/jpeg'
    });
  }
}
  } catch (error) {
    console.error('Erro completo:', error);
    
    if (error.response) {
      console.error('Detalhes do erro:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      });
      Alert.alert("Erro", error.response.data.message || "Falha no cadastro");
    } else {
      Alert.alert("Erro", "Não foi possível conectar ao servidor");
    }
  }
  console.log('medida criada ',medidaGlicose, observacao, horario, dia, idUser, idGlicemia)
  const data = {
    nivelGlicose: medidaGlicose,
    idUsuario: idUser,
    observacao: observacao,
    dataRegistro: dataSelecionada,
  }
  Object.entries({...data}).forEach(([key, value]) => {
      glicemia.append(key, value);
    });
    console.log('id antes do update', idUser)


    try{
      setCarregamento(true)
    const resposta = await axios.post(`http://${globalAndroid}:8000/api/diabete/${idGlicemia}`, glicemia, {
        headers: {
        'Content-Type': 'multipart/form-data',
      },
      transformRequest: (data) => data,
      });

          console.log('Resposta da API:', resposta);

      listarGlicemia(idUser);
      setCarregamento(false)
      setModalEditVisible(false)
      console.log("remedio cadastrado"
      )
    } catch (error) {
      console.log(error, '11')
    }
    
  }

  const excluirGlicemia = async (id) => {
    const resposta = axios.delete(`http://${globalAndroid}:8000/api/diabete/${id}`);
    
    console.log(resposta)
    listarGlicemia(idUser);

  }

  const selecionarHorario = (event, dataSelecionada) => {
    const novaData = dataSelecionada || new Date();
    const dataFormatada = novaData.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    onChangeHoriro(dataFormatada);
    setMostrarModalHorario(false);
  }

  const pegarData = () =>{
    setMostrarModalHorario(true);
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titulo}>
        <Pressable
          style={styles.voltarContainer}
          onPress={() => navigation.goBack()}
        >

          <FontAwesome5 name="arrow-left" size={24} color={color.primeira} />
        </Pressable>
        <Text style={styles.tituloText}>Glicemia</Text>
      </View>
      <View style={styles.topo}>
        <View style={{width: '65%', height: 50}}>
          <DropdownFiltro
            valueFiltro={filtro}
            onChangeFiltro={(f) => {
              setFiltro(f);
              setGlicemia(filtrarItens(glicemia, f));
            }} />
        </View>
        <Pressable style={styles.mais} onPress={() => setModalVisible(true)}>
          <Image
            source={require("../../../assets/mais.png")}
            style={styles.maisImg}
          />
        </Pressable>
      
      </View>
      
      
      <View style={styles.listaCard}>
        <View style={styles.viewHistorico}>
          <Text style={styles.textHistorico}>Historico de Medidas</Text>
      </View>
        <View style={styles.viewLinhaTopo}>
      <View style={styles.linhaTopo}></View>
      </View>
        <FlatList
          style={styles.FlatList}
          data={glicemia}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.imgCardCont}> 
                <Image
                source={ { uri: `http://${globalAndroid}:8000/img/users/fotosGlicose/${item.img_glicose}` } }
                style={styles.imgCard}
              />
              </View>
              <View style={styles.info}>
                <Text style={styles.infoText}>Medida Glicemia: {item.nivel_glicose}</Text>
                <Text style={styles.infoText}>Horario Medida: {item.horario_registro}</Text>
                <Text style={styles.infoText}>Observação: {item.observacao}</Text>

              </View>
              <View style={styles.acoes}>
                <Pressable style={styles.acoesbutton} onPress={() => abrirModalEdit(item.id)}>
                  <Image
                    source={require("../../../assets/edit.png")}
                    style={styles.acoesbuttonImg}
                  />
                </Pressable>

                 <Pressable style={styles.acoesbutton} onPress={() => excluirGlicemia(item.id)}>
                <FontAwesome5
                  name="trash-alt"
                  size={15}
                  color={color.primeira}
                  style={styles.acoesbuttonImg}
                />
            </Pressable> 
              </View>
            </View>
          )} />
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.ContModal}>
          <View style={styles.modalView}>
            <Pressable style={styles.fecharmodalcont} onPress={() => setModalVisible(false)}>
              <Image

                source={require("../../../assets/close.png")}
                style={styles.x} />
            </Pressable>
            <View style={styles.boxcontimgModal}>
              <View style={styles.contimgModal}>
                <Image
                  source={{ uri: image }}
                  style={styles.imgModal} />
              </View>
            </View>
            <View style={styles.Contcarregarimg}>
              <Pressable style={styles.carregarimg} onPress={pickImage}>
                <Text style={styles.textbuttonmodal}>Carregar imagem</Text>
              </Pressable>
            </View>
            <View style={styles.inputsModal}>
              <View style={styles.continputmodal}>
                <Text style={styles.label}>Medida Glicemia</Text>
                <TextInput style={styles.inputmodal} onChangeText={text => onChangemedidaGlicose(text)} />
              </View>

              <View style={styles.continputmodal}>
                <Text style={styles.label}>Observação(Opcional)</Text>
                <TextInput style={[styles.inputmodal, {height: 150 }]} onChangeText={text => onChangeObservacao(text)} />
              </View>
            </View>
            <View style={styles.Contcarregarimg}>
              <Pressable style={styles.carregarimg} onPress={() => salvar()}>
                {carregamento ? 
                  (<ActivityIndicator 
                    size={'large'}
                    color={color.branco}
                  />)
                : 
(                <Text style={styles.textbuttonmodal}>Salvar</Text>
)                }
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalEditVisible}
      >
        <View style={styles.ContModal}>
          <View style={styles.modalView}>
            <Pressable style={styles.fecharmodalcont} onPress={() => setModalEditVisible(false)}>
              <Image
                source={require("../../../assets/close.png")}
                style={styles.x} />
            </Pressable>
            <View style={styles.boxcontimgModal}>
              <View style={styles.contimgModal}>
                <Image
                  source={isAlteracao ? { uri: `http://${globalAndroid}:8000/img/users/fotosGlicose/${image}` } : { uri : image }}
                  style={styles.imgModal} />
              </View>
            </View>
            <View style={styles.Contcarregarimg}>
              <Pressable style={styles.carregarimg} onPress={pickImage}>
                <Text style={styles.textbuttonmodal}>Carregar imagem</Text>
              </Pressable>
            </View>
            <View style={styles.inputsModal}>
              <View style={styles.continputmodal}>
                <Text style={styles.label}>Medida Glicemia</Text>
                <TextInput style={styles.inputmodal} value={medidaGlicose.toString()} onChangeText={text => onChangemedidaGlicose(text)} />
              </View>
              
              <View style={styles.continputmodal}>
                <Text style={[styles.label, ]}>Observação(Opcional)</Text>
                <TextInput style={[styles.inputmodal, {height: 150, }]} value={observacao}   multiline={true} onChangeText={text => onChangeObservacao(text)} />
              </View>
            </View>
            <View style={styles.Contcarregarimg}>
              <Pressable style={styles.carregarimg} onPress={() => alterarRemedio()}>
              {carregamento ? 
                 ( <ActivityIndicator 
                    size={'large'}
                    color={color.branco}
                  />)
                : 
                (<Text style={styles.textbuttonmodal}>Salvar</Text>)
                }
                              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
            
    </SafeAreaView>
  );
}
