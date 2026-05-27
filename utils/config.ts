import Constants from 'expo-constants';

// ── VaxFlow App Configuration ─────────────────────────────────────────────────
// BASE_URL is injected via:
//   • EAS build  → eas.json env.BASE_URL  → app.config.js extra.baseUrl
//   • Local dev  → .env BASE_URL          → app.config.js extra.baseUrl
//   • Fallback   → hardcoded LAN IP below

const BASE_URL: string =
  Constants.expoConfig?.extra?.baseUrl ??
  Constants.expoConfig?.extra?.apiUrl ??
  process.env.BASE_URL ??
  'http://192.168.1.245:8000';   // ← change to your local IP for dev

export const AppConfig = {
  APP_NAME:            'VaxFlow',
  APP_VERSION:         '1.0.0',
  API_TIMEOUT:         10_000,
  MIN_PASSWORD_LENGTH: 6,
  BASE_URL,
  API_URL: `${BASE_URL}/api`,    // all API calls use this
} as const;

export default AppConfig;