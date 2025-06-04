import React, { useState } from "react";
import { View, Button, Image, Pressable, Text, TextInput } from "react-native";
import styles from "../../styles/stylesCadastro";
import color from "../../color/color";
import { Dropdown } from "react-native-element-dropdown";
import Colors from "../../color/color";

const dadosGenero = [
  { labelGenero: "Masculino", valorGenero: 'masculino' },
  { labelGenero: "Feminino", valorGenero: 'feminino' },
  { labelGenero: "Não dizer", valorGenero: 'na' },
];

const DropdownGenero = ({valueGenero, onChangeValor}) => {
  
  const [isFocusGenero, setIsFocusGenero] = useState(false);

  
    return (
    <>
        <View style={styles.viewLabel}>
        <Text style={styles.label}>Genero</Text>
        </View>
  <Dropdown
    labelField="labelGenero"
    valueField="valorGenero"
    data={dadosGenero}
    placeholderStyle={{
      color: '#000',
      fontSize: 16,
      fontWeight: '400',
    }}
    itemContainerStyle={{
      borderRadius: 10
    }}
    selectedTextStyle={{
      color: '#000', 
      fontSize: 16,
      fontWeight: '600',
    }}
    itemTextStyle={{
      color: '#333',
      fontSize: 15,
      fontWeight: '500',
    }}
    activeColor="#f0f7ff"
    containerStyle={{
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 20
    }}
    inputSearchStyle={{
      backgroundColor: 'red'
    }}
    style={[
      styles.inputs,
      styles.boxShadowInput,
     
      isFocusGenero && { borderColor: 'red', borderWidth: 1 }
    ]}
    value={valueGenero}
    placeholder={valueGenero === null ? 'Select item' : '...'}
    onFocus={() => setIsFocusGenero(true)}
    onBlur={() => setIsFocusGenero(false)}
    onChange={item => {
      setIsFocusGenero(false);
      onChangeValor(item.valorGenero);
    }}
  />

    </>
);
 
}



export default DropdownGenero;
