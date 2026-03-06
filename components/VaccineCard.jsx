// components/VaccineCard.jsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StatusBadge from './StatusBadge';

export default function VaccineCard({ name, available, status }) {
  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.available}>{available.toLocaleString()} doses available</Text>
      </View>
      <StatusBadge status={status} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white', borderRadius: 12, padding: 16,
    marginBottom: 10, flexDirection: 'row',
    alignItems: 'center', justifyContent: 'space-between',
    shadowColor: '#000', shadowOpacity: 0.07, shadowRadius: 6, elevation: 2,
  },
  left: { flex: 1 },
  name: { fontSize: 14, fontWeight: '700', color: '#333' },
  available: { fontSize: 12, color: '#888', marginTop: 2 },
});