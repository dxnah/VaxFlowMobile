// components/dashboard/StatusBadge.jsx
import React from 'react';
import { Text, View } from 'react-native';
import styles from '../../styles/StatusBadge';

export default function StatusBadge({ isPeakSeason }) {
  return (
    <View style={[styles.badge, isPeakSeason ? styles.peak : styles.normal]}>
      <Text style={styles.text}>
        {isPeakSeason ? '🔥 PEAK SEASON (High Volume)' : '📅 Normal Operations'}
      </Text>
    </View>
  );
}