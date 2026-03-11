// app/dashboard/index.tsx

import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  LayoutAnimation,
  Modal,
  Platform,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CenterStatusBanner from '../../components/dashboard/CenterStatusBanner';
import Reminders from '../../components/dashboard/Reminders';
import VaccineList from '../../components/dashboard/VaccineList';
import { useUser } from '../../context/UserContext';

const STATUS_BAR_HEIGHT =
  Platform.OS === "android" ? (StatusBar.currentHeight ?? 24) : 0;

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

export default function DashboardScreen() {
  const router = useRouter();
  const { username, darkMode, avatarUri } = useUser();
  const dark = darkMode;

  const [refreshing, setRefreshing] = useState(false);
  const [dateInfo, setDateInfo] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expectExpanded, setExpectExpanded] = useState(false);

  const headerBg = dark ? '#1a2e2c' : '#2BAF9E';

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
    if ([5, 6, 7].includes(month)) return "🔥 PEAK SEASON (High Volume)";
    return "📅 Normal Operations";
  };

  const toggleExpect = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpectExpanded(prev => !prev);
  };

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: headerBg }]} edges={['top', 'left', 'right']}>
      <StatusBar translucent={false} backgroundColor={headerBg} barStyle="light-content" />

      {sidebarOpen && (
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={() => setSidebarOpen(false)} />
      )}

      <Modal visible={sidebarOpen} transparent={true} animationType="fade">
        <View style={styles.sidebarContainer}>
          <View style={[styles.sidebar, { backgroundColor: '#26a69a'}]}>

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
            <TouchableOpacity style={styles.sidebarItem} onPress={() => { setSidebarOpen(false); router.push('/registration' as any); }}>
              <Text style={styles.sidebarItemText}>📋 Patient Registration</Text>
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
          <TouchableOpacity
            style={styles.sidebarOverlay}
            activeOpacity={1}
            onPress={() => setSidebarOpen(false)}
          />
        </View>
      </Modal>

      {/* ── Header — teal background, white text ── */}
      <View style={[styles.header, { backgroundColor: headerBg }]}>
        <TouchableOpacity onPress={() => setSidebarOpen(true)} style={styles.menuBtnWrap} activeOpacity={0.7}>
          <Text style={styles.menuButton}>☰</Text>
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.greeting}>👋 Hello, {username}</Text>
          <Text style={styles.subheading}>ABTC-CHO Vaccine Status</Text>
        </View>

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

      <View style={{ flex: 1, backgroundColor: C.bg }}>
      <ScrollView
        style={[styles.mainContent, { backgroundColor: C.contentBg }, sidebarOpen && styles.mainContentDimmed]}
        scrollEnabled={!sidebarOpen}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshData} />
        }
      >
        <View style={styles.contentPadding}>

          {/* Season / Date Card */}
          <View style={[styles.seasonCard, dark && { backgroundColor: '#1e2d3d', borderColor: '#2563eb' }]}>
            <Text style={[styles.seasonLabel, { color: C.text }]}>{getSeasonLabel()}</Text>
            <Text style={[styles.dateText, { color: C.sub }]}>{dateInfo}</Text>
          </View>

          <CenterStatusBanner />

          {/* Operating Hours */}
          <View style={[styles.seasonCard, { backgroundColor: dark ? '#1e2d3d' : '#e3f2fd', borderColor: '#2196f3' }]}>
            <Text style={[styles.seasonLabel, { color: C.text }]}>🕐 Operating Hours</Text>
            <Text style={[styles.dateText, { color: C.sub }]}>Monday – Friday  •  8:00 AM – 5:00 PM</Text>
            <Text style={[styles.dateText, { color: C.sub }]}>Saturday  •  8:00 AM – 12:00 PM</Text>
            <Text style={[styles.dateText, { color: C.sub }]}>Sunday  •  Closed</Text>
          </View>

          {/* ── First-Time Patient Registration Button ── */}
          <TouchableOpacity
            style={[styles.registrationBanner, { backgroundColor: dark ? '#1a3330' : '#fff8e1', borderColor: '#f9a825' }]}
            onPress={() => router.push('/registration' as any)}
            activeOpacity={0.85}
          >
            <View style={styles.registrationBannerInner}>
              <View style={[styles.registrationIconCircle, { backgroundColor: dark ? '#2e3c1e' : '#fff3cd' }]}>
                <Text style={{ fontSize: 22 }}>🏥</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.registrationBannerTitle, { color: dark ? '#ffe082' : '#e65100' }]}>
                  First-time patient?
                </Text>
                <Text style={[styles.registrationBannerSub, { color: dark ? '#a5d6a7' : '#5d4037' }]}>
                  Tap here to register! →
                </Text>
              </View>
              <View style={[styles.registrationArrow, { backgroundColor: '#f9a825' }]}>
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: '800' }}>›</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* What to Expect — Accordion */}
          <View style={[styles.seasonCard, { backgroundColor: dark ? '#1e3330' : '#e8f5e9', borderColor: '#43a047' }]}>
            <TouchableOpacity onPress={toggleExpect} activeOpacity={0.8}>
              <Text style={[styles.seasonLabel, { color: C.text, textAlign: 'center', fontSize: 16, fontWeight: 'bold' }]}>
                📋 What to Expect
              </Text>
              <Text style={[styles.dateText, { color: '#43a047', textAlign: 'center', marginTop: 2, marginBottom: 2, fontWeight: '600' }]}>
                {expectExpanded ? '▲ tap to hide' : '▼ tap to know!'}
              </Text>
            </TouchableOpacity>

            {expectExpanded && (
              <View style={{ marginTop: 8 }}>
                <Text style={[styles.dateText, { color: '#2BAF9E', fontWeight: 'bold', marginTop: 6, textAlign: 'left', fontSize: 13 }]}>🏥 First-Time Patients</Text>
                <Text style={[styles.dateText, { color: dark ? '#b0bec5' : '#444444', textAlign: 'left', marginBottom: 4 }]}>• Arrive before 8:00 AM and line up at the ABTC-CHO entrance.</Text>
                <Text style={[styles.dateText, { color: dark ? '#b0bec5' : '#444444', textAlign: 'left', marginBottom: 4 }]}>• Registration starts at 8:00 AM or 8:30 AM.</Text>
                <Text style={[styles.dateText, { color: dark ? '#b0bec5' : '#444444', textAlign: 'left', marginBottom: 4 }]}>• After registration, you will be assessed and classified as either Category 2 or Category 3.</Text>

                <Text style={[styles.dateText, { color: '#1e88e5', fontWeight: 'bold', marginTop: 8, textAlign: 'left', fontSize: 13 }]}>📌 Category 2 Patients</Text>
                <Text style={[styles.dateText, { color: dark ? '#b0bec5' : '#444444', textAlign: 'left', marginBottom: 4 }]}>• Proceed to the front desk for a second verification. Your name will be queued for processing.</Text>
                <Text style={[styles.dateText, { color: dark ? '#b0bec5' : '#444444', textAlign: 'left', marginBottom: 4 }]}>• You will be called to assist with your PhilHealth form (provided by ABTC-CHO). Submit the completed form and wait for it to be processed before your name is queued for vaccine administration.</Text>

                <Text style={[styles.dateText, { color: '#f57c00', fontWeight: 'bold', marginTop: 8, textAlign: 'left', fontSize: 13 }]}>📌 Category 3 Patients</Text>
                <Text style={[styles.dateText, { color: dark ? '#b0bec5' : '#444444', textAlign: 'left', marginBottom: 4 }]}>• You will be paired with another Category 3 patient to share the cost of one ARV vial. Purchase the vial and two syringes (per patient) from the nearest pharmacy — typically Mercury Drugstore.</Text>
                <Text style={[styles.dateText, { color: dark ? '#b0bec5' : '#444444', textAlign: 'left', marginBottom: 4 }]}>• Return to the front desk, submit the purchased items, and both of your names will be queued for administration.</Text>

                <Text style={[styles.dateText, { color: '#43a047', fontWeight: 'bold', marginTop: 8, textAlign: 'left', fontSize: 13 }]}>💉 Booster Shot Patients</Text>
                <Text style={[styles.dateText, { color: dark ? '#b0bec5' : '#444444', textAlign: 'left', marginBottom: 4 }]}>• Please proceed to the registration area and bring your Vaccination Card for verification.</Text>
              </View>
            )}
          </View>

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
    </SafeAreaView>
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

  // ── Teal header with white text ──
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
  menuBtnWrap: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 8,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButton: { fontSize: 20, color: '#ffffff', fontWeight: 'bold' },
  headerCenter: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  greeting: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: '#ffffff' },
  subheading: { fontSize: 12, marginTop: 3, textAlign: 'center', color: 'rgba(255,255,255,0.75)' },

  headerAvatar: { width: 36, height: 36, borderRadius: 18, borderWidth: 2, borderColor: 'rgba(255,255,255,0.5)' },
  headerAvatarPlaceholder: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.2)', borderWidth: 2, borderColor: 'rgba(255,255,255,0.5)', justifyContent: 'center', alignItems: 'center' },
  headerAvatarLetter: { fontSize: 16, color: '#ffffff', fontWeight: '700' },

  contentPadding: { padding: 16, paddingTop: 8 },
  seasonCard: { backgroundColor: '#e3f2fd', borderColor: '#2196f3', borderWidth: 1, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 8, marginBottom: 14 },
  seasonLabel: { fontSize: 13, fontWeight: '600', textAlign: 'center' },
  dateText: { fontSize: 11, textAlign: 'center', marginTop: 4 },

  registrationBanner: { borderWidth: 1.5, borderRadius: 12, marginBottom: 14, overflow: 'hidden' },
  registrationBannerInner: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  registrationIconCircle: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  registrationBannerTitle: { fontSize: 14, fontWeight: '800', marginBottom: 2 },
  registrationBannerSub: { fontSize: 12, fontWeight: '500' },
  registrationArrow: { width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },

  antiRabiesCard: { backgroundColor: '#ffebee', padding: 14, borderRadius: 8, borderLeftWidth: 4, borderLeftColor: '#f44336', marginBottom: 16 },
  cardTitle: { fontSize: 15, fontWeight: 'bold', marginBottom: 6 },
  cardSubtitle: { fontSize: 13, marginBottom: 6 },
  cardText: { fontSize: 12, marginBottom: 3 },
  footer: { backgroundColor: '#f5f5f5', paddingVertical: 14, paddingHorizontal: 16, borderTopWidth: 1, borderTopColor: '#e0e0e0', alignItems: 'center' },
  footerText: { fontSize: 11, fontWeight: 'bold' },
  footerSubtext: { fontSize: 10, marginTop: 3 },
});