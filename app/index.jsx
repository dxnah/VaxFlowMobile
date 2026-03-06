import React, { useEffect } from 'react';
import {
  View, Text, StyleSheet, Image, StatusBar, Dimensions
} from 'react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/login');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#e6f4f1" />

      {/* Logo */}
      <Image
        source={require('../assets/images/logoit.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* App Name */}
      <Text style={styles.appName}>VaxFlow</Text>
      <Text style={styles.tagline}>
        A Machine Learning Assisted{'\n'}Vaccine Management System
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f4f1',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  logo: {
    width: width < 360 ? 110 : 140,
    height: width < 360 ? 110 : 140,
    marginBottom: 24,
  },
  appName: {
    fontSize: width < 360 ? 30 : 36,
    fontWeight: '900',
    color: '#24886E',
    letterSpacing: 2,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 13,
    color: '#888',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 48,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 8,
    position: 'absolute',
    bottom: 60,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#b2dfdb',
  },
  dotActive: {
    backgroundColor: '#24886E',
    width: 24,
  },
});