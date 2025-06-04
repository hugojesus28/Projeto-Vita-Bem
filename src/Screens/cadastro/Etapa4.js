import React, { useState } from 'react';
import { View, Button, Image, Pressable, Text, TextInput, ActivityIndicator } from 'react-native';
import styles from '../../styles/stylesCadastro';
import color from '../../color/color';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const Etapa3 = ({ onSubmit, onBack, formData }) => {
  const [imagem, setImagem] = useState(formData.imagem || null);
  const [carregando, setCarregando] = useState(false)
  const escolherImagem = async () => {
  try {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true, // Habilita o retorno do base64
    });

    if (!resultado.canceled && resultado.assets[0].base64) {
      const base64Image = `data:image/jpeg;base64,${resultado.assets[0].base64}`;
      setImagem(base64Image); // Armazena a imagem em base64
      console.log(base64Image); // Exemplo: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ..."
    }
  } catch (error) {
    console.error("Erro ao selecionar imagem:", error);
  }
};

  return (
    <View style={[styles.viewInputsFormulario]}>
            <View style={styles.boxImgCadastro}>
            {   imagem !== null ? imagem && <Image source={{ uri: imagem }} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 100}}  /> 
            : <Image source={require('../../../assets/imgUsuario/imgPadraoUsuario.png')} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 100}}  /> }
            </View>
            <Pressable style={styles.botaoCadastrar} onPress={escolherImagem}>
              <Text style={{color: 'white', fontSize: 15, fontWeight: 700}}>Escolher Imagem</Text>
            </Pressable>
              <View style={[styles.viewBotoes]}>
                <Pressable style={[styles.botaoCadastrar]} onPress={() => {
                  setCarregando(true)
                  onSubmit({imagem})
                  }} >
                  {carregando ? 
                  (<ActivityIndicator  
                    size={'large'}
                    color={color.branco}
                  /> )
                  :
                  (<Text style={{color: 'white', fontSize: 15, fontWeight: 700}}>CONCLUIR</Text>)

                }
                </Pressable>
                <Pressable style={[styles.botaoVoltar, styles.boxShadowInput]} onPress={() => onBack()} >
                    <Text style={{color: color.vermelhoFraco, fontSize: 15, fontWeight: 700}}>VOLTAR</Text>
                </Pressable>
                </View>
            </View>
    
  );
};

export default Etapa3;
