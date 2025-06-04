import styles from '../../styles/stylesVacinas';
import color from '../../color/color';
import { vacinasBrasil } from '../../objects/objVacinas';
import { Pressable, View, Text, Image, FlatList, Modal, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function Vacina(){

    const [lista, setLista] = useState(vacinasBrasil)
    const [categoriaAtual, setCategoriaAtual] = useState(null)
    const [idVacinaModal, setIdVacinaModal] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)
    const [vacinaModal, setVacinaModal] = useState(0)

    const [bordaBox1, setBordaBox1] = useState(0)
    const [bordaBox2, setBordaBox2] = useState(0)
    const [bordaBox3, setBordaBox3] = useState(0)

    const [carregando, setCarregando] = useState(false)
    console.log(lista)
    useEffect(() =>{
        console.log(categoriaAtual)
        if(categoriaAtual){
            const listaFiltrada = vacinasBrasil.filter(vacina => vacina.categoria === categoriaAtual)
            setLista(listaFiltrada.length > 0 ? listaFiltrada : vacinasBrasil)
            console.log(listaFiltrada)
        }else{
            setLista(vacinasBrasil)
        }
        if(idVacinaModal){
            const vacinaFiltrada = vacinasBrasil.filter(vacina => vacina.id === idVacinaModal)
            console.log(vacinaFiltrada)
            setVacinaModal(vacinaFiltrada)
        }

    }, [categoriaAtual, idVacinaModal])


    const criarCategorias = (categoria) => {
        console.log("Tentando filtrar:", categoria);

         setCategoriaAtual(categoria)
        console.log(categoria)
         if(categoria === "infancia"){
            setBordaBox1(1)
            setBordaBox2(0)
            setBordaBox3(0)
         }else if(categoria === "adulto"){
            setBordaBox1(0)
            setBordaBox3(0)
            setBordaBox2(1)

         }else if(categoria === "gestante"){
            setBordaBox2(0)
            setBordaBox1(0)
            setBordaBox3(1)

         }else{
            setBordaBox2(0)
            setBordaBox1(0)
            setBordaBox3()
         }
    }

    const abrirModal = (idVacina) =>{
        console.log(idVacina)
        setIdVacinaModal(idVacina)
        setModalVisible(true)
    }

    const navigation = useNavigation()

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.containerConteudo}>
                
            <View style={styles.viewTitPagina}>
             <View style={styles.titulo}>
                <Pressable  style={styles.voltarContainer} onPress={() => navigation.goBack()}>
                      <FontAwesome5 name="arrow-left" size={24} color={color.primeira} />
                </Pressable>
                <Text style={{color: color.primeira, fontSize: 20, fontWeight: 600}}>Vacinas</Text>
            
                </View>
            </View>

           
            

            <View style={styles.containerVacinas}>
                <View style={styles.viewCatVacinas}>
                <Pressable onPress={() => criarCategorias("infancia")} style={[styles.boxCategoria, styles.boxShadow , { borderWidth: bordaBox1}]}>
                <View style={[styles.infoCategoria]}>
                    <Image source={require('../../../assets/garoto.png')}/>
                    <Text style={{textAlign: 'center', fontSize: 17 , marginTop: 10}}>Criança e Adolescentes</Text>
                    <Text style={{color: color.lowOpacity , textAlign: 'center', fontSize: 17 , marginTop: 7}}>0 a 12 Anos</Text>
                </View>
                </Pressable>

                <Pressable onPress={() => criarCategorias("adulto")} style={[styles.boxCategoria, styles.boxShadow , { borderWidth: bordaBox2}] }>
                <View style={[styles.infoCategoria ]}>
                    <Image source={require('../../../assets/familia.png')}/>
                    <Text style={{textAlign: 'center', fontSize: 17 , marginTop: 10}}>Adultos e Idosos</Text>
                    <Text style={{color: color.lowOpacity , textAlign: 'center', fontSize: 17 , marginTop: 7}}>A partir  dos 19 Anos</Text>
                </View>
                </Pressable>
                <Pressable onPress={() => criarCategorias("gestante")} style={[styles.boxCategoria, styles.boxShadow , { borderWidth: bordaBox3}]}>
                <View style={[styles.infoCategoria] }>
                    <Image source={require('../../../assets/gravida.png')}/>
                    <Text style={{textAlign: 'center', fontSize: 17 , marginTop: 10}}>Gestantes</Text>
                    <Text style={{color: color.lowOpacity, textAlign: 'center', fontSize: 17, marginTop: 7}}>Período de Gestação</Text>
                </View>
                </Pressable>
            </View>
                <View style={styles.viewTitulo}>
                    <Text style={{fontSize: 17, fontWeight: 600, opacity: 0.7}}>{categoriaAtual === null ? 'TODAS VACINAS': categoriaAtual.toUpperCase()}</Text>
                    <Pressable onPress={() => criarCategorias(null)} style={styles.botaoRemoverCat}> 
                    <Text style={styles.textRemoverCat}>Remover Categoria</Text>
                     </Pressable>
                </View>
                <View style={styles.viewConteudoInfoVacinas}> 
                <FlatList 
                style={styles.flatList}
                data={ lista }
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}

                renderItem={({item, index}) => (
                    <View style={[styles.boxInfoVacinas , styles.boxShadow]}>
                    <View style={styles.viewNomeVacina}>
                        <Text style={{color: color.primeira}}>{item.nome}</Text>
                    </View>

                    <View style={styles.viewDescricaoVacina}>
                        <Text style={styles.descricaoVacina}>{item.descricao}</Text>
                        <Pressable onPress={() => abrirModal(item.id)}>
                        <Image source={require('../../../assets/info-vacina.png')} style={styles.imgInfo} />
                        </Pressable>
                    </View>
                </View>
                )}   
                />


                

                </View>

                
            </View>
            </View>

            <Modal style={styles.modalVacina} visible={modalVisible} transparent={true} animationType='fade' >
            <View style={styles.containerModal}>
            <View style={styles.boxModal}>
                <FlatList 
                style={styles.flatListModal}
                data={ vacinaModal }
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => (
               <View>
                     <View style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                    <Text style={{color: color.primeira, fontWeight: 'bold', fontSize: 17}}> INFORMAÇÕES DA VACINA </Text>
                    </View>

                    <View style={styles.viewInfos}>
                    <Text style={{opacity: 0.3}}> Nome: </Text>
                    <Text> {item.nome} </Text>
                    </View>
                    
                    <View style={styles.viewInfos}>
                    <Text style={{opacity: 0.3}}> Quando Tomar: </Text>
                    <Text> {item.quandoTomar} </Text>
                    </View>
                    <View style={styles.viewInfos}>
                    <Text style={{opacity: 0.3}}> Dose: </Text>
                    <Text> {item.dose} </Text>
                    </View>
                    <View style={styles.viewInfos}>
                    <Text style={{opacity: 0.3}}> Via Administração: </Text>                        
                    <Text> {item.viaAdministracao} </Text>
                    </View>
                    <View style={styles.viewInfos}>
                    <Text style={{opacity: 0.3}}> Faixa Etaria: </Text>               
                         <Text> {item.faixaEtaria} </Text>
                    </View>
                    <View style={styles.viewInfos}>
                    <Text style={{opacity: 0.3}}> Categoria: </Text>             
                           <Text> {item.categoria} </Text>
                    </View>

                    <View style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
                    <Text style={{opacity: 0.3}}> Descrição: </Text>             
                           <Text > {item.descricao} </Text>
                    </View>

                    <View style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Pressable style={styles.botaoFecharModal} onPress={() => setModalVisible(false) }>
                        <Text style={{color: color.branco}}>Fechar Modal</Text>
                    </Pressable>
                    </View>

                    </View>
                 )}
                 />

</View>
                
            </View>
            </Modal>


        </SafeAreaView>

        
    );
}