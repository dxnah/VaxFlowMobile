// app/information.jsx

import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Platform, StatusBar, StyleSheet } from 'react-native';
import SharedHeader from '../components/SharedHeader';
import { useUser } from '../context/UserContext';

const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) : 0;

const VACCINES = [
  { id: 1, name: 'Anti-Rabies Vaccine (ARV)', emoji: '💉', color: '#e53935', bgLight: '#ffebee', bgDark: '#2d1a1a', disease: 'Rabies infection caused by bites or scratches from infected animals (dogs, cats, etc.)', age: 'All ages — children and adults exposed to animal bites', doses: '3–4 doses depending on treatment protocol', sideEffects: ['Pain or redness at the injection site', 'Fever', 'Headache', 'Nausea'] },
  { id: 2, name: 'BCG (Bacillus Calmette–Guérin)', emoji: '💉', color: '#1e88e5', bgLight: '#e3f2fd', bgDark: '#0d1e2d', disease: 'Tuberculosis (TB)', age: 'Newborns and infants (0–12 months)', doses: '1 dose', sideEffects: ['Small swelling at the injection site', 'Mild fever', 'Small scar on the arm after healing'] },
  { id: 3, name: 'DPT (Diphtheria, Pertussis, Tetanus)', emoji: '💉', color: '#8e24aa', bgLight: '#f3e5f5', bgDark: '#1f0d2d', disease: 'Diphtheria • Pertussis (Whooping Cough) • Tetanus', age: 'Infants and young children (starting at 2 months old)', doses: '3 primary doses + booster doses', sideEffects: ['Fever', 'Swelling at the injection site', 'Irritability', 'Mild fatigue'] },
  { id: 4, name: 'Hepatitis B', emoji: '💉', color: '#f57c00', bgLight: '#fff3e0', bgDark: '#2a1800', disease: 'Hepatitis B virus infection affecting the liver', age: 'Newborns, children, and adults', doses: '3 doses', sideEffects: ['Pain at the injection site', 'Fever', 'Fatigue', 'Headache'] },
  { id: 5, name: 'MMR (Measles, Mumps, Rubella)', emoji: '💉', color: '#00897b', bgLight: '#e0f2f1', bgDark: '#0a1e1c', disease: 'Measles • Mumps • Rubella (German measles)', age: 'Children (12 months and above)', doses: '2 doses', sideEffects: ['Mild fever', 'Rash', 'Swelling in glands', 'Pain at injection site'] },
  { id: 6, name: 'Polio (OPV – Oral Polio Vaccine)', emoji: '💉', color: '#43a047', bgLight: '#e8f5e9', bgDark: '#0d1f0e', disease: 'Poliomyelitis (Polio)', age: 'Infants and young children', doses: '3–4 doses', sideEffects: ['Mild fever', 'Irritability', 'Very rare allergic reaction'] },
  { id: 7, name: 'Varicella', emoji: '💉', color: '#d81b60', bgLight: '#fce4ec', bgDark: '#2d0d1a', disease: 'Chickenpox', age: 'Children (12 months and older)', doses: '2 doses', sideEffects: ['Mild rash', 'Fever', 'Redness or swelling at injection site'] },
];

function VaccineCard({ vaccine, dark }) {
  const [expanded, setExpanded] = useState(false);
  const C = {
    card:   dark ? '#242b2a' : '#ffffff',
    text:   dark ? '#e8f0ef' : '#1a2e2c',
    sub:    dark ? '#7aada8' : '#6b7280',
    border: dark ? '#2e3837' : '#f0f0f0',
    tagBg:  dark ? vaccine.bgDark : vaccine.bgLight,
  };
  return (
    <TouchableOpacity activeOpacity={0.92} onPress={() => setExpanded(e => !e)} style={[styles.card, { backgroundColor: C.card, borderColor: C.border, shadowColor: vaccine.color }]}>
      <View style={[styles.cardAccent, { backgroundColor: vaccine.color }]} />
      <View style={styles.cardHeader}>
        <View style={[styles.iconCircle, { backgroundColor: dark ? vaccine.bgDark : vaccine.bgLight }]}>
          <Text style={{ fontSize: 22 }}>{vaccine.emoji}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.vaccineName, { color: C.text }]}>{vaccine.name}</Text>
          <View style={[styles.diseaseTag, { backgroundColor: C.tagBg }]}>
            <Text style={[styles.diseaseTagText, { color: vaccine.color }]} numberOfLines={1}>{vaccine.disease.split('•')[0].trim()}</Text>
          </View>
        </View>
        <View style={[styles.chevron, { borderColor: expanded ? vaccine.color : C.border, backgroundColor: expanded ? (dark ? vaccine.bgDark : vaccine.bgLight) : 'transparent' }]}>
          <Text style={{ color: expanded ? vaccine.color : C.sub, fontSize: 12, fontWeight: '700' }}>{expanded ? '▲' : '▼'}</Text>
        </View>
      </View>
      {expanded && (
        <View style={[styles.cardBody, { borderTopColor: C.border }]}>
          <View style={styles.detailRow}>
            <View style={[styles.detailLabel, { backgroundColor: dark ? vaccine.bgDark : vaccine.bgLight }]}><Text style={[styles.detailLabelText, { color: vaccine.color }]}>🦠 DISEASE</Text></View>
            <Text style={[styles.detailValue, { color: C.text }]}>{vaccine.disease}</Text>
          </View>
          <View style={styles.detailRow}>
            <View style={[styles.detailLabel, { backgroundColor: dark ? '#1e2928' : '#f0faf9' }]}><Text style={[styles.detailLabelText, { color: '#1b7b6b' }]}>👶 AGE</Text></View>
            <Text style={[styles.detailValue, { color: C.text }]}>{vaccine.age}</Text>
          </View>
          <View style={styles.detailRow}>
            <View style={[styles.detailLabel, { backgroundColor: dark ? '#1e2d3d' : '#e3f2fd' }]}><Text style={[styles.detailLabelText, { color: '#1565c0' }]}>💉 DOSES</Text></View>
            <Text style={[styles.detailValue, { color: C.text }]}>{vaccine.doses}</Text>
          </View>
          <View style={[styles.sideEffectsBox, { backgroundColor: dark ? '#1e2928' : '#fafafa', borderColor: C.border }]}>
            <Text style={[styles.sideEffectsTitle, { color: C.sub }]}>⚠️ POSSIBLE SIDE EFFECTS</Text>
            {vaccine.sideEffects.map((se, i) => (
              <View key={i} style={styles.sideEffectRow}>
                <View style={[styles.dot, { backgroundColor: vaccine.color }]} />
                <Text style={[styles.sideEffectText, { color: C.text }]}>{se}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
}

export default function InformationScreen() {
  const { darkMode } = useUser();
  const dark = darkMode;
  const topBar = dark ? '#1a2e2c' : '#2BAF9E';

  return (
    <View style={[styles.root, { backgroundColor: dark ? '#1a1f1e' : '#EEF7F6' }]}>
      <StatusBar backgroundColor={topBar} barStyle="light-content" translucent={false} />
      <View style={[styles.statusBarSpacer, { backgroundColor: topBar }]} />

      <SharedHeader title="💊 Vaccine Information" subtitle="Details about each available vaccine" />

      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={[styles.introBanner, { backgroundColor: dark ? '#1e3330' : '#e0f7f4', borderColor: dark ? '#2e4a46' : '#b2dfdb' }]}>
          <Text style={[styles.introText, { color: dark ? '#7aada8' : '#1b7b6b' }]}>Tap any vaccine card to view full details including disease, recommended age, number of doses, and possible side effects.</Text>
        </View>
        <View style={styles.countRow}>
          <Text style={[styles.countLabel, { color: dark ? '#7aada8' : '#6b7280' }]}>AVAILABLE VACCINES</Text>
          <View style={[styles.countBadge, { backgroundColor: dark ? '#1b7b6b' : '#2BAF9E' }]}>
            <Text style={styles.countNum}>{VACCINES.length}</Text>
          </View>
        </View>
        {VACCINES.map(v => <VaccineCard key={v.id} vaccine={v} dark={dark} />)}
        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  statusBarSpacer: { height: STATUS_BAR_HEIGHT },
  scrollContent: { paddingHorizontal: 14, paddingTop: 12 },
  introBanner: { borderWidth: 1, borderRadius: 12, padding: 12, marginBottom: 16 },
  introText: { fontSize: 13, lineHeight: 20 },
  countRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, paddingHorizontal: 2 },
  countLabel: { fontSize: 11, fontWeight: '700', letterSpacing: 1 },
  countBadge: { width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  countNum: { color: '#fff', fontSize: 13, fontWeight: '700' },
  card: { borderRadius: 14, borderWidth: 1, marginBottom: 12, overflow: 'hidden', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 3 },
  cardAccent: { height: 4, width: '100%' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  iconCircle: { width: 46, height: 46, borderRadius: 23, justifyContent: 'center', alignItems: 'center' },
  vaccineName: { fontSize: 13, fontWeight: '700', marginBottom: 5, lineHeight: 18 },
  diseaseTag: { alignSelf: 'flex-start', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2 },
  diseaseTagText: { fontSize: 11, fontWeight: '600' },
  chevron: { width: 28, height: 28, borderRadius: 8, borderWidth: 1.5, justifyContent: 'center', alignItems: 'center' },
  cardBody: { borderTopWidth: 1, padding: 14, paddingTop: 12, gap: 10 },
  detailRow: { gap: 5 },
  detailLabel: { alignSelf: 'flex-start', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3, marginBottom: 2 },
  detailLabelText: { fontSize: 10, fontWeight: '800', letterSpacing: 0.8 },
  detailValue: { fontSize: 13, lineHeight: 20 },
  sideEffectsBox: { borderWidth: 1, borderRadius: 10, padding: 12, marginTop: 4 },
  sideEffectsTitle: { fontSize: 10, fontWeight: '800', letterSpacing: 0.8, marginBottom: 8 },
  sideEffectRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 5 },
  dot: { width: 6, height: 6, borderRadius: 3, marginTop: 6 },
  sideEffectText: { fontSize: 13, flex: 1, lineHeight: 20 },
});