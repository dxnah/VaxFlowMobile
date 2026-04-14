import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { marginBottom: 20 },
  title: { fontSize: 15, fontWeight: 'bold', marginBottom: 10 },
  infoBox: { backgroundColor: '#f5f5f5', borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12 },
  desc: { fontSize: 12, color: '#555', marginBottom: 10, lineHeight: 18 },
  scheduleList: { marginVertical: 10 },
  item: { fontSize: 12, color: '#333', marginBottom: 6, lineHeight: 18 },
  bold: { fontWeight: 'bold' },
  important: { fontSize: 11, color: '#666', fontStyle: 'italic', marginTop: 10, lineHeight: 16 },
  itemRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6, flexWrap: 'wrap' },
  completedText: { color: '#2BAF9E', textDecorationLine: 'line-through' },
  doneBadge: { color: '#2BAF9E', fontWeight: '600', fontSize: 12 },
  pendingBadge: { color: '#f59e0b', fontWeight: '600', fontSize: 12 },
  errorText: { color: 'red', fontSize: 13 },
});