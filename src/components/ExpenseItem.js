import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { styles } from '../styles/styles';

export default function ExpenseItem({ data, onDelete, onEdit }) {
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.cardTitle}>{data.descricao}</Text>
        <Text style={styles.cardText}>Categoria: {data.categoria}</Text>
        <Text style={styles.cardText}>Data: {data.data}</Text>
        <Text style={styles.cardText}>
          Valor: R$ {data.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </Text>
      </View>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.editButton} onPress={() => onEdit(data)}>
          <FontAwesome name="edit" size={14} color="white" />
          <Text style={styles.actionText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(data.id)}>
          <FontAwesome name="trash" size={14} color="white" />
          <Text style={styles.actionText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}