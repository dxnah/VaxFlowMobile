import Constants from 'expo-constants';

const BASE_URL = Constants.expoConfig?.extra?.apiUrl ?? 'http://10.194.32.75:8000/api';

export default BASE_URL;