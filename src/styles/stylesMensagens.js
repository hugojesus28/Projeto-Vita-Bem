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
    gap: 80,
    alignItems: "center",
    padding: 5,
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
    height: 100,
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
    flexDirection: 'row',
  },
  boxMensagens: {
    backgroundColor: colors.branco,
    borderRadius: 15,
    padding: 20,
    margin: 7,
    width: '100%',
    height: 'auto',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 7,
  },
  boxConteudoMensagens: {
    width: '20%',
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  containerBotoesMensagem: {
    flexDirection: 'row',
    width: '70%',

    paddingHorizontal: 10,
    marginTop: 20,
    flex: 1
  },
  botaoMensagem:{
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    backgroundColor: colors.branco,
    borderRadius: 100,
    elevation: 10,
    padding: 10,
    marginTop: 20,
  },
  tituloMensagem:{
    fontSize: 20,
    fontWeight: 'bold',
  },
  textoMensagem:{
    paddingTop: 15,
    fontSize: 14,
    color: colors.preto,
    textAlign: 'center',
  }
});