import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, TextInput, Pressable } from 'react-native';
import { useState } from 'react';
import styles from '../../styles/stylesNotificacoes.js';
import * as notifi from 'expo-notifications';
import colors from '../../color/color.js'


import { useNavigation } from '@react-navigation/native';
export default function Notificacoes() {
  const [isFocus, setIsFocus] = useState(null);

  const alterarFoco = (campo) => {
    setIsFocus(campo)
  }
  const removerFoco = () => {
    setIsFocus(null)
  }

  
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.topo}>
        <Text style={styles.titPagina}>Notificacoes</Text>

      </View>
      <View style={styles.container_fundoHome}>
        <View style={styles.viewInfoUsuario}>
          <View style={styles.boxNotificacao}>
            <View style={styles.conteudoNotificacao}>
              <View style={styles.viewImagem}>
                <Image style={{objectFit: 'cover', width: '100%', height: '100%', borderRadius: 30}} source={require('../../../assets/imgUsuario/podpah.jpeg')} />
              </View>
              <View style={styles.infoNoticacoes}>
                <View style={{justifyContent: 'end', marginLeft: 10, alignItems:'center',height: '70%'}}>
                  <Text style={{ }}><Text style={{color: colors.primeira}}>Atenção!</Text> Não se esqueça de tomar 
                  seu remédio: Rivotril</Text>
                </View>
                <View style={{alignItems: 'flex-end', paddingRight: 20}}>
                <Text style={{color:colors.cinza}}>12/07/2025 </Text>
                </View>
              </View>
            </View>
          </View>
          <Pressable onPress={() => notificacao(1)}>
            <Text>Caba</Text>
          </Pressable>
        </View>

      </View>
    </View>
  );

}

