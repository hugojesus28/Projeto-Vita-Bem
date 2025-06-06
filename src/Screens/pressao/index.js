
import styles from "../../styles/stylesPressao";
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

export default function Pressao() {
  const [modalVisible, setModalVisible] = useState(false);
  const [carregamento, setCarregamento] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [pesquisa, onChangePesquisa] = useState('');
  const [nome, onChangeNome] = useState('');
  const [desc, onChangeDesc] = useState('');
  const [horario, onChangeHoriro] = useState('');
  const [dia, onChangeDia] = useState('');
  const [remedios, setRemedios] = useState([]);
  const [idUser, setIdUser] = useState(null)
  const [isAlteracao, setIsAlteracao] = useState(false);
  const [idRemedio, onChangeIdRemedio] = useState(null)
  const [mostrarModalHorario, setMostrarModalHorario] = useState(false);
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

    const Remedio = new FormData();
    try{
    if (image) {
      if (image.startsWith("data:image")) {
        const base64Data = image.split(',')[1];
        Remedio.append("imagemRemedio", {
          uri: `data:image/jpeg;base64,${base64Data}`,
          name: `foto_remedio_${Date.now()}.jpg`,
          type: 'image/jpeg'
        });
      } else if (image.startsWith("file://")) {
        Remedio.append("imagemRemedio", {
          uri: image,
          name: image.split('/').pop() || `foto_remedio_${Date.now()}.jpg`,
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
  console.log(nome, desc, horario, dia, idUser)
  const data = {
    nome: nome,
    horario: horario,
    desc: desc,
    dias: dia,
    idUsuario: idUser,
    termino: '2000-10-10',
  }
  Object.entries({...data}).forEach(([key, value]) => {
      Remedio.append(key, value);
    });
    
  console.log(Remedio)
    salvarBanco(Remedio)
  }
  async function salvarBanco(data) {
    setCarregamento(true)
    try {
      


    const resposta = await axios.post(`http://${globalAndroid}:8000/api/remedio`, data, {
        headers: {
        'Content-Type': 'multipart/form-data',
      },
      transformRequest: (data) => data,
      });

      console.log('Resposta da API:', resposta);

      listarRemedios(idUser);
      setCarregamento(false)
      console.log("remedio cadastrado"
      )
    } catch (error) {
      console.log(error, '11')
    }
  }
  async function listarRemedios(id) {
    try {
      console.log('id p user', id)
      const resultados = await axios.get(`http://${globalAndroid}:8000/api/remedio/${id}`);
      setCarregamento(false)
      
      setRemedios(resultados.data.remedios);

    } catch {
      return error
      console.log(error)
    }
  }
  async function pesquisar() {
    try{
      if(pesquisa.length >0){
        setCarregamento(true)
        const resultados = await axios.get(`http://${globalAndroid}:8000/api/remedioa/${pesquisa}/${idUser}`)
        setRemedios(resultados.data)
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
          await listarRemedios(id); 
        }
      } catch (error) {
        console.error('Erro ao carregar idUser:', error);
      }
    };
    
    carregarIdUsuario();
  }, []);

  const abrirModalEdit = (id) => {
    const remedioSelecionado = remedios.find((r) => r.id === id);
    console.log(remedioSelecionado)
    setIsAlteracao(true)
    setModalEditVisible(true)
    onChangeNome(remedioSelecionado.nome);
    onChangeDesc(remedioSelecionado.desc);
    onChangeHoriro(remedioSelecionado.horario);
    onChangeDia(remedioSelecionado.termino);
    onChangeIdRemedio(remedioSelecionado.id);
    setImage(remedioSelecionado.img);
  }

  const alterarRemedio = async () => {
    setCarregamento(true)
    const Remedio = new FormData();
    try{
   if (image) {
  if (image.startsWith("data:image")) {
    const base64Data = image.split(',')[1];
    Remedio.append("imgRemedio", {
      uri: `data:image/jpeg;base64,${base64Data}`,
      name: `foto_remedio_${Date.now()}.jpg`,
      type: 'image/jpeg'
    });
  } else if (image.startsWith("file://")) {
    Remedio.append("imgRemedio", {
      uri: image,
      name: image.split('/').pop() || `foto_remedio_${Date.now()}.jpg`,
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
  console.log(nome, desc, horario, dia, idUser, idRemedio)
  const data = {
    nome: nome,
    horario: horario,
    desc: desc,
    termino: '2000-10-10',
    dias: dia,
    idUsuario: idUser
  }
  Object.entries({...data}).forEach(([key, value]) => {
      Remedio.append(key, value);
    });
    console.log('id antes do update', idUser)


    try{
      setCarregamento(true)
    const resposta = await axios.post(`http://${globalAndroid}:8000/api/remedio/${idRemedio}`, Remedio, {
        headers: {
        'Content-Type': 'multipart/form-data',
      },
      transformRequest: (data) => data,
      });

          console.log('Resposta da API:', resposta);

      listarRemedios(idUser);
      setCarregamento(false)
      setModalEditVisible(false)
      console.log("remedio cadastrado"
      )
    } catch (error) {
      console.log(error, '11')
    }
    
  }

  const excluirRemedio = async (id) => {
    const resposta = axios.delete(`http://${globalAndroid}:8000/api/remedio/${id}`);
    
    console.log(resposta)
    listarRemedios(idUser);

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
        <Text style={styles.tituloText}>Pressão</Text>
      </View>
      <View style={styles.topo}>
        <View style={styles.inputCont}>
          <TextInput
            style={styles.input}
            placeholder="Nome do remedio"
            onChangeText={text => onChangePesquisa(text)}
          />
        </View>
        <Pressable style={styles.mais} onPress={() => pesquisar()}>
          <Image
            source={require("../../../assets/lupav.png")}
            style={styles.lupa}
          />
        </Pressable>
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
          data={remedios}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.imgCardCont}> 
                <Image
                source={ { uri: `http://${globalAndroid}:8000/img/users/fotosRemedios/${item.img}` } }
                style={styles.imgCard}
              />
              </View>
              <View style={styles.info}>
                <Text style={styles.infoText}>Remédio: {item.nome}</Text>
                <Text style={styles.infoText}>Hora de tomar: {item.horario}</Text>
                <Text style={styles.infoText}>Descrição: {item.desc}</Text>
              </View>
              <View style={styles.acoes}>
                <Pressable style={styles.acoesbutton} onPress={() => abrirModalEdit(item.id)}>
                  <Image
                    source={require("../../../assets/edit.png")}
                    style={styles.acoesbuttonImg}
                  />
                </Pressable>

                 <Pressable style={styles.acoesbutton} onPress={() => excluirRemedio(item.id)}>
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
                <Text style={styles.label}>Nome do remédio</Text>
                <TextInput style={styles.inputmodal} onChangeText={text => onChangeNome(text)} />
              </View>
              <View style={styles.continputmodal}>
                <Text style={styles.label}>Descrição</Text>
                <TextInput style={styles.inputmodal} onChangeText={text => onChangeDesc(text)} />
              </View>
              <Pressable onPress={() => pegarData()} style={styles.continputmodal}>
                <Text style={styles.label}>Horario de consumo</Text>
                <View style={[styles.inputmodal, {justifyContent: 'center'}]} >
                  <Text style={{ color: '#000', paddingLeft: 10 }}>{horario || 'Selecione o horário'}</Text>
                </View>
              </Pressable> 
              <View>
              {mostrarModalHorario && (
                <DateTimePicker mode="time"
                  onChange={selecionarHorario}
                  value={new Date()} 
                />
              )}
              </View>
             
              <View style={styles.continputmodal}>
                <Text style={styles.label}>Dias de consumo</Text>
                <TextInput style={styles.inputmodal} onChangeText={text => onChangeDia(text)} />
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
                  source={isAlteracao ? { uri: `http://${globalAndroid}:8000/img/users/fotosRemedios/${image}` } : { uri : image }}
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
                <Text style={styles.label}>Nome do remédio</Text>
                <TextInput style={styles.inputmodal} value={nome} onChangeText={text => onChangeNome(text)} />
              </View>
              <View style={styles.continputmodal}>
                <Text style={styles.label}>Descrição</Text>
                <TextInput style={styles.inputmodal} value={desc} onChangeText={text => onChangeDesc(text)} />
              </View>
              <Pressable onPress={() => pegarData()} style={styles.continputmodal}>
                <Text style={styles.label}>Horario de consumo</Text>
                <View style={[styles.inputmodal, {justifyContent: 'center'}]} >
                  <Text style={{ color: '#000', paddingLeft: 10 }}>{horario || 'Selecione o horário'}</Text>
                </View>
              </Pressable> 
              <View>
              {mostrarModalHorario && (
                <DateTimePicker mode="time"
                  onChange={selecionarHorario}
                  value={new Date()} 
                />
              )}
              </View>
              <View style={styles.continputmodal}>
                <Text style={styles.label}>Dias de consumo</Text>
                <TextInput style={styles.inputmodal} value={dia} onChangeText={text => onChangeDia(text)} />
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
