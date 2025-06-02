import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Modal,
} from "react-native";
import DateTimePicker from 'react-native-ui-datepicker';
import styles from "../../styles/stylesCadastro";
import color from "../../color/color";
import DropdownComponent from "../../components/dropdonws/DropdownDiabetico";
import DropdownHipertenso from "../../components/dropdonws/DropdownHipertenso";
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import Icon from 'react-native-vector-icons/Feather';


// Função auxiliar para formatar a data
const getFormatedDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const Etapa3 = ({ onNext, onBack, formData }) => {
  dayjs.locale('pt-br');

  const data = new Date();
  const [localData, setLocalData] = useState({
    dataNascimentoUsuario: formData.dataNascimentoUsuario || "",
    diabeticoUsuario: formData.diabeticoUsuario || null,
    hipertensoUsuario: formData.hipertensoUsuario || null,
  });

  const [selected, setSelected] = useState(new Date()); // Inicializando com a data atual.
  const [visibilidadeCalendario, setVisibilidadeCalendario] = useState(false);

  const exibirCalendario = (visibilidade) => {
    setVisibilidadeCalendario(visibilidade);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Definindo hora, minuto, segundo e milissegundo como 0 para uma comparação precisa

  const isFutureDate = (date) => {
    date.setHours(0, 0, 0, 0); // Garantir que a comparação seja feita sem considerar a hora
    return date > today;
  };

  const converterParaFormatoBanco = (dataBR) => {
    if (typeof dataBR === 'string') {
      const [dia, mes, ano] = dataBR.split('/');
      return `${ano}-${mes}-${dia}`;
    }
    return '';
  };

  const alterarData = (dataSelecionada) => {
    setSelected(dataSelecionada);
    const dataBR = getFormatedDate(dataSelecionada);        
    const dataBanco = converterParaFormatoBanco(dataBR);      
    setLocalData((prev) => ({
      ...prev,
      dataNascimentoUsuario: dataBanco,
    }));
  };
  return (
    <View style={[styles.viewInputsFormulario]}>
      <View style={styles.viewLabel}>
        <Text style={styles.label}>Data Nascimento</Text>
      </View>
      <TouchableOpacity
        onPress={() => exibirCalendario(true)}
        style={[styles.inputs, styles.boxShadowInput, {justifyContent: 'center'}]}
      >
        <Text style={{ justifyContent: 'center'}}>{getFormatedDate(selected)}</Text>
      </TouchableOpacity>

      <DropdownComponent
        value={localData.diabeticoUsuario}
        onChangeValor={(valor) => {
          setLocalData((prev) => ({ ...prev, diabeticoUsuario: valor }));
        }}
      />

      <DropdownHipertenso
        valueHipertenso={localData.hipertensoUsuario}
        onChangeValor={(valorHipertenso) => {
          setLocalData((prev) => ({
            ...prev,
            hipertensoUsuario: valorHipertenso,
          }));
        }}
      />
      <View style={[styles.viewBotoes]}>
        <Pressable
          style={[styles.botaoCadastrar]}
          onPress={() => onNext(localData)}
        >
          <Text style={{ color: "white", fontSize: 15, fontWeight: 700 }}>
            AVANÇAR
          </Text>
        </Pressable>
        <Pressable
          style={[styles.botaoVoltar, styles.boxShadowInput]}
          onPress={() => onBack()}
        >
          <Text
            style={{
              color: color.vermelhoFraco,
              fontSize: 15,
              fontWeight: 700,
            }}
          >
            VOLTAR
          </Text>
        </Pressable>
      </View>
      <Modal visible={visibilidadeCalendario} transparent={true} animationType="fade">
        <View style={styles.containerModal}>
          <View style={styles.boxModal}>
            <View style={styles.calendario}>
              <DateTimePicker
                 mode="single"
                 showOutsideDays={true}
                 navigationPosition="start"
                 monthsFormat="full"
                 date={selected}
                 onChange={({ date }) => alterarData(date)}
                 calendar="gregory"
                 maxDate={data}
                 locale="pt-br"
                 customNavigation={{
                   previous: <Icon name="chevron-left" size={20} color={color.primeira} />,
                   next: <Icon name="chevron-right" size={20} color={color.primeira} />,
                 }}
                  headerStyle={{
                    backgroundColor: color.primeira,
                  }}
                  headerTextStyle={{
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                  weekDayStyle={{
                    color: color.primeira,
                    fontWeight: 'bold',
                  }}
                  disabledTextStyle={{
          opacity: 0.3,
        }}
                 dayStyle={(date) => {
                    const hoje = new Date();
                    hoje.setHours(0, 0, 0, 0);
                    const comparada = new Date(date);
                    comparada.setHours(0, 0, 0, 0);
                    
                    const style = {};
                    
                    // Dias futuros com opacidade reduzida
                    if (comparada > hoje) {
                      style.opacity = 0.3;
                    }
                    
                    // Dia atual com borda especial
                    if (comparada.toDateString() === hoje.toDateString()) {
                      style.borderWidth = 1;
                      style.borderColor = color.primeira;
                    }
                    
                    return style;
                  }}
                 styles={{
                   selected: { backgroundColor: color.primeira, borderRadius: '50%' },
                   selected_label: { color: 'white' },
                 }}
              />
            </View>
            <View style={styles.viewBotaoCalendario}>
              <TouchableOpacity style={styles.botaoConcluirCalendario} onPress={() => exibirCalendario(false)}>
                <Text style={{color: color.branco, fontWeight: 'bold'}}>Concluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Etapa3;
