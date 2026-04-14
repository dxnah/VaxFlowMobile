// components/dashboard/Announcements.jsx
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useUser } from '../../context/UserContext';
import styles from '../../styles/Announcements';
import BASE_URL from '../../utils/api';

const AnnouncementCard = ({ icon, title, text, bg, bgDark, borderColor, dark }) => (
  <View style={[styles.card, { backgroundColor: dark ? bgDark : bg, borderLeftColor: borderColor }]}>
    <Text style={styles.icon}>{icon}</Text>
    <View style={styles.content}>
      <Text style={[styles.cardTitle, { color: dark ? '#e8f0ef' : '#333' }]}>{title}</Text>
      <Text style={[styles.cardText, { color: dark ? '#7aada8' : '#666' }]}>{text}</Text>
    </View>
  </View>
);

const COLORS = [
  { bg: '#fff3cd', bgDark: '#2a2010', border: '#ff9800', icon: '🔥' },
  { bg: '#e3f2fd', bgDark: '#0d1e2d', border: '#2196f3', icon: '📦' },
  { bg: '#e8f5e9', bgDark: '#1a3320', border: '#4caf50', icon: '📋' },
  { bg: '#fce4ec', bgDark: '#2d1a1a', border: '#e91e63', icon: '📢' },
];

export default function Announcements() {
  const { darkMode } = useUser();
  const dark = darkMode;
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/announcements/`)
      .then(res => res.json())
      .then(data => setAnnouncements(data))
      .catch(() => setAnnouncements([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator color="#2BAF9E" style={{ margin: 16 }} />;

  return (
    <View style={styles.container}>

      {announcements.length === 0 ? (
        <Text style={{ color: dark ? '#7aada8' : '#666', textAlign: 'center', padding: 16 }}>No announcements at this time.</Text>
      ) : (
        announcements.map((item, index) => {
          const color = COLORS[index % COLORS.length];
          return (
            <AnnouncementCard
              key={item.id}
              icon={color.icon}
              title={item.title}
              text={item.message}
              bg={color.bg}
              bgDark={color.bgDark}
              borderColor={color.border}
              dark={dark}
            />
          );
        })
      )}
    </View>
  );
}