import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
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

const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) : 0;

export default function DashboardScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [dateInfo, setDateInfo] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  React.useEffect(() => {
    const now = new Date();
    const day = now.getDate();
    const monthName = now.toLocaleString('en-US', { month: 'long' });
    const year = now.getFullYear();
    setDateInfo(`${monthName} ${day}, ${year}`);
  }, []);

  const refreshData = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  };

  const handleLogout = () => {
    router.replace('/login');
  };

  const getSeasonLabel = () => {
    const month = new Date().getMonth();
    if ([5, 6, 7].includes(month)) return '🔥 PEAK SEASON (High Volume)';
    return '📅 Normal Operations';
  };

  return (
    <View style={styles.root}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <View style={styles.statusBarSpacer} />

      {sidebarOpen && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setSidebarOpen(false)}
        />
      )}

      <Modal visible={sidebarOpen} transparent={true} animationType="fade">
        <View style={styles.sidebarContainer}>
          <View style={styles.sidebar}>
            <View style={styles.sidebarHeader}>
              <Text style={styles.sidebarTitle}>Menu</Text>
              <TouchableOpacity onPress={() => setSidebarOpen(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity 
              style={styles.sidebarItem} 
              onPress={() => { setSidebarOpen(false); router.push('/dashboard'); }}
            >
              <Text style={styles.sidebarItemText}>📊 Dashboard</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.sidebarItem} 
              onPress={() => { setSidebarOpen(false); router.push('/dashboard/schedule'); }}
            >
              <Text style={styles.sidebarItemText}>📅 Patient Schedule</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.sidebarItem, styles.logoutItem]} 
              onPress={handleLogout}
            >
              <Text style={styles.logoutItemText}>🚪 Logout</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.sidebarOverlay} activeOpacity={1} onPress={() => setSidebarOpen(false)} />
        </View>
      </Modal>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => setSidebarOpen(true)}>
          <Text style={styles.menuButton}>☰</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.greeting}>👋 Hello, Patient</Text>
          <Text style={styles.subheading}>ABTC-CHO Vaccine Status</Text>
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={[styles.mainContent, sidebarOpen && styles.mainContentDimmed]}
        scrollEnabled={!sidebarOpen}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refreshData} />}
      >
        <View style={styles.contentPadding}>
          <View style={styles.seasonCard}>
            <Text style={styles.seasonLabel}>{getSeasonLabel()}</Text>
            <Text style={styles.dateText}>{dateInfo}</Text>
          </View>

          <CenterStatusBanner />

          <Announcements
            isPeakSeason={[5, 6, 7].includes(new Date().getMonth())}
            capacityPercentage={0}
          />
          <Reminders />

          <View style={styles.antiRabiesCard}>
            <Text style={styles.cardTitle}>💉 Anti-Rabies Vaccine (ARV)</Text>
            <Text style={styles.cardSubtitle}><Text style={{ fontWeight: 'bold' }}>Standard Protocol:</Text> 3-dose series</Text>
            <Text style={styles.cardText}>Complete all 3 doses for full protection</Text>
          </View>

          <VaccineList />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Animal Bite Treatment Center</Text>
          <Text style={styles.footerSubtext}>City Health Office • Cagayan de Oro City, Misamis Oriental</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#ffffff' },
  statusBarSpacer: { height: STATUS_BAR_HEIGHT, backgroundColor: '#ffffff' },
  mainContent: { flex: 1, backgroundColor: '#d4ede7' },
  mainContentDimmed: { opacity: 0.5 },
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1 },
  sidebarContainer: { flex: 1, flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.5)' },
  sidebar: { width: Dimensions.get('window').width * 0.75, backgroundColor: '#1b7b6b', paddingTop: 50, paddingHorizontal: 16, height: '100%' },
  sidebarOverlay: { flex: 1 },
  sidebarHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#ffffff30' },
  sidebarTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  closeButton: { fontSize: 24, color: '#fff' },
  sidebarItem: { paddingVertical: 14, paddingHorizontal: 12, marginBottom: 8, borderRadius: 8, backgroundColor: '#ffffff10' },
  sidebarItemText: { fontSize: 14, color: '#fff', fontWeight: '500' },
  logoutItem: { marginTop: 20, backgroundColor: '#ff6b6b', borderRadius: 8 },
  logoutItemText: { fontSize: 14, color: '#fff', fontWeight: '600' },
  header: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  menuButton: { fontSize: 28, color: '#333', fontWeight: 'bold' },
  headerCenter: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  greeting: { fontSize: 16, fontWeight: 'bold', color: '#333', textAlign: 'center' },
  subheading: { fontSize: 12, color: '#999', marginTop: 3, textAlign: 'center' },
  logoutBtn: { paddingHorizontal: 12, paddingVertical: 8, borderWidth: 2, borderColor: '#ff6b6b', borderRadius: 20 },
  logoutText: { color: '#ff6b6b', fontWeight: '600', fontSize: 12 },
  contentPadding: { padding: 16, paddingTop: 8 },
  seasonCard: { backgroundColor: '#e3f2fd', borderColor: '#2196f3', borderWidth: 1, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 8, marginBottom: 14 },
  seasonLabel: { fontSize: 13, fontWeight: '600', color: '#333', textAlign: 'center' },
  dateText: { fontSize: 11, color: '#999', textAlign: 'center', marginTop: 4 },
  antiRabiesCard: { backgroundColor: '#ffebee', padding: 14, borderRadius: 8, borderLeftWidth: 4, borderLeftColor: '#f44336', marginBottom: 16 },
  cardTitle: { fontSize: 15, fontWeight: 'bold', marginBottom: 6 },
  cardSubtitle: { fontSize: 13, color: '#555', marginBottom: 6 },
  cardText: { fontSize: 12, color: '#666', marginBottom: 3 },
  footer: { backgroundColor: '#f5f5f5', paddingVertical: 14, paddingHorizontal: 16, borderTopWidth: 1, borderTopColor: '#e0e0e0', alignItems: 'center' },
  footerText: { fontSize: 11, fontWeight: 'bold', color: '#333' },
  footerSubtext: { fontSize: 10, color: '#999', marginTop: 3 },
});