// components/dashboard/VaccineList.jsx
import React from 'react';
import { Text, View } from 'react-native';
import { useUser } from '../../context/UserContext';
import styles from '../../styles/VaccineList';

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