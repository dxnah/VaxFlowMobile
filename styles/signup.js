// signup.js - Styles for the Signup screen

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
    paddingVertical: 32,
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
  signupHeading: {
    fontSize: isSmall ? 16 : 18,
    fontWeight: '600',
    color: '#333',
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: 4,
  },
  signupSubheading: {
    fontSize: isSmall ? 11 : 12,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 20,
  },

  // ── Inputs ──
  inputContainer: {
    marginBottom: isSmall ? 14 : 18,
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

  // ── Terms ──
  termsBox: {
    marginBottom: 16,
  },
  termsText: {
    fontSize: 12,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 18,
  },
  termsLink: {
    color: '#24886E',
    fontWeight: '600',
  },

  // ── Signup Button ──
  signupButton: {
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
  signupButtonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: isSmall ? 14 : 16,
  },

  // ── Auth Links ──
  authLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
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