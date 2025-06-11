import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import colors from "../../color/color";
import { useNavigation } from "@react-navigation/native";
import styles from "../../styles/stylesMensagens";
import { mensagensMotivacionais } from "../../objects/objMensagens";
export default function Mensagens() {
  const navigation = useNavigation();
  const [mensagens, setMensagens] = useState(null);
  console.log(mensagens);
  useEffect(() => {
    const mensagemAleatoria =
      mensagensMotivacionais[
        Math.floor(Math.random() * mensagensMotivacionais.length)
      ];
    console.log(mensagemAleatoria);
    setMensagens(mensagemAleatoria);
  }, []);

  const passarMensagem = (direcao) => {

    const indexAtual = mensagensMotivacionais.indexOf(mensagens);
    let novoIndex;

    if (direcao === "anterior") {
      novoIndex = indexAtual === 0 ? mensagensMotivacionais.length - 1 : indexAtual - 1;
    }

    if (direcao === "proximo") {
      novoIndex =  Math.floor(Math.random() * mensagensMotivacionais.length);
    }
    setMensagens(mensagensMotivacionais[novoIndex]);
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topo}>
        <View style={styles.titulo}>
          <Pressable
            style={styles.voltarContainer}
            onPress={() => navigation.goBack()}
          >
            <FontAwesome5 name="arrow-left" size={24} color={colors.primeira} />
          </Pressable>
          <Text style={styles.tituloText}>Mensagens</Text>
        </View>
      </View>

      <View style={styles.containerMensagens}>
        <View style={styles.boxConteudoMensagens}>
          <TouchableOpacity style={styles.botaoMensagem} onPress={() => passarMensagem('anterior')}>
            <FontAwesome5
              name={"step-backward"}
              size={26}
              color={mensagens ? mensagens.cor : colors.branco}
              style={styles.iconeMensagem}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.boxConteudoMensagens, { width: "50%" }]}>
          <TouchableOpacity
            style={[
              styles.boxMensagens,
              { borderColor: mensagens ? mensagens.cor : colors.branco, borderWidth: mensagens? 1 : 0 },
            ]}

          >
            {mensagens && (
              <>
                <Text style={[styles.tituloMensagem, { color : mensagens ? mensagens.cor : colors.branco }]}>{mensagens.titulo}</Text>
                <Text style={styles.textoMensagem}>
                  {mensagens.mensagem}
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.boxConteudoMensagens}>
          <TouchableOpacity style={styles.botaoMensagem} onPress={() => passarMensagem('proximo')}>
            <FontAwesome5
              name={"step-forward"}
              size={26}
              color={mensagens  ? mensagens.cor : colors.branco}
              style={styles.iconeMensagem}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
