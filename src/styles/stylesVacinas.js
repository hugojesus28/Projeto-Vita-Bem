import colors from '../color/color'

import { StyleSheet } from 'react-native'

export default StyleSheet.create({

container:{
    flex:1, 
    width: '100%',
    backgroundColor: colors.primeira,
},
containerConteudo:{
    flex:1, 
    width: '100%',
    
},
viewTitPagina:{
    height: 250,
    width: '100%',
    flexDirection: 'colunm',
    alignItems:'center',
    marginBottom: 20,
    backgroundColor: colors.primeira
},
 titulo:{
        flexDirection:'row',
        gap:140,
        marginTop:5,
        alignItems:'center',
        width: '100%'
    },
    voltarContainer:{
        width:30,
        marginLeft: 7,
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
viewCatVacinas:{
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 20
},
boxCategoria:{
    width: '30%',
    flexDirection: 'colunm',
    alignItems: 'center',
    height: '100%',
   
    padding:  6,
    borderRadius: 4,
    paddingTop: 15 ,
    elevation: 10,
    backgroundColor: colors.branco
},

infoCategoria:{
    width: '100%',
    alignItems: 'center',
    height: '100%',
    
},
containerVacinas:{
    flex: 2,
    alignItems: 'center',
    width: '100%',
    overflow: 'scroll',
    borderTopStartRadius: 50,
        borderTopStartRadius: 50,
    borderTopEndRadius: 50,

    backgroundColor: colors.branco
},

viewTitulo:{
    width: '90%',
    flex: 0.1,
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
},

botaoRemoverCat:{
    height: 30,
    width: 140,
    backgroundColor: colors.vermelhoFraco,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
},
textRemoverCat:{
    color: colors.branco,
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center'
},
flatList:{
    width: '100%',
    paddingInline: 10,
    
},

viewConteudoInfoVacinas:{

    flex: 1,
    width: '100%',    
    alignItems: 'center',

},
boxInfoVacinas:{
    height: 90,
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    padding: 6,
    borderRadius: 10,
    marginVertical:6,
    elevation: 5,
     backgroundColor: colors.branco
},
viewNomeVacina:{
    width: '100%',
    flex: 1
},
viewDescricaoVacina:{
    width: '100%',
    flexDirection: 'row',
    flex: 1,
    alignItems:'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    position: 'relative'
    
},

descricaoVacina:{
    width: '90%',
    flexWrap: 'wrap',

},

imgInfo:{
    position: 'absolute',
    bottom: 0,
    right: 10
},

boxShadow:{
    shadowColor: colors.boxShadowPadrao,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 5
},

containerModal:{
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: colors.lowOpacity
},

conteudoModal:{
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: colors.primeira,
},
boxModal:{
    height: 450,
    width: '90% ',
    backgroundColor: colors.branco,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primeira,
    justifyContent:'center',
    alignItems: 'center',
    padding: 20
},
viewInfos:{
    width: '100%', 
    display: 'flex', 
    flexDirection: 'row',
    marginBlock: 10
},

botaoFecharModal:{
    height: 30,
    width: 140,
    backgroundColor: colors.vermelhoFraco,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    marginTop: 20
},
})