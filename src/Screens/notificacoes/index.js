import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, TextInput, Pressable, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import styles from '../../styles/stylesNotificacoes.js';
import * as notifi from 'expo-notifications';
import colors from '../../color/color.js'

import * as Notifications from "expo-notifications";
import { useNavigation } from '@react-navigation/native';
export default function Notificacoes() {
  const [isFocus, setIsFocus] = useState(null);

  const alterarFoco = (campo) => {
    setIsFocus(campo)
  }
  const removerFoco = () => {
    setIsFocus(null)
  }
useEffect(() => {(

	async() => {
		const { status: notificationStatus } = await Notifications.requestPermissionsAsync();


		if(notificationStatus !== 'granted');
			Alert.alert('Permissão necessária', 'Ative as 	notificações para receber alertas.')

		}

  )();

  }, []);

  Notifications.setNotificationHandler({

  handleNotification: async () => ({

    shouldPlaySound: true,

    shouldSetBadge: true,

    shouldShowAlert: true,

  }),

});
async function chamada() {

	const { status } = await Notifications.getPermissionsAsync(); 



if (status != "granted") { 

	alert("não tem permissão"); 

	return; 

}
await Notifications.scheduleNotificationAsync({

	content: {

		title: "Remedio",

     body: "Não se esqueça de tomar seu remédio!",

     vibrate: [0, 500, 200, 500],

     data: {

     		tipo: "lembrete",

       	idRemedio: 28,

        mensagem: "Tomar Remedio As 18h",

     },

	},

   trigger: {

   	seconds: 2,

   },

});
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
            <TouchableOpacity style={styles.conteudoNotificacao} onPress={() => chamada()}>
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
            </TouchableOpacity>
          </View>
          
        </View>

      </View>
    </View>
  );

}

