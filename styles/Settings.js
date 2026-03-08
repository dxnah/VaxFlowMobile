import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  // Root / layout
  root:          { flex: 1 },
  scroll:        { flex: 1 },

  // Top bar
  topBar:        { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 14, flexDirection: 'row', alignItems: 'center', gap: 12 },
  topBarBtn:     { borderRadius: 10, width: 36, height: 36, justifyContent: 'center', alignItems: 'center' },
  topBarTitle:   { fontSize: 18, fontWeight: '700' },
  topBarSub:     { fontSize: 12 },

  // Avatar section
  avatarSection: { paddingVertical: 28, alignItems: 'center', gap: 8, borderBottomWidth: 1, marginBottom: 4 },
  avatarImg:     { width: 88, height: 88, borderRadius: 44, borderWidth: 3, borderColor: '#2BAF9E' },
  avatarFallback:{ width: 88, height: 88, borderRadius: 44, backgroundColor: '#E8F7F5', borderWidth: 3, borderColor: '#2BAF9E', justifyContent: 'center', alignItems: 'center' },
  avatarInitial: { fontSize: 32, fontWeight: '700' },
  avatarCamBtn:  { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#2BAF9E', borderRadius: 14, width: 28, height: 28, justifyContent: 'center', alignItems: 'center', borderWidth: 2 },
  avatarName:    { fontSize: 17, fontWeight: '700' },
  avatarHint:    { fontSize: 11 },

  // Section card
  sectionCard:   { marginHorizontal: 14, marginTop: 10, borderRadius: 16, overflow: 'hidden', shadowColor: '#2BAF9E', shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  sectionHeader: { paddingHorizontal: 18, paddingTop: 14, paddingBottom: 8, borderBottomWidth: 1 },
  sectionLabel:  { fontSize: 11, fontWeight: '700', color: '#2BAF9E', letterSpacing: 1.1, textTransform: 'uppercase' },

  // Field
  field:         { paddingHorizontal: 18, paddingVertical: 14 },
  fieldLabel:    { fontSize: 11, fontWeight: '600', marginBottom: 6, letterSpacing: 0.8, textTransform: 'uppercase' },

  // Toggle row
  toggleRow:     { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18, paddingVertical: 14 },
  toggleLeft:    { flexDirection: 'row', alignItems: 'center', flex: 1, gap: 10 },
  toggleIcon:    { fontSize: 20 },
  toggleTitle:   { fontSize: 15, fontWeight: '600' },
  toggleSub:     { fontSize: 12, marginTop: 1 },

  // Password strength
  strengthRow:   { flexDirection: 'row', gap: 4 },
  strengthBar:   { flex: 1, height: 4, borderRadius: 2 },
  strengthLabel: { fontSize: 11, marginTop: 4, fontWeight: '600' },

  // Buttons
  saveBtn:       { marginHorizontal: 14, marginTop: 14, borderRadius: 14, paddingVertical: 15, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8, elevation: 4 },
  saveBtnText:   { color: '#fff', fontSize: 16, fontWeight: '700' },
  cancelBtn:     { marginHorizontal: 14, marginTop: 8, borderRadius: 14, borderWidth: 2, paddingVertical: 13, alignItems: 'center' },
  cancelBtnText: { fontSize: 15, fontWeight: '600' },
  logoutBtn:     { borderWidth: 2, borderRadius: 14, paddingVertical: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  logoutBtnText: { fontSize: 15, fontWeight: '600' },

  // Password match messages
  passMsg:       { paddingHorizontal: 18, paddingBottom: 10, fontSize: 11 },
});