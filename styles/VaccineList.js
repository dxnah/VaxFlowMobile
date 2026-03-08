import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { marginBottom: 14 },
  title: { fontSize: 15, fontWeight: 'bold', marginBottom: 10 },
  category: { fontSize: 11, fontWeight: '600', textTransform: 'uppercase', marginBottom: 6, marginTop: 8 },
  vaccineCard: { padding: 11, borderRadius: 8, marginBottom: 6, borderLeftWidth: 4, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
  vaccineInfo: { flex: 1 },
  vaccineName: { fontSize: 13, fontWeight: 'bold' },
  vaccineDetails: { fontSize: 11, marginTop: 2 },
  restockText: { fontSize: 10, color: '#f44336', fontWeight: '600', marginTop: 3 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, borderWidth: 1, marginLeft: 8 },
  badgeText: { fontSize: 11, fontWeight: 'bold' },
});