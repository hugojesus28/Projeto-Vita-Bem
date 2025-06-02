import colors from '../color/color'

import { StyleSheet } from 'react-native'


export default StyleSheet.create({


    container: {
        flex: 1,
        justifyContent: 'start',
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
        flex:1,
        backgroundColor:colors.branco,
        marginTop:5,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
  
      },

      viewInfoUsuario:{
        flex: 1,
        width: '100%',
        marginTop: 30
      },
  
      
      boxInfoUsuario:{
        flex: 1,
        width: '100%',
        alignItems: 'center',

      },
    boxNotificacao:{
      width: '90%',
      marginInline: 20,
    },
    conteudoNotificacao:{
      marginTop: 40,
      flex: 1,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    viewImagem:{
      height: 60,
      width: 60,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      backgroundColor: colors.cinza
    },
    infoNoticacoes:{
      height: 60,
      flexDirection: 'column',
      width: '80%',
      
    }
})