import color from '../color/color';

import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'start',
      backgroundColor: color.primeira,
      padding: 0,
      overflow: 'hidden',

    },
    topo:{

      flex:0.25,
      backgroundColor:color.transparente,
      justifyContent: 'center',
      alignItems: 'center'

    },
    viewLogo:{
      backgroundColor: color.branco,
      height: 160,
      width: 160,
      borderRadius: '50%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    container_fundoHome:{
      flex:0.8,
      backgroundColor:color.branco,
      marginTop:5,
      borderTopLeftRadius:30,
      borderTopRightRadius:30,

    },
    container_bemvindo:{
      marginTop:50,
      alignItems:'center'

    },
    bemvindo:{
      fontSize:32,
      fontWeight:'700',
    },
    spanBemvindo:{
      color: color.primeira,
    },
    carousel:{
      backgroundColor:'red',
    },
    containercarousel:{
      alignItems:'center',
      marginTop:'3%',

    },
    titulocarousel:{
    marginTop:'10%',
    color: color.primeira,
    fontSize:16,
    fontWeight:'bold',
    marginLeft: 20
    },
   
  });
