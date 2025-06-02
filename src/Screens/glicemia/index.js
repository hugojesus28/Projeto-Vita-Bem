import React from 'react';
import { View, StyleSheet, Text, Image, TextInput } from 'react-native';

export default function Glicemia() {
  return (
    <View style={styles.container}>
     <View style={styles.header}>
        <Text>
            Medir Diabetes
        </Text>
     </View>

    <View style={styles.boxPesquisa}>
        <View style={styles.boxInput}>
            <TextInput style={styles.input} placeholder='aoaos'  />
        </View>

        <View>
            <Image />
        </View>
    </View>

     <View style={styles.boxConteudo}>
        <View>
            <View>
                <Text>
                    Medição
                </Text>
                <Text>
                    Valor
                </Text>
                <Text>
                    Horario
                </Text>
            </View>
        </View>
     </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header:{
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'red'

  },
  boxPesquisa:{
    flex: 1
  },
  boxInput:{
    width: '100%',
    height: 100
  },
  input:{
    width: 100,
    height: 20
  },
  boxConteudo:{
    flex: 1
  }
});
