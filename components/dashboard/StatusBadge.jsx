import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function StatusBadge({ isPeakSeason }) {
  return (
    <View 
      style={[
        styles.badge,
        isPeakSeason ? styles.peak : styles.normal,
      ]}
    >
      <Text style={styles.text}>
        {isPeakSeason ? '🔥 PEAK SEASON (High Volume)' : '📅 Normal Operations'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 14,
    borderWidth: 1,
  },
  peak: {
    backgroundColor: '#ffebee',
    borderColor: '#ff9800',
  },
  normal: {
    backgroundColor: '#e3f2fd',
    borderColor: '#2196f3',
  },
  text: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
});