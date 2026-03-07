// app/dashboard.jsx
import React from 'react';
import {
  View, Text, ScrollView,
  TouchableOpacity, StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import VaccineCard from '../components/VaccineCard';
import { vaccineData, announcements } from '../data/mockData';
import { useUser } from '../context/UserContext';

export default function DashboardScreen() {
  const router = useRouter();
  const { username, darkMode } = useUser();
  const dark = darkMode;

  const C = {
    bg:        dark ? '#1a1f1e' : '#EEF7F6',
    card:      dark ? '#242b2a' : '#ffffff',
    text:      dark ? '#e8f0ef' : '#1a2e2c',
    sub:       dark ? '#7aada8' : '#6ba8a1',
    teal:      '#2BAF9E',
    tealLight: dark ? '#1e3330' : '#E8F7F5',
    orange:    '#f57f17',
    red:       '#c62828',
  };

  const totalAvailable = vaccineData.reduce((sum, v) => sum + v.available, 0);
  const lowStock       = vaccineData.filter(v => v.status === 'Low Stock').length;
  const outOfStock     = vaccineData.filter(v => v.status === 'Out Stock').length;

  return (
    <>
      <StatusBar
        backgroundColor={dark ? '#1a1f1e' : '#EEF7F6'}
        barStyle={dark ? 'light-content' : 'dark-content'}
        translucent={false}
      />
      {/* edges={['top']} ensures consistent safe area on all Android devices */}
      <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }} edges={['top', 'left', 'right']}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>

          {/* Header */}
          <View style={{
            flexDirection: 'row', alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            paddingTop: 12,
            paddingBottom: 16,
            backgroundColor: C.bg,
          }}>
            <View>
              <Text style={{ fontSize: 20, fontWeight: '700', color: C.text }}>
                👋 Hello, {username}
              </Text>
              <Text style={{ fontSize: 13, color: C.sub, marginTop: 2 }}>
                VaxFlow Vaccine Status
              </Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: C.tealLight,
                  borderRadius: 10, width: 36, height: 36,
                  justifyContent: 'center', alignItems: 'center',
                }}
                onPress={() => router.push('/settings')}
                activeOpacity={0.7}
              >
                <Ionicons name="settings-outline" size={20} color={dark ? '#e8f0ef' : C.teal} />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: dark ? '#3a1a1a' : '#fde8e8',
                  borderRadius: 10, paddingHorizontal: 14, paddingVertical: 8,
                }}
                onPress={() => router.push('/login')}
                activeOpacity={0.85}
              >
                <Text style={{ color: C.red, fontWeight: '700', fontSize: 14 }}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Stats Row */}
          <View style={{ flexDirection: 'row', paddingHorizontal: 16, gap: 10, marginBottom: 8 }}>
            {[
              { value: totalAvailable, label: 'Total Available', color: C.teal },
              { value: lowStock,       label: 'Low Stock',       color: C.orange },
              { value: outOfStock,     label: 'Out of Stock',    color: C.red },
            ].map(({ value, label, color }, i) => (
              <View key={i} style={{
                flex: 1, backgroundColor: C.card,
                borderRadius: 14, padding: 12,
                borderTopWidth: 3, borderTopColor: color,
                shadowColor: color, shadowOpacity: dark ? 0 : 0.08,
                shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: dark ? 0 : 2,
              }}>
                <Text style={{ fontSize: 24, fontWeight: '800', color }}>{value}</Text>
                <Text style={{ fontSize: 11, color: C.sub, marginTop: 2 }}>{label}</Text>
              </View>
            ))}
          </View>

          {/* Vaccine List */}
          <Text style={{ fontSize: 16, fontWeight: '700', color: C.text, paddingHorizontal: 16, marginTop: 8, marginBottom: 8 }}>
            💉 Vaccine Availability
          </Text>
          {vaccineData.map(v => (
            <VaccineCard
              key={v.id}
              name={v.vaccine}
              available={v.available}
              status={v.status}
              darkMode={dark}
            />
          ))}

          {/* Announcements */}
          <Text style={{ fontSize: 16, fontWeight: '700', color: C.text, paddingHorizontal: 16, marginTop: 16, marginBottom: 8 }}>
            📢 Announcements
          </Text>
          {announcements.map(a => (
            <View key={a.id} style={{
              backgroundColor: C.card,
              marginHorizontal: 16, marginBottom: 10,
              borderRadius: 14, padding: 16,
              borderLeftWidth: 4, borderLeftColor: C.teal,
              shadowColor: '#000', shadowOpacity: dark ? 0 : 0.04,
              shadowRadius: 4, elevation: dark ? 0 : 1,
            }}>
              <Text style={{ fontSize: 14, fontWeight: '700', color: C.text, marginBottom: 4 }}>
                {a.title}
              </Text>
              <Text style={{ fontSize: 13, color: C.sub, lineHeight: 18 }}>
                {a.message}
              </Text>
            </View>
          ))}

          <View style={{ height: 32 }} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}