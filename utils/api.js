import Constants from 'expo-constants';

// In development, use your local IP. For EAS builds, set API_URL in your .env or eas.json.
// Fallback chain: eas extra.apiUrl → env var → hardcoded local dev IP
const BASE_URL =
  Constants.expoConfig?.extra?.apiUrl ??
  process.env.BASE_URL ??
  'http://192.168.1.245:8000/api';

export default BASE_URL;