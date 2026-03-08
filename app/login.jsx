//login.jsx

import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, KeyboardAvoidingView, Platform, Image
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import useAuth from '../hooks/useAuth';
import styles from '../styles/login';
import { users } from '../data/mockData';

export default function LoginScreen() {
  const { login, error } = useAuth();
  const [username, setUsername]         = useState('');
  const [password, setPassword]         = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // ── Simulate fills in patient1 credentials ──
const simulateLogin = () => {
  const patient1 = users.find(u => u.username === 'patient1');
  setUsername(patient1.username);
  setPassword(patient1.password);
};

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>

        <View style={styles.card}>

          {/* Logo Row */}
          <View style={styles.logoSection}>
            <Image
              source={require('../assets/images/logoit.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <View style={styles.titleSection}>
              <Text style={styles.systemTitle}>VaxFlow</Text>
              <Text style={styles.systemSubtitle}>
                A Machine Learning Assisted Vaccine Management System
              </Text>
            </View>
          </View>

          {/* Heading */}
          <Text style={styles.loginHeading}>LOG IN</Text>
          <Text style={styles.loginSubheading}>Input admin credentials to continue</Text>

          {/* Error */}
          {error ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          {/* Username */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Username</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Username"
              placeholderTextColor="#bbb"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          </View>

          {/* Password */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={styles.passwordField}
                placeholder="Password"
                placeholderTextColor="#bbb"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(v => !v)}
                style={styles.eyeBtn}
                activeOpacity={0.7}>
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#aaa"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => login(username, password)}
            activeOpacity={0.85}>
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>

          {/* Simulate Login */}
          <TouchableOpacity
            style={styles.simulateBtn}
            onPress={simulateLogin}
            activeOpacity={0.7}>
            <Text style={styles.simulateBtnText}>Simulate Log In</Text>
          </TouchableOpacity>

          {/* Demo accounts */}
            <View style={styles.demoBox}>
            <Text style={styles.demoTitle}>Demo Accounts:</Text>
            {users.map(u => (
                <Text key={u.id} style={styles.demoText}>
                {u.username} / {u.password}
                </Text>
            ))}
            </View>

          {/* Auth links */}
          <View style={styles.authLinks}>
            <Text style={styles.authLink}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/signup')}>
              <Text style={styles.authLinkBold}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={{ marginTop: 8 }}>
            <Text style={styles.authLink}>Forgot Password?</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}