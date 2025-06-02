
import colors, { primeira } from "../color/color";

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "start",
    backgroundColor: colors.branco,
    padding: 0,
    
  },
  topo:{
        height: 180,
        backgroundColor:colors.primeira,

        

      },
  titulo:{
        marginLeft:5,
        flexDirection:'row',
        gap:40,
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
  container_input: {
    height: 130,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    
  },
  input: {
    backgroundColor: colors.branco,
    height: 45,
    width: "80%",
    borderRadius: 5,
    elevation: 5,
    fontSize:19,
    fontWeight:500,
    paddingLeft:5
  },
  label: {
    color: colors.primeira,
    fontWeight: 500,
    width: "80%",
  },
  container_info: {
    flex: 1,
    backgroundColor: colors.branco,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    paddingTop: 0,
    alignItems: "center",
  },
  card_alimentos: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 5 ,
    elevation: 5,
    display: "flex",
    flexDirection: "row",
    width: "100%",
    gap: "10px",
    padding: 4,
    borderRadius:10,
    marginBottom:30,
    backgroundColor: colors.branco
  },
  imagemCard: {
    
    width: "100%",
    height: "100%",
    objectFit:'cover',
    borderRadius:5
  },
  container_imgcard: {
    width: "30%",
    height: 90,
    marginBlock:1,
    
  },
  card_infos: {
    gap: 5,
   flexWrap: 'wrap'
  },
  infos_cards: {
    fontWeight: 500,
    overflow:'hidden',
    flexWrap: 'wrap',
    flexGrow:1,
  },
  button:{
    backgroundColor: colors.branco,
    elevation: 5,
    height: 45,
    width:"80%",
    paddingBlock:6,
    marginTop:7,
    
    borderRadius:6,
  },
  buttonText:{
    fontWeight:'bold',
    textAlign:'center',
    color:colors.primeira,
    fontSize:22,
  },
  FlatList:{
    width:'100%',
    display:'flex',
    paddingInline:'5%',
    paddingBlock:'4%'
    
    
  }
});
