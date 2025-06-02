import React, { useState } from "react";
import { View, TextInput, Button, Pressable, Text } from "react-native";
import styles from "../../styles/stylesCadastro";
import color from "../../color/color";
import { useNavigation } from "@react-navigation/native";

const Etapa1 = ({ onNext, formData }) => {
  const [localData, setLocalData] = useState({
    nomeUsuario: formData.nomeUsuario || "",
    emailUsuario: formData.emailUsuario || "",
    senhaUsuario: formData.senhaUsuario || "",
  });

  const [isFocus, setIsFocus] = useState(false)

  const [validado, setValidado] = useState(true);

  const isEmail = (emailTestado) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(emailTestado);
  };

  const alterarFoco = (campo) => {
    setIsFocus(campo);
  };
  const removerFoco = () => {
    setIsFocus(null);
  };

  const verificarCampos = () => {
    isEmail();
  };

  const navigation = useNavigation();
  return (
    <View style={[styles.viewInputsFormulario]}>
      <View style={styles.viewLabel}>
        <Text style={styles.label}>Nome</Text>
      </View>
      <TextInput
        style={[styles.inputs, styles.boxShadowInput, isFocus === "nome" && styles.focusInput,]}
        value={localData.nomeUsuario}
        onFocus={() => alterarFoco('nome')}
        onBlur={() => removerFoco()}
        onChangeText={(t) => setLocalData({ ...localData, nomeUsuario: t })}
      />
      <View style={styles.viewLabel}>
        <Text style={styles.label}>Email</Text>
      </View>
      {!validado && <Text>Email Invalido!</Text>}
      <TextInput
        style={[styles.inputs, styles.boxShadowInput, isFocus === "email" && styles.focusInput,]}
        keyboardType="email-address"
        value={localData.emailUsuario}
        onFocus={() => alterarFoco('email')}
        onBlur={() => removerFoco()}
        onChangeText={(t) => setLocalData({ ...localData, emailUsuario: t })}
      />
      <View style={styles.viewLabel}>
        <Text style={styles.label}>Senha</Text>
      </View>
      <TextInput
        style={[styles.inputs, styles.boxShadowInput, isFocus === "senha" && styles.focusInput,]}
        value={localData.senhaUsuario}
        secureTextEntry
        onFocus={() => alterarFoco('senha')}
        onBlur={() => removerFoco()}
        onChangeText={(t) => setLocalData({ ...localData, senhaUsuario: t })}
      />
      <View style={styles.viewBotoes}>
        <Pressable
          style={[styles.botaoCadastrar]}
          onPress={() => onNext(localData)}
        >
          <Text style={{ color: "white", fontSize: 15, fontWeight: 700 }}>
            AVANÇAR
          </Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("telaLogin")}>
          <Text style={[styles.textAlternarForm]}>Login</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Etapa1;
