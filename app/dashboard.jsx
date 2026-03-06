// dashboard.jsx

import React from 'react';
import {
  View, Text, ScrollView,
  TouchableOpacity, SafeAreaView
} from 'react-native';
import { useRouter } from 'expo-router';
import VaccineCard from '../components/VaccineCard';
import styles from '../styles/dashboard';
import { vaccineData, announcements } from '../data/mockData';

export default function DashboardScreen() {
  const router = useRouter();

  const totalAvailable = vaccineData.reduce((sum, v) => sum + v.available, 0);
  const lowStock       = vaccineData.filter(v => v.status === 'Low Stock').length;
  const outOfStock     = vaccineData.filter(v => v.status === 'Out Stock').length;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>👋 Hello, Patient</Text>
            <Text style={styles.subtitle}>VaxFlow Vaccine Status</Text>
          </View>
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={() => router.push('/login')}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { borderTopColor: '#26a69a' }]}>
            <Text style={styles.statNumber}>{totalAvailable}</Text>
            <Text style={styles.statLabel}>Total Available</Text>
          </View>
          <View style={[styles.statCard, { borderTopColor: '#f57f17' }]}>
            <Text style={[styles.statNumber, { color: '#f57f17' }]}>{lowStock}</Text>
            <Text style={styles.statLabel}>Low Stock</Text>
          </View>
          <View style={[styles.statCard, { borderTopColor: '#c62828' }]}>
            <Text style={[styles.statNumber, { color: '#c62828' }]}>{outOfStock}</Text>
            <Text style={styles.statLabel}>Out of Stock</Text>
          </View>
        </View>

        {/* Vaccine List */}
        <Text style={styles.sectionTitle}>💉 Vaccine Availability</Text>
        {vaccineData.map(v => (
          <VaccineCard
            key={v.id}
            name={v.vaccine}
            available={v.available}
            status={v.status}
          />
        ))}

        {/* Announcements */}
        <Text style={styles.sectionTitle}>📢 Announcements</Text>
        {announcements.map(a => (
          <View key={a.id} style={styles.announcementCard}>
            <Text style={styles.announcementTitle}>{a.title}</Text>
            <Text style={styles.announcementMessage}>{a.message}</Text>
          </View>
        ))}

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}