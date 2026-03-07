import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
        <View 
          style={[
            styles.barFill, 
            { width: `${percent}%`, backgroundColor: getColor() }
          ]} 
        />
      </View>

      <Text style={styles.percent}>{percent}% Full</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 8,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  value: {
    fontSize: 13,
    color: '#999',
  },
  barBg: {
    width: '100%',
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 6,
  },
  barFill: {
    height: '100%',
    borderRadius: 5,
  },
  percent: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
  },
});