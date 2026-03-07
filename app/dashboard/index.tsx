import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    Modal,
    Platform,
    RefreshControl,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Announcements from '../../components/dashboard/Announcements';
import CenterStatusBanner from '../../components/dashboard/CenterStatusBanner';
import Reminders from '../../components/dashboard/Reminders';
import VaccineList from '../../components/dashboard/VaccineList';
import { useUser } from '../../context/UserContext';

const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) : 0;

export default function DashboardScreen() {
  const router = useRouter();
  const { username, darkMode, avatarUri } = useUser();
  const dark = darkMode;

  const [refreshing, setRefreshing] = useState(false);
  const [dateInfo, setDateInfo] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const C = {
    bg:        dark ? '#1a1f1e' : '#ffffff',
    contentBg: dark ? '#1a1f1e' : '#d4ede7',
    card:      dark ? '#242b2a' : '#ffffff',
    text:      dark ? '#e8f0ef' : '#333333',
    sub:       dark ? '#7aada8' : '#999999',
    border:    dark ? '#2e3837' : '#e0e0e0',
    teal:      '#1b7b6b',
  };

  React.useEffect(() => {
    const now = new Date();
    setDateInfo(`${now.toLocaleString('en-US', { month: 'long' })} ${now.getDate()}, ${now.getFullYear()}`);
  }, []);

  const refreshData = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 500);
  };

  const handleLogout = () => router.replace('/login');

  const getSeasonLabel = () => {
    const month = new Date().getMonth();
    if ([5, 6, 7].includes(month)) return '🔥 PEAK SEASON (High Volume)';
    return '📅 Normal Operations';
  };

  return (
    <View style={[styles.root, { backgroundColor: C.bg }]}>
      <StatusBar translucent backgroundColor="transparent" barStyle={dark ? 'light-content' : 'dark-content'} />
      <View style={[styles.statusBarSpacer, { backgroundColor: C.bg }]} />

      {sidebarOpen && (
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={() => setSidebarOpen(false)} />
      )}

      <Modal visible={sidebarOpen} transparent={true} animationType="fade">
        <View style={styles.sidebarContainer}>
          <View style={[styles.sidebar, { backgroundColor: C.teal }]}>

            {/* ✅ Avatar in sidebar too */}
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

      {/* ── Header ── */}
      <View style={[styles.header, { backgroundColor: C.card, borderBottomColor: C.border }]}>
        <TouchableOpacity onPress={() => setSidebarOpen(true)}>
          <Text style={[styles.menuButton, { color: C.text }]}>☰</Text>
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={[styles.greeting, { color: C.text }]}>👋 Hello, {username}</Text>
          <Text style={[styles.subheading, { color: C.sub }]}>ABTC-CHO Vaccine Status</Text>
        </View>

        {/* ✅ Small profile picture on the right */}
        <TouchableOpacity onPress={() => router.push('/settings')} activeOpacity={0.8}>
          {avatarUri ? (
            <Image source={{ uri: avatarUri }} style={styles.headerAvatar} />
          ) : (
            <View style={styles.headerAvatarPlaceholder}>
              <Text style={styles.headerAvatarLetter}>{username.charAt(0).toUpperCase()}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView
        style={[styles.mainContent, { backgroundColor: C.contentBg }, sidebarOpen && styles.mainContentDimmed]}
        scrollEnabled={!sidebarOpen}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refreshData} />}
      >
        <View style={styles.contentPadding}>
          <View style={[styles.seasonCard, dark && { backgroundColor: '#1e2d3d', borderColor: '#2563eb' }]}>
            <Text style={[styles.seasonLabel, { color: C.text }]}>{getSeasonLabel()}</Text>
            <Text style={[styles.dateText, { color: C.sub }]}>{dateInfo}</Text>
          </View>

          <CenterStatusBanner />
          <Announcements isPeakSeason={[5, 6, 7].includes(new Date().getMonth())} capacityPercentage={0} />
          <Reminders />

          <View style={[styles.antiRabiesCard, dark && { backgroundColor: '#2d1a1a' }]}>
            <Text style={[styles.cardTitle, { color: C.text }]}>💉 Anti-Rabies Vaccine (ARV)</Text>
            <Text style={[styles.cardSubtitle, { color: C.sub }]}>
              <Text style={{ fontWeight: 'bold', color: C.text }}>Standard Protocol:</Text> 3-dose series
            </Text>
            <Text style={[styles.cardText, { color: C.sub }]}>Complete all 3 doses for full protection</Text>
          </View>

          <VaccineList />
        </View>

        <View style={[styles.footer, dark && { backgroundColor: '#242b2a', borderTopColor: C.border }]}>
          <Text style={[styles.footerText, { color: C.text }]}>Animal Bite Treatment Center</Text>
          <Text style={[styles.footerSubtext, { color: C.sub }]}>City Health Office • Cagayan de Oro City, Misamis Oriental</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  statusBarSpacer: { height: STATUS_BAR_HEIGHT },
  mainContent: { flex: 1 },
  mainContentDimmed: { opacity: 0.5 },
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1 },
  sidebarContainer: { flex: 1, flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.5)' },
  sidebar: { width: Dimensions.get('window').width * 0.75, paddingTop: 50, paddingHorizontal: 16, height: '100%' },
  sidebarOverlay: { flex: 1 },

  // Sidebar profile
  sidebarProfile: { alignItems: 'center', paddingBottom: 16 },
  sidebarAvatar: { width: 64, height: 64, borderRadius: 32, borderWidth: 2, borderColor: '#ffffff50', marginBottom: 8 },
  sidebarAvatarPlaceholder: { width: 64, height: 64, borderRadius: 32, backgroundColor: 'rgba(255,255,255,0.2)', borderWidth: 2, borderColor: '#ffffff50', justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  sidebarAvatarLetter: { fontSize: 26, color: '#fff', fontWeight: '700' },
  sidebarUsername: { fontSize: 16, fontWeight: '700', color: '#fff', marginBottom: 2 },
  sidebarDivider: { height: 1, backgroundColor: '#ffffff20', marginBottom: 16 },

  sidebarItem: { paddingVertical: 14, paddingHorizontal: 12, marginBottom: 8, borderRadius: 8, backgroundColor: '#ffffff10' },
  sidebarItemText: { fontSize: 14, color: '#fff', fontWeight: '500' },
  logoutItem: { marginTop: 20, backgroundColor: '#ff6b6b' },
  logoutItemText: { fontSize: 14, color: '#fff', fontWeight: '600' },

  // Header
  header: { paddingVertical: 14, paddingHorizontal: 16, borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  menuButton: { fontSize: 28, fontWeight: 'bold' },
  headerCenter: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  greeting: { fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
  subheading: { fontSize: 12, marginTop: 3, textAlign: 'center' },

  // ✅ Small avatar in header
  headerAvatar: { width: 36, height: 36, borderRadius: 18, borderWidth: 2, borderColor: '#1b7b6b' },
  headerAvatarPlaceholder: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#E8F7F5', borderWidth: 2, borderColor: '#1b7b6b', justifyContent: 'center', alignItems: 'center' },
  headerAvatarLetter: { fontSize: 16, color: '#1b7b6b', fontWeight: '700' },

  contentPadding: { padding: 16, paddingTop: 8 },
  seasonCard: { backgroundColor: '#e3f2fd', borderColor: '#2196f3', borderWidth: 1, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 8, marginBottom: 14 },
  seasonLabel: { fontSize: 13, fontWeight: '600', textAlign: 'center' },
  dateText: { fontSize: 11, textAlign: 'center', marginTop: 4 },
  antiRabiesCard: { backgroundColor: '#ffebee', padding: 14, borderRadius: 8, borderLeftWidth: 4, borderLeftColor: '#f44336', marginBottom: 16 },
  cardTitle: { fontSize: 15, fontWeight: 'bold', marginBottom: 6 },
  cardSubtitle: { fontSize: 13, marginBottom: 6 },
  cardText: { fontSize: 12, marginBottom: 3 },
  footer: { backgroundColor: '#f5f5f5', paddingVertical: 14, paddingHorizontal: 16, borderTopWidth: 1, borderTopColor: '#e0e0e0', alignItems: 'center' },
  footerText: { fontSize: 11, fontWeight: 'bold' },
  footerSubtext: { fontSize: 10, marginTop: 3 },
});