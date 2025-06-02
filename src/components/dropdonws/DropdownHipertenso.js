import React, { useState } from "react";
import { View, Button, Image, Pressable, Text, TextInput } from "react-native";
import styles from "../../styles/stylesCadastro";
import color from "../../color/color";
import { Dropdown } from "react-native-element-dropdown";

const dadosHipertenso = [
  { labelHipertenso: "Sim", valorHipertenso: 1 },
  { labelHipertenso: "Não", valorHipertenso: 0 },
];

const DropdownHipertenso = ({valueHipertenso, onChangeValor}) => {
  
  const [isFocusHipertenso, setIsFocusHipertenso] = useState(false);

  
    return (
    <>
        <View style={styles.viewLabel}>
        <Text style={styles.label}>Hipertenso</Text>
        </View>
        <Dropdown
        labelField="labelHipertenso"
        valueField="valorHipertenso"
        data={dadosHipertenso}
        placeholderStyle={{
              color: '#999',
              fontSize: 16,
              fontWeight: '400',
            }}
            selectedTextStyle={{
              color: '#000', 
              fontSize: 16,
              fontWeight: '600',
            }}
            itemContainerStyle={{
              borderRadius: 10
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
              borderRadius: 10
            }}
            inputSearchStyle={{
              backgroundColor: 'red'
            }}
        style={[styles.inputs, styles.boxShadowInput, isFocusHipertenso && {borderColor: 'red', borderWidth: 1}]}
        value={valueHipertenso}
        placeholder={valueHipertenso === null ? 'Select item' : '...'}
        onFocus={() => setIsFocusHipertenso(true)}
        onBlur={() => setIsFocusHipertenso(false)}
        onChange={item => {
          setIsFocusHipertenso(false);
          onChangeValor(item.valorHipertenso);
        }}
        
        />
    </>
);
 
}



export default DropdownHipertenso;
