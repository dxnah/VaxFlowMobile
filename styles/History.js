import { Platform, StatusBar, StyleSheet } from 'react-native';

const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) : 0;

export default StyleSheet.create({
  root:                     { flex: 1 },
  statusBarSpacer:          { height: STATUS_BAR_HEIGHT },
  scrollContent:            { paddingHorizontal: 14, paddingTop: 14 },

  // Stats row
  statsRow:                 { flexDirection: 'row', gap: 10, marginBottom: 14 },
  statBox:                  { flex: 1, borderWidth: 1, borderRadius: 12, padding: 12, alignItems: 'center' },
  statNum:                  { fontSize: 22, fontWeight: '800' },
  statLabel:                { fontSize: 11, marginTop: 2, fontWeight: '600' },

  // Patient card
  patientCard:              { borderWidth: 1, borderRadius: 12, padding: 14, marginBottom: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  patientLeft:              { flexDirection: 'row', alignItems: 'center', gap: 12 },
  patientAvatar:            { width: 44, height: 44, borderRadius: 22, borderWidth: 2, borderColor: '#2BAF9E' },
  patientAvatarPlaceholder: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  patientName:              { fontSize: 15, fontWeight: '700' },
  patientSub:               { fontSize: 12, marginTop: 1 },
  patientBadge:             { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5 },

  sectionTitle:             { fontSize: 11, fontWeight: '800', letterSpacing: 1, marginBottom: 10, paddingHorizontal: 2 },

  // Digital card
  digitalCard:              { borderRadius: 16, borderWidth: 1, marginBottom: 16, overflow: 'hidden', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.12, shadowRadius: 8, elevation: 4 },
  cardTop:                  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  cardTopLeft:              { flex: 1 },
  cardTopLabel:             { fontSize: 10, color: 'rgba(255,255,255,0.75)', fontWeight: '700', letterSpacing: 1.2, marginBottom: 4 },
  cardTopVaccine:           { fontSize: 15, color: '#ffffff', fontWeight: '800', marginBottom: 8 },
  doseBadge:                { alignSelf: 'flex-start', backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3 },
  doseBadgeText:            { fontSize: 12, color: '#ffffff', fontWeight: '700' },
  cardTopIcon:              { fontSize: 36, marginLeft: 10 },
  cardBody:                 { padding: 14, gap: 10 },
  cardRow:                  { flexDirection: 'row', gap: 14 },
  cardField:                { flex: 1 },
  fieldLabel:               { fontSize: 10, fontWeight: '700', letterSpacing: 0.8, marginBottom: 3 },
  fieldValue:               { fontSize: 13, fontWeight: '600', lineHeight: 18 },
  cardDivider:              { height: 1 },

  // Image section
  imageSection:             { borderWidth: 1, borderRadius: 12, overflow: 'hidden', marginTop: 4 },
  imageSectionLabel:        { fontSize: 10, fontWeight: '700', letterSpacing: 0.8, padding: 10, paddingBottom: 6 },
  cardImage:                { width: '100%', height: 180 },
  imageOverlay:             { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 8, alignItems: 'center' },
  imageOverlayText:         { color: '#fff', fontSize: 11, fontWeight: '600' },
  imageActionRow:           { flexDirection: 'row', gap: 10, padding: 10 },
  imageActionBtn:           { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 9, borderRadius: 8, borderWidth: 1.5 },
  imageActionIcon:          { fontSize: 14 },
  imageActionText:          { fontSize: 13, fontWeight: '700' },
  addImageBtn:              { alignItems: 'center', padding: 20, borderWidth: 1.5, borderStyle: 'dashed', borderRadius: 10, margin: 10, marginTop: 4, gap: 4 },
  addImageText:             { fontSize: 14, fontWeight: '700' },
  addImageSub:              { fontSize: 11 },

  // Verified row
  verifiedRow:              { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  verifiedBadge:            { borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  verifiedText:             { fontSize: 11, color: '#2BAF9E', fontWeight: '700' },
  recordId:                 { fontSize: 11, fontWeight: '600' },

  // Full image modal
  modalOverlay:             { flex: 1, backgroundColor: 'rgba(0,0,0,0.92)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalClose:               { position: 'absolute', top: 50, right: 20, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8 },
  modalCloseText:           { color: '#fff', fontWeight: '600', fontSize: 14 },
  fullImage:                { width: '100%', height: 300, borderRadius: 12 },
  modalCaption:             { color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 14, textAlign: 'center' },
});