// components/SharedHeader.jsx
// Reusable header + sidebar for all pages
import React, { useState } from 'react';
import {
  View, Text, Image, TouchableOpacity,
  Modal, Dimensions, StyleSheet, Platform, StatusBar
} from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from '../context/UserContext';

export default function SharedHeader({ title, subtitle }) {
  const router = useRouter();
  const { username, darkMode, avatarUri } = useUser();
  const dark = darkMode;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const C = {
    topBar:   dark ? '#1a2e2c' : '#2BAF9E',
    topText:  '#ffffff',
    topSub:   'rgba(255,255,255,0.75)',
    topBtn:   dark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.2)',
    sidebar:  '#1b7b6b',
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
            <TouchableOpacity style={styles.sidebarItem} onPress={() => { setSidebarOpen(false); router.push('/dashboard/schedule'); }}>
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

      {/* Top Bar */}
      <View style={[styles.topBar, { backgroundColor: C.topBar }]}>
        <TouchableOpacity onPress={() => setSidebarOpen(true)} style={[styles.menuBtn, { backgroundColor: C.topBtn }]} activeOpacity={0.7}>
          <Text style={{ color: C.topText, fontSize: 18, fontWeight: '700' }}>☰</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={[styles.topTitle, { color: C.topText }]}>{title}</Text>
          {subtitle ? <Text style={[styles.topSub, { color: C.topSub }]}>{subtitle}</Text> : null}
        </View>
        <TouchableOpacity onPress={() => router.push('/settings')} activeOpacity={0.8}>
          {avatarUri ? (
            <Image source={{ uri: avatarUri }} style={styles.topAvatar} />
          ) : (
            <View style={[styles.topAvatarPlaceholder, { backgroundColor: C.topBtn }]}>
              <Text style={{ color: '#fff', fontWeight: '700', fontSize: 14 }}>{username.charAt(0).toUpperCase()}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  // Sidebar
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

  // Top bar
  topBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 12, paddingBottom: 14, gap: 12 },
  menuBtn: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  topTitle: { fontSize: 17, fontWeight: '700' },
  topSub: { fontSize: 12, marginTop: 1 },
  topAvatar: { width: 34, height: 34, borderRadius: 17, borderWidth: 2, borderColor: 'rgba(255,255,255,0.4)' },
  topAvatarPlaceholder: { width: 34, height: 34, borderRadius: 17, justifyContent: 'center', alignItems: 'center' },
});