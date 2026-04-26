// app/information.jsx

import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '../context/UserContext';
import styles from '../styles/Information';
import BASE_URL from '../utils/api';

// ── Static educational content (never changes) ────────────────────────────────
const VACCINES_STATIC = [
  {
    id: 1,
    name: 'Anti-Rabies Vaccine (ARV)',
    emoji: '💉',
    color: '#e53935',
    bgLight: '#ffebee',
    bgDark: '#2d1a1a',
    disease: 'Rabies infection caused by bites or scratches from infected animals (dogs, cats, etc.)',
    age: 'All ages — children and adults exposed to animal bites',
    doses: '3–4 doses depending on treatment protocol',
    sideEffects: ['Pain or redness at the injection site', 'Fever', 'Headache', 'Nausea'],
  },
  {
    id: 2,
    name: 'BCG (Bacillus Calmette–Guérin)',
    emoji: '💉',
    color: '#1e88e5',
    bgLight: '#e3f2fd',
    bgDark: '#0d1e2d',
    disease: 'Tuberculosis (TB)',
    age: 'Newborns and infants (0–12 months)',
    doses: '1 dose',
    sideEffects: ['Small swelling at the injection site', 'Mild fever', 'Small scar on the arm after healing'],
  },
  {
    id: 3,
    name: 'DPT (Diphtheria, Pertussis, Tetanus)',
    emoji: '💉',
    color: '#8e24aa',
    bgLight: '#f3e5f5',
    bgDark: '#1f0d2d',
    disease: 'Diphtheria • Pertussis (Whooping Cough) • Tetanus',
    age: 'Infants and young children (starting at 2 months old)',
    doses: '3 primary doses + booster doses',
    sideEffects: ['Fever', 'Swelling at the injection site', 'Irritability', 'Mild fatigue'],
  },
  {
    id: 4,
    name: 'Hepatitis B',
    emoji: '💉',
    color: '#f57c00',
    bgLight: '#fff3e0',
    bgDark: '#2a1800',
    disease: 'Hepatitis B virus infection affecting the liver',
    age: 'Newborns, children, and adults',
    doses: '3 doses',
    sideEffects: ['Pain at the injection site', 'Fever', 'Fatigue', 'Headache'],
  },
  {
    id: 5,
    name: 'MMR (Measles, Mumps, Rubella)',
    emoji: '💉',
    color: '#00897b',
    bgLight: '#e0f2f1',
    bgDark: '#0a1e1c',
    disease: 'Measles • Mumps • Rubella (German measles)',
    age: 'Children (12 months and above)',
    doses: '2 doses',
    sideEffects: ['Mild fever', 'Rash', 'Swelling in glands', 'Pain at injection site'],
  },
  {
    id: 6,
    name: 'Polio (OPV – Oral Polio Vaccine)',
    emoji: '💉',
    color: '#43a047',
    bgLight: '#e8f5e9',
    bgDark: '#0d1f0e',
    disease: 'Poliomyelitis (Polio)',
    age: 'Infants and young children',
    doses: '3–4 doses',
    sideEffects: ['Mild fever', 'Irritability', 'Very rare allergic reaction'],
  },
  {
    id: 7,
    name: 'Varicella',
    emoji: '💉',
    color: '#d81b60',
    bgLight: '#fce4ec',
    bgDark: '#2d0d1a',
    disease: 'Chickenpox',
    age: 'Children (12 months and older)',
    doses: '2 doses',
    sideEffects: ['Mild rash', 'Fever', 'Redness or swelling at injection site'],
  },
];

const STATUS_COLOR = {
  in_stock:  '#4caf50',
  low_stock: '#ff9800',
  out_stock: '#f44336',
};

const STATUS_LABEL = {
  in_stock:  'In Stock',
  low_stock: 'Low Stock',
  out_stock: 'Out of Stock',
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function normalize(str = '') {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function matchVaccine(staticV, backendV) {
  const sName = normalize(staticV.name);
  const bName = normalize(backendV.name);
  // exact match or one contains the other's first word
  const sFirst = normalize(staticV.name.split(' ')[0]);
  const bFirst = normalize(backendV.name.split(' ')[0]);
  return sName === bName || sName.includes(bName) || bName.includes(sName) || sFirst === bFirst;
}

// ── VaccineCard ───────────────────────────────────────────────────────────────
function VaccineCard({ vaccine, dark }) {
  const [expanded, setExpanded] = useState(false);

  const C = {
    card:   dark ? '#242b2a' : '#ffffff',
    text:   dark ? '#e8f0ef' : '#1a2e2c',
    sub:    dark ? '#7aada8' : '#6b7280',
    border: dark ? '#2e3837' : '#f0f0f0',
    tagBg:  dark ? vaccine.bgDark : vaccine.bgLight,
  };

  const statusColor = STATUS_COLOR[vaccine.status] || '#9e9e9e';
  const statusLabel = STATUS_LABEL[vaccine.status] || 'Unknown';

  return (
    <TouchableOpacity
      activeOpacity={0.92}
      onPress={() => setExpanded(e => !e)}
      style={[styles.card, { backgroundColor: C.card, borderColor: C.border, shadowColor: vaccine.color }]}
    >
      <View style={[styles.cardAccent, { backgroundColor: vaccine.color }]} />

      <View style={styles.cardHeader}>
        <View style={[styles.iconCircle, { backgroundColor: dark ? vaccine.bgDark : vaccine.bgLight }]}>
          <Text style={{ fontSize: 22 }}>{vaccine.emoji}</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={[styles.vaccineName, { color: C.text }]}>{vaccine.name}</Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4, flexWrap: 'wrap' }}>
            <View style={[styles.diseaseTag, { backgroundColor: C.tagBg }]}>
              <Text style={[styles.diseaseTagText, { color: vaccine.color }]} numberOfLines={1}>
                {vaccine.disease.split('•')[0].trim()}
              </Text>
            </View>

            {/* FROM BACKEND — status badge */}
            {vaccine.status ? (
              <View style={{ backgroundColor: statusColor + '22', borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 }}>
                <Text style={{ fontSize: 10, color: statusColor, fontWeight: '700' }}>{statusLabel}</Text>
              </View>
            ) : null}
          </View>

          {/* FROM BACKEND — available count */}
          {vaccine.available !== undefined && vaccine.available !== null ? (
            <Text style={{ fontSize: 11, color: C.sub, marginTop: 2 }}>
              Available: {vaccine.available} doses
            </Text>
          ) : null}

          {/* FROM BACKEND — min stock warning */}
          {vaccine.min_stock !== undefined && vaccine.available !== undefined &&
           vaccine.available <= vaccine.min_stock && vaccine.available > 0 ? (
            <Text style={{ fontSize: 10, color: '#ff9800', marginTop: 1, fontWeight: '600' }}>
              ⚠️ Near minimum stock ({vaccine.min_stock})
            </Text>
          ) : null}
        </View>

        <View style={[
          styles.chevron,
          {
            borderColor: expanded ? vaccine.color : C.border,
            backgroundColor: expanded ? (dark ? vaccine.bgDark : vaccine.bgLight) : 'transparent',
          },
        ]}>
          <Text style={{ color: expanded ? vaccine.color : C.sub, fontSize: 12, fontWeight: '700' }}>
            {expanded ? '▲' : '▼'}
          </Text>
        </View>
      </View>

      {expanded && (
        <View style={[styles.cardBody, { borderTopColor: C.border }]}>
          {/* STATIC — educational info */}
          <View style={styles.detailRow}>
            <View style={[styles.detailLabel, { backgroundColor: dark ? vaccine.bgDark : vaccine.bgLight }]}>
              <Text style={[styles.detailLabelText, { color: vaccine.color }]}>🦠 DISEASE</Text>
            </View>
            <Text style={[styles.detailValue, { color: C.text }]}>{vaccine.disease}</Text>
          </View>

          <View style={styles.detailRow}>
            <View style={[styles.detailLabel, { backgroundColor: dark ? '#1e2928' : '#f0faf9' }]}>
              <Text style={[styles.detailLabelText, { color: '#1b7b6b' }]}>👶 AGE</Text>
            </View>
            <Text style={[styles.detailValue, { color: C.text }]}>{vaccine.age}</Text>
          </View>

          <View style={styles.detailRow}>
            <View style={[styles.detailLabel, { backgroundColor: dark ? '#1e2d3d' : '#e3f2fd' }]}>
              <Text style={[styles.detailLabelText, { color: '#1565c0' }]}>💉 DOSES</Text>
            </View>
            <Text style={[styles.detailValue, { color: C.text }]}>{vaccine.doses}</Text>
          </View>

          {/* FROM BACKEND — ml recommended */}
          {vaccine.ml_recommended !== undefined && vaccine.ml_recommended > 0 ? (
            <View style={styles.detailRow}>
              <View style={[styles.detailLabel, { backgroundColor: dark ? '#1e2928' : '#e8f5e9' }]}>
                <Text style={[styles.detailLabelText, { color: '#2e7d32' }]}>🧪 ML/DOSE</Text>
              </View>
              <Text style={[styles.detailValue, { color: C.text }]}>{vaccine.ml_recommended} mL</Text>
            </View>
          ) : null}

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

// ── InformationScreen ─────────────────────────────────────────────────────────
export default function InformationScreen() {
  const router = useRouter();
  const { darkMode } = useUser();
  const dark = darkMode;
  const topBar = dark ? '#1a2e2c' : '#2BAF9E';

  const [vaccines, setVaccines] = useState(VACCINES_STATIC);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);

  useEffect(() => {
    fetchVaccines();
  }, []);

  const fetchVaccines = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(`${BASE_URL}/api/vaccines/`);
      if (!res.ok) throw new Error('Server error');
      const data = await res.json();

      if (Array.isArray(data) && data.length > 0) {
        // Merge: static (educational) + backend (stock info)
        const merged = VACCINES_STATIC.map(staticV => {
          const backendV = data.find(b => matchVaccine(staticV, b));
          if (!backendV) return staticV;
          return {
            ...staticV,
            available:      backendV.available ?? null,
            status:         backendV.status ?? null,
            ml_recommended: backendV.ml_recommended ?? null,
            min_stock:      backendV.min_stock ?? null,
          };
        });
        setVaccines(merged);
      }
    } catch (e) {
      console.log('Vaccines fetch error:', e);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const inStock  = vaccines.filter(v => v.status === 'in_stock').length;
  const lowStock = vaccines.filter(v => v.status === 'low_stock').length;
  const outStock = vaccines.filter(v => v.status === 'out_stock').length;

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: topBar }]} edges={['top', 'left', 'right']}>
      <StatusBar translucent={false} backgroundColor={topBar} barStyle="light-content" />

      {/* Header */}
      <View style={[headerStyles.header, { backgroundColor: topBar }]}>
        <TouchableOpacity onPress={() => router.back()} style={headerStyles.backBtn} activeOpacity={0.7}>
          <Text style={headerStyles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={headerStyles.headerTitle}>💊 Vaccine Information</Text>
        <View style={{ width: 70 }} />
      </View>

      <View style={{ flex: 1, backgroundColor: dark ? '#1a1f1e' : '#EEF7F6' }}>
        {loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#2BAF9E" />
            <Text style={{ color: dark ? '#7aada8' : '#6b7280', marginTop: 10, fontSize: 13 }}>
              Loading vaccines...
            </Text>
          </View>
        ) : (
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Error banner */}
            {error && (
              <View style={{ backgroundColor: '#fff3e0', borderRadius: 10, padding: 12, margin: 16, borderLeftWidth: 4, borderLeftColor: '#ff9800' }}>
                <Text style={{ color: '#e65100', fontSize: 13 }}>
                  ⚠️ Could not load live stock data. Showing static information only.
                </Text>
                <TouchableOpacity onPress={fetchVaccines} style={{ marginTop: 6 }}>
                  <Text style={{ color: '#1565c0', fontSize: 13, fontWeight: '700' }}>Retry</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Intro */}
            <View style={[styles.introBanner, { backgroundColor: dark ? '#1e3330' : '#e0f7f4', borderColor: dark ? '#2e4a46' : '#b2dfdb' }]}>
              <Text style={[styles.introText, { color: dark ? '#7aada8' : '#1b7b6b' }]}>
                Tap any vaccine card to view full details including disease, recommended age, number of doses, and possible side effects.
              </Text>
            </View>

            {/* Stock summary row */}
            {!error && (
              <View style={{ flexDirection: 'row', gap: 8, marginHorizontal: 16, marginBottom: 12 }}>
                {[
                  { label: 'In Stock',  count: inStock,  color: '#4caf50' },
                  { label: 'Low Stock', count: lowStock, color: '#ff9800' },
                  { label: 'Out',       count: outStock, color: '#f44336' },
                ].map(item => (
                  <View key={item.label} style={{ flex: 1, backgroundColor: item.color + '18', borderRadius: 10, padding: 8, alignItems: 'center', borderWidth: 1, borderColor: item.color + '33' }}>
                    <Text style={{ fontSize: 18, fontWeight: '800', color: item.color }}>{item.count}</Text>
                    <Text style={{ fontSize: 10, color: item.color, fontWeight: '600' }}>{item.label}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Count */}
            <View style={styles.countRow}>
              <Text style={[styles.countLabel, { color: dark ? '#7aada8' : '#6b7280' }]}>AVAILABLE VACCINES</Text>
              <View style={[styles.countBadge, { backgroundColor: dark ? '#1b7b6b' : '#2BAF9E' }]}>
                <Text style={styles.countNum}>{vaccines.length}</Text>
              </View>
            </View>

            {/* Cards */}
            {vaccines.map(v => <VaccineCard key={v.id} vaccine={v} dark={dark} />)}
            <View style={{ height: 30 }} />
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const headerStyles = StyleSheet.create({
  header: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  backText:    { color: '#fff', fontWeight: '700', fontSize: 14 },
  headerTitle: { color: '#fff', fontWeight: '800', fontSize: 16 },
});