// components/dashboard/VaccineList.jsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useUser } from '../../context/UserContext';

const VaccineCard = ({ name, doses, status, color, restock, dark }) => (
  <View style={[styles.vaccineCard, { borderLeftColor: color, backgroundColor: dark ? '#242b2a' : '#fff' }]}>
    <View style={styles.vaccineInfo}>
      <Text style={[styles.vaccineName, { color: dark ? '#e8f0ef' : '#333' }]}>{name}</Text>
      <Text style={[styles.vaccineDetails, { color: dark ? '#7aada8' : '#999' }]}>{doses} doses available</Text>
      {restock && <Text style={styles.restockText}>📦 Restock in: {restock}</Text>}
    </View>
    <View style={[styles.badge, { borderColor: color }]}>
      <Text style={[styles.badgeText, { color }]}>{status}</Text>
    </View>
  </View>
);

export default function VaccineList() {
  const { darkMode } = useUser();
  const dark = darkMode;

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: dark ? '#e8f0ef' : '#333' }]}>🏥 Other Vaccines Available</Text>

      <Text style={[styles.category, { color: dark ? '#7aada8' : '#999' }]}>✓ IN STOCK</Text>
      <VaccineCard name="BCG" doses={150} status="In Stock" color="#00897b" dark={dark} />
      <VaccineCard name="DPT" doses={200} status="In Stock" color="#00897b" dark={dark} />

      <Text style={[styles.category, { color: dark ? '#7aada8' : '#999' }]}>⚠ LOW STOCK</Text>
      <VaccineCard name="Hepatitis B" doses={40} status="Low Stock" color="#ff9800" dark={dark} />
      <VaccineCard name="MMR" doses={25} status="Low Stock" color="#ff9800" dark={dark} />

      <Text style={[styles.category, { color: dark ? '#7aada8' : '#999' }]}>✗ UNAVAILABLE</Text>
      <VaccineCard name="Polio (OPV)" doses={0} status="Out Stock" color="#f44336" restock="7 days" dark={dark} />
      <VaccineCard name="Varicella" doses={0} status="Out Stock" color="#f44336" restock="7 days" dark={dark} />
    </View>
  );
}

const styles = StyleSheet.create({
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