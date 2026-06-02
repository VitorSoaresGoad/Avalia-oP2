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

  useFocusEffect(
    useCallback(() => {
      carregarDados();
    }, [])
  );

  async function carregarDados() {
    const dados = await listarGastos();
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
    navigation.navigate('AddExpense', { gasto: gasto });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.totalText}>
        Total Gasto: R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </Text>
      
      <TouchableOpacity 
        style={[styles.button, { marginBottom: 15 }]} 
        onPress={() => navigation.navigate('AddExpense')}
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
          />
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhum gasto cadastrado.</Text>}
      />
      
      <Text style={{ textAlign: 'center', color: '#888', marginTop: 15, fontSize: 12, fontWeight: 'bold' }}>
       Vitor Luiz Soares da Silva
      </Text>
    </View>
  );
}