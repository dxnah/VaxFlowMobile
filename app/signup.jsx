import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from '../styles/login';

const TEAL      = '#2BAF9E';
const TEAL_DARK = '#1b7b6b';
import BASE_URL from '../utils/api'; 

export default function SignupScreen() {
  const router = useRouter();

  const [fullName,         setFullName]         = useState('');
  const [username,         setUsername]         = useState('');
  const [email,            setEmail]            = useState('');
  const [phone,        setPhone]        = useState('');
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [password,         setPassword]         = useState('');
  const [confirmPassword,  setConfirmPassword]  = useState('');
  const [showPassword,     setShowPassword]     = useState(false);
  const [showConfirm,      setShowConfirm]      = useState(false);
  const [fullNameFocused,  setFullNameFocused]  = useState(false);
  const [usernameFocused,  setUsernameFocused]  = useState(false);
  const [emailFocused,     setEmailFocused]     = useState(false);
  const [passwordFocused,  setPasswordFocused]  = useState(false);
  const [confirmFocused,   setConfirmFocused]   = useState(false);
  const [errorMsg,         setErrorMsg]         = useState('');
  const [loading,          setLoading]          = useState(false);

  const handleSignup = async () => {
    if (!fullName || !username || !password) {
      setErrorMsg('Full name, username, and password are required');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/signup/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
          name: fullName,
          email,
          phone,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setErrorMsg('');
        alert('Account created successfully!');
        router.push('/login');
      } else {
        setErrorMsg(data.error || 'Signup failed');
      }
    } catch (err) {
      setErrorMsg('Cannot connect to server. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <StatusBar backgroundColor="#f0faf9" barStyle="dark-content" translucent={false} />
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
            <Text style={styles.loginHeading}>Create Account</Text>
            <Text style={styles.loginSubheading}>Sign up to get started</Text>

            {errorMsg ? (
              <View style={styles.errorBox}>
                <Ionicons name="alert-circle-outline" size={16} color="#c62828" style={{ marginRight: 6 }} />
                <Text style={styles.errorText}>{errorMsg}</Text>
              </View>
            ) : null}

            {/* Full Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <View style={[styles.inputRow, fullNameFocused && styles.inputRowFocused]}>
                <Ionicons name="person-outline" size={18} color={fullNameFocused ? TEAL : '#aaa'} style={styles.inputIcon} />
                <TextInput style={styles.inputField} placeholder="Enter your full name" placeholderTextColor="#bbb" value={fullName} onChangeText={setFullName} autoCapitalize="words" onFocus={() => setFullNameFocused(true)} onBlur={() => setFullNameFocused(false)} />
              </View>
            </View>

            {/* Username */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Username</Text>
              <View style={[styles.inputRow, usernameFocused && styles.inputRowFocused]}>
                <Ionicons name="at-outline" size={18} color={usernameFocused ? TEAL : '#aaa'} style={styles.inputIcon} />
                <TextInput style={styles.inputField} placeholder="Choose a username" placeholderTextColor="#bbb" value={username} onChangeText={setUsername} autoCapitalize="none" onFocus={() => setUsernameFocused(true)} onBlur={() => setUsernameFocused(false)} />
              </View>
            </View>

            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email</Text>
              <View style={[styles.inputRow, emailFocused && styles.inputRowFocused]}>
                <Ionicons name="mail-outline" size={18} color={emailFocused ? TEAL : '#aaa'} style={styles.inputIcon} />
                <TextInput style={styles.inputField} placeholder="Enter your email" placeholderTextColor="#bbb" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" onFocus={() => setEmailFocused(true)} onBlur={() => setEmailFocused(false)} />
              </View>
            </View>

            {/* Phone */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <View style={[styles.inputRow, phoneFocused && styles.inputRowFocused]}>
                <Ionicons name="call-outline" size={18} color={phoneFocused ? TEAL : '#aaa'} style={styles.inputIcon} />
                <TextInput
                  style={styles.inputField}
                  placeholder="Enter your phone number"
                  placeholderTextColor="#bbb"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  onFocus={() => setPhoneFocused(true)}
                  onBlur={() => setPhoneFocused(false)}
                />
              </View>
            </View>

            {/* Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={[styles.inputRow, passwordFocused && styles.inputRowFocused]}>
                <Ionicons name="lock-closed-outline" size={18} color={passwordFocused ? TEAL : '#aaa'} style={styles.inputIcon} />
                <TextInput style={[styles.inputField, { flex: 1 }]} placeholder="Choose a password" placeholderTextColor="#bbb" value={password} onChangeText={setPassword} secureTextEntry={!showPassword} autoCapitalize="none" onFocus={() => setPasswordFocused(true)} onBlur={() => setPasswordFocused(false)} />
                <TouchableOpacity onPress={() => setShowPassword(v => !v)} style={styles.eyeBtn} activeOpacity={0.7}>
                  <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="#aaa" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Confirm Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Confirm Password</Text>
              <View style={[styles.inputRow, confirmFocused && styles.inputRowFocused]}>
                <Ionicons name="lock-closed-outline" size={18} color={confirmFocused ? TEAL : '#aaa'} style={styles.inputIcon} />
                <TextInput style={[styles.inputField, { flex: 1 }]} placeholder="Repeat your password" placeholderTextColor="#bbb" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry={!showConfirm} autoCapitalize="none" onFocus={() => setConfirmFocused(true)} onBlur={() => setConfirmFocused(false)} />
                <TouchableOpacity onPress={() => setShowConfirm(v => !v)} style={styles.eyeBtn} activeOpacity={0.7}>
                  <Ionicons name={showConfirm ? 'eye-off-outline' : 'eye-outline'} size={20} color="#aaa" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Terms */}
            <View style={styles.forgotRow}>
              <Text style={[styles.forgotText, { color: '#aaa', fontSize: 12 }]}>
                By signing up, you agree to our{' '}
                <Text style={{ color: TEAL, fontWeight: '600' }}>Terms of Service</Text>
                {' '}and{' '}
                <Text style={{ color: TEAL, fontWeight: '600' }}>Privacy Policy</Text>.
              </Text>
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity style={styles.loginButton} onPress={handleSignup} disabled={loading} activeOpacity={0.85}>
              <Ionicons name="person-add-outline" size={18} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.loginButtonText}>{loading ? 'Creating...' : 'Create Account'}</Text>
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
    </>
  );
}