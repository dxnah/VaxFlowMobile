// signup.jsx

import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, KeyboardAvoidingView, Platform, Image
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/signup';

export default function SignupScreen() {
  const router = useRouter();
  const [fullName, setFullName]               = useState('');
  const [username, setUsername]               = useState('');
  const [email, setEmail]                     = useState('');
  const [password, setPassword]               = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword]       = useState(false);
  const [showConfirm, setShowConfirm]         = useState(false);

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
          <Text style={styles.signupHeading}>SIGN UP</Text>
          <Text style={styles.signupSubheading}>Create your patient account</Text>

          {/* Full Name */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Enter your full name"
              placeholderTextColor="#bbb"
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
            />
          </View>

          {/* Username */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Username</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Choose a username"
              placeholderTextColor="#bbb"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          </View>

          {/* Email */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Enter your email"
              placeholderTextColor="#bbb"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          {/* Password */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={styles.passwordField}
                placeholder="Choose a password"
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

          {/* Confirm Password */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Confirm Password</Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={styles.passwordField}
                placeholder="Repeat your password"
                placeholderTextColor="#bbb"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirm}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setShowConfirm(v => !v)}
                style={styles.eyeBtn}
                activeOpacity={0.7}>
                <Ionicons
                  name={showConfirm ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#aaa"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Terms */}
          <View style={styles.termsBox}>
            <Text style={styles.termsText}>
              By signing up, you agree to our{' '}
              <Text style={styles.termsLink}>Terms of Service</Text>
              {' '}and{' '}
              <Text style={styles.termsLink}>Privacy Policy</Text>.
            </Text>
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity
            style={styles.signupButton}
            activeOpacity={1}
            onPress={() => {}}>
            <Text style={styles.signupButtonText}>Create Account</Text>
          </TouchableOpacity>

          {/* Already have account */}
          <View style={styles.authLinks}>
            <Text style={styles.authLink}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <Text style={styles.authLinkBold}>Log In</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}