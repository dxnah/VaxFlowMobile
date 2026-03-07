// app/history.jsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Platform, StatusBar, StyleSheet, Image, Modal, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import SharedHeader from '../components/SharedHeader';
import { useUser } from '../context/UserContext';

const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) : 0;

const INITIAL_RECORDS = [
  { id: 1, vaccine: 'Anti-Rabies Vaccine (ARV)', dose: '1st Dose', date: 'January 15, 2025', facility: 'ABTC - City Health Office', administered: 'Dr. Santos', color: '#e53935', cardImage: null },
  { id: 2, vaccine: 'Anti-Rabies Vaccine (ARV)', dose: '2nd Dose', date: 'January 22, 2025', facility: 'ABTC - City Health Office', administered: 'Dr. Santos', color: '#e53935', cardImage: null },
  { id: 3, vaccine: 'BCG', dose: '1st Dose', date: 'March 3, 2025', facility: 'City Health Office, CDO', administered: 'Nurse Reyes', color: '#1e88e5', cardImage: null },
  { id: 4, vaccine: 'Hepatitis B', dose: '1st Dose', date: 'March 10, 2025', facility: 'City Health Office, CDO', administered: 'Nurse Cruz', color: '#f57c00', cardImage: null },
];

function DigitalCard({ record, dark, onAddImage, onViewImage }) {
  const C = { card: dark ? '#1e2928' : '#ffffff', border: dark ? '#2e3837' : '#e8f0ef', text: dark ? '#e8f0ef' : '#1a2e2c', sub: dark ? '#7aada8' : '#6b7280', imgBg: dark ? '#242b2a' : '#f4faf9' };
  return (
    <View style={[styles.digitalCard, { backgroundColor: C.card, borderColor: C.border, shadowColor: record.color }]}>
      <View style={[styles.cardTop, { backgroundColor: record.color }]}>
        <View style={styles.cardTopLeft}>
          <Text style={styles.cardTopLabel}>VACCINATION RECORD</Text>
          <Text style={styles.cardTopVaccine}>{record.vaccine}</Text>
          <View style={styles.doseBadge}><Text style={styles.doseBadgeText}>{record.dose}</Text></View>
        </View>
        <Text style={styles.cardTopIcon}>💉</Text>
      </View>
      <View style={styles.cardBody}>
        <View style={styles.cardRow}>
          <View style={styles.cardField}>
            <Text style={[styles.fieldLabel, { color: C.sub }]}>📅 DATE</Text>
            <Text style={[styles.fieldValue, { color: C.text }]}>{record.date}</Text>
          </View>
          <View style={styles.cardField}>
            <Text style={[styles.fieldLabel, { color: C.sub }]}>🏥 FACILITY</Text>
            <Text style={[styles.fieldValue, { color: C.text }]} numberOfLines={2}>{record.facility}</Text>
          </View>
        </View>
        <View style={[styles.cardDivider, { backgroundColor: C.border }]} />
        <View style={styles.cardField}>
          <Text style={[styles.fieldLabel, { color: C.sub }]}>👨‍⚕️ ADMINISTERED BY</Text>
          <Text style={[styles.fieldValue, { color: C.text }]}>{record.administered}</Text>
        </View>
        <View style={[styles.imageSection, { backgroundColor: C.imgBg, borderColor: C.border }]}>
          <Text style={[styles.imageSectionLabel, { color: C.sub }]}>📋 VACCINATION CARD PHOTO</Text>
          {record.cardImage ? (
            <TouchableOpacity onPress={() => onViewImage(record)} activeOpacity={0.9}>
              <Image source={{ uri: record.cardImage }} style={styles.cardImage} resizeMode="cover" />
              <View style={[styles.imageOverlay, { backgroundColor: record.color + '22' }]}>
                <Text style={styles.imageOverlayText}>Tap to view full</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={[styles.addImageBtn, { borderColor: record.color }]} onPress={() => onAddImage(record.id)} activeOpacity={0.7}>
              <Text style={{ fontSize: 28 }}>📷</Text>
              <Text style={[styles.addImageText, { color: record.color }]}>Add Card Photo</Text>
              <Text style={[styles.addImageSub, { color: C.sub }]}>Tap to upload your vaccination card</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.verifiedRow}>
          <View style={[styles.verifiedBadge, { backgroundColor: dark ? '#1e3330' : '#e0f7f4', borderColor: '#2BAF9E' }]}>
            <Text style={styles.verifiedText}>✅ Verified Record</Text>
          </View>
          <Text style={[styles.recordId, { color: C.sub }]}>#{String(record.id).padStart(4, '0')}</Text>
        </View>
      </View>
    </View>
  );
}

export default function HistoryScreen() {
  const { username, darkMode, avatarUri } = useUser();
  const dark = darkMode;
  const topBar = dark ? '#1a2e2c' : '#2BAF9E';

  const [records, setRecords] = useState(INITIAL_RECORDS);
  const [viewingImage, setViewingImage] = useState(null);

  const C = { bg: dark ? '#1a1f1e' : '#EEF7F6', text: dark ? '#e8f0ef' : '#1a2e2c', sub: dark ? '#7aada8' : '#6b7280', card: dark ? '#242b2a' : '#ffffff', border: dark ? '#2e3837' : '#e0efed' };

  const handleAddImage = async (recordId) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') { Alert.alert('Permission needed', 'Please allow access to your photo library.'); return; }
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true, aspect: [4, 3], quality: 0.8 });
    if (!result.canceled) setRecords(prev => prev.map(r => r.id === recordId ? { ...r, cardImage: result.assets[0].uri } : r));
  };

  const totalVaccines = [...new Set(records.map(r => r.vaccine))].length;

  return (
    <View style={[styles.root, { backgroundColor: C.bg }]}>
      <StatusBar backgroundColor={topBar} barStyle="light-content" translucent={false} />
      <View style={[styles.statusBarSpacer, { backgroundColor: topBar }]} />

      <SharedHeader title="💉 Vaccination History" subtitle="Your digital vaccination records" />

      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Stats */}
        <View style={styles.statsRow}>
          {[{ num: records.length, label: 'Total Doses', color: '#2BAF9E' }, { num: totalVaccines, label: 'Vaccines', color: '#1e88e5' }, { num: records.filter(r => r.cardImage).length, label: 'Cards Uploaded', color: '#43a047' }].map((s, i) => (
            <View key={i} style={[styles.statBox, { backgroundColor: C.card, borderColor: C.border }]}>
              <Text style={[styles.statNum, { color: s.color }]}>{s.num}</Text>
              <Text style={[styles.statLabel, { color: C.sub }]}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Patient card */}
        <View style={[styles.patientCard, { backgroundColor: C.card, borderColor: C.border }]}>
          <View style={styles.patientLeft}>
            {avatarUri ? (
              <Image source={{ uri: avatarUri }} style={styles.patientAvatar} />
            ) : (
              <View style={[styles.patientAvatarPlaceholder, { backgroundColor: dark ? '#1e3330' : '#e0f7f4' }]}>
                <Text style={{ fontSize: 22, color: '#2BAF9E', fontWeight: '700' }}>{username.charAt(0).toUpperCase()}</Text>
              </View>
            )}
            <View>
              <Text style={[styles.patientName, { color: C.text }]}>{username}</Text>
              <Text style={[styles.patientSub, { color: C.sub }]}>ABTC-CHO Patient</Text>
            </View>
          </View>
          <View style={[styles.patientBadge, { backgroundColor: dark ? '#1e3330' : '#e0f7f4' }]}>
            <Text style={{ fontSize: 10, color: '#2BAF9E', fontWeight: '700' }}>🏥 CDO</Text>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: C.sub }]}>VACCINATION RECORDS</Text>
        {records.map(record => (
          <DigitalCard key={record.id} record={record} dark={dark} onAddImage={handleAddImage} onViewImage={setViewingImage} />
        ))}
        <View style={{ height: 30 }} />
      </ScrollView>

      <Modal visible={!!viewingImage} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={styles.modalClose} onPress={() => setViewingImage(null)} activeOpacity={0.8}>
            <Text style={styles.modalCloseText}>✕ Close</Text>
          </TouchableOpacity>
          {viewingImage?.cardImage && <Image source={{ uri: viewingImage.cardImage }} style={styles.fullImage} resizeMode="contain" />}
          <Text style={styles.modalCaption}>{viewingImage?.vaccine} — {viewingImage?.dose}</Text>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  statusBarSpacer: { height: STATUS_BAR_HEIGHT },
  scrollContent: { paddingHorizontal: 14, paddingTop: 14 },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 14 },
  statBox: { flex: 1, borderWidth: 1, borderRadius: 12, padding: 12, alignItems: 'center' },
  statNum: { fontSize: 22, fontWeight: '800' },
  statLabel: { fontSize: 11, marginTop: 2, fontWeight: '600' },
  patientCard: { borderWidth: 1, borderRadius: 12, padding: 14, marginBottom: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  patientLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  patientAvatar: { width: 44, height: 44, borderRadius: 22, borderWidth: 2, borderColor: '#2BAF9E' },
  patientAvatarPlaceholder: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  patientName: { fontSize: 15, fontWeight: '700' },
  patientSub: { fontSize: 12, marginTop: 1 },
  patientBadge: { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5 },
  sectionTitle: { fontSize: 11, fontWeight: '800', letterSpacing: 1, marginBottom: 10, paddingHorizontal: 2 },
  digitalCard: { borderRadius: 16, borderWidth: 1, marginBottom: 16, overflow: 'hidden', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.12, shadowRadius: 8, elevation: 4 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  cardTopLeft: { flex: 1 },
  cardTopLabel: { fontSize: 10, color: 'rgba(255,255,255,0.75)', fontWeight: '700', letterSpacing: 1.2, marginBottom: 4 },
  cardTopVaccine: { fontSize: 15, color: '#ffffff', fontWeight: '800', marginBottom: 8 },
  doseBadge: { alignSelf: 'flex-start', backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3 },
  doseBadgeText: { fontSize: 12, color: '#ffffff', fontWeight: '700' },
  cardTopIcon: { fontSize: 36, marginLeft: 10 },
  cardBody: { padding: 14, gap: 10 },
  cardRow: { flexDirection: 'row', gap: 14 },
  cardField: { flex: 1 },
  fieldLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 0.8, marginBottom: 3 },
  fieldValue: { fontSize: 13, fontWeight: '600', lineHeight: 18 },
  cardDivider: { height: 1 },
  imageSection: { borderWidth: 1, borderRadius: 12, overflow: 'hidden', marginTop: 4 },
  imageSectionLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 0.8, padding: 10, paddingBottom: 6 },
  cardImage: { width: '100%', height: 180 },
  imageOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 8, alignItems: 'center' },
  imageOverlayText: { color: '#fff', fontSize: 11, fontWeight: '600' },
  addImageBtn: { alignItems: 'center', padding: 20, borderWidth: 1.5, borderStyle: 'dashed', borderRadius: 10, margin: 10, marginTop: 4, gap: 4 },
  addImageText: { fontSize: 14, fontWeight: '700' },
  addImageSub: { fontSize: 11 },
  verifiedRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  verifiedBadge: { borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  verifiedText: { fontSize: 11, color: '#2BAF9E', fontWeight: '700' },
  recordId: { fontSize: 11, fontWeight: '600' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.92)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalClose: { position: 'absolute', top: 50, right: 20, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8 },
  modalCloseText: { color: '#fff', fontWeight: '600', fontSize: 14 },
  fullImage: { width: '100%', height: 300, borderRadius: 12 },
  modalCaption: { color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 14, textAlign: 'center' },
});