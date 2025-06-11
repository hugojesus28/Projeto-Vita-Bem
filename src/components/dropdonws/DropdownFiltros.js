import React, { useState } from "react";
import { View, Button, Image, Pressable, Text, TextInput } from "react-native";
import styles from "../../styles/stylesCadastro";
import color from "../../color/color";
import { Dropdown } from "react-native-element-dropdown";
import Colors from "../../color/color";

const dadosFiltro = [
  { labelGenero: "Recente", valorFiltro: 'rec' },
  { labelGenero: "Maior Medida", valorFiltro: 'maior' },
  { labelGenero: "Menor Medida", valorFiltro: 'menor' },
];

const DropdownFiltro = ({valueFiltro, onChangeFiltro}) => {
  
  const [isFocusFiltro, setIsFocusFiltro] = useState(false);

  
    return (
    <>
        
  <Dropdown
    labelField="labelGenero"
    valueField="valorFiltro"
    data={dadosFiltro}
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
      { height: '100%', width: '100%'},
      isFocusFiltro && { borderColor: 'red', borderWidth: 1 }
    ]}
    value={valueFiltro}
    placeholder={valueFiltro === '' ? 'Filtrar' : '...'}
    onFocus={() => setIsFocusFiltro(true)}
    onBlur={() => setIsFocusFiltro(false)}
    onChange={item => {
      setIsFocusFiltro(false);
      onChangeFiltro(item.valorFiltro);
    }}
  />

    </>
);
 
}



export default DropdownFiltro;
