// components/dashboard/Reminders.jsx
import React from 'react';
import { Text, View } from 'react-native';
import { useUser } from '../../context/UserContext';
import styles from '../../styles/Reminders';

const ReminderCard = ({ icon, title, text, borderColor, dark }) => (
  <View style={[styles.card, { borderLeftColor: borderColor, backgroundColor: dark ? '#242b2a' : '#fff' }]}>
    <Text style={styles.icon}>{icon}</Text>
    <View style={styles.content}>
      <Text style={[styles.cardTitle, { color: dark ? '#e8f0ef' : '#333' }]}>{title}</Text>
      <Text style={[styles.cardText, { color: dark ? '#7aada8' : '#666' }]}>{text}</Text>
    </View>
  </View>
);

export default function Reminders() {
  const { darkMode } = useUser();
  const dark = darkMode;

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: dark ? '#e8f0ef' : '#333' }]}>✓ What to Bring</Text>

      <ReminderCard icon="✏️" title="For 1st Dose" text="Please bring a pen for registration purposes." borderColor="#2196f3" dark={dark} />
      <ReminderCard icon="📋" title="For 2nd and 3rd Dose" text="Please bring your vaccination card with you." borderColor="#4caf50" dark={dark} />
      <View style={styles.proTipSection}>
        <ReminderCard icon="💡" title="Pro Tip" text="Bring a foldable chair, water, and snacks. Arrive early, especially for your first dose." borderColor="#fbc02d" dark={dark} />
      </View>
      <View style={styles.districtTipSection}>
        <ReminderCard icon="📍" title="For Patients in District 2, CDO" text="It is advisable to arrive at the center as early as 4:00 AM - 5:00 AM to ensure you will be served once operations begin." borderColor="#ff9800" dark={dark} />
      </View>
    </View>
  );
}