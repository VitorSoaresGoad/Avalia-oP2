import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { adicionarGasto, atualizarGasto } from '../database/database';
import { styles } from '../styles/styles';

export default function AddExpenseScreen({ route, navigation }) {
  const gastoParaEditar = route.params?.gasto || null;

  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState('');

  useEffect(() => {
    if (gastoParaEditar) {
      setDescricao(gastoParaEditar.descricao);
      setCategoria(gastoParaEditar.categoria);
      setValor(gastoParaEditar.valor.toString());
      setData(gastoParaEditar.data);
      navigation.setOptions({ title: 'Editar Gasto' });
    }
  }, [gastoParaEditar, navigation]);

  function handleDataChange(texto) {
    let t = texto.replace(/\D/g, '');
    if (t.length > 8) t = t.substring(0, 8);
    
    if (t.length > 4) {
      t = t.replace(/^(\d{2})(\d{2})(\d{1,4})/, '$1/$2/$3');
    } else if (t.length > 2) {
      t = t.replace(/^(\d{2})(\d{1,2})/, '$1/$2');
    }
    setData(t);
  }

  async function handleSalvar() {
    if (!descricao || !categoria || !valor || !data) {
      Alert.alert('Erro', 'Todos os campos devem ser preenchidos.');
      return;
    }

    const dataLimpa = data.trim();
    const regexData = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/;
    
    if (!regexData.test(dataLimpa)) {
      Alert.alert('Erro', 'Formato de data inválido. Use DD/MM/AAAA.');
      return;
    }

    const valorNumerico = parseFloat(valor.replace(',', '.'));
    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      Alert.alert('Erro', 'O valor deve ser um número maior que zero.');
      return;
    }

    if (gastoParaEditar) {
      await atualizarGasto(gastoParaEditar.id, descricao, categoria, valorNumerico, dataLimpa);
    } else {
      await adicionarGasto(descricao, categoria, valorNumerico, dataLimpa);
    }
    
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{gastoParaEditar ? 'Editar Gasto' : 'Novo Gasto'}</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Descrição do gasto"
        value={descricao}
        onChangeText={setDescricao}
      />
      <TextInput
        style={styles.input}
        placeholder="Categoria (ex: Alimentação)"
        value={categoria}
        onChangeText={setCategoria}
      />
      
      <View style={styles.currencyContainer}>
        <Text style={styles.currencySymbol}>R$</Text>
        <TextInput
          style={styles.inputFlex}
          placeholder="50.00"
          keyboardType="numeric"
          value={valor}
          onChangeText={setValor}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Data (ex: 15/10/2023)"
        keyboardType="numeric"
        value={data}
        onChangeText={handleDataChange}
        maxLength={10}
      />

      <TouchableOpacity style={styles.button} onPress={handleSalvar}>
        <FontAwesome name="save" size={20} color="white" />
        <Text style={styles.buttonText}>{gastoParaEditar ? 'Atualizar Gasto' : 'Salvar Gasto'}</Text>
      </TouchableOpacity>
    </View>
  );
}