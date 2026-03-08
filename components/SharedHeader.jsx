// components/SharedHeader.jsx

import React, { useState } from 'react';
import {
  View, Text, Image, TouchableOpacity,
  Modal, Dimensions, StyleSheet, StatusBar
} from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from '../context/UserContext';

export default function SharedHeader({ title, subtitle, headerBg = '#ffffff' }) {
  const router = useRouter();
  const { username, darkMode, avatarUri } = useUser();
  const dark = darkMode;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const C = {
    bg:       headerBg ?? (dark ? '#242b2a' : '#ffffff'),
    text:     dark ? '#e8f0ef' : '#333333',
    sub:      dark ? '#7aada8' : '#999999',
    border:   dark ? '#2e3837' : '#e0e0e0',
    sidebar:  '#26a69a',
  };

  const handleLogout = () => {
    setSidebarOpen(false);
    router.replace('/login');
  };

  return (
    <>
      {/* Sidebar Modal */}
      <Modal visible={sidebarOpen} transparent animationType="fade">
        <View style={styles.sidebarContainer}>
          <View style={[styles.sidebar, { backgroundColor: C.sidebar }]}>

            {/* Profile */}
            <View style={styles.sidebarProfile}>
              {avatarUri ? (
                <Image source={{ uri: avatarUri }} style={styles.sidebarAvatar} />
              ) : (
                <View style={styles.sidebarAvatarPlaceholder}>
                  <Text style={styles.sidebarAvatarLetter}>{username.charAt(0).toUpperCase()}</Text>
                </View>
              )}
              <Text style={styles.sidebarUsername}>{username}</Text>
            </View>

            <View style={styles.sidebarDivider} />

            <TouchableOpacity style={styles.sidebarItem} onPress={() => { setSidebarOpen(false); router.push('/dashboard'); }}>
              <Text style={styles.sidebarItemText}>📊 Dashboard</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sidebarItem} onPress={() => { setSidebarOpen(false); router.push('/schedule'); }}>
              <Text style={styles.sidebarItemText}>📅 Patient Schedule</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sidebarItem} onPress={() => { setSidebarOpen(false); router.push('/information'); }}>
              <Text style={styles.sidebarItemText}>💊 Vaccine Information</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sidebarItem} onPress={() => { setSidebarOpen(false); router.push('/history'); }}>
              <Text style={styles.sidebarItemText}>📋 Vaccination History</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sidebarItem} onPress={() => { setSidebarOpen(false); router.push('/settings'); }}>
              <Text style={styles.sidebarItemText}>⚙️ Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.sidebarItem, styles.logoutItem]} onPress={handleLogout}>
              <Text style={styles.logoutItemText}>🚪 Logout</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.sidebarOverlay} activeOpacity={1} onPress={() => setSidebarOpen(false)} />
        </View>
      </Modal>

      {/* Transparent status bar */}
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true} />

      {/* Header Bar */}
      <View style={[styles.header, { backgroundColor: C.bg, borderBottomColor: C.border }]}>
        <TouchableOpacity onPress={() => setSidebarOpen(true)}>
          <Text style={[styles.menuButton, { color: C.text }]}>☰</Text>
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, { color: C.text }]} numberOfLines={1}>{title}</Text>
          {subtitle && <Text style={[styles.headerSubtitle, { color: C.sub }]} numberOfLines={1}>{subtitle}</Text>}
        </View>

        <TouchableOpacity onPress={() => router.push('/settings')} activeOpacity={0.8}>
          <View style={styles.avatarContainer}>
            {avatarUri ? (
              <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatarFallback}>
                <Text style={styles.avatarLetter}>{username.charAt(0).toUpperCase()}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}

const AVATAR_SIZE = 36;

const styles = StyleSheet.create({
  sidebarContainer: { flex: 1, flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.5)' },
  sidebar: { width: Dimensions.get('window').width * 0.75, paddingTop: 50, paddingHorizontal: 16, height: '100%' },
  sidebarOverlay: { flex: 1 },
  sidebarProfile: { alignItems: 'center', paddingBottom: 16 },
  sidebarAvatar: { width: 64, height: 64, borderRadius: 32, borderWidth: 2, borderColor: '#ffffff50', marginBottom: 8 },
  sidebarAvatarPlaceholder: { width: 64, height: 64, borderRadius: 32, backgroundColor: 'rgba(255,255,255,0.2)', borderWidth: 2, borderColor: '#ffffff50', justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  sidebarAvatarLetter: { fontSize: 26, color: '#fff', fontWeight: '700' },
  sidebarUsername: { fontSize: 16, fontWeight: '700', color: '#fff' },
  sidebarDivider: { height: 1, backgroundColor: '#ffffff20', marginBottom: 16 },
  sidebarItem: { paddingVertical: 14, paddingHorizontal: 12, marginBottom: 8, borderRadius: 8, backgroundColor: '#ffffff10' },
  sidebarItemText: { fontSize: 14, color: '#fff', fontWeight: '500' },
  logoutItem: { marginTop: 20, backgroundColor: '#ff6b6b' },
  logoutItemText: { fontSize: 14, color: '#fff', fontWeight: '600' },

  header: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuButton: { fontSize: 28, fontWeight: 'bold' },
  headerCenter: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
  headerSubtitle: { fontSize: 12, marginTop: 3, textAlign: 'center' },

  avatarContainer: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: 2,
    borderColor: '#1b7b6b',
    overflow: 'hidden',
  },
  avatarImage: { width: '100%', height: '100%' },
  avatarFallback: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E8F7F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarLetter: { fontSize: 16, color: '#1b7b6b', fontWeight: '700' },
});