import { Text, View, Image, TextInput, Pressable, ScrollView, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import {  useEffect, useState } from 'react';
import styles from '../../styles/stylesPerfil.js';
import Icon from 'react-native-vector-icons/Feather';
import color from '../../color/color.js';
import * as camera from 'expo-image-picker';

import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropdownHipertenso from '../../components/dropdonws/DropdownHipertenso.js';
import DropdownComponent from '../../components/dropdonws/DropdownDiabetico.js';
import global from '../../../global.js';
import DateTimePicker from 'react-native-ui-datepicker';
import DropdownGenero from '../../components/dropdonws/DropdownGenero.js';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

  import dayjs from 'dayjs';
  import 'dayjs/locale/pt-br';

export default function Perfil() {
  const [isFocus, setIsFocus] = useState(null);
  const [imagem, setImagem] = useState(null);
  const [idUser, setIdUser] = useState()
  const [nome,setNome] = useState()
  const [email, setEmail] = useState()
  const [senha, setSenha] = useState()
  const [peso, setPeso] = useState()
  const [altura, setAltura] = useState()
  const [genero, setGenero] = useState()
  const [dataNasc, setDataNasc] = useState()
  const [hipertenso, setHipertenso] = useState()
  const [diabetico, setDiabetico] = useState()
  const [carregando, setCarregando] = useState(false)
  const [alert, setAlert] = useState(false)
  useEffect(() => {
    const pegarDados = async () => {
      const id = await AsyncStorage.getItem('idUser');
      setIdUser(id); 
      console.log('user id', id)
    };

    pegarDados();
  }, []);

  const alterarFoco = (campo) => {
    setIsFocus(campo)
  }
  const removerFoco = () => {
    setIsFocus(null)
  }
  useEffect(() =>{
  axios.get(`http://${global}:8000/api/usuario/${idUser}`)
    .then(resposta =>{
      let usuario = resposta.data.usuario;
      console.log(usuario)
      setNome(usuario.nome_usuario)
      setEmail(usuario.email_usuario)
      setSenha(usuario.senha_usuario)
      setPeso(usuario.peso_usuario)
      setAltura(usuario.altura_usuario)
      setGenero(usuario.genero_usuario)
      setDataNasc(usuario.data_nascimento_usuario)
      setHipertenso(usuario.hipertenso_usuario)
      setDiabetico(usuario.diabetico_usuario)
      setImagem(usuario.img_usuario)
      console.log(peso)
      
    })
    .catch((error) =>{
      console.log(error)
    })
  }, [idUser])
  const tirarFoto = async() =>{
      let resultado = await camera.launchCameraAsync({
        allowsEditing: true,
        aspect: [4,3],
        quality: 1
      });

      if(!resultado.canceled){
        const novaImagem = resultado.assets[0].uri;
    console.log("Nova imagem:", novaImagem); // Aqui você vê o valor correto
    setImagem(novaImagem);
      }
  }

  const atualizarUsuario = async () => {
    setCarregando(true)

    const url = `http://${global}:8000/api/usuario/editar/${idUser}`;
    const usuario = new FormData()
    try{

    
    if (imagem) {
        if (imagem.startsWith("data:image")) {
          const base64Data = imagem.split(',')[1];
          usuario.append("imgUsuario", {
            uri: `data:image/jpeg;base64,${base64Data}`,
            name: `foto_${Date.now()}.jpg`,
            type: 'image/jpeg'
          });
        } else if (imagem.startsWith("file://")) {
          usuario.append("imgUsuario", {
            uri: imagem,
            name: imagem.split('/').pop() || `foto_${Date.now()}.jpg`,
            type: 'image/jpeg'
          });
        }
      }
    const camposObrigatorios = {
      nomeUsuario:nome || '',
      emailUsuario: email || '',
      senhaUsuario: senha || '',
      pesoUsuario: peso || '',
      alturaUsuario: altura || '',
      generoUsuario: genero || '',
      dataNascimentoUsuario: dataNasc || ''
    };

    const camposBooleanos = {
      hipertensoUsuario: hipertenso ,
      diabeticoUsuario: diabetico
    };

    Object.entries({...camposObrigatorios, ...camposBooleanos}).forEach(([key, value]) => {
      usuario.append(key, value);
    });
    if(!imagem){
          usuario.append('imgUsuario', null)
        }
    //console.log(usuario)
    const resposta = await axios.post(`http://${global}:8000/api/usuario/${idUser}`, 
      usuario, 
      {
        headers: {
      'Content-Type': 'multipart/form-data'
        }
      });
      setCarregando(false)
    console.log(resposta)
    if(resposta.data.sucesso){
      setAlert(true)
    }
    setTimeout(() => {
      setAlert(false)
    }, [800])
   }
   catch(error){
    console.log(error)
   }

    

  }


  
  
  // Função auxiliar para formatar a data
  const getFormatedDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  
  
    dayjs.locale('pt-br');
  
    const data = new Date();
   
  
    const [selected, setSelected] = useState(new Date()); // Inicializando com a data atual.
    const [visibilidadeCalendario, setVisibilidadeCalendario] = useState(false);
  
    const exibirCalendario = (visibilidade) => {
      setVisibilidadeCalendario(visibilidade);
    };
  
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Definindo hora, minuto, segundo e milissegundo como 0 para uma comparação precisa
  
    const isFutureDate = (date) => {
      date.setHours(0, 0, 0, 0); // Garantir que a comparação seja feita sem considerar a hora
      return date > today;
    };
  
    const converterParaFormatoBanco = (dataBR) => {
      if (typeof dataBR === 'string') {
        const [dia, mes, ano] = dataBR.split('/');
        return `${ano}-${mes}-${dia}`;
      }
      return '';
    };
  
    const alterarData = (dataSelecionada) => {
      setSelected(dataSelecionada);
      const dataBR = getFormatedDate(dataSelecionada);        
      const dataBanco = converterParaFormatoBanco(dataBR);      
      setDataNasc(dataBanco)
    };
    
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.topo}>
        <View style={styles.viewLogo}>
          {imagem ? (
  <Image
    source={{ uri: imagem.startsWith('file://') || imagem.startsWith('http') ? imagem : `http://${global}:8000/img/users/fotosUsers/${imagem}` }}
    style={{ width: '96%', height: '96%', borderRadius: 100, objectFit: 'cover' }}
  />
) : (
  <Image
    style={{ width: '96%', height: '96%', borderRadius: 100, objectFit: 'cover' }}
    source={require('../../../assets/imgUsuario/imgPadraoUsuario.png')}
  />
)}
          <Pressable style={styles.viewAlterarImagem} onPress={() => tirarFoto()}>
          <View>
            <Icon name='camera' size={20} color={color.branco} />
          </View>
          </Pressable>
        </View>
      </View>
      <View style={styles.container_fundoHome}>
        <View style={styles.viewInfoUsuario}>
          <ScrollView style={styles.boxInfoUsuario}
            contentContainerStyle={{ paddingBottom: 80 }}
              showsVerticalScrollIndicator={false}>
            <View style={styles.viewCampo}>
              <View style={styles.viewLabel}>
                <Text style={styles.label}>Nome</Text>
              </View>
              <TextInput style={[styles.inputs, styles.boxShadowInput, isFocus === 'nome' && styles.focusInput]}
                onFocus={() => alterarFoco('nome')}
                onChangeText={setNome}
                onBlur={removerFoco}
                value={nome}
              />
            </View>
            <View style={styles.viewCampo}>
              <View style={styles.viewLabel}>
                <Text style={styles.label}>Email</Text>
              </View>
              <TextInput style={[styles.inputs, styles.boxShadowInput, isFocus === 'email' && styles.focusInput]}
                onFocus={() => alterarFoco('email')}
                onChangeText={setEmail}
                onBlur={removerFoco}
                value={email}
              />
            </View>
            <View style={styles.viewCampo}>
              <View style={styles.viewLabel}>
                <Text style={styles.label}>Senha</Text>
              </View>
              <TextInput style={[styles.inputs, styles.boxShadowInput, isFocus === 'senha' && styles.focusInput]}
                onFocus={() => alterarFoco('senha')}
                secureTextEntry
                onChangeText={setSenha}
                onBlur={removerFoco}
                value={senha}
              />
            </View>
            <View style={[styles.viewCampo, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}>
              <View style={{ width: '45%', marginRight: 10, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                <View style={styles.viewLabel}>
                  <Text style={styles.label}>Peso (KG)</Text>
                </View>
                <TextInput style={[styles.inputsJuntos, styles.boxShadowInput, isFocus === 'peso' && styles.focusInput]}
                  onFocus={() => alterarFoco('peso')}
                  onBlur={removerFoco}
                  onChangeText={setPeso}
                  value={peso?.toString()}
                  keyboardType="numeric"

                />
              </View>
              <View style={{ width: '45%', marginLeft: 10 }}>
                <View style={styles.viewLabel}>
                  <Text style={styles.label}>Altura (CM)</Text>
                </View>
                <TextInput style={[styles.inputsJuntos, styles.boxShadowInput, isFocus === 'altura' && styles.focusInput]}
                  onFocus={() => alterarFoco('altura')}
                  onBlur={removerFoco}
                  onChangeText={setAltura}
                  value={altura?.toString()}
                  keyboardType='numeric'
                />
              </View>
            </View>
            <View style={[styles.viewCampo, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}>
              <View style={{ width: '45%', marginRight: 10, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                
                <DropdownGenero
                valueGenero={genero}
               onChangeValor={(valor) =>  setGenero(valor)} />
                
              </View>
              <View style={{ width: '45%', marginLeft: 10, justifyContent: 'flex-start', alignItems: 'center' }}>
                <View style={styles.viewLabel}>
                  <Text style={styles.label}>Data Nasc.</Text>
                </View>
               <TouchableOpacity
                       onPress={() => exibirCalendario(true)}
                       style={[styles.inputs, styles.boxShadowInput, {justifyContent: 'center'}]}
                     >
                       <Text style={{ justifyContent: 'center'}}>{getFormatedDate(selected)}</Text>
                     </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.viewCampo, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}>
              <View style={{ width: '45%', marginRight: 10, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                
                <DropdownHipertenso 
                  valueHipertenso={hipertenso}
                  onChangeValor={(valor) =>  setHipertenso(valor)}
                />
               
              </View>
              <View style={{ width: '45%', marginLeft: 10 }}>
                
                <DropdownComponent 
                value={diabetico}
                onChangeValor={(valor) =>  setDiabetico(valor)}

                />
               
              </View>
            </View>
            <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
          <Pressable style={[styles.botaoCadastrar]} onPress={() => atualizarUsuario()}>
            {carregando ? 
            (<ActivityIndicator size={'large' }color={color.branco} />)
            :

            (<Text style={{ color: 'white', fontSize: 15, fontWeight: 700 }}>ALTERAR</Text>)
            }
             
            </Pressable>
            </View>
          </ScrollView>
          
        </View>
      </View>

<Modal visible={visibilidadeCalendario} transparent={true} animationType="fade">
        <View style={styles.containerModal}>
          <View style={styles.boxModal}>
            <View style={styles.calendario}>
              <DateTimePicker
                 mode="single"
                 showOutsideDays={true}
                 navigationPosition="start"
                 monthsFormat="full"
                 date={selected}
                 onChange={({ date }) => alterarData(date)}
                 calendar="gregory"
                 maxDate={data}
                 locale="pt-br"
                 customNavigation={{
                   previous: <Icon name="chevron-left" size={20} color={color.primeira} />,
                   next: <Icon name="chevron-right" size={20} color={color.primeira} />,
                 }}
                  headerStyle={{
                    backgroundColor: color.primeira,
                  }}
                  headerTextStyle={{
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                  weekDayStyle={{
                    color: color.primeira,
                    fontWeight: 'bold',
                  }}
                  disabledTextStyle={{
          opacity: 0.3,
        }}
                 dayStyle={(date) => {
                    const hoje = new Date();
                    hoje.setHours(0, 0, 0, 0);
                    const comparada = new Date(date);
                    comparada.setHours(0, 0, 0, 0);
                    
                    const style = {};
                    
                    // Dias futuros com opacidade reduzida
                    if (comparada > hoje) {
                      style.opacity = 0.3;
                    }
                    
                    // Dia atual com borda especial
                    if (comparada.toDateString() === hoje.toDateString()) {
                      style.borderWidth = 1;
                      style.borderColor = color.primeira;
                    }
                    
                    return style;
                  }}
                 styles={{
                   selected: { backgroundColor: color.primeira, borderRadius: '50%' },
                   selected_label: { color: 'white' },
                 }}
              />
            </View>
            <View style={styles.viewBotaoCalendario}>
              <TouchableOpacity style={styles.botaoConcluirCalendario} onPress={() => exibirCalendario(false)}>
                <Text style={{color: color.branco, fontWeight: 'bold'}}>Concluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal visible={alert} transparent={true} animationType='fade'>
        <View style={{flex: 1}}>
          <View style={{height: 50,position: 'absolute', bottom:20, left: 20, backgroundColor: color.verde, borderRadius: 20, width: '90%', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'
           }}>
                 <Text style={{color: color.branco, }}>Usuario Atualizado com Sucesso</Text>
                <FontAwesome5 name='check-circle' size={24} color={color.branco}/>
          </View> 
        </View>
      </Modal>
    </View>
  );

}

