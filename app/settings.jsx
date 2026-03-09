// app/settings.jsx

import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { default as React, default as React, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  Switch,
  Text, TextInput, TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '../context/UserContext';
import styles from '../styles/Settings';

export default function SettingsScreen() {
  const router = useRouter();
  const { username, setUsername, darkMode, setDarkMode, avatarUri, setAvatarUri } = useUser();

  const [localUsername, setLocalUsername] = useState(username);
  const [currentPass,   setCurrentPass]   = useState('');
  const [newPass,       setNewPass]       = useState('');
  const [confirmPass,   setConfirmPass]   = useState('');
  const [showCurrent,   setShowCurrent]   = useState(false);
  const [showNew,       setShowNew]       = useState(false);
  const [showConfirm,   setShowConfirm]   = useState(false);
  const [vaccineAlerts, setVaccineAlerts] = useState(true);
  const [stockAlerts,   setStockAlerts]   = useState(true);
  const [saving,        setSaving]        = useState(false);

  // Use darkMode directly from context 
  const dark = darkMode;

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

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') { Alert.alert('Permission needed', 'Please allow access to your photo library.'); return; }
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true, aspect: [1, 1], quality: 0.8 });
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
    if (!localUsername.trim())              { Alert.alert('Error', 'Username cannot be empty.'); return; }
    if (newPass && newPass.length < 6)      { Alert.alert('Error', 'New password must be at least 6 characters.'); return; }
    if (newPass && newPass !== confirmPass) { Alert.alert('Error', "Passwords don't match."); return; }
    if (newPass && !currentPass)            { Alert.alert('Error', 'Please enter your current password.'); return; }

    setSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    setUsername(localUsername.trim());
    setSaving(false);
    Alert.alert('✅ Saved', 'Your settings have been updated.', [{ text: 'OK', onPress: () => router.back() }]);
    setCurrentPass(''); setNewPass(''); setConfirmPass('');
  };

  // ─── Sub-components ──────────────────────────────────────────────────────────

  const Section = ({ label, children }) => (
    <View style={[styles.sectionCard, { backgroundColor: C.card, shadowOpacity: dark ? 0 : 0.08 }]}>
      <View style={[styles.sectionHeader, { borderBottomColor: C.border }]}>
        <Text style={styles.sectionLabel}>{label}</Text>
      </View>
      {children}
    </View>
  );

  const Field = ({ label, icon, last, children }) => (
    <View style={[styles.field, { borderBottomWidth: last ? 0 : 1, borderBottomColor: C.border }]}>
      <Text style={[styles.fieldLabel, { color: C.sub }]}>{icon}  {label}</Text>
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
        <TouchableOpacity onPress={onToggleShow} activeOpacity={0.6} style={{ padding: 8 }}>
          <Ionicons name={show ? 'eye-outline' : 'eye-off-outline'} size={20} color={C.sub} />
        </TouchableOpacity>
      </View>
    </Field>
  );

  const ToggleRow = ({ icon, label, sub, value, onValueChange, last }) => (
    <View style={[styles.toggleRow, { borderBottomWidth: last ? 0 : 1, borderBottomColor: C.border }]}>
      <View style={styles.toggleLeft}>
        <Text style={styles.toggleIcon}>{icon}</Text>
        <View style={{ flex: 1 }}>
          <Text style={[styles.toggleTitle, { color: C.text }]}>{label}</Text>
          <Text style={[styles.toggleSub, { color: C.sub }]}>{sub}</Text>
        </View>
      </View>
      <Switch value={value} onValueChange={onValueChange} trackColor={{ false: '#ccc', true: C.teal }} thumbColor="#fff" ios_backgroundColor="#ccc" />
    </View>
  );

  // ─── Render ───────────────────────────────────────────────────────────────────

  return (
    <>
      <StatusBar backgroundColor={C.topBar} barStyle="light-content" translucent={false} />
      <SafeAreaView style={[styles.root, { backgroundColor: C.bg }]} edges={['top', 'left', 'right']}>
          {/* Top Bar */}
          <View style={{ backgroundColor: C.topBar, paddingHorizontal: 16, paddingTop: 12, paddingBottom: 14, flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => router.back()} style={{ backgroundColor: C.topBarBtn, borderRadius: 10, width: 36, height: 36, justifyContent: 'center', alignItems: 'center' }} activeOpacity={0.7}>
              <Ionicons name="arrow-back" size={20} color={C.topBarText} />
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={{ color: C.topBarText, fontSize: 18, fontWeight: '700' }}>⚙️ User Settings</Text>
              <Text style={{ color: C.topBarSub, fontSize: 12 }}>Manage your account preferences</Text>
            </View>
            <View style={{ width: 36, height: 36 }} />
          </View>
>>>>>>> 7c9b883d5cecbdaab524440d6143cd31dad0d1b2

          {/* Avatar */}
          <View style={[styles.avatarSection, { backgroundColor: C.card, borderBottomColor: C.border }]}>
            <TouchableOpacity onPress={pickImage} activeOpacity={0.85}>
              {avatarUri ? (
                <Image source={{ uri: avatarUri }} style={styles.avatarImg} />
              ) : (
                <View style={styles.avatarFallback}>
                  <Text style={[styles.avatarInitial, { color: C.teal }]}>{localUsername.charAt(0).toUpperCase()}</Text>
                </View>
              )}
              <View style={[styles.avatarCamBtn, { borderColor: C.card }]}>
                <Ionicons name="camera" size={14} color="#fff" />
              </View>
            </TouchableOpacity>
            <Text style={[styles.avatarName, { color: C.text }]}>{localUsername || 'User'}</Text>
            <Text style={[styles.avatarHint, { color: C.sub }]}>Tap the camera icon to change photo</Text>
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
            <PassField label="New Password"     icon="🔒" value={newPass}     onChange={setNewPass}     show={showNew}     onToggleShow={() => setShowNew(v => !v)}     placeholder="Min. 6 characters" />
            {newPass.length > 0 && (
              <View style={{ paddingHorizontal: 18, paddingBottom: 10 }}>
                <View style={styles.strengthRow}>
                  {[1, 2, 3, 4].map(i => (
                    <View key={i} style={[styles.strengthBar, { backgroundColor: strength >= i ? strengthColors[strength] : C.border }]} />
                  ))}
                </View>
                <Text style={[styles.strengthLabel, { color: strengthColors[strength] }]}>{strengthLabels[strength]}</Text>
              </View>
            )}
            <PassField label="Confirm New Password" icon="✅" value={confirmPass} onChange={setConfirmPass} show={showConfirm} onToggleShow={() => setShowConfirm(v => !v)} placeholder="Re-enter new password" last />
            {confirmPass.length > 0 && newPass !== confirmPass && (
              <Text style={[styles.passMsg, { color: C.red }]}>⚠️ Passwords don't match</Text>
            )}
            {confirmPass.length > 0 && newPass === confirmPass && newPass.length > 0 && (
              <Text style={[styles.passMsg, { color: C.teal }]}>✅ Passwords match</Text>
            )}
          </Section>

          {/* Appearance — dark mode saves instantly via context */}
          <Section label="🎨 Appearance">
            <ToggleRow
              icon={dark ? '🌙' : '☀️'}
              label={dark ? 'Dark Mode' : 'Light Mode'}
              sub={dark ? 'Currently using dark theme' : 'Currently using light theme'}
              value={dark}
              onValueChange={setDarkMode}
              last
            />
          </Section>

          {/* Notifications */}
          <Section label="🔔 Notifications">
            <ToggleRow icon="💉" label="Vaccine Reminders" sub="Get alerts for upcoming vaccines" value={vaccineAlerts} onValueChange={setVaccineAlerts} />
            <ToggleRow icon="📦" label="Stock Alerts"      sub="Notified when stock is low"        value={stockAlerts}   onValueChange={setStockAlerts}   last />
          </Section>

          {/* Save */}
          <TouchableOpacity
            style={[styles.saveBtn, { backgroundColor: C.teal, opacity: saving ? 0.8 : 1 }]}
            onPress={handleSave} disabled={saving} activeOpacity={0.85}
          >
            {saving ? <ActivityIndicator color="#fff" size="small" /> : <Ionicons name="save-outline" size={18} color="#fff" />}
            <Text style={styles.saveBtnText}>{saving ? 'Saving...' : 'Save Changes'}</Text>
          </TouchableOpacity>

          {/* Cancel */}
          <TouchableOpacity
            style={[styles.cancelBtn, { borderColor: C.border }]}
            onPress={() => router.back()} activeOpacity={0.7}
          >
            <Text style={[styles.cancelBtnText, { color: C.sub }]}>Cancel</Text>
          </TouchableOpacity>

          {/* Logout */}
          <View style={[styles.sectionCard, { backgroundColor: C.card, marginBottom: 0, elevation: 1 }]}>
            <View style={[styles.sectionHeader, { borderBottomColor: C.border }]}>
              <Text style={styles.sectionLabel}>⚠️ Account</Text>
            </View>
            <View style={{ padding: 16 }}>
              <TouchableOpacity
                style={[styles.logoutBtn, { borderColor: C.red }]}
                onPress={() => router.push('/login')} activeOpacity={0.7}
              >
                <Ionicons name="log-out-outline" size={18} color={C.red} />
                <Text style={[styles.logoutBtnText, { color: C.red }]}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}