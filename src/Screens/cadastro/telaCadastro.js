import { View, Text, Image, TextInput, Pressable, ActivityIndicator } from "react-native";
import styles from "../../styles/stylesCadastro";
import color from "../../color/color";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import IndicadorEtapa from "./IndicadorEtapa";
import Etapa1 from "./Etapa1";
import Etapa2 from "./Etapa2";
import Etapa3 from "./Etapa3";
import Etapa4 from "./Etapa4";
import axios from "axios";
import globalAndroid from "../../../global";
import * as FileSystem from 'expo-file-system';

export default function Cadastro() {
  
  const [isFocus, setIsFocus] = useState(null);

  const alterarFoco = (campo) => {
    setIsFocus(campo);
  };
  const removerFoco = () => {
    setIsFocus(null);
  };

  const [etapaAtual, setEtapaAtual] = useState(0);

  const [formData, setFormData] = useState({});

  const etapas = [Etapa1, Etapa2, Etapa3, Etapa4];
  const totalEtapas = etapas.length;

  const EtapaComponente = etapas[etapaAtual];
  const [carregando, setCarregando] = useState(false)
  const navigation = useNavigation();

const cadastrar = async (dados) => {
  console.log('Dados recebidos:', dados);

  try {
    const usuario = new FormData();

    if (dados.imagem) {
      if (dados.imagem.startsWith("data:image")) {
        const base64Data = dados.imagem.split(',')[1];
        usuario.append("imagemUsuario", {
          uri: `data:image/jpeg;base64,${base64Data}`,
          name: `foto_${Date.now()}.jpg`,
          type: 'image/jpeg'
        });
      } else if (dados.imagem.startsWith("file://")) {
        usuario.append("imagemUsuario", {
          uri: dados.imagem,
          name: dados.imagem.split('/').pop() || `foto_${Date.now()}.jpg`,
          type: 'image/jpeg'
        });
      }
    }

    const camposObrigatorios = {
      nomeUsuario: dados.nomeUsuario || '',
      emailUsuario: dados.emailUsuario || '',
      senhaUsuario: dados.senhaUsuario || '',
      pesoUsuario: dados.pesoUsuario || '',
      alturaUsuario: dados.alturaUsuario || '',
      generoUsuario: dados.generoUsuario || '',
      dataNascimentoUsuario: dados.dataNascimentoUsuario || ''
    };

    const camposBooleanos = {
      hipertensoUsuario: dados.hipertensoUsuario ,
      diabeticoUsuario: dados.diabeticoUsuario
    };

    Object.entries({...camposObrigatorios, ...camposBooleanos}).forEach(([key, value]) => {
      usuario.append(key, value);
    });

    console.log('Conteúdo do FormData:', usuario);
    // for (let [key, value] of usuario._parts) {
    //   if (typeof value === 'object' && value.uri) {
    //     console.log(key, `[Arquivo: ${value.name}]`);
    //   } else {
    //     console.log(key, value);
    //   }
    // }

    const resposta = await axios.post(`http://${globalAndroid}:8000/api/usuario`, usuario, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      transformRequest: (data) => data,
    });

    console.log('Resposta da API:', resposta.data);
    navigation.navigate("telaLogin");

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
};

const proximaEtapa = (dados) => {
  const novosDados = {...formData, ...dados};
  console.log(novosDados)
  if (etapaAtual < totalEtapas - 1) {
    setFormData(novosDados);
    setEtapaAtual(etapaAtual + 1);
  } else {
    setFormData(novosDados); 
    cadastrar(novosDados);
    
  }
};

  const voltarEtapa = () => {
    if (etapaAtual > 0) {
      setEtapaAtual(etapaAtual - 1);
    }
  };

  return (
    <View style={styles.containerCadastro}>
      <LinearGradient
        colors={[color.primeira, color.vermelhoFraco]}
        style={styles.viewTransparente}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
      ></LinearGradient>
      <View style={styles.viewFormulario1}>
        <View style={styles.viewLogo}>
          <Image
            source={require("../../../assets/logo-vita-bem2.png")}
            style={styles.imgLogo}
          />

          <IndicadorEtapa step={etapaAtual} total={totalEtapas} />
        </View>

        <View style={[styles.viewInputsFormulario]}>
          <EtapaComponente
            onNext={proximaEtapa}
            onBack={voltarEtapa}
            onSubmit={proximaEtapa}
            formData={formData}
          />
        </View>
      </View>
    </View>
  );
}
