import React, { useState } from "react";
import { View, Button, Image, Pressable, Text, TextInput } from "react-native";
import styles from "../../styles/stylesCadastro";
import color from "../../color/color";
import { Dropdown } from "react-native-element-dropdown";

const dadosDrop = [
  { labelDiabetico: "Sim", valorDiabetico: 1 },
  { labelDiabetico: "Não", valorDiabetico: 0 },
];

const DropdownComponent = ({value, onChangeValor}) => {
  
  const [isFocus, setIsFocus] = useState(false);

  
    return (
    <>
        <View style={styles.viewLabel}>
        <Text style={styles.label}>Diabetico</Text>
        </View>
        <Dropdown
        labelField="labelDiabetico"
        valueField="valorDiabetico"
        placeholderStyle={{
          color: '#000',
          fontSize: 16,
          fontWeight: '400'
        }}
        selectedTextStyle={{
          color: '#000', 
          fontSize: 16,
          fontWeight: '600'
        }}
        itemContainerStyle={{
              borderRadius: 10
            }}
        itemTextStyle={{
          color: '#333',
          fontSize: 15,
          fontWeight: '500'
        }}
        activeColor="#f0f7ff" 
        containerStyle={{
          backgroundColor: '#fff',
          borderWidth: 1,
          borderColor: '#ddd',
          borderRadius: 10
        }}
        data={dadosDrop}
        style={[styles.inputs, styles.boxShadowInput, isFocus && {borderColor: 'red', borderWidth: 1}]}
        value={value}
        placeholder={value === null ? 'Select item' : '...'}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setIsFocus(false);
          onChangeValor(item.valorDiabetico);
        }}
        
        />
    </>
);
 
}



export default DropdownComponent;
