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
    top: '20px',
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

linhaForms:{
    width: 80,
    height: 2,
    backgroundColor: colors.cinza,
},

viewInputsFormulario:{
    flex:0.5,
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

textAlternarForm:{
    fontSize: 17,
    color: colors.lowOpacity,
},
focusInput:{
    borderWidth: 1,
    borderColor: colors.vermelhoFraco,
    
}



})