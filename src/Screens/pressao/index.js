
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
import DropdownFiltro from "../../components/dropdonws/DropdownFiltros";
export default function Pressao() {
  const [modalVisible, setModalVisible] = useState(false);
  const [carregamento, setCarregamento] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [pesquisa, onChangePesquisa] = useState('');
  const [medida, onChangeMedida] = useState('');
  const [dataMedida, onChangeDataMedida] = useState('');
  const [horario, onChangeHoriro] = useState('');
  const [dia, onChangeDia] = useState('');
  const [pressao, setPressao] = useState([]);
  const [idUser, setIdUser] = useState(null)
  const [isAlteracao, setIsAlteracao] = useState(false);
  const [idPressao, onChangeIdPressao] = useState(null)
  const [mostrarModalHorario, setMostrarModalHorario] = useState(false);
  const [filtro, setFiltro] = useState('');
  const [observacao, onChangeObservacao] = useState('');
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

    const Pressao = new FormData();
    try {
      if (image) {
        if (image.startsWith("data:image")) {
          const base64Data = image.split(',')[1];
          Pressao.append("imgPressao", {
            uri: `data:image/jpeg;base64,${base64Data}`,
            name: `foto_Pressao_${Date.now()}.jpg`,
            type: 'image/jpeg'
          });
        } else if (image.startsWith("file://")) {
          Pressao.append("imgPressao", {
            uri: image,
            name: image.split('/').pop() || `foto_Pressao_${Date.now()}.jpg`,
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
    console.log(medida, horario, dataMedida, idUser)
    const data = {
      medidaPressao: medida,
      horaPressao: horario,
      dataPressao: dataMedida,
      idUsuario: idUser,
      observacao: observacao
    }
    Object.entries({ ...data }).forEach(([key, value]) => {
      Pressao.append(key, value);
    });

    console.log(Pressao)
    salvarBanco(Pressao)
  }
  async function salvarBanco(data) {
    setCarregamento(true)
    try {



      const resposta = await axios.post(`http://${globalAndroid}:8000/api/pressao`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        transformRequest: (data) => data,
      });

      console.log('Resposta da API:', resposta);

      listarPressao(idUser);
      setCarregamento(false)
      setModalVisible(false)
      console.log("remedio cadastrado"
      )
    } catch (error) {
      console.log(error, '11')
    }
  }
  async function listarPressao(id) {
    try {
      setCarregamento(true)
      const resultados = await axios.get(`http://${globalAndroid}:8000/api/pressao/${id}`);
      setCarregamento(false)
      console.log(resultados.data)
      setPressao(resultados.data.pressao);

    } catch (error) {
      return error
    }
  }
  async function pesquisar() {
    try {
      if (pesquisa.length > 0) {
        setCarregamento(true)
        const resultados = await axios.get(`http://${globalAndroid}:8000/api/pressao/${pesquisa}/${idUser}`)
        setRemedios(resultados.data)
        setCarregamento(false)

      }
    } catch {
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
          await listarPressao(id);
        }
      } catch (error) {
        console.error('Erro ao carregar idUser:', error);
      }
    };

    carregarIdUsuario();
  }, []);

  const abrirModalEdit = (id) => {
    const pressaoSelecionado = pressao.find((r) => r.id === id);
    console.log('Pressao selecionada:', pressaoSelecionado)
    setIsAlteracao(true)
    onChangeMedida(pressaoSelecionado.medida_pressao);
    onChangeDataMedida(pressaoSelecionado.data_pressao);
    onChangeHoriro(pressaoSelecionado.horario_pressao);
    onChangeObservacao(pressaoSelecionado.observacao);
    onChangeIdPressao(pressaoSelecionado.id);
    setImage(pressaoSelecionado.img_pressao);
    setModalEditVisible(true)

  }

  const alterarPressao = async () => {
    setCarregamento(true)
    const Pressao = new FormData();
    try {
      if (image) {
        if (image.startsWith("data:image")) {
          const base64Data = image.split(',')[1];
          Pressao.append("imgPressao", {
            uri: `data:image/jpeg;base64,${base64Data}`,
            name: `foto_Pressao_${Date.now()}.jpg`,
            type: 'image/jpeg'
          });
        } else if (image.startsWith("file://")) {
          Pressao.append("imgPressao", {
            uri: image,
            name: image.split('/').pop() || `foto_Pressao_${Date.now()}.jpg`,
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
    console.log(medida, dataMedida, horario, idUser, idPressao)
    const data = {
      medidaPressao: medida,
      horarioPressao: horario,
      dataPressao: dataMedida,
      imgPressao: image,
      observacao: observacao,
      idUsuario: idUser
    }
    Object.entries({ ...data }).forEach(([key, value]) => {
      Pressao.append(key, value);
    });
    console.log('id antes do update', idUser)


    try {
      setCarregamento(true)
      const resposta = await axios.post(`http://${globalAndroid}:8000/api/pressao/${idPressao}`, Pressao, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        transformRequest: (data) => data,
      });

      console.log('Resposta da API:', resposta);

      listarPressao(idUser);
      setCarregamento(false)
      setModalEditVisible(false)
      console.log("remedio cadastrado"
      )
    } catch (error) {
      console.log(error, '11')
    }

  }

  const excluirRemedio = async (id) => {
    const resposta = axios.delete(`http://${globalAndroid}:8000/api/pressao/${id}`);

    console.log(resposta)
    listarPressao(idUser);

  }

  const selecionarHorario = (event, dataSelecionada) => {
    const novaData = dataSelecionada || new Date();
    const dataFormatada = novaData.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    onChangeHoriro(dataFormatada);
    setMostrarModalHorario(false);
  }

  const pegarData = () => {
    setMostrarModalHorario(true);
  }

  function filtrarItens(medidas, filtro) {
    const copia = [...medidas];
    console.log(copia)
    switch (filtro) {
      case 'rec':
        return copia.sort((a, b) => {
          const dataHoraA = new Date(`${a.data_pressao}T${a.hora_pressao}`);
          const dataHoraB = new Date(`${b.data_pressao}T${b.hora_pressao}`);
          return dataHoraB - dataHoraA;
        });
      case 'maior':
        return copia.sort((a, b) => b.medida_pressao - a.medida_pressao);
      case 'menor':
        return copia.sort((a, b) => a.medida_pressao - b.medida_pressao);
      default:
        return medidas;
    }
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
        <View style={{width: '65%', height: 50}}>
          <DropdownFiltro
            valueFiltro={filtro}
            onChangeFiltro={(f) => {
              setFiltro(f);
              setPressao(filtrarItens(pressao, f));
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
          data={pressao}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.imgCardCont}>
                <Image
                  source={{ uri: `http://${globalAndroid}:8000/img/users/fotosPressao/${item.img_pressao}` }}
                  style={styles.imgCard}
                />
              </View>
              <View style={styles.info}>
                <Text style={styles.infoText}>Medida Pressão: {item.medida_pressao}</Text>
                <Text style={styles.infoText}>Horario Medida: {item.hora_pressao}</Text>
                <Text style={styles.infoText}>Observação: {item.observacao}</Text>
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
                <Text style={styles.label}>Pressão Arterial(80mmHg)</Text>
                <TextInput style={styles.inputmodal} onChangeText={text => onChangeMedida(text)} />
              </View>
              <View style={styles.continputmodal}>
                <Text style={styles.label}>Observação(Opcional)</Text>
                <TextInput style={[styles.inputmodal, { height: 150, textAlignVertical: 'top' }]} multiline={true} onChangeText={text => onChangeObservacao(text)} />
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
                  (<Text style={styles.textbuttonmodal}>Salvar</Text>
                  )}
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
                  source={isAlteracao ? { uri: `http://${globalAndroid}:8000/img/users/fotosPressao/${image}` } : { uri: image }}
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
                <Text style={styles.label}>Medida Pressão</Text>
                <TextInput style={styles.inputmodal} keyboardType="numeric" value={medida.toString()} onChangeText={text => onChangeMedida(text)} />
              </View>
              <View style={styles.continputmodal}>
                <Text style={styles.label}>Observação(Opcional)</Text>
                <TextInput style={[styles.inputmodal, { height: 150, textAlignVertical: 'top' }]} multiline={true} value={observacao} onChangeText={text => onChangeObservacao(text)} />
              </View>


            </View>
            <View style={styles.Contcarregarimg}>
              <Pressable style={styles.carregarimg} onPress={() => alterarPressao()}>
                {carregamento ?
                  (<ActivityIndicator
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
