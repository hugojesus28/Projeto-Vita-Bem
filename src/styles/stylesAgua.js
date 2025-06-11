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
  containerLiquidos: {
    flex: 2,
    width: '100%',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 40,
  },
  boxLiquidos: {
    backgroundColor: colors.branco,
    borderRadius: 15,
    padding: 20,
    width: '40%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 6,
  },
  textoLiquidosValor:{
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.cinza,
    marginTop: 10,
  }
});