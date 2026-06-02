import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  darkContainer: { flex: 1, padding: 20, backgroundColor: '#121212' },
  
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15, textAlign: 'center', color: '#333' },
  darkTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 15, textAlign: 'center', color: '#fff' },
  
  totalText: { fontSize: 18, fontWeight: 'bold', color: '#d32f2f', marginBottom: 15, textAlign: 'center' },
  darkTotalText: { fontSize: 18, fontWeight: 'bold', color: '#ff6666', marginBottom: 15, textAlign: 'center' },
  
  input: { borderWidth: 1, borderColor: '#ccc', backgroundColor: '#fff', padding: 10, marginBottom: 15, borderRadius: 5, color: '#000' },
  darkInput: { borderWidth: 1, borderColor: '#444', backgroundColor: '#1e1e1e', padding: 10, marginBottom: 15, borderRadius: 5, color: '#fff' },
  
  currencyContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ccc', backgroundColor: '#fff', marginBottom: 15, borderRadius: 5, paddingHorizontal: 10 },
  darkCurrencyContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#444', backgroundColor: '#1e1e1e', marginBottom: 15, borderRadius: 5, paddingHorizontal: 10 },
  
  currencySymbol: { fontSize: 16, color: '#555', marginRight: 5, fontWeight: 'bold' },
  darkCurrencySymbol: { fontSize: 16, color: '#bbb', marginRight: 5, fontWeight: 'bold' },
  
  inputFlex: { flex: 1, paddingVertical: 10, color: '#000' },
  darkInputFlex: { flex: 1, paddingVertical: 10, color: '#fff' },
  
  button: { backgroundColor: '#6200ee', padding: 15, borderRadius: 5, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },
  secondaryButton: { backgroundColor: '#6200ee', padding: 10, borderRadius: 5, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', flex: 1 },
  
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16, marginLeft: 8 },
  
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#ddd' },
  darkCard: { backgroundColor: '#1e1e1e', padding: 15, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#444' },
  
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  darkCardTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  
  cardText: { fontSize: 14, color: '#555', marginTop: 2 },
  darkCardText: { fontSize: 14, color: '#bbb', marginTop: 2 },
  
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerButtons: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15, gap: 10 },
  actionButtons: { flexDirection: 'row', gap: 10, marginTop: 10, justifyContent: 'flex-end' },
  editButton: { backgroundColor: '#4CAF50', padding: 8, borderRadius: 5, flexDirection: 'row', alignItems: 'center' },
  deleteButton: { backgroundColor: '#ff5252', padding: 8, borderRadius: 5, flexDirection: 'row', alignItems: 'center' },
  actionText: { color: '#fff', fontSize: 12, marginLeft: 4, fontWeight: 'bold' },
  
  emptyText: { textAlign: 'center', marginTop: 20, color: '#000' },
  darkEmptyText: { textAlign: 'center', marginTop: 20, color: '#fff' },
  
  footerText: { textAlign: 'center', color: '#888', marginTop: 15, fontSize: 12, fontWeight: 'bold' }
});