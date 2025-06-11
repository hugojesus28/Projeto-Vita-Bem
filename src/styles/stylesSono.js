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
    gap: 50,
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
  containerConteudo: {
    flex: 1,
    width: "100%",
    padding: 15,
    alignItems: "center",
  },
  containerImagem: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  boxImagem: {
    width: 250,
    height: 250,
    borderRadius: 20,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  
  },
  imagem: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  containerTexto: {
    width: "100%",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  texto: {
    fontSize: 16,
    color: colors.texto,
    textAlign: "center",
  },
  containerDicas: {
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: colors.branco,
    elevation: 5,
    borderRadius: 10
  },
  textoDicas: {
    fontSize: 16,
    color: colors.texto,
    textAlign: "justify",
    lineHeight: 21,
  },
  tituloLink: {
    fontSize: 16,
    color: colors.texto,
    textAlign: "center",
    marginBlock: 4,
    fontWeight: 'bold'
    
  },
  textoLink:{
    fontSize: 16,
    color: '#007BFF',
    textDecorationLine: 'underline',
  }
});