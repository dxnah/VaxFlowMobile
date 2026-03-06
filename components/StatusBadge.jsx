// components/StatusBadge.jsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StatusBadge({ status }) {
  const getStyle = () => {
    if (status === 'In Stock')  return { bg: '#e0f2f1', color: '#00796b', border: '#00796b' };
    if (status === 'Low Stock') return { bg: '#fff3e0', color: '#e65100', border: '#e65100' };
    return                             { bg: '#ffebee', color: '#c62828', border: '#c62828' };
  };

  const s = getStyle();

  return (
    <View style={[styles.badge, { backgroundColor: s.bg, borderColor: s.border }]}>
      <Text style={[styles.text, { color: s.color }]}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12, paddingVertical: 5,
    borderRadius: 20, borderWidth: 1.5,
  },
  text: { fontSize: 11, fontWeight: '700' },
});