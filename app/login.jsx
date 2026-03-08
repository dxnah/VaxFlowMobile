// app/login.jsx

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { users } from '../data/mockData';
import useAuth from '../hooks/useAuth';
import styles from '../styles/login';

const TEAL      = '#2BAF9E';
const TEAL_DARK = '#1b7b6b';

export default function LoginScreen() {
  const { login, error } = useAuth();
  const router = useRouter();

  const [username,       setUsername]       = useState('');
  const [password,       setPassword]       = useState('');
  const [showPassword,   setShowPassword]   = useState(false);
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const simulateLogin = () => {
    const demo = users.find(u => u.username === 'patient1');
    setUsername(demo.username);
    setPassword(demo.password);
  };

  return (
    <>
      <StatusBar backgroundColor="#f0faf9" barStyle="dark-content" />
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

          <View style={styles.brandSection}>
            <View style={styles.logoCircle}>
              <Image source={require('../assets/images/logoit.png')} style={styles.logo} resizeMode="contain" />
            </View>
            <Text style={styles.appName}>VaxFlow</Text>
            <Text style={styles.appTagline}>ML-Assisted Vaccine Management System</Text>
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

            <TouchableOpacity style={styles.forgotRow}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton} onPress={() => login(username, password)} activeOpacity={0.85}>
              <Ionicons name="log-in-outline" size={18} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.loginButtonText}>Log In</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.simulateBtn} onPress={simulateLogin} activeOpacity={0.7}>
              <Ionicons name="flash-outline" size={15} color={TEAL_DARK} style={{ marginRight: 6 }} />
              <Text style={styles.simulateBtnText}>Simulate Log In</Text>
            </TouchableOpacity>

            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>demo</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.demoBox}>
              <Text style={styles.demoTitle}>Demo Accounts</Text>
              {users.map(u => (
                <View key={u.id} style={styles.demoRow}>
                  <Ionicons name="person-circle-outline" size={14} color="#999" style={{ marginRight: 4 }} />
                  <Text style={styles.demoText}>{u.username} / {u.password}</Text>
                </View>
              ))}
            </View>

            <View style={styles.authLinks}>
              <Text style={styles.authLink}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/signup')}>
                <Text style={styles.authLinkBold}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}