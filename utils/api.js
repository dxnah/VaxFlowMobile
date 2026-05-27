import Constants from 'expo-constants';

// Fallback chain:
//   1. EAS build injects API_URL → app.config.js bakes it into extra.apiUrl → read here at runtime
//   2. Local .env API_URL (dev server via process.env)
//   3. Hardcoded LAN IP for bare `expo start` without .env
const BASE_URL =
  Constants.expoConfig?.extra?.apiUrl ??
  process.env.API_URL ??
  'http://10.80.216.75:8000/api';

export default BASE_URL;