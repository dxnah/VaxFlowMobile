import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView, Platform,
  ScrollView,
  StatusBar,
  Text, TextInput, TouchableOpacity,
  View
} from 'react-native';
import useAuth from '../hooks/useAuth';
import styles from '../styles/login';

const TEAL      = '#2BAF9E';
const TEAL_DARK = '#1b7b6b';

export default function LoginScreen() {
  const { login, error, loading } = useAuth();
  const router = useRouter();

  const [username,       setUsername]       = useState('');
  const [password,       setPassword]       = useState('');
  const [showPassword,   setShowPassword]   = useState(false);
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);


  return (
    <>
      <StatusBar backgroundColor="#f0faf9" barStyle="dark-content" />
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

          <View style={styles.topBand}>
            <View style={styles.topBandInner} />
          </View>

          <View style={styles.brandSection}>
            <View style={styles.logoCircle}>
              <Image source={require('../assets/images/logoit.png')} style={styles.logo} resizeMode="contain" />
            </View>
            <Text style={styles.appName}>VaxFlow</Text>
            <Text style={styles.appTagline}>ML-Assisted Vaccine Management</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.loginHeading}>Welcome Back</Text>
            <Text style={styles.loginSubheading}>Sign in to your account</Text>

            {error ? (
              <View style={styles.errorBox}>
                <Ionicons name="alert-circle-outline" size={16} color="#c62828" style={{ marginRight: 6 }} />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Username</Text>
              <View style={[styles.inputRow, usernameFocused && styles.inputRowFocused]}>
                <Ionicons name="person-outline" size={18} color={usernameFocused ? TEAL : '#aaa'} style={styles.inputIcon} />
                <TextInput
                  style={styles.inputField}
                  placeholder="Enter your username"
                  placeholderTextColor="#bbb"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                  onFocus={() => setUsernameFocused(true)}
                  onBlur={() => setUsernameFocused(false)}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={[styles.inputRow, passwordFocused && styles.inputRowFocused]}>
                <Ionicons name="lock-closed-outline" size={18} color={passwordFocused ? TEAL : '#aaa'} style={styles.inputIcon} />
                <TextInput
                  style={[styles.inputField, { flex: 1 }]}
                  placeholder="Enter your password"
                  placeholderTextColor="#bbb"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                />
                <TouchableOpacity onPress={() => setShowPassword(v => !v)} style={styles.eyeBtn} activeOpacity={0.7}>
                  <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="#aaa" />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.loginButton, loading && { opacity: 0.7 }]}
              onPress={() => login(username, password)}
              disabled={loading}
              activeOpacity={0.85}>
              {loading ? (
                <>
                  <Ionicons name="sync-outline" size={18} color="#fff" style={{ marginRight: 8 }} />
                  <Text style={styles.loginButtonText}>Logging in...</Text>
                </>
              ) : (
                <>
                  <Ionicons name="log-in-outline" size={18} color="#fff" style={{ marginRight: 8 }} />
                  <Text style={styles.loginButtonText}>Log In</Text>
                </>
              )}
            </TouchableOpacity>

            <View style={styles.authLinks}>
              <Text style={styles.authLink}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/signup')}>
                <Text style={styles.authLinkBold}>Sign Up</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.forgotRow}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>    
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}