import {
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  TouchableOpacity,
  Modal,
  SafeAreaView
} from "react-native";
import { useState, useEffect } from "react";
import styles from "../../styles/stylesSettings.js";

import { useNavigation } from "@react-navigation/native";
import colors from "../../color/color.js";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import AsyncStorage from  '@react-native-async-storage/async-storage'
import global from "../../../global.js";
export default function Settings() {

  const [isFocus, setIsFocus] = useState(null);

  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const [idUser, setIdUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const pegarDados = async () => {
      const id = await AsyncStorage.getItem("idUser");
      setIdUser(id);
    };

    pegarDados();
  }, []);

  useEffect(() => {
    console.log(idUser);
    axios
      .get(`http://localhost:8000/api/usuario/${idUser}`)
      .then((resposta) => {
        let user = resposta.data.usuario;
        console.log(resposta);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [idUser]);

  const logoff = () => {
    AsyncStorage.setItem('logado', '0')
    AsyncStorage.removeItem('idUser')
    navigation.navigate('telaLogin', {mensagem: 'Você Deslogou de sua Conta'})
  }

  const alterarFoco = (campo) => {
    setIsFocus(campo);
  };
  const removerFoco = () => {
    setIsFocus(null);
  };

  const alterarModal = (visibilidade) => {
    setVisible(visibilidade);
  };

  const excluirConta = () => {
    setModalVisible(true)
    axios.delete(`http://${global}:8000/api/usuario/${idUser}`)
    .then(() => {    
      console.log('chegeuri no exlu')
      setVisible(false)
      setModalVisible(false)
      AsyncStorage.removeItem('idUser')
      AsyncStorage.setItem('logado', 0)
    }) .catch ((error) => {
      console.log(error);
      setModalVisible(false);
    })
    .finally(() => {
      navigation.navigate('telaLogin', {mensagem: 'Conta excluída com sucesso!!'})

    })
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topo}>
        <Text style={styles.titPagina}>Configuracoes</Text>
      </View>
      <View style={styles.container_fundoHome}>
        <View style={styles.viewInfoUsuario}>
          <View style={styles.boxConfig}>
            <View style={styles.conteudoConfig}>
              <View style={styles.viewImagem}>
                <MaterialIcons name="accessibility" size={35} color="black" />
              </View>
              <View style={styles.infoConfig}>
                <View style={styles.viewText}>
                  <Text style={{}}>Acessibilidade</Text>
                </View>
                <View style={styles.viewText}>
                  <Text style={{ color: colors.cinza }}>
                    Altere as cores do app do tema claro para o tema escuro{" "}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.boxConfig}>
            <View style={styles.conteudoConfig}>
              <View style={styles.viewImagem}>
                <MaterialIcons name="dark-mode" size={35} color="black" />
              </View>
              <View style={styles.infoConfig}>
                <View style={styles.viewText}>
                  <Text style={{}}>Modo Escuro</Text>
                </View>
                <View style={styles.viewText}>
                  <Text style={{ color: colors.cinza }}>
                    Altere as cores do app do tema claro para o tema escuro{" "}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.boxConfig}>
            <View style={styles.conteudoConfig}>
            <TouchableOpacity
                onPress={() => logoff()}
                style={styles.configClick}
              >
              <View style={styles.viewImagem}>
                <MaterialIcons name="logout" color="black" size={35} />
              </View>
              <View style={styles.infoConfig}>
                <View style={styles.viewText}>
                  <Text style={{}}>Logoff</Text>
                </View>
                <View style={styles.viewText}>
                  <Text style={{ color: colors.cinza }}>
                    Saia da sua conta{" "}
                  </Text>
                </View>
              </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.boxConfig}>
            <View style={styles.conteudoConfig}>
              <TouchableOpacity
                onPress={() => alterarModal(true)}
                style={styles.configClick}
              >
                <View style={styles.viewImagem}>
                  <MaterialIcons
                    name="delete"
                    size={35}
                    color={colors.primeira}
                  />
                </View>
                <View style={styles.infoConfig}>
                  <View style={styles.viewText}>
                    <Text style={{ color: colors.primeira }}>
                      Excluir Conta
                    </Text>
                  </View>

                  <View style={styles.viewText}>
                    <Text style={{ color: colors.cinza }}>
                      Exclua sua conta permanentemente{" "}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <Modal transparent={true} visible={visible} animationType="fade">
        <View style={styles.containerModal}>
          <View style={styles.boxModal}>
            <View style={styles.modalTitulo}>
              <Text>Tem Certeza que deseja excluir sua conta?</Text>
            </View>
            <View style={styles.viewBotoesModal}>
              <TouchableOpacity
                style={styles.botoesModal}
                onPress={() => excluirConta()}
              >
                <Text style={{ color: colors.branco }}>Sim</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.botoesModal,
                  { backgroundColor: colors.branco, color: "black" },
                ]}
                onPress={() => alterarModal(false)}
              >
                <Text>Não</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          window.alert("Modal has been closed.");
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#0000006d",
          }}
        >
          <View>
            <Image
              source={{
                uri: "https://www.simondecyrene.org/wp-content/themes/simon-de-cyrene/assets/images/loader.gif",
              }}
              style={{ width: 100, height: 100 }}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
