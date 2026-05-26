import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { UserProvider, useUser } from '../context/UserContext';

// Inner component so it can use the UserProvider context
function AppContent() {
  const { token, hydrated } = useUser();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (!hydrated) return;

    const inAuthGroup = segments[0] === 'login' || segments[0] === 'signup' || segments[0] === undefined;
    if (!token && !inAuthGroup) {
      router.replace('/login');
    } else if (token && inAuthGroup) {
      router.replace('/dashboard');
    }
  }, [token, hydrated, segments]);

  if (!hydrated) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#EEF7F6' }}>
        <ActivityIndicator size="large" color="#2BAF9E" />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function Layout() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}