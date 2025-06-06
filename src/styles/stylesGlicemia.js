import { StyleSheet } from "react-native";
import colors from "../color/color";

export default StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.branco,
    
  },
  titulo: {
    marginLeft: 5,
    flexDirection: "row",
    gap: 100,
    alignItems: "center",
    padding: 10,
  },
  voltarContainer: {
    width: 30,

    height: 25,
  },
  imgsetaVoltar: {
    width: "100%",
    height: "100%",
  },
  tituloText: {
    fontSize: 25,
    fontWeight: 500,
    color: colors.primeira,
  },
  topo: {
    width: "100%",
    flexDirection: "row",
    padding: 25,
    justifyContent: "space-between",
  },
viewLinhaTopo:{
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  linhaTopo:{
    width: "90%",
    height: 1,
    backgroundColor: colors.cinza,
   
  },
  viewHistorico:{
    width: "100%",
    paddingBottom: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  textHistorico:{
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.cinza,
  },
  inputCont: {
    borderRadius: 15,
    width: "60%",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 50,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5, 
    backgroundColor: colors.branco
  },
  lupa: {
    height: 30,
    width: 30,
  },
  input: {
    width: "100%",
    paddingRight: 10,
    paddingLeft: 10,
    fontSize: 20,
    fontWeight: 400,
    height: '100%',

    
  },
  mais: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    padding: 5,
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    elevation: 5,
    backgroundColor: colors.branco
  },
  maisImg: {
    height: "100%",
    width: "100%",
    objectFit: "contain",
  },
  FlatList:{
    paddingInline:5,
    width:'95%',
    paddingBottom:10,
  },
  listaCard: {
  
    width:'100%',
    alignItems:'center'
  },
  card:{
    marginTop:20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    width:'100%',
    borderRadius:10,
    height:100,
    flexDirection:'row',
    elevation: 5,
    backgroundColor: colors.branco
  },
  imgCardCont:{
    width:'35%',
    height:'100%',
    
  },
  imgCard:{
    width:'100%',
    height:'100%',
    objectFit: 'cover',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10

  },
  info:{
    width:'58%',
    height:'100%',
    justifyContent:'space-between',
    paddingBlock:7,
    paddingLeft:2,
  },
  infoText:{
    fontSize:14,
    fontWeight:400
  },
  acoes:{
    justifyContent:'space-between',
    paddingBlock:5,
  },
  acoesbutton:{

    height:15,
    width:15,
    opacity:0.5
  },
  acoesbuttonImg:{
    objectFit:'contain',
    width:'100%',
    height:'100%',
  },
  ContModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#00000048',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    width:'90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingBottom:30
  },
  fecharmodalcont:{
    width:'100%',
    alignItems:'end',
    padding:10
  },
  x:{
    width:20,
    height:20,
    opacity:0.5,
    objectFit:'contain'
  },
  boxcontimgModal:{
    width:'100%',
    height:160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contimgModal:{
    height:180,
    width:180,
    elevation: 5,
    backgroundColor: colors.branco,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgModal:{
    objectFit:'cover',
    width:'100%',
    height:'100%',
    borderRadius: 20
    
  },
  Contcarregarimg:{
   
    width:'100%',
    height:45,
    marginTop:20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carregarimg:{
    backgroundColor:colors.primeira,
    width:'80%',
    height:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:15
  },

  textbuttonmodal:{
    fontSize:22,
    fontWeight:500,
    color:colors.branco,
    
    
 
  },
  inputsModal:{
    marginBottom:20,
    gap:20,
    width:'100%',
    alignItems: 'center',
    marginTop:20,
   
  },
  continputmodal:{
    width:'80%',
    gap:5,
  },
  label:{
    fontWeight:500,
  },
  inputmodal:{
    backgroundColor:colors.branco,
    height:40,
    borderRadius:15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
     elevation: 5,
    backgroundColor: colors.branco
  },
});
