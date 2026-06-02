import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { listarGastos, deletarGasto } from '../database/database';
import ExpenseItem from '../components/ExpenseItem';
import { styles } from '../styles/styles';

export default function HomeScreen({ navigation }) {
  const [gastos, setGastos] = useState([]);
  const [total, setTotal] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [ordenacao, setOrdenacao] = useState('recentes');

  useFocusEffect(
    useCallback(() => {
      carregarDados();
    }, [ordenacao])
  );

  async function carregarDados() {
    let dados = await listarGastos();

    dados.sort((a, b) => {
      if (ordenacao === 'maiorValor') {
        return b.valor - a.valor;
      } else {
        const dataA = a.data.split('/').reverse().join('');
        const dataB = b.data.split('/').reverse().join('');
        if (ordenacao === 'recentes') {
          return dataB.localeCompare(dataA);
        } else {
          return dataA.localeCompare(dataB);
        }
      }
    });

    setGastos(dados);
    const soma = dados.reduce((acc, atual) => acc + atual.valor, 0);
    setTotal(soma);
  }

  async function handleExcluir(id) {
    Alert.alert(
      "Confirmar Exclusão",
      "Deseja realmente excluir este gasto?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Excluir", 
          onPress: async () => {
            await deletarGasto(id);
            carregarDados();
          } 
        }
      ]
    );
  }

  function handleEditar(gasto) {
    navigation.navigate('AddExpense', { gasto: gasto, isDarkMode: isDarkMode });
  }

  function alternarOrdenacao() {
    if (ordenacao === 'recentes') setOrdenacao('antigos');
    else if (ordenacao === 'antigos') setOrdenacao('maiorValor');
    else setOrdenacao('recentes');
  }

  function getTextoOrdenacao() {
    if (ordenacao === 'recentes') return 'Mais Novos';
    if (ordenacao === 'antigos') return 'Mais Antigos';
    return 'Maior Valor';
  }

  return (
    <View style={isDarkMode ? styles.darkContainer : styles.container}>
      <Text style={isDarkMode ? styles.darkTotalText : styles.totalText}>
        Total Gasto: R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </Text>
      
      <View style={styles.headerButtons}>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => setIsDarkMode(!isDarkMode)}>
          <FontAwesome name={isDarkMode ? "sun-o" : "moon-o"} size={16} color="white" />
          <Text style={styles.buttonText}>{isDarkMode ? "Claro" : "Escuro"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={alternarOrdenacao}>
          <FontAwesome name="sort" size={16} color="white" />
          <Text style={styles.buttonText}>{getTextoOrdenacao()}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={[styles.button, { marginBottom: 15 }]} 
        onPress={() => navigation.navigate('AddExpense', { isDarkMode: isDarkMode })}
      >
        <FontAwesome name="plus-circle" size={20} color="white" />
        <Text style={styles.buttonText}>Adicionar Novo Gasto</Text>
      </TouchableOpacity>

      <FlatList
        data={gastos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ExpenseItem 
            data={item} 
            onDelete={handleExcluir} 
            onEdit={handleEditar} 
            isDarkMode={isDarkMode}
          />
        )}
        ListEmptyComponent={<Text style={isDarkMode ? styles.darkEmptyText : styles.emptyText}>Nenhum gasto cadastrado.</Text>}
      />

      <Text style={styles.footerText}>
        Desenvolvido por Vitor Luiz Soares da Silva
      </Text>
    </View>
  );
}