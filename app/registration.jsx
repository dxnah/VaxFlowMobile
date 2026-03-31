// app/registration.jsx

import { useRouter } from 'expo-router';
import React from 'react';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Registration from '../components/dashboard/Registration';
import { useUser } from '../context/UserContext';

export default function RegistrationPage() {
  const router = useRouter();
  const { darkMode } = useUser();
  const dark = darkMode;

  const headerBg = dark ? '#1a2e2c' : '#2BAF9E';

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: headerBg }]} edges={['top', 'left', 'right']}>
      <StatusBar translucent={false} backgroundColor={headerBg} barStyle="light-content" />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: headerBg }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Patient Registration</Text>
        <View style={{ width: 70 }} />
      </View>

      {/* Content */}
      <View style={{ flex: 1, backgroundColor: dark ? '#1a1f1e' : '#f4faf9' }}>
        <Registration />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  backText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  headerTitle: { color: '#fff', fontWeight: '800', fontSize: 16 },
});