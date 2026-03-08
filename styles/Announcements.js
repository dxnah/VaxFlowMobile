import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { marginBottom: 14 },
  title: { fontSize: 15, fontWeight: 'bold', marginBottom: 10 },
  card: { padding: 11, borderRadius: 8, marginBottom: 10, borderLeftWidth: 4, flexDirection: 'row', gap: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
  icon: { fontSize: 22, marginTop: 2 },
  content: { flex: 1 },
  cardTitle: { fontSize: 13, fontWeight: 'bold', marginBottom: 3 },
  cardText: { fontSize: 11, lineHeight: 16 },
});