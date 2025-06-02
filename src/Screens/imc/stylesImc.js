import { StyleSheet } from "react-native";
import colors from '../../color/color'

export default StyleSheet.create({
    container:{
        flex: 1,
        width: '100%',
        backgroundColor: colors.branco
    },
    topo_container:{
        flex:0.26,
        backgroundColor: colors.primeira,
    },
    
    titulo:{
        marginLeft:5,
        flexDirection:'row',
        gap:60,
        marginTop:5,
        alignItems:'center',
    },
    voltarContainer:{
        width:30,
        
        height:25
    },
    imgsetaVoltar:{
        width:'100%',
        height:'100%',
    },
    tituloText:{
        fontSize:25,
        fontWeight:500,
        color:colors.branco,

    },
    inputs:{
        display:'flex',
        flexDirection:'row',
        width:'100%',
        marginTop:10,
        justifyContent:'space-evenly'
    },
    input_container:{
        backgroundColor:'#00000040',
        width:'40%',
        
        borderRadius:10,
        height:40,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        
    },
    input:{
       width:'50%',
       fontSize:20,
       textAlign:'center',
       color:colors.branco,
        fontWeight:500,
        border:'none'
    },
    textoInput:{
        fontSize:20,
        color:colors.branco,
        fontWeight:500,
    },
    button_container:{
        justifyContent:'center',
        alignItems:'center',
   
    },
    calcularButton:{
        backgroundColor:colors.branco,
        backgroundColor:'#00000040',
        width:'40%',
        borderRadius:10,
        marginTop:20,
        paddingBlock:7
    },
    calculartext:{
        fontSize:20,
        color:colors.branco,
        fontWeight:500,
        textAlign:'center',
        
    },
    container_baixo:{
        backgroundColor: colors.branco,
        flex:1,
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        alignItems:'center'
    },
    infos:{
        marginTop:40,
        width:'90%',
        flexDirection:'row',
        justifyContent:'space-between',
       
    },
    textInfos:{
    
    },
    status:{
        fontWeight:'bold',
        textTransform:'uppercase',
        fontSize:25,
    },
    Numero:{
        fontSize:55,
        fontWeight:500,
       
    },
    container_img:{
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        marginTop:30,
        
    },
    container_infos_imcs:{
        width:'90%',
        height:'100%'
    },
    info_imc:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%',
        alignItems:'center',
        height:'25%',
        
    },
    esquerda:{
        flexDirection:'row',
        gap:10
    },
    bola:{
        
        height:22,
        width:22,
        borderRadius:1000,
    },
    text_info_imc:{
        fontSize:17,
        fontWeight:'500'
    },
    texto_direita:{
        fontSize:17,
        fontWeight:500
    },
    boxSetaInfo:{
        width:'98%',
        height:'20%',
        marginTop:-20,
        flexDirection:'row',
        gap:5,
    },
    setaContainer:{

        
        width:'5%',
        height:'100%',
    },
    seta:{
        width:'90%',
        justifyContent:'end'
    },
    setaIMG:{
        width:'100%',
        height:'15px',
        objectFit:'contain',
        opacity:0.50
    },

    focusInput:{
        borderWidth: 1,
       
        borderColor: colors.primeira,
     
    },
   
    
})

