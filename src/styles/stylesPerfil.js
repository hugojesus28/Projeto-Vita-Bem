import colors from '../color/color'

import { StyleSheet } from 'react-native'


export default StyleSheet.create({


    container: {
        flex: 1,
        backgroundColor: colors.primeira,
        padding: 0,
        
      },
      topo:{
        height: 140,
        backgroundColor:colors.transparente,
        justifyContent: 'center',
        alignItems: 'center',
        position:'relative',
        zIndex: 999,

      },
      viewLogo:{
        backgroundColor: colors.branco,
        height: 170,
        width: 170,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        objectFit: 'cover',
        position: 'absolute',
        bottom: -80,
        elevation: 5,
        shadowOffset: {width: 0, height: 0},
        shadowColor: colors.boxShadowPadrao,
        shadowOpacity: 1,
        shadowRadius: 10,
        
    },
    viewAlterarImagem:{
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: colors.vermelhoFraco,
        position: 'absolute',
        bottom: 0,
        right: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
      container_fundoHome:{
        flex: 1,
        backgroundColor:colors.branco,
        marginTop:5,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
  
      },

      viewInfoUsuario:{
        flex: 1,
        
        width: '100%',
        marginBottom: 10,
      },
  
      
      boxInfoUsuario:{
        width: '100%',
        marginTop: '20%'

      },
      viewInputsFormulario:{
        flex:0.9,
        backgroundColor: 'black',
        width: '100%',
        alignItems: 'center',
    },
    viewLabel:{
        width: '70%',
        marginBottom: 3
    },
    label:{
        fontSize: 17,
        fontWeight: 600,
        opacity: 0.5
    },
    inputs:{
        width: '80%',
        outlineStyle: 'none',
        height:40,
        borderRadius: 20,
        paddingLeft: 15,
        marginBottom: 10,
        
    },
    inputsJuntos:{
      width: '81.5%',
      outlineStyle: 'none',
      height:40,
      borderRadius: 20,
      paddingLeft: 15,
      marginBottom: 20,
      
  },
    boxShadowInput:{
        shadowColor: colors.boxShadowPadrao,
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 1,
        shadowRadius: 5,
        backgroundColor: colors.branco,
        elevation: 10
    },
    focusInput: {
        borderWidth: 1,
        borderColor: 'red'
    },
    viewCampo:{
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        marginBlock: 5
    },
    botaoCadastrar:{
        width: '80%',
        height: 40,
        backgroundColor: colors.primeira,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
    
    },
    containerModal:{
    flex: 1,
    backgroundColor: colors.lowOpacity,
    justifyContent: 'center',
    alignItems: 'center'
},
boxModal:{
    height:420,
    width: 300,
    backgroundColor: colors.branco,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.primeira
},
calendario:{
    margin: 10,
},
viewBotaoCalendario:{
    width: '100%',
    alignItems: 'center'
},
botaoConcluirCalendario:{
    width: 100,
    height: 40,
    backgroundColor: colors.primeira,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
},
})