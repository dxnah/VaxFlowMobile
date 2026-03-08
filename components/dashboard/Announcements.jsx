// components/dashboard/Announcements.jsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useUser } from '../../context/UserContext';

const AnnouncementCard = ({ icon, title, text, bg, bgDark, borderColor, showAlert, dark }) => {
  if (!showAlert && borderColor === '#f44336') return null;
  return (
    <View style={[styles.card, { backgroundColor: dark ? bgDark : bg, borderLeftColor: borderColor }]}>
      <Text style={styles.icon}>{icon}</Text>
      <View style={styles.content}>
        <Text style={[styles.cardTitle, { color: dark ? '#e8f0ef' : '#333' }]}>{title}</Text>
        <Text style={[styles.cardText, { color: dark ? '#7aada8' : '#666' }]}>{text}</Text>
      </View>
    </View>
  );
};

export default function Announcements({ isPeakSeason, capacityPercentage }) {
  const { darkMode } = useUser();
  const dark = darkMode;

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: dark ? '#e8f0ef' : '#333' }]}>📢 Announcements</Text>

      <AnnouncementCard
        icon="🔥" title="Peak Season (June - August)"
        text="Expected volume exceeds 160/day. Schedule early to avoid long waits."
        bg="#fff3cd" bgDark="#2a2010" borderColor="#ff9800" showAlert={true} dark={dark}
      />
      <AnnouncementCard
        icon="📦" title="New Stock Arriving"
        text="Polio (OPV) and Varicella expected within 7 days."
        bg="#e3f2fd" bgDark="#0d1e2d" borderColor="#2196f3" showAlert={true} dark={dark}
      />
      <AnnouncementCard
        icon="⚠️" title="High Volume Alert"
        text="Currently experiencing high volume. Consider off-peak hours."
        bg="#ffebee" bgDark="#2d1a1a" borderColor="#f44336"
        showAlert={capacityPercentage > 80} dark={dark}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 14 },
  title: { fontSize: 15, fontWeight: 'bold', marginBottom: 10 },
  card: { padding: 11, borderRadius: 8, marginBottom: 10, borderLeftWidth: 4, flexDirection: 'row', gap: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
  icon: { fontSize: 22, marginTop: 2 },
  content: { flex: 1 },
  cardTitle: { fontSize: 13, fontWeight: 'bold', marginBottom: 3 },
  cardText: { fontSize: 11, lineHeight: 16 },
});