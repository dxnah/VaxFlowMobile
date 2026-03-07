// components/VaccineCard.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StatusBadge from './StatusBadge';

export default function VaccineCard({ name, available, status, darkMode }) {
  return (
    <View style={[styles.card, darkMode && styles.cardDark]}>
      <View style={styles.left}>
        <Text style={[styles.name, darkMode && styles.nameDark]}>{name}</Text>
        <Text style={[styles.available, darkMode && styles.availableDark]}>
          {available.toLocaleString()} doses available
        </Text>
      </View>
      <StatusBadge status={status} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12, padding: 16,
    marginBottom: 10, marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center', justifyContent: 'space-between',
    shadowColor: '#000', shadowOpacity: 0.07, shadowRadius: 6, elevation: 2,
  },
  cardDark: {
    backgroundColor: '#242b2a',
    shadowOpacity: 0,
    elevation: 0,
  },
  left: { flex: 1 },
  name: { fontSize: 14, fontWeight: '700', color: '#333' },
  nameDark: { color: '#e8f0ef' },
  available: { fontSize: 12, color: '#888', marginTop: 2 },
  availableDark: { color: '#7aada8' },
});