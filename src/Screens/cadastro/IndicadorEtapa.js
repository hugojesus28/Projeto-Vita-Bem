import React from 'react';
import { View } from 'react-native';
import stylesCadastro from '../../styles/stylesCadastro';
const IndicadorEtapa = ({ step, total }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
      {Array.from({ length: total }).map((_, index) => (
        <React.Fragment key={index}>
          {/* Bolinha */}
          <View
            style={step >= index ? stylesCadastro.bolinhaAtiva : stylesCadastro.bolinhaInativa}
          />
          
          {/* Linha (não após a última bolinha) */}
          {index < total - 1 && (
            <View
              style={step > index ? stylesCadastro.linhaAtiva : stylesCadastro.linhaInativa}
            />
          )}
        </React.Fragment>
      ))}
    </View>
  );
};

export default IndicadorEtapa;
