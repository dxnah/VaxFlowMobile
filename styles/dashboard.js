// dashboard.js - Styles for the Dashboard screen

import { StyleSheet } from 'react-native';
import { colors } from './colors';

export default StyleSheet.create({

  // ── Screen ──
  safe: {
    flex: 1,
    backgroundColor: '#f0faf8',
  },
  container: {
    flex: 1,
    padding: 20,
  },

  // ── Header ──
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  greeting: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textDark,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textLight,
    marginTop: 2,
  },
  logoutBtn: {
    backgroundColor: colors.dangerLight,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.dangerBorder,
  },
  logoutText: {
    color: colors.danger,
    fontWeight: '700',
    fontSize: 13,
  },

  // ── Stats Row ──
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    borderTopWidth: 4,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 10,
    color: colors.textLight,
    marginTop: 2,
    textAlign: 'center',
    fontWeight: '500',
  },

  // ── Section Title ──
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textDark,
    marginBottom: 12,
    marginTop: 4,
  },

  // ── Announcement Card ──
  announcementCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  announcementTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 4,
  },
  announcementMessage: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
});