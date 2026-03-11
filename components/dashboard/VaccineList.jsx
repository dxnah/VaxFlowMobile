// components/dashboard/VaccineList.jsx
import React from 'react';
import { Text, View } from 'react-native';
import { useUser } from '../../context/UserContext';
import styles from '../../styles/VaccineList';

const VaccineCard = ({ name, dark }) => (
  <View style={[styles.vaccineCard, { borderLeftColor: '#00897b', backgroundColor: dark ? '#242b2a' : '#fff' }]}>
    <View style={styles.vaccineInfo}>
      <Text style={[styles.vaccineName, { color: dark ? '#e8f0ef' : '#333', fontSize: 15 }]}>{name}</Text>
    </View>
  </View>
);

export default function VaccineList() {
  const { darkMode } = useUser();
  const dark = darkMode;

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: dark ? '#e8f0ef' : '#333' }]}>
        💉 Vaccines Available at ABTC-CHO
      </Text>

      <VaccineCard name="Anti-Rabies Vaccine (ARV)" dark={dark} />
      <VaccineCard name="ARV Booster Shot" dark={dark} />
    </View>
  );
}