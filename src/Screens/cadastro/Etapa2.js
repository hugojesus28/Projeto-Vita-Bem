import React, { useState } from "react";
import { View, TextInput, Switch, Text, Button, Pressable, Modal } from "react-native";
import styles from "../../styles/stylesCadastro";
import color from "../../color/color";
import DropdownGenero from "../../components/dropdonws/DropdownGenero";

const Etapa2 = ({ onNext, onBack, formData }) => {
  const [localData, setLocalData] = useState({
    pesoUsuario: formData.pesoUsuario || "",
    alturaUsuario: formData.alturaUsuario || "",
    generoUsuario: formData.generoUsuario || null,
  });

  const [isFocus, setIsFocus] = useState(false);

  

  const alterarFoco = (campo) => {
    setIsFocus(campo);
  };
  const removerFoco = () => {
    setIsFocus(null);
  };
  return (
    <View style={[styles.viewInputsFormulario]}>
      <View style={styles.viewLabel}>
        <Text style={styles.label}>Peso (KG)</Text>
      </View>
      <TextInput
        style={[styles.inputs, styles.boxShadowInput, isFocus === 'peso' && styles.focusInput]}
        value={localData.pesoUsuario}
        onFocus={() => alterarFoco('peso')}
        onBlur={() => removerFoco()}
        onChangeText={(t) => setLocalData({ ...localData, pesoUsuario: t })}
        keyboardType="numeric"
      />
      <View style={styles.viewLabel}>
        <Text style={styles.label}>Altura (CM)</Text>
      </View>
      <TextInput
        style={[styles.inputs, styles.boxShadowInput, isFocus === 'altura' && styles.focusInput]}
        value={localData.alturaUsuario}
        onFocus={() => alterarFoco('altura')}
        onBlur={() => removerFoco()}
        onChangeText={(t) => setLocalData({ ...localData, alturaUsuario: t })}
        keyboardType="numeric"
      />

      <DropdownGenero
        valueGenero={localData.generoUsuario}
        onChangeValor={(valorGenero) => {
          setLocalData((prev) => ({ ...prev, generoUsuario: valorGenero }));
        }}
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
        <Pressable
          style={[styles.botaoVoltar, styles.boxShadowInput]}
          onPress={() => onBack()}
        >
          <Text
            style={{
              color: color.vermelhoFraco,
              fontSize: 15,
              fontWeight: 700,
            }}
          >
            VOLTAR
          </Text>
        </Pressable>
      </View>

      

    </View>
  );
};

export default Etapa2;
