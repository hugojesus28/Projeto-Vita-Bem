import { View, Text, Image, TextInput, Pressable } from "react-native";
import styles from "../../styles/stylesLogin";
import color from "../../color/color";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { useNavigation,  useRoute } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'
import globalAndroid from "../../../global";

export default function Login() {
  const [isFocus, setIsFocus] = useState(null);

  const alterarFoco = (campo) => {
    setIsFocus(campo);
  };
  const removerFoco = () => {
    setIsFocus(null);
  };
  

  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [confirmSenha, setConfirmSenha] = useState();

  const navigation = useNavigation();
  const route = useRoute();
  const mensagem = route.params?.mensagem;

  useEffect(() => {
    if (mensagem) {
      window.alert(mensagem)
    }
  }, []);

  const logar = async () => {
    console.log('botao')
    await axios
      .get(`http://${globalAndroid}:8000/api/usuario/login/${email}`)
      .then((resposta) => {
        let usuario = resposta.data.dados;
        console.log(usuario);
        console.log(email);
        if (email === usuario.email_usuario && senha === usuario.senha_usuario && confirmSenha === senha) {
          console.log("logado em: ", String(usuario.id));
          AsyncStorage.setItem('idUser', String(usuario.id))
          AsyncStorage.setItem('logado', '1')
          navigation.navigate('telaHome')
        }else{
          console.log('não logado', email, senha, confirmSenha)
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
        </View>

        <View style={styles.viewInputsFormulario}>
          <View style={{ width: "100%", alignItems: "center" }}>
            <View style={styles.viewLabel}>
              <Text style={styles.label}>Email</Text>
            </View>
            <TextInput
              style={[
                styles.inputs,
                styles.boxShadowInput,
                isFocus === "email" && styles.focusInput,
              ]}
              onFocus={() => alterarFoco("email")}
              onBlur={removerFoco}
              onChangeText={setEmail}
            />
            <View style={styles.viewLabel}>
              <Text style={styles.label}>Senha</Text>
            </View>
            <TextInput
              style={[
                styles.inputs,
                styles.boxShadowInput,
                isFocus === "senha" && styles.focusInput,
              ]}
              onFocus={() => alterarFoco("senha")}
              onBlur={removerFoco} 
              onChangeText={setSenha}
              secureTextEntry
            />
            <View style={styles.viewLabel}>
              <Text style={styles.label}>Confirmar Senha</Text>
            </View>
            <TextInput
              style={[
                styles.inputs,
                styles.boxShadowInput,
                isFocus === "confirmSenha" && styles.focusInput,
              ]}
              onFocus={() => alterarFoco("confirmSenha")}
              onBlur={removerFoco}
              onChangeText={setConfirmSenha}
              secureTextEntry
            />
          </View>

          <Pressable style={styles.botaoCadastrar} onPress={() => logar()}>
            <Text style={{ color: "white", fontSize: 15, fontWeight: 700 }}>
              LOGAR
            </Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate("telaCadastro")}>
            <Text style={styles.textAlternarForm}>Cadastro</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
