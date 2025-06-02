import colors from '../color/color'

import { StyleSheet } from 'react-native'


export default StyleSheet.create({


    container: {
        flex: 1,
        backgroundColor: colors.primeira,
        padding: 0,
        
      },
      topo:{
        height: 120,
        backgroundColor:colors.transparente,
        justifyContent: 'center',
        alignItems: 'center',
        position:'relative',
        zIndex: 999,

      },
  
    titPagina:{
      color: colors.branco,
      fontSize: 20,
      fontWeight: 600
     },  
      container_fundoHome:{
        flex: 1,
        backgroundColor:colors.branco,
        marginTop:5,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
  
      },
      boxInfoUsuario:{
        flex: 1,
        width: '100%',
        alignItems: 'center',

      },
      boxConfig:{
        width: '90%',
        height: 80,
        marginInline: 20,
        marginBlock: 10,
      },
      conteudoConfig:{
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
      },
      viewImagem:{
        height: 60,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
      },
      imagemConfig:{
        objectFit: 'cover', 
        width: '100%', 
        height: '100%', 
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center'
      },
      infoConfig:{
        height: 80,
        flexDirection: 'column',
        width: '80%',
        paddingLeft: 10,
        paddingTop: 10
      },
      viewText: {
        justifyContent: 'end',
         marginTop: 2
      },
      configClick:{
        width: '100%'
        ,height: '100%',
        flexDirection: 'row'
      },
      containerModal:{
        flex: 1,
        justifyContent: 'center'
        ,alignItems: 'center',
        backgroundColor: colors.lowOpacity
      },
      boxModal:{
        height: 200,
        width: 300,
        borderWidth: 1,
        borderColor: colors.primeira,
        backgroundColor: colors.branco,
        borderRadius: 10,
        padding: 20
      },
      modalTitulo:{
        width: '100%',
        justifyContent: 'center',
        fontSize:30,
        marginBottom: 10,
        textAlign: 'center'
      },
      viewBotoesModal:{
        width: '100%',
        height: 100,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row'
      },
      botoesModal:{
        width: 100,
        height: 40,
        backgroundColor: colors.primeira,
        borderRadius: 20,
        color: colors.branco,
        justifyContent: 'center',
        alignItems: 'center',
        marginBlock: 10,
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 5,
        shadowColor: colors.boxShadowPadrao,
        shadowOpacity: 3
      },




      
})