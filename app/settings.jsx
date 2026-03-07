// app/settings.jsx
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, Switch, Image,
  Alert, ActivityIndicator, Platform, StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useUser } from '../context/UserContext';

export default function SettingsScreen() {
  const router = useRouter();
  const { username, setUsername, darkMode, setDarkMode, avatarUri, setAvatarUri } = useUser();

  const [localUsername, setLocalUsername] = useState(username);
  const [localDark, setLocalDark]         = useState(darkMode);

  const [currentPass, setCurrentPass]     = useState('');
  const [newPass, setNewPass]             = useState('');
  const [confirmPass, setConfirmPass]     = useState('');
  const [showCurrent, setShowCurrent]     = useState(false);
  const [showNew, setShowNew]             = useState(false);
  const [showConfirm, setShowConfirm]     = useState(false);
  const [vaccineAlerts, setVaccineAlerts] = useState(true);
  const [stockAlerts, setStockAlerts]     = useState(true);
  const [saving, setSaving]               = useState(false);

  const dark = localDark;

  const C = {
    bg:          dark ? '#1a1f1e' : '#EEF7F6',
    card:        dark ? '#242b2a' : '#ffffff',
    border:      dark ? '#2e3837' : '#e0efed',
    text:        dark ? '#e8f0ef' : '#1a2e2c',
    sub:         dark ? '#7aada8' : '#6ba8a1',
    input:       dark ? '#1e2928' : '#f7fcfb',
    inputBorder: dark ? '#2e3837' : '#e0efed',
    topBar:      dark ? '#1a2e2c' : '#2BAF9E',
    topBarText:  dark ? '#e8f0ef' : '#ffffff',
    topBarSub:   dark ? '#7aada8' : 'rgba(255,255,255,0.75)',
    topBarBtn:   dark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.2)',
    teal:        '#2BAF9E',
    red:         '#c62828',
    orange:      '#f57f17',
  };

  // ✅ Saves directly to context so dashboard sees it immediately
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please allow access to your photo library.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, aspect: [1, 1], quality: 0.8,
    });
    if (!result.canceled) setAvatarUri(result.assets[0].uri);
  };

  const passStrength = () => {
    if (!newPass) return 0;
    if (newPass.length < 4) return 1;
    if (newPass.length < 7) return 2;
    if (newPass.length < 10) return 3;
    return 4;
  };
  const strengthColors = ['#e0efed', C.red, C.orange, '#e0c020', C.teal];
  const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const strength = passStrength();

  const handleSave = async () => {
    if (!localUsername.trim()) { Alert.alert('Error', 'Username cannot be empty.'); return; }
    if (newPass && newPass.length < 6) { Alert.alert('Error', 'New password must be at least 6 characters.'); return; }
    if (newPass && newPass !== confirmPass) { Alert.alert('Error', "Passwords don't match."); return; }
    if (newPass && !currentPass) { Alert.alert('Error', 'Please enter your current password.'); return; }

    setSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    setUsername(localUsername.trim());
    setDarkMode(localDark);
    setSaving(false);
    Alert.alert('✅ Saved', 'Your settings have been updated.', [
      { text: 'OK', onPress: () => router.back() }
    ]);
    setCurrentPass(''); setNewPass(''); setConfirmPass('');
  };

  const Section = ({ label, children }) => (
    <View style={{ backgroundColor: C.card, marginHorizontal: 14, marginTop: 10, borderRadius: 16, overflow: 'hidden', shadowColor: '#2BAF9E', shadowOpacity: dark ? 0 : 0.08, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2 }}>
      <View style={{ paddingHorizontal: 18, paddingTop: 14, paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: C.border }}>
        <Text style={{ fontSize: 11, fontWeight: '700', color: C.teal, letterSpacing: 1.1, textTransform: 'uppercase' }}>{label}</Text>
      </View>
      {children}
    </View>
  );

  const Field = ({ label, icon, last, children }) => (
    <View style={{ paddingHorizontal: 18, paddingVertical: 14, borderBottomWidth: last ? 0 : 1, borderBottomColor: C.border }}>
      <Text style={{ fontSize: 11, fontWeight: '600', color: C.sub, marginBottom: 6, letterSpacing: 0.8, textTransform: 'uppercase' }}>{icon}  {label}</Text>
      {children}
    </View>
  );

  const PassField = ({ label, icon, value, onChange, show, onToggleShow, placeholder, last }) => (
    <Field label={label} icon={icon} last={last}>
      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: C.input, borderWidth: 2, borderColor: C.inputBorder, borderRadius: 10, paddingHorizontal: 12 }}>
        <TextInput
          style={{ flex: 1, paddingVertical: Platform.OS === 'ios' ? 10 : 8, fontSize: 14, color: C.text }}
          value={value} onChangeText={onChange} placeholder={placeholder} placeholderTextColor={C.sub}
          secureTextEntry={!show} autoCapitalize="none" autoCorrect={false}
        />
        <TouchableOpacity onPress={() => onToggleShow()} activeOpacity={0.6} style={{ padding: 8 }}>
          <Ionicons name={show ? 'eye-outline' : 'eye-off-outline'} size={20} color={C.sub} />
        </TouchableOpacity>
      </View>
    </Field>
  );

  const ToggleRow = ({ icon, label, sub, value, onValueChange, last }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18, paddingVertical: 14, borderBottomWidth: last ? 0 : 1, borderBottomColor: C.border }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, gap: 10 }}>
        <Text style={{ fontSize: 20 }}>{icon}</Text>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 15, fontWeight: '600', color: C.text }}>{label}</Text>
          <Text style={{ fontSize: 12, color: C.sub, marginTop: 1 }}>{sub}</Text>
        </View>
      </View>
      <Switch value={value} onValueChange={onValueChange} trackColor={{ false: '#ccc', true: C.teal }} thumbColor="#fff" ios_backgroundColor="#ccc" />
    </View>
  );

  return (
    <>
      <StatusBar backgroundColor={C.topBar} barStyle="light-content" translucent={false} />
      <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }} edges={['top', 'left', 'right']}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

          {/* Top Bar */}
          <View style={{ backgroundColor: C.topBar, paddingHorizontal: 16, paddingTop: 12, paddingBottom: 14, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <TouchableOpacity onPress={() => router.back()} style={{ backgroundColor: C.topBarBtn, borderRadius: 10, width: 36, height: 36, justifyContent: 'center', alignItems: 'center' }} activeOpacity={0.7}>
              <Ionicons name="arrow-back" size={20} color={C.topBarText} />
            </TouchableOpacity>
            <View>
              <Text style={{ color: C.topBarText, fontSize: 18, fontWeight: '700' }}>⚙️ User Settings</Text>
              <Text style={{ color: C.topBarSub, fontSize: 12 }}>Manage your account preferences</Text>
            </View>
          </View>

          {/* Avatar */}
          <View style={{ backgroundColor: C.card, paddingVertical: 28, alignItems: 'center', gap: 8, borderBottomWidth: 1, borderBottomColor: C.border, marginBottom: 4 }}>
            <TouchableOpacity onPress={pickImage} activeOpacity={0.85}>
              {avatarUri ? (
                <Image source={{ uri: avatarUri }} style={{ width: 88, height: 88, borderRadius: 44, borderWidth: 3, borderColor: C.teal }} />
              ) : (
                <View style={{ width: 88, height: 88, borderRadius: 44, backgroundColor: '#E8F7F5', borderWidth: 3, borderColor: C.teal, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontSize: 32, color: C.teal, fontWeight: '700' }}>{localUsername.charAt(0).toUpperCase()}</Text>
                </View>
              )}
              <View style={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: C.teal, borderRadius: 14, width: 28, height: 28, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: C.card }}>
                <Ionicons name="camera" size={14} color="#fff" />
              </View>
            </TouchableOpacity>
            <Text style={{ fontSize: 17, fontWeight: '700', color: C.text }}>{localUsername || 'User'}</Text>
            <Text style={{ fontSize: 11, color: C.sub }}>Tap the camera icon to change photo</Text>
          </View>

          {/* Account Info */}
          <Section label="👤 Account Info">
            <Field label="Username" icon="✏️" last>
              <TextInput
                style={{ backgroundColor: C.input, borderWidth: 2, borderColor: C.inputBorder, borderRadius: 10, paddingHorizontal: 12, paddingVertical: Platform.OS === 'ios' ? 10 : 8, fontSize: 14, color: C.text }}
                value={localUsername} onChangeText={setLocalUsername}
                placeholder="Enter username" placeholderTextColor={C.sub} autoCapitalize="none"
              />
            </Field>
          </Section>

          {/* Change Password */}
          <Section label="🔐 Change Password">
            <PassField label="Current Password" icon="🔑" value={currentPass} onChange={setCurrentPass} show={showCurrent} onToggleShow={() => setShowCurrent(v => !v)} placeholder="••••••••" />
            <PassField label="New Password" icon="🔒" value={newPass} onChange={setNewPass} show={showNew} onToggleShow={() => setShowNew(v => !v)} placeholder="Min. 6 characters" />
            {newPass.length > 0 && (
              <View style={{ paddingHorizontal: 18, paddingBottom: 10 }}>
                <View style={{ flexDirection: 'row', gap: 4 }}>
                  {[1,2,3,4].map(i => (
                    <View key={i} style={{ flex: 1, height: 4, borderRadius: 2, backgroundColor: strength >= i ? strengthColors[strength] : C.border }} />
                  ))}
                </View>
                <Text style={{ fontSize: 11, color: strengthColors[strength], marginTop: 4, fontWeight: '600' }}>{strengthLabels[strength]}</Text>
              </View>
            )}
            <PassField label="Confirm New Password" icon="✅" value={confirmPass} onChange={setConfirmPass} show={showConfirm} onToggleShow={() => setShowConfirm(v => !v)} placeholder="Re-enter new password" last />
            {confirmPass.length > 0 && newPass !== confirmPass && (
              <Text style={{ paddingHorizontal: 18, paddingBottom: 10, fontSize: 11, color: C.red }}>⚠️ Passwords don't match</Text>
            )}
            {confirmPass.length > 0 && newPass === confirmPass && newPass.length > 0 && (
              <Text style={{ paddingHorizontal: 18, paddingBottom: 10, fontSize: 11, color: C.teal }}>✅ Passwords match</Text>
            )}
          </Section>

          {/* Appearance */}
          <Section label="🎨 Appearance">
            <ToggleRow icon={localDark ? '🌙' : '☀️'} label={localDark ? 'Dark Mode' : 'Light Mode'} sub={localDark ? 'Currently using dark theme' : 'Currently using light theme'} value={localDark} onValueChange={setLocalDark} last />
          </Section>

          {/* Notifications */}
          <Section label="🔔 Notifications">
            <ToggleRow icon="💉" label="Vaccine Reminders" sub="Get alerts for upcoming vaccines" value={vaccineAlerts} onValueChange={setVaccineAlerts} />
            <ToggleRow icon="📦" label="Stock Alerts" sub="Notified when stock is low" value={stockAlerts} onValueChange={setStockAlerts} last />
          </Section>

          {/* Save */}
          <TouchableOpacity
            style={{ backgroundColor: C.teal, marginHorizontal: 14, marginTop: 14, borderRadius: 14, paddingVertical: 15, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8, elevation: 4, opacity: saving ? 0.8 : 1 }}
            onPress={handleSave} disabled={saving} activeOpacity={0.85}
          >
            {saving ? <ActivityIndicator color="#fff" size="small" /> : <Ionicons name="save-outline" size={18} color="#fff" />}
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700' }}>{saving ? 'Saving...' : 'Save Changes'}</Text>
          </TouchableOpacity>

          {/* Cancel */}
          <TouchableOpacity
            style={{ borderWidth: 2, borderColor: C.border, marginHorizontal: 14, marginTop: 8, borderRadius: 14, paddingVertical: 13, alignItems: 'center' }}
            onPress={() => router.back()} activeOpacity={0.7}
          >
            <Text style={{ color: C.sub, fontSize: 15, fontWeight: '600' }}>Cancel</Text>
          </TouchableOpacity>

          {/* Logout */}
          <View style={{ backgroundColor: C.card, marginHorizontal: 14, marginTop: 10, borderRadius: 16, overflow: 'hidden', elevation: 1 }}>
            <View style={{ paddingHorizontal: 18, paddingTop: 14, paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: C.border }}>
              <Text style={{ fontSize: 11, fontWeight: '700', color: C.teal, letterSpacing: 1.1, textTransform: 'uppercase' }}>⚠️ Account</Text>
            </View>
            <View style={{ padding: 16 }}>
              <TouchableOpacity
                style={{ borderWidth: 2, borderColor: C.red, borderRadius: 14, paddingVertical: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                onPress={() => router.push('/login')} activeOpacity={0.7}
              >
                <Ionicons name="log-out-outline" size={18} color={C.red} />
                <Text style={{ color: C.red, fontSize: 15, fontWeight: '600' }}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}