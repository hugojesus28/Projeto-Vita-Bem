import { StyleSheet } from "react-native";
import colors from '../color/color';
export default StyleSheet.create({


containerCadastro:{
    flex: 1,
    position: 'relative'
},
viewTransparente: {
    flex:1,
    backgroundColor: 'transparent'
},
viewFormulario1:{
    flex: 1,
    width: '100%',
    position: 'absolute',
    backgroundColor: colors.branco,
    top: '15%',
    height: '100%',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20 
},
viewLogo: {
    flex: 0.3,
    width: '100%',
    alignItems: 'center',

},
imgLogo:{
    width: 170,
    height: 170,
    objectFit: 'contain',
    top: '-2px',
},
viewEtapasForms:{
    width: '100%',
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
},
bolinhaForms:{

    height:15,
    width:15,
    backgroundColor: colors.cinza,
    borderRadius: '50%'

},
bolinhaFormsAtivo:{

    height:15,
    width:15,
    backgroundColor: colors.primeira,
    borderRadius: '50%'

},

boxShadowCadastro:{
    shadowColor: colors.primeira,
    shadowOffset: {width: 0, height:0},
    shadowOpacity: 1,
    shadowRadius: 7 

},


viewInputsFormulario:{
    flex:0.8,
    width: '100%',
    alignItems: 'center',
    position: 'relative',
    marginTop: 10
},
viewLabel:{
    width: '70%',
    marginBottom: 3
},
label:{
    fontSize: 17,
    opacity: 0.5,
    fontWeight: 600
},
inputs:{
    width: '80%',
    outlineStyle: 'none',
    height: 40,
    borderRadius: 20,
    paddingLeft: 15,
    marginBottom: 20,
    elevation: 5,
    backgroundColor: colors.branco
},

boxShadowInput:{
    shadowColor: colors.boxShadowPadrao,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 5
},
viewBotoes: {
    width: '100%',
    
    justifyContent: 'center',
    alignItems: 'center'
   
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
botaoVoltar:{
    width: '80%',
    height: 40,
    backgroundColor: colors.branco,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    elevation: 5,
},

textAlternarForm:{
    fontSize: 17,
    color: colors.lowOpacity,
},
focusInput:{
    borderWidth: 1,
    paddingHorizontal:100,
    borderRadius : 20,
    borderColor: colors.primeira,
    shadowColor: colors.primeira,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 4
},

boxImgCadastro:{
    width:150,
    height: 150,
    borderRadius: '50%',
    objectFit: 'cover',
    backgroundColor: 'gray'
},
bolinhaAtiva:{
    height: 16,
    width: 16,
    borderRadius: 8,
    backgroundColor: colors.primeira,
    zIndex: 1,
    shadowColor: colors.primeira,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 5,
    shadowRadius: 5
},
bolinhaInativa:{
    height: 16,
    width: 16,
    borderRadius: 8,
    backgroundColor: colors.cinza,
    zIndex: 1,

},
linhaAtiva:{
    height: 2,
    width: 55,
    backgroundColor: colors.primeira
},
linhaInativa:{
    height: 1.3,
    width: 55,
    backgroundColor: colors.cinza
},
focusInput:{
    borderWidth: 1,
    borderColor: colors.vermelhoFraco,
   
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