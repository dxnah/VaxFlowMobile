// login.js - Styles for the Login screen

import { StyleSheet, Dimensions } from 'react-native';
import { colors } from './colors';

const { width } = Dimensions.get('window');
const isSmall   = width < 360;

export default StyleSheet.create({

  // ── Screen ──
  container: {
    flex: 1,
    backgroundColor: '#e6f4f1',
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: isSmall ? 16 : 20,
  },

  // ── Card ──
  card: {
    backgroundColor: colors.white,
    padding: isSmall ? 20 : 32,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    width: '100%',
  },

  // ── Logo Section ──
  logoSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 24,
  },
  logo: {
    width: isSmall ? 55 : 70,
    height: isSmall ? 55 : 70,
    flexShrink: 0,
  },
  titleSection: {
    flex: 1,
    justifyContent: 'center',
  },
  systemTitle: {
    fontSize: isSmall ? 16 : 20,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 4,
  },
  systemSubtitle: {
    fontSize: isSmall ? 10 : 12,
    color: colors.textLight,
    lineHeight: 16,
  },

  // ── Heading ──
  loginHeading: {
    fontSize: isSmall ? 16 : 18,
    fontWeight: '600',
    color: '#333',
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: 4,
  },
  loginSubheading: {
    fontSize: isSmall ? 11 : 12,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 20,
  },

  // ── Error ──
  errorBox: {
    backgroundColor: '#ffeeee',
    padding: 10,
    borderRadius: 6,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#ffcccc',
  },
  errorText: {
    color: '#cc3333',
    fontSize: 13,
    textAlign: 'center',
  },

  // ── Inputs ──
  inputContainer: {
    marginBottom: isSmall ? 14 : 20,
    textAlign: 'left',
  },
  inputLabel: {
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
    fontSize: isSmall ? 13 : 14,
  },
  inputField: {
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 6,
    padding: isSmall ? 10 : 12,
    fontSize: isSmall ? 13 : 14,
    color: colors.textDark,
    backgroundColor: '#fafafa',
  },

  // ── Password ──
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 6,
    backgroundColor: '#fafafa',
  },
  passwordField: {
    flex: 1,
    padding: isSmall ? 10 : 12,
    fontSize: isSmall ? 13 : 14,
    color: colors.textDark,
  },
  eyeBtn: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeIconSvg: {
    color: '#aaa',
  },

  // ── Login Button ──
  loginButton: {
    backgroundColor: '#24886E',
    padding: isSmall ? 12 : 14,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: isSmall ? 12 : 15,
    shadowColor: '#24886E',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  loginButtonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: isSmall ? 14 : 16,
  },

  // ── Demo Box ──
  demoBox: {
    backgroundColor: '#f0faf8',
    borderRadius: 8,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#b2dfdb',
  },
  demoTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  demoText: {
    fontSize: 12,
    color: colors.textMid,
  },

  // ── Simulate Button ──
  simulateBtn: {
  backgroundColor: 'transparent',
  borderWidth: 1.5,
  borderColor: '#24886E',
  borderRadius: 6,
  padding: 12,
  alignItems: 'center',
  marginBottom: 14,
},
simulateBtnText: {
  color: '#24886E',
  fontWeight: '600',
  fontSize: 14,
},

  // ── Auth Links ──
  authLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
    marginTop: 4,
  },
  authLink: {
    color: colors.textLight,
    fontSize: isSmall ? 12 : 14,
    textAlign: 'center',
  },
  authLinkBold: {
    color: '#24886E',
    fontSize: isSmall ? 12 : 14,
    fontWeight: '600',
  },
});