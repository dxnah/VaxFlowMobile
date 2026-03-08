import { Platform, StyleSheet } from 'react-native';

const TEAL      = '#2BAF9E';
const TEAL_DARK = '#1b7b6b';

export default StyleSheet.create({
  // Root
  container:       { flex: 1, backgroundColor: '#f0faf9' },
  scroll:          { flexGrow: 1 },

  // Top decorative band
  topBand:         { height: 8, backgroundColor: TEAL },
  topBandInner:    { height: 4, backgroundColor: TEAL_DARK, opacity: 0.4 },

  // Branding
  brandSection:    { alignItems: 'center', paddingTop: 36, paddingBottom: 24 },
  logoCircle:      { width: 84, height: 84, borderRadius: 42, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', shadowColor: TEAL, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 10, elevation: 6, marginBottom: 12 },
  logo:            { width: 56, height: 56 },
  appName:         { fontSize: 28, fontWeight: '800', color: TEAL_DARK, letterSpacing: 0.5 },
  appTagline:      { fontSize: 12, color: '#7aada8', marginTop: 3, fontWeight: '500' },

  // Login card
  card:            { marginHorizontal: 20, marginBottom: 32, backgroundColor: '#fff', borderRadius: 20, padding: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 16, elevation: 5 },
  loginHeading:    { fontSize: 22, fontWeight: '800', color: '#1a2e2c', marginBottom: 4 },
  loginSubheading: { fontSize: 13, color: '#7aada8', marginBottom: 20 },

  // Error
  errorBox:        { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffebee', borderRadius: 8, padding: 10, marginBottom: 16, borderLeftWidth: 3, borderLeftColor: '#e53935' },
  errorText:       { fontSize: 13, color: '#c62828', flex: 1 },

  // Inputs
  inputGroup:      { marginBottom: 14 },
  inputLabel:      { fontSize: 12, fontWeight: '700', color: '#555', marginBottom: 6, letterSpacing: 0.3 },
  inputRow:        { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f7f9fc', borderRadius: 12, borderWidth: 1.5, borderColor: '#e0e0e0', paddingHorizontal: 12, paddingVertical: 2 },
  inputRowFocused: { borderColor: TEAL, backgroundColor: '#f0faf9' },
  inputIcon:       { marginRight: 8 },
  inputField:      { flex: 1, fontSize: 14, color: '#333', paddingVertical: 12 },
  eyeBtn:          { padding: 4 },

  forgotRow:       { alignSelf: 'flex-end', marginBottom: 20 },
  forgotText:      { fontSize: 12, color: TEAL, fontWeight: '600' },

  // Login button
  loginButton:     { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: TEAL, borderRadius: 12, paddingVertical: 14, marginBottom: 12, shadowColor: TEAL, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 },
  loginButtonText: { fontSize: 16, fontWeight: '800', color: '#fff' },

  // Simulate button
  simulateBtn:     { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderWidth: 1.5, borderColor: TEAL_DARK, borderRadius: 12, paddingVertical: 11, marginBottom: 20 },
  simulateBtnText: { fontSize: 13, color: TEAL_DARK, fontWeight: '700' },

  // Divider
  dividerRow:      { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  dividerLine:     { flex: 1, height: 1, backgroundColor: '#eee' },
  dividerText:     { fontSize: 11, color: '#bbb', marginHorizontal: 10, fontWeight: '600', letterSpacing: 1 },

  // Demo box
  demoBox:         { backgroundColor: '#f7f9fc', borderRadius: 10, padding: 12, marginBottom: 20, borderWidth: 1, borderColor: '#eee' },
  demoTitle:       { fontSize: 11, fontWeight: '700', color: '#999', marginBottom: 6, letterSpacing: 0.5 },
  demoRow:         { flexDirection: 'row', alignItems: 'center', marginBottom: 3 },
  demoText:        { fontSize: 12, color: '#777', fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace' },

  // Auth links
  authLinks:       { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  authLink:        { fontSize: 13, color: '#999' },
  authLinkBold:    { fontSize: 13, color: TEAL, fontWeight: '800' },
});