// components/SharedHeader.tsx

import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useUser } from '../context/UserContext';

type Props = {
  title: string;
  subtitle?: string;
};

export default function SharedHeader({ title, subtitle }: Props) {
  const router = useRouter();
  const { username, darkMode, avatarUri } = useUser();
  const dark = darkMode;

  const headerBg = dark ? '#1a2e2c' : '#2BAF9E';
  const statusBg = dark ? '#1a2e2c' : '#2BAF9E';

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    setSidebarOpen(false);
    router.replace('/login');
  };

  return (
    <>
      {/* Sidebar Modal */}
      <Modal visible={sidebarOpen} transparent animationType="fade">
        <View style={styles.sidebarContainer}>
          <View style={[styles.sidebar, { backgroundColor: '#26a69a' }]}>

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

      <StatusBar backgroundColor={statusBg} barStyle="light-content" translucent={false} />

      <View style={[styles.header, { backgroundColor: headerBg }]}>
        <TouchableOpacity onPress={() => setSidebarOpen(true)} style={styles.menuBtnWrap} activeOpacity={0.7}>
          <Text style={styles.menuButton}>☰</Text>
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle} numberOfLines={1}>{title}</Text>
          {subtitle ? <Text style={styles.headerSubtitle} numberOfLines={1}>{subtitle}</Text> : null}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  menuBtnWrap: { backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 8, width: 36, height: 36, justifyContent: 'center', alignItems: 'center' },
  menuButton: { fontSize: 20, color: '#ffffff', fontWeight: 'bold' },
  headerCenter: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: '#ffffff' },
  headerSubtitle: { fontSize: 12, marginTop: 3, textAlign: 'center', color: 'rgba(255,255,255,0.75)' },

  avatarContainer: { width: AVATAR_SIZE, height: AVATAR_SIZE, borderRadius: AVATAR_SIZE / 2, borderWidth: 2, borderColor: 'rgba(255,255,255,0.5)', overflow: 'hidden' },
  avatarImage: { width: '100%', height: '100%' },
  avatarFallback: { width: '100%', height: '100%', backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  avatarLetter: { fontSize: 16, color: '#ffffff', fontWeight: '700' },
});