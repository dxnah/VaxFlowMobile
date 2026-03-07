import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ReminderCard = ({ icon, title, text, borderColor }) => (
  <View style={[styles.card, { borderLeftColor: borderColor }]}>
    <Text style={styles.icon}>{icon}</Text>
    <View style={styles.content}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardText}>{text}</Text>
    </View>
  </View>
);

export default function Reminders() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>✓ What to Bring</Text>

      <ReminderCard
        icon="✏️"
        title="For 1st Dose"
        text="Please bring a pen for registration purposes."
        borderColor="#2196f3"
      />

      <ReminderCard
        icon="📋"
        title="For 2nd and 3rd Dose"
        text="Please bring your vaccination card with you."
        borderColor="#4caf50"
      />

      <View style={styles.proTipSection}>
        <ReminderCard
          icon="💡"
          title="Pro Tip"
          text="Bring a foldable chair, water, and snacks. Arrive early, especially for your first dose."
          borderColor="#fbc02d"
        />
      </View>

      <View style={styles.districtTipSection}>
        <ReminderCard
          icon="📍"
          title="For Patients in District 2, CDO"
          text="It is advisable to arrive at the center as early as 4:00 AM - 5:00 AM to ensure you will be served once operations begin."
          borderColor="#ff9800"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    marginBottom: 14 
  },
  title: { 
    fontSize: 15, 
    fontWeight: 'bold', 
    marginBottom: 10 
  },
  card: { 
    backgroundColor: '#fff', 
    padding: 11, 
    borderRadius: 8, 
    marginBottom: 8, 
    borderLeftWidth: 4, 
    flexDirection: 'row', 
    gap: 10, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 1 }, 
    shadowOpacity: 0.05, 
    shadowRadius: 2, 
    elevation: 1 
  },
  proTipSection: { 
    marginTop: 6 
  },
  districtTipSection: { 
    marginTop: 12 
  },
  icon: { 
    fontSize: 22, 
    marginTop: 2 
  },
  content: { 
    flex: 1 
  },
  cardTitle: { 
    fontSize: 13, 
    fontWeight: 'bold', 
    color: '#333', 
    marginBottom: 3 
  },
  cardText: { 
    fontSize: 11, 
    color: '#666', 
    lineHeight: 16 
  },
});