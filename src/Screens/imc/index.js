import React, { useState } from "react"

import { View, Image, Pressable, TextInput, Text,StatusBar } from "react-native"

import styles from './stylesImc'
import colors from '../../color/color'

import NavComponent from "../../components/nav"
import { useNavigation } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Imc() {

    const [peso, onChangePeso] = useState(0)
    const [altura, onChangeAltura] = useState(0)
    const [imagemImc, setImagemImc] = useState(require('../../../assets/questao.png'))
    const [mensagem, setMensagem] = useState(<Text style={{ fontWeight: 'bold', fontSize: 23, color: 'black' }}>Descubra seu imc</Text>)
    const [statusText, SetstatusText] = useState('')
    const [imgRoleta, SetimgRoleta] = useState(<Image source={require('../../../assets/imc/1.png')} style={styles.imgRoleta} />)
    const [seta, SetSeta] = useState( )
    const [isFocus, setIsFocus] = useState(null);

   
    let [imc, setImc] = useState("0.0")


    const alterarFoco = (campo) =>{
        setIsFocus(campo)
    }
    const removerFoco = ()=>{
        setIsFocus(null)
    }
    const verificarImc = (peso, altura) => {

        imc = peso / ((altura/100) * (altura/100))

        console.log(imc.toFixed(2))

        if (imc <= 18.49) {
            console.log('Abaixo do Peso')
            setMensagem(<Text style={{ fontWeight: 'bold', fontSize: 23, color: 'blue' }}>Dá pra melhor</Text>)
            SetstatusText('ABAIXO DO PESO')
            SetimgRoleta(<Image source={require('../../../assets/imc/1.png')} style={styles.imgRoleta} />)
            SetSeta(<View style={[styles.seta , {height:'17%'}]}>
                <Image source={require('../../../assets/imc/seta.png')} style={styles.setaIMG} />
                </View>)
        }
        else if (imc >= 18.5 && imc <= 24.99) {
            console.log('Peso Normal')
            setMensagem(<Text style={{ fontWeight: 'bold', fontSize: 23, color: 'green' }}>Otimo!</Text>)
            SetstatusText('NORMAL')
            SetimgRoleta(<Image source={require('../../../assets/imc/2.png')} style={styles.imgRoleta} />)
            SetSeta(<View style={[styles.seta , {height:'43%'}]}>
                <Image source={require('../../../assets/imc/seta.png')} style={styles.setaIMG} />
                </View>)

        }
        else if (imc >= 25 && imc <= 29.99) {
            console.log('Acima Do Peso')
            setMensagem(<Text style={{ fontWeight: 'bold', fontSize: 23, color: 'orange' }}>Dá para melhorar</Text>)
            SetstatusText('ACIMA DO PESO')
            SetimgRoleta(<Image source={require('../../../assets/imc/3.png')} style={styles.imgRoleta} />)
            SetSeta(<View style={[styles.seta , {height:'68%'}]}>
                <Image source={require('../../../assets/imc/seta.png')} style={styles.setaIMG} />
                </View>)

        }
        else if (imc >= 30) {
            console.log('Obesidade Nível 1')
            setMensagem(<Text style={{ fontWeight: 'bold', fontSize: 23, color: 'red' }}>Pessimo</Text>)
            SetstatusText('OBESO')
            SetimgRoleta(<Image source={require('../../../assets/imc/4.png')} style={styles.imgRoleta} />)
            SetSeta(<View style={[styles.seta , {height:'93%'}]}>
                <Image source={require('../../../assets/imc/seta.png')} style={styles.setaIMG} />
                </View>)

        }

        setImc(imc.toFixed(1)); // "1234.57"

    }
    const navigation = useNavigation()
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            
            <View style={styles.topo_container}>
                <View style={styles.titulo}>
                    <Pressable  style={styles.voltarContainer} onPress={() => navigation.navigate("telaHome")}><Image source={require('../../../assets/setaEsquerda.png')} style={styles.imgsetaVoltar} /></Pressable>
                    <Text style={styles.tituloText}>Calcular seu IMC</Text>

                </View>
                <View style={styles.inputs}>
                    <View style={styles.input_container}>
                        <TextInput style={styles.input} 
                            onChangeText={onChangeAltura}
                            keyboardType="numeric"
                            placeholder="Altura"
                            onFocus={() => alterarFoco('')}
                            onBlur={removerFoco} />
                        <Text style={styles.textoInput}>CM</Text>
                    </View>
                    <View style={styles.input_container}>
                        <TextInput style={styles.input}
                            onChangeText={onChangePeso}
                            keyboardType="numeric"
                            placeholder="Peso" />
                        <Text style={styles.textoInput}>KG</Text>
                    </View>
                </View>
                <View style={styles.button_container}>
                    <Pressable style={styles.calcularButton} onPress={() => verificarImc(peso, altura)}>
                        <Text style={styles.calculartext}>Calcular</Text>
                    </Pressable>
                </View>
            </View>
            <View style={styles.container_baixo}>
                <View style={styles.infos}>
                    <View style={styles.textInfos}>
                        <Text style={styles.status}>{statusText}</Text>
                        {mensagem}
                    </View>
                    <Text style={styles.Numero}>{imc}</Text>

                </View>
                <View style={styles.container_img}>
                    {imgRoleta}
                </View>
              <View style={styles.boxSetaInfo}>
                <View style={styles.setaContainer}>
              {seta}
                </View>
                <View style={styles.container_infos_imcs}>
                    <View style={styles.info_imc}>
                        <View style={styles.esquerda}>
                            <View style={[styles.bola , {backgroundColor:'#5271ff'}]}>
                            </View>
                            <Text  style={styles.text_info_imc}>Abaixo do peso</Text>
                        </View>
                        <View style={styles.direita}>
                        <Text style={styles.texto_direita}>00.0 - 18.4</Text>
                        </View>
                    </View>
                    <View style={styles.info_imc}>
                        <View style={styles.esquerda}>
                            <View style={[styles.bola , {backgroundColor:'#33c635'}]}>
                            </View>
                            <Text  style={styles.text_info_imc}>Peso ideal</Text>
                        </View>
                        <View style={styles.direita}>
                        <Text style={styles.texto_direita}>18.5 - 24.9</Text>
                        </View>
                    </View>
                    <View style={styles.info_imc}>
                        <View style={styles.esquerda}>
                            <View style={[styles.bola , {backgroundColor:'#fed000'}]}>
                            </View>
                            <Text  style={styles.text_info_imc}>Acima do peso</Text>
                        </View>
                        <View style={styles.direita}>
                        <Text style={styles.texto_direita}>25.9 - 29.9</Text>
                        </View>
                    </View>
                    <View style={styles.info_imc}>
                        <View style={styles.esquerda}>
                            <View style={[styles.bola , {backgroundColor:'#f32423'}]}>
                            </View>
                            <Text  style={styles.text_info_imc}>Obeso</Text>
                        </View>
                        <View style={styles.direita}>
                        <Text style={styles.texto_direita}> > 30.0</Text>
                        </View>
                    </View>
                </View>
              </View>
            </View>
        </SafeAreaView>
    )
}


{/* <View style={styles.viewCabecalho}>
                <Text style={styles.tituloPagina}>IMC</Text>
            </View>

            <View style={styles.containerForms}>
                <View style={styles.viewImagem}>
                    <Text style={{textAlign: 'center', marginBottom: 10}}>{mensagem}</Text>
                    <Image style={styles.imgImc} source={imagemImc}/>
                </View>

                <View style={styles.viewForms}>
                    <View style={styles.viewLabel}>
                        <Text style={styles.label}>Peso</Text>
                    </View>
                    <TextInput style={styles.inputs} 
                                placeholder="Digite..."
                                onChangeText={onChangePeso} 
                                keyboardType="numeric"           
                    />
                    <View style={styles.viewLabel}>
                        <Text style={styles.label}>Altura</Text>
                    </View>
                    <TextInput style={styles.inputs} 
                                placeholder="Digite..."
                                onChangeText={onChangeAltura}
                                keyboardType="numeric"           

                    />

                    <Pressable style={styles.botaoEnviar} onPress={() => verificarImc(peso, altura)}>
                            <Text style={{fontSize: 16, color: colors.branco, fontWeight: 600}}>Verificar IMC</Text>
                    </Pressable>
                </View>
            </View> */}