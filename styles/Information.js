import { Platform, StatusBar, StyleSheet } from 'react-native';

const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) : 0;

export default StyleSheet.create({
  root:             { flex: 1 },
  statusBarSpacer:  { height: STATUS_BAR_HEIGHT },
  scrollContent:    { paddingHorizontal: 14, paddingTop: 12 },

  // Intro banner
  introBanner:      { borderWidth: 1, borderRadius: 12, padding: 12, marginBottom: 16 },
  introText:        { fontSize: 13, lineHeight: 20 },

  // Count row
  countRow:         { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, paddingHorizontal: 2 },
  countLabel:       { fontSize: 11, fontWeight: '700', letterSpacing: 1 },
  countBadge:       { width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  countNum:         { color: '#fff', fontSize: 13, fontWeight: '700' },

  // Vaccine card
  card:             { borderRadius: 14, borderWidth: 1, marginBottom: 12, overflow: 'hidden', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 3 },
  cardAccent:       { height: 4, width: '100%' },
  cardHeader:       { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  iconCircle:       { width: 46, height: 46, borderRadius: 23, justifyContent: 'center', alignItems: 'center' },
  vaccineName:      { fontSize: 13, fontWeight: '700', marginBottom: 5, lineHeight: 18 },
  diseaseTag:       { alignSelf: 'flex-start', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2 },
  diseaseTagText:   { fontSize: 11, fontWeight: '600' },
  chevron:          { width: 28, height: 28, borderRadius: 8, borderWidth: 1.5, justifyContent: 'center', alignItems: 'center' },

  // Expanded body
  cardBody:         { borderTopWidth: 1, padding: 14, paddingTop: 12, gap: 10 },
  detailRow:        { gap: 5 },
  detailLabel:      { alignSelf: 'flex-start', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3, marginBottom: 2 },
  detailLabelText:  { fontSize: 10, fontWeight: '800', letterSpacing: 0.8 },
  detailValue:      { fontSize: 13, lineHeight: 20 },

  // Side effects
  sideEffectsBox:   { borderWidth: 1, borderRadius: 10, padding: 12, marginTop: 4 },
  sideEffectsTitle: { fontSize: 10, fontWeight: '800', letterSpacing: 0.8, marginBottom: 8 },
  sideEffectRow:    { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 5 },
  dot:              { width: 6, height: 6, borderRadius: 3, marginTop: 6 },
  sideEffectText:   { fontSize: 13, flex: 1, lineHeight: 20 },
});