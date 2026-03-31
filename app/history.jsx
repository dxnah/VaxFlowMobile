// app/history.jsx

import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, Image, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SharedHeader from '../components/SharedHeader';
import { useUser } from '../context/UserContext';
import styles from '../styles/History';
import { vaccinationRecords } from '../data/mockData';

function DigitalCard({ record, dark, onAddImage, onReplaceImage, onRemoveImage, onViewImage }) {
  const C = {
    card:   dark ? '#1e2928' : '#ffffff',
    border: dark ? '#2e3837' : '#e8f0ef',
    text:   dark ? '#e8f0ef' : '#1a2e2c',
    sub:    dark ? '#7aada8' : '#6b7280',
    imgBg:  dark ? '#242b2a' : '#f4faf9',
  };

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
            <>
              <TouchableOpacity onPress={() => onViewImage(record)} activeOpacity={0.9}>
                <Image source={{ uri: record.cardImage }} style={styles.cardImage} resizeMode="cover" />
                <View style={[styles.imageOverlay, { backgroundColor: record.color + '22' }]}>
                  <Text style={styles.imageOverlayText}>Tap to view full</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.imageActionRow}>
                <TouchableOpacity
                  style={[styles.imageActionBtn, { backgroundColor: dark ? '#1e3330' : '#e0f7f4', borderColor: '#2BAF9E' }]}
                  onPress={() => onReplaceImage(record.id)} activeOpacity={0.7}
                >
                  <Text style={styles.imageActionIcon}>🔄</Text>
                  <Text style={[styles.imageActionText, { color: '#2BAF9E' }]}>Replace</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.imageActionBtn, { backgroundColor: dark ? '#2e1a1a' : '#ffebee', borderColor: '#e53935' }]}
                  onPress={() => onRemoveImage(record.id)} activeOpacity={0.7}
                >
                  <Text style={styles.imageActionIcon}>🗑️</Text>
                  <Text style={[styles.imageActionText, { color: '#e53935' }]}>Remove</Text>
                </TouchableOpacity>
              </View>
            </>
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

  const [records, setRecords]           = useState(vaccinationRecords);
  const [viewingImage, setViewingImage] = useState(null);

  const C = {
    bg:     dark ? '#1a1f1e' : '#EEF7F6',
    text:   dark ? '#e8f0ef' : '#1a2e2c',
    sub:    dark ? '#7aada8' : '#6b7280',
    card:   dark ? '#242b2a' : '#ffffff',
    border: dark ? '#2e3837' : '#e0efed',
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') { Alert.alert('Permission needed', 'Please allow access to your photo library.'); return null; }
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true, aspect: [4, 3], quality: 0.8 });
    if (!result.canceled) return result.assets[0].uri;
    return null;
  };

  const handleAddImage = async (id) => {
    const uri = await pickImage();
    if (uri) setRecords(prev => prev.map(r => r.id === id ? { ...r, cardImage: uri } : r));
  };

  const handleReplaceImage = async (id) => {
    const uri = await pickImage();
    if (uri) setRecords(prev => prev.map(r => r.id === id ? { ...r, cardImage: uri } : r));
  };

  const handleRemoveImage = (id) => {
    Alert.alert('Remove Photo', 'Are you sure you want to remove this vaccination card photo?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: () => setRecords(prev => prev.map(r => r.id === id ? { ...r, cardImage: null } : r)) },
    ]);
  };

  const totalVaccines = [...new Set(records.map(r => r.vaccine))].length;

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: dark ? '#1a2e2c' : '#2BAF9E' }]} edges={['top', 'left', 'right']}>

      <SharedHeader title="💉 Vaccination History" subtitle="Your digital vaccination records" />

      <View style={{ flex: 1, backgroundColor: C.bg }}>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.statsRow}>
            {[
              { num: records.length,                           label: 'Total Doses',    color: '#2BAF9E' },
              { num: totalVaccines,                            label: 'Vaccines',       color: '#1e88e5' },
              { num: records.filter(r => r.cardImage).length,  label: 'Cards Uploaded', color: '#43a047' },
            ].map((s, i) => (
              <View key={i} style={[styles.statBox, { backgroundColor: C.card, borderColor: C.border }]}>
                <Text style={[styles.statNum, { color: s.color }]}>{s.num}</Text>
                <Text style={[styles.statLabel, { color: C.sub }]}>{s.label}</Text>
              </View>
            ))}
          </View>

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
            <DigitalCard
              key={record.id}
              record={record}
              dark={dark}
              onAddImage={handleAddImage}
              onReplaceImage={handleReplaceImage}
              onRemoveImage={handleRemoveImage}
              onViewImage={setViewingImage}
            />
          ))}
          <View style={{ height: 30 }} />
        </ScrollView>
      </View>

      <Modal visible={!!viewingImage} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={styles.modalClose} onPress={() => setViewingImage(null)} activeOpacity={0.8}>
            <Text style={styles.modalCloseText}>✕ Close</Text>
          </TouchableOpacity>
          {viewingImage?.cardImage && <Image source={{ uri: viewingImage.cardImage }} style={styles.fullImage} resizeMode="contain" />}
          <Text style={styles.modalCaption}>{viewingImage?.vaccine} — {viewingImage?.dose}</Text>
        </View>
      </Modal>
    </SafeAreaView>
  );
}