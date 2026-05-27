import Constants from "expo-constants";

// Fallback chain:
//   1. EAS build injects BASE_URL → app.config.js bakes it into extra.baseUrl → read here at runtime
//   2. Local .env BASE_URL (dev server via process.env)
//   3. Hardcoded LAN IP for bare `expo start` without .env
const BASE_URL =
  Constants.expoConfig?.extra?.baseUrl ??
  Constants.expoConfig?.extra?.apiUrl ??
  process.env.BASE_URL ??
  process.env.API_URL ??
  "http://10.80.216.75:8000/api";

export default BASE_URL;
