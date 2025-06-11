import colors, { primeira } from "../color/color";

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 200,
    height: 400,
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
  containerProgresso: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerMensagens: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
 containerImg:{
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden'
 },
 boxImg:{
  width: 300,
  height: 300,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 20,
},
  imagem:{
    width: '100%',
    height: '100%',
    borderRadius: 10,
    
  },
  boxTitulo: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 50
  },
  tituloMusica:{
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primeira,
  },
  timeContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  containerBotoes:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
  },
  botao: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: colors.branco,
    elevation: 5
  },
});