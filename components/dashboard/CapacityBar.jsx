// components/dashboard/CapacityBar.jsx
import React from 'react';
import { Text, View } from 'react-native';
import styles from '../../styles/CapacityBar';

export default function CapacityBar({ count, capacity }) {
  const percent = Math.round((count / capacity) * 100);

  const getColor = () => {
    if (percent > 80) return '#f44336';
    if (percent > 50) return '#ff9800';
    return '#4caf50';
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>Daily Capacity</Text>
        <Text style={styles.value}>{count} / {capacity}</Text>
      </View>

      <View style={styles.barBg}>
        <View style={[styles.barFill, { width: `${percent}%`, backgroundColor: getColor() }]} />
      </View>

      <Text style={styles.percent}>{percent}% Full</Text>
    </View>
  );
}