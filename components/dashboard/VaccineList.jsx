// components/dashboard/VaccineList.jsx
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useUser } from '../../context/UserContext';
import styles from '../../styles/VaccineList';
import BASE_URL from '../../utils/api';

const STATUS_COLOR = {
  'In Stock':  '#4caf50',
  'Low Stock': '#ff9800',
  'Out Stock': '#f44336',
};

const VaccineCard = ({ name, status, available, dark }) => {
  const color = STATUS_COLOR[status] || '#2BAF9E';
  return (
    <View style={[styles.vaccineCard, { borderLeftColor: color, backgroundColor: dark ? '#242b2a' : '#fff' }]}>
      <View style={styles.vaccineInfo}>
        <Text style={[styles.vaccineName, { color: dark ? '#e8f0ef' : '#333', fontSize: 15 }]}>{name}</Text>
        <Text style={{ color: dark ? '#7aada8' : '#888', fontSize: 12, marginTop: 2 }}>
          Available: {available} — <Text style={{ color, fontWeight: '700' }}>{status}</Text>
        </Text>
      </View>
    </View>
  );
};

export default function VaccineList() {
  const { darkMode } = useUser();
  const dark = darkMode;
  const [vaccines, setVaccines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/vaccines/`)
      .then(res => res.json())
      .then(data => setVaccines(data))
      .catch(() => setVaccines([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator color="#2BAF9E" style={{ margin: 16 }} />;

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: dark ? '#e8f0ef' : '#333' }]}>
        💉 Vaccines Available at ABTC-CHO
      </Text>
      {vaccines.length === 0 ? (
        <Text style={{ color: dark ? '#7aada8' : '#666', textAlign: 'center', padding: 16 }}>No vaccines found.</Text>
      ) : (
        vaccines.map(v => (
          <VaccineCard key={v.id} name={v.name} status={v.status} available={v.available} dark={dark} />
        ))
      )}
    </View>
  );
}