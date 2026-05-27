// components/SkeletonLoader.tsx
// Shared animated skeleton shimmer component

import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, ViewStyle } from 'react-native';

interface SkeletonBoxProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
  dark?: boolean;
}

export function SkeletonBox({ width = '100%', height = 16, borderRadius = 8, style, dark = false }: SkeletonBoxProps) {
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, { toValue: 1, duration: 900, useNativeDriver: true }),
        Animated.timing(shimmer, { toValue: 0, duration: 900, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const opacity = shimmer.interpolate({ inputRange: [0, 1], outputRange: [0.4, 0.85] });

  return (
    <Animated.View
      style={[
        {
          width: width as any,
          height,
          borderRadius,
          backgroundColor: dark ? '#2e3837' : '#dde8e6',
          opacity,
        },
        style,
      ]}
    />
  );
}

// ── History Skeleton ──────────────────────────────────────────────────────────
export function HistorySkeleton({ dark = false }: { dark?: boolean }) {
  const C = {
    bg:   dark ? '#1a1f1e' : '#EEF7F6',
    card: dark ? '#242b2a' : '#ffffff',
    border: dark ? '#2e3837' : '#e0efed',
  };

  const Card = () => (
    <View style={[s.card, { backgroundColor: C.card, borderColor: C.border }]}>
      {/* coloured top bar */}
      <View style={[s.cardTop, { backgroundColor: dark ? '#2e3837' : '#c8e6e3' }]}>
        <View style={{ flex: 1, gap: 8 }}>
          <SkeletonBox width="40%" height={10} dark={dark} />
          <SkeletonBox width="65%" height={18} dark={dark} />
          <SkeletonBox width="30%" height={14} borderRadius={20} dark={dark} />
        </View>
        <SkeletonBox width={32} height={32} borderRadius={16} dark={dark} />
      </View>
      {/* body rows */}
      <View style={s.cardBody}>
        <View style={s.row}>
          <View style={{ flex: 1, gap: 6 }}>
            <SkeletonBox width="50%" height={10} dark={dark} />
            <SkeletonBox width="80%" height={14} dark={dark} />
          </View>
          <View style={{ flex: 1, gap: 6 }}>
            <SkeletonBox width="50%" height={10} dark={dark} />
            <SkeletonBox width="80%" height={14} dark={dark} />
          </View>
        </View>
        <View style={[s.divider, { backgroundColor: C.border }]} />
        <SkeletonBox width="45%" height={10} dark={dark} />
        <SkeletonBox width="70%" height={14} dark={dark} style={{ marginTop: 4 }} />
        {/* image placeholder */}
        <View style={[s.imgBox, { backgroundColor: dark ? '#1e2928' : '#f4faf9', borderColor: C.border }]}>
          <SkeletonBox width="40%" height={10} dark={dark} />
          <SkeletonBox width="100%" height={90} borderRadius={10} dark={dark} style={{ marginTop: 10 }} />
        </View>
        {/* verified row */}
        <View style={[s.row, { marginTop: 10 }]}>
          <SkeletonBox width={110} height={26} borderRadius={12} dark={dark} />
          <SkeletonBox width={50} height={14} dark={dark} />
        </View>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      {/* stats row */}
      <View style={s.statsRow}>
        {[1, 2, 3].map(i => (
          <View key={i} style={[s.statBox, { backgroundColor: C.card, borderColor: C.border }]}>
            <SkeletonBox width={32} height={22} dark={dark} style={{ alignSelf: 'center' }} />
            <SkeletonBox width="70%" height={10} dark={dark} style={{ marginTop: 6, alignSelf: 'center' }} />
          </View>
        ))}
      </View>
      {/* patient card */}
      <View style={[s.patientCard, { backgroundColor: C.card, borderColor: C.border }]}>
        <SkeletonBox width={44} height={44} borderRadius={22} dark={dark} />
        <View style={{ flex: 1, gap: 8, marginLeft: 12 }}>
          <SkeletonBox width="50%" height={14} dark={dark} />
          <SkeletonBox width="35%" height={10} dark={dark} />
        </View>
        <SkeletonBox width={48} height={22} borderRadius={8} dark={dark} />
      </View>
      {/* section label */}
      <SkeletonBox width={160} height={11} dark={dark} style={{ marginHorizontal: 16, marginBottom: 10 }} />
      {/* cards */}
      <Card />
      <Card />
    </View>
  );
}

// ── Schedule Skeleton ─────────────────────────────────────────────────────────
export function ScheduleSkeleton({ dark = false }: { dark?: boolean }) {
  const C = {
    bg:   dark ? '#1a1f1e' : '#d4ede7',
    card: dark ? '#242b2a' : '#ffffff',
    border: dark ? '#2e3837' : '#e0e0e0',
  };

  return (
    <View style={{ flex: 1, backgroundColor: C.bg, padding: 16, paddingTop: 12 }}>
      {/* progress card */}
      <View style={[s.card, { backgroundColor: C.card, borderColor: C.border, padding: 16, marginBottom: 16 }]}>
        <View style={[s.row, { marginBottom: 12 }]}>
          <SkeletonBox width="50%" height={14} dark={dark} />
          <SkeletonBox width={80} height={24} borderRadius={20} dark={dark} />
        </View>
        <SkeletonBox width="100%" height={8} borderRadius={4} dark={dark} />
        <SkeletonBox width="25%" height={11} dark={dark} style={{ marginTop: 6, marginBottom: 16 }} />
        {/* step circles */}
        <View style={[s.row, { justifyContent: 'space-between' }]}>
          {[1, 2, 3, 4].map(i => (
            <View key={i} style={{ alignItems: 'center', gap: 6 }}>
              <SkeletonBox width={28} height={28} borderRadius={14} dark={dark} />
              <SkeletonBox width={24} height={10} dark={dark} />
            </View>
          ))}
        </View>
      </View>
      {/* subtitle */}
      <SkeletonBox width="80%" height={13} dark={dark} style={{ marginBottom: 12 }} />
      {/* dose cards */}
      {[1, 2, 3, 4].map(i => (
        <View key={i} style={[s.doseCard, { backgroundColor: C.card, borderColor: C.border }]}>
          <SkeletonBox width={24} height={24} borderRadius={6} dark={dark} style={{ marginRight: 12 }} />
          <View style={{ flex: 1, gap: 8 }}>
            <SkeletonBox width="45%" height={14} dark={dark} />
            <SkeletonBox width="55%" height={12} dark={dark} />
          </View>
        </View>
      ))}
    </View>
  );
}

// ── Registration Skeleton ─────────────────────────────────────────────────────
export function RegistrationSkeleton({ dark = false }: { dark?: boolean }) {
  const C = {
    bg:   dark ? '#1a1f1e' : '#f0faf8',
    card: dark ? '#242b2a' : '#ffffff',
    border: dark ? '#2e3837' : '#d1ece8',
  };

  return (
    <View style={{ flex: 1, backgroundColor: C.bg, padding: 20 }}>
      {/* header row */}
      <View style={[s.row, { marginBottom: 16 }]}>
        <View style={{ gap: 8 }}>
          <SkeletonBox width={160} height={17} dark={dark} />
          <SkeletonBox width={90} height={12} dark={dark} />
        </View>
        <SkeletonBox width={80} height={40} borderRadius={12} dark={dark} />
      </View>
      {/* registration cards */}
      {[1, 2, 3].map(i => (
        <View key={i} style={[s.regCard, { backgroundColor: C.card, borderColor: C.border }]}>
          <SkeletonBox width={48} height={48} borderRadius={24} dark={dark} />
          <View style={{ flex: 1, gap: 8, marginLeft: 14 }}>
            <SkeletonBox width="60%" height={15} dark={dark} />
            <SkeletonBox width="45%" height={12} dark={dark} />
            <SkeletonBox width="55%" height={11} dark={dark} />
          </View>
          <View style={{ alignItems: 'flex-end', gap: 8 }}>
            <SkeletonBox width={52} height={22} borderRadius={8} dark={dark} />
            <SkeletonBox width={16} height={16} borderRadius={4} dark={dark} />
          </View>
        </View>
      ))}
    </View>
  );
}

const s = StyleSheet.create({
  card:       { borderRadius: 16, borderWidth: 1, marginHorizontal: 16, marginBottom: 16, overflow: 'hidden' },
  cardTop:    { padding: 16, flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  cardBody:   { padding: 16, gap: 10 },
  row:        { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  divider:    { height: 1, marginVertical: 4 },
  imgBox:     { borderWidth: 1, borderRadius: 10, padding: 12, marginTop: 4 },
  statsRow:   { flexDirection: 'row', gap: 10, marginHorizontal: 16, marginTop: 12, marginBottom: 12 },
  statBox:    { flex: 1, borderRadius: 12, borderWidth: 1, padding: 12 },
  patientCard:{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, borderRadius: 14, borderWidth: 1, padding: 14, marginBottom: 12 },
  doseCard:   { borderLeftWidth: 4, borderLeftColor: '#d0d0d0', padding: 14, borderRadius: 8, marginBottom: 12, flexDirection: 'row', alignItems: 'center', borderWidth: 1 },
  regCard:    { borderRadius: 16, borderWidth: 1.5, padding: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 12, elevation: 1 },
});

// ── VaccineList Skeleton (dashboard widget) ───────────────────────────────────
export function VaccineListSkeleton({ dark = false }: { dark?: boolean }) {
  const C = {
    card: dark ? '#242b2a' : '#ffffff',
    border: dark ? '#2e3837' : '#e0efed',
  };

  return (
    <View style={{ paddingHorizontal: 0 }}>
      {[1, 2, 3, 4].map(i => (
        <View key={i} style={{
          backgroundColor: C.card, borderLeftWidth: 4,
          borderLeftColor: dark ? '#2e3837' : '#d0e8e4',
          borderRadius: 8, padding: 14, marginBottom: 10,
          flexDirection: 'row', alignItems: 'center', gap: 12,
        }}>
          <View style={{ flex: 1, gap: 8 }}>
            <SkeletonBox width="65%" height={15} dark={dark} />
            <SkeletonBox width="45%" height={12} dark={dark} />
          </View>
          <SkeletonBox width={60} height={20} borderRadius={6} dark={dark} />
        </View>
      ))}
    </View>
  );
}

// ── InformationScreen Skeleton (full vaccine info page) ───────────────────────
export function VaccineInfoSkeleton({ dark = false }: { dark?: boolean }) {
  const C = {
    bg:     dark ? '#1a1f1e' : '#EEF7F6',
    card:   dark ? '#242b2a' : '#ffffff',
    border: dark ? '#2e3837' : '#f0f0f0',
    banner: dark ? '#1e3330' : '#e0f7f4',
  };

  const CardSkel = ({ accentColor }: { accentColor: string }) => (
    <View style={{
      backgroundColor: C.card, borderRadius: 14, borderWidth: 1,
      borderColor: C.border, marginHorizontal: 16, marginBottom: 12,
      overflow: 'hidden', elevation: 2,
    }}>
      {/* accent bar */}
      <View style={{ height: 4, backgroundColor: accentColor, opacity: 0.35 }} />
      <View style={{ padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        {/* icon circle */}
        <SkeletonBox width={44} height={44} borderRadius={22} dark={dark} />
        <View style={{ flex: 1, gap: 8 }}>
          <SkeletonBox width="70%" height={15} dark={dark} />
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <SkeletonBox width={90} height={20} borderRadius={6} dark={dark} />
            <SkeletonBox width={60} height={20} borderRadius={6} dark={dark} />
          </View>
          <SkeletonBox width="40%" height={11} dark={dark} />
        </View>
        {/* chevron */}
        <SkeletonBox width={28} height={28} borderRadius={14} dark={dark} />
      </View>
    </View>
  );

  const accentColors = ['#e53935', '#1e88e5', '#8e24aa', '#f57c00', '#00897b', '#43a047', '#d81b60'];

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      {/* intro banner */}
      <View style={{ backgroundColor: C.banner, borderRadius: 12, margin: 16, padding: 14, gap: 8 }}>
        <SkeletonBox width="90%" height={12} dark={dark} />
        <SkeletonBox width="70%" height={12} dark={dark} />
      </View>

      {/* stock summary row */}
      <View style={{ flexDirection: 'row', gap: 8, marginHorizontal: 16, marginBottom: 12 }}>
        {['#4caf50', '#ff9800', '#f44336'].map((color, i) => (
          <View key={i} style={{ flex: 1, backgroundColor: C.card, borderRadius: 10, padding: 10, alignItems: 'center', borderWidth: 1, borderColor: C.border, gap: 6 }}>
            <SkeletonBox width={28} height={22} dark={dark} style={{ alignSelf: 'center' }} />
            <SkeletonBox width="70%" height={10} dark={dark} />
          </View>
        ))}
      </View>

      {/* count row */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 16, marginBottom: 12 }}>
        <SkeletonBox width={140} height={11} dark={dark} />
        <SkeletonBox width={28} height={28} borderRadius={14} dark={dark} />
      </View>

      {/* vaccine cards */}
      {accentColors.map((color, i) => (
        <CardSkel key={i} accentColor={color} />
      ))}
    </View>
  );
}