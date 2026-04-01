// components/dashboard/Registration.jsx

import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    LayoutAnimation,
    Modal,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    UIManager,
    View
} from 'react-native';
import { useUser } from '../../context/UserContext';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}



const QUESTIONS = [
  { id: 1, key: 'incidentDate',     type: 'date',   label: 'Q1. When did this happen?',                                    placeholder: 'Tap the calendar to set a date.' },
  { id: 2, key: 'injuryType',       type: 'choice', label: 'Q2. Were you bitten or scratched?',                            options: ['Bitten', 'Scratched'] },
  { id: 3, key: 'animalType',       type: 'choice', label: 'Q3. What animal ____ you?',                                    options: ['Cat', 'Dog', 'Others'] },
  { id: 4, key: 'animalOwner',      type: 'choice', label: 'Q4. Who owns that animal?',                                    options: ['Family pet', "Neighbor's pet", 'Stray animal', 'Others'] },
  { id: 5, key: 'animalVaccinated', type: 'choice', label: 'Q5. Was that animal vaccinated with anti-rabies this year?',   options: ['Yes', 'No', 'Not sure'] },
  { id: 6, key: 'bodyPart',         type: 'text',   label: 'Q6. What body part(s) were you ____? Please specify.',         placeholder: 'e.g. left hand, right arm...' },
];

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const Field = ({ label, icon, value, onChangeText, placeholder, keyboardType, multiline, C }) => (
  <View style={{ marginBottom: 16 }}>
    <Text style={{ color: C.sub, fontSize: 11, fontWeight: '700', letterSpacing: 0.8, marginBottom: 6, textTransform: 'uppercase' }}>{icon}  {label}</Text>
    <TextInput
      style={{ backgroundColor: C.input, borderWidth: 1.5, borderColor: value ? C.teal : C.border, borderRadius: 12, paddingHorizontal: 14, paddingVertical: Platform.OS === 'ios' ? 12 : 10, fontSize: 14, color: C.text, minHeight: multiline ? 70 : undefined, textAlignVertical: multiline ? 'top' : 'center' }}
      placeholder={placeholder}
      placeholderTextColor={C.sub}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType || 'default'}
      multiline={multiline}
      autoCapitalize="words"
      autoCorrect={false}
    />
  </View>
);

export default function Registration({ onDone }) {
  const { darkMode } = useUser();
  const dark = darkMode;

  const C = {
    bg:        dark ? '#1a1f1e' : '#f0faf8',
    card:      dark ? '#242b2a' : '#ffffff',
    text:      dark ? '#e8f0ef' : '#1a2e2c',
    sub:       dark ? '#7aada8' : '#6b7280',
    border:    dark ? '#2e3837' : '#d1ece8',
    input:     dark ? '#1e2928' : '#f7fcfb',
    teal:      '#2BAF9E',
    tealDark:  '#1b7b6b',
    tealLight: dark ? '#1e3330' : '#e0f7f4',
    green:     '#43a047',
    greenBg:   dark ? '#1a3320' : '#e8f5e9',
    red:       '#e53935',
    orange:    '#ff9800',
  };

  const [phase, setPhase]           = useState('list');
  const [currentQ, setCurrentQ]     = useState(0);
  const [answers, setAnswers]        = useState({});
  const [othersText, setOthersText]  = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dpYear,  setDpYear]   = useState(new Date().getFullYear());
  const [dpMonth, setDpMonth]  = useState(new Date().getMonth());
  const [dpDay,   setDpDay]    = useState(null);
  const [form, setForm]        = useState({ fullName: '', age: '', birthdate: '', address: '', contact: '' });
  const [editing, setEditing]  = useState(false);
  const [savedList, setSavedList]         = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);


  const [showBdayPicker, setShowBdayPicker] = useState(false);
  const [bdYear,  setBdYear]  = useState(2000);
  const [bdMonth, setBdMonth] = useState(0);
  const [bdDay,   setBdDay]   = useState(null);

  const calcAge = (year, month, day) => { const today = new Date(); let age = today.getFullYear() - year; if (today.getMonth() < month || (today.getMonth() === month && today.getDate() < day)) age--; return String(age); };
  const confirmBirthdate = () => { if (!bdDay) return; const formatted = `${MONTHS[bdMonth]} ${String(bdDay).padStart(2, '0')}, ${bdYear}`; setForm(p => ({ ...p, birthdate: formatted, age: calcAge(bdYear, bdMonth, bdDay) })); setShowBdayPicker(false); setBdDay(null); };
  const clearBirthdate = () => { animate(); setForm(p => ({ ...p, birthdate: '', age: '' })); };

  const animate = () => LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

  const resetWorkingState = () => { setCurrentQ(0); setAnswers({}); setOthersText(''); setForm({ fullName: '', age: '', birthdate: '', address: '', contact: '' }); setEditing(false); setSelectedIndex(null); };

  const getQ3Label = () => `Q3. What animal ${(answers.injuryType || 'bitten/scratched').toLowerCase()} you?`;
  const getQ6Label = () => `Q6. What body part(s) were you ${(answers.injuryType || 'bitten/scratched').toLowerCase()}? Please specify.`;
  const getQuestion = (q) => { if (q.id === 3) return { ...q, label: getQ3Label() }; if (q.id === 6) return { ...q, label: getQ6Label() }; return q; };
  const currentQuestion = getQuestion(QUESTIONS[currentQ]);

  const isAnswered = () => {
    const key = currentQuestion.key;
    if (currentQuestion.type === 'date')   return !!answers[key];
    if (currentQuestion.type === 'choice') return answers[key] === 'Others' ? othersText.trim().length > 0 : !!answers[key];
    if (currentQuestion.type === 'text')   return (answers[key] || '').trim().length > 0;
    return false;
  };

  const handleAnswer = (value) => { animate(); setAnswers(prev => ({ ...prev, [currentQuestion.key]: value })); if (value !== 'Others') setOthersText(''); };
  const handleNext = () => { if (!isAnswered()) return; animate(); if (currentQ < QUESTIONS.length - 1) setCurrentQ(prev => prev + 1); else setPhase('form'); };
  const handleBack = () => { animate(); if (currentQ > 0) setCurrentQ(prev => prev - 1); else setPhase('list'); };

  const handleSave = () => {
    const { fullName, age, birthdate, address, contact } = form;
    if (!fullName.trim() || !age.trim() || !birthdate.trim() || !address.trim() || !contact.trim()) { Alert.alert('Incomplete', 'Please fill in all personal information fields.'); return; }
    animate();
    const finalAnswers = { ...answers };
    if (finalAnswers.animalOwner === 'Others') finalAnswers.animalOwner = `Others: ${othersText}`;
    if (finalAnswers.animalType === 'Others') finalAnswers.animalType = `Others: ${othersText}`;
    setSavedList(prev => [...prev, { form, answers: finalAnswers }]);
    setSelectedIndex(savedList.length);
    setPhase('view');
  };

  const handleDelete = (index) => {
    const i = index !== undefined ? index : selectedIndex;
    Alert.alert('Delete Registration', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => { animate(); setSavedList(prev => prev.filter((_, idx) => idx !== i)); resetWorkingState(); setPhase('list'); } },
    ]);
  };

  const handleEdit = (index) => {
    const i = index !== undefined ? index : selectedIndex;
    const entry = savedList[i];
    if (!entry) return;
    animate(); setForm(entry.form); setAnswers(entry.answers); setSelectedIndex(i); setEditing(true); setPhase('form');
  };

  const handleSaveEdit = () => {
    const { fullName, age, birthdate, address, contact } = form;
    if (!fullName.trim() || !age.trim() || !birthdate.trim() || !address.trim() || !contact.trim()) { Alert.alert('Incomplete', 'Please fill in all fields.'); return; }
    animate();
    setSavedList(prev => prev.map((entry, i) => i === selectedIndex ? { form, answers } : entry));
    setEditing(false); setPhase('view');
  };

  const startNewRegistration = () => { animate(); resetWorkingState(); setPhase('questions'); };
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const confirmDate = () => { if (!dpDay) return; setAnswers(prev => ({ ...prev, incidentDate: `${MONTHS[dpMonth]} ${String(dpDay).padStart(2, '0')}, ${dpYear}` })); setShowDatePicker(false); setDpDay(null); };
  const clearDate = () => { animate(); setAnswers(prev => ({ ...prev, incidentDate: null })); };

  const QRDisplay = ({ data }) => (
    <View style={{ alignItems: 'center', padding: 16 }}>
      <View style={{ width: 200, height: 200, backgroundColor: '#fff', padding: 12, borderRadius: 8, borderWidth: 2, borderColor: C.teal, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: 176, height: 176 }}>
          {Array.from({ length: 22 * 22 }).map((_, i) => {
            const row = Math.floor(i / 22); const col = i % 22;
            const isCorner = (row < 7 && col < 7) || (row < 7 && col > 14) || (row > 14 && col < 7);
            const hash = (data.length * (i + 1) * 7 + row * 13 + col * 17) % 3;
            return <View key={i} style={{ width: 8, height: 8, backgroundColor: (isCorner || hash === 0) ? '#1a1a1a' : '#ffffff' }} />;
          })}
        </View>
      </View>
      <Text style={{ color: C.sub, fontSize: 10, marginTop: 8, textAlign: 'center' }}>Scan this QR code at the front desk for verification</Text>
    </View>
  );

  const renderList = () => {
    return (
      <View style={{ padding: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <View>
            <Text style={{ fontSize: 17, fontWeight: '800', color: C.text }}>My Registrations</Text>
            <Text style={{ fontSize: 12, color: C.sub, marginTop: 2 }}>{savedList.length} registered</Text>
          </View>
          <TouchableOpacity onPress={startNewRegistration} activeOpacity={0.85} style={{ flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: C.teal, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, elevation: 3 }}>
            <Text style={{ fontSize: 16, color: '#fff' }}>＋</Text>
            <Text style={{ color: '#fff', fontWeight: '800', fontSize: 13 }}>New</Text>
          </TouchableOpacity>
        </View>

        {savedList.length === 0 ? (
          <View style={{ backgroundColor: C.card, borderRadius: 20, padding: 32, borderWidth: 1, borderColor: C.border, alignItems: 'center', marginTop: 8 }}>
            <Text style={{ fontSize: 48, marginBottom: 12 }}>🏥</Text>
            <Text style={{ fontSize: 16, fontWeight: '800', color: C.text, textAlign: 'center', marginBottom: 8 }}>No Registrations Yet</Text>
            <Text style={{ fontSize: 13, color: C.sub, textAlign: 'center', lineHeight: 20, marginBottom: 20 }}>Tap <Text style={{ fontWeight: '700', color: C.teal }}>＋ New</Text> to register a patient for their first dose at ABTC-CHO.</Text>
            <View style={{ backgroundColor: dark ? '#1e2d3d' : '#e3f2fd', borderRadius: 10, padding: 12, borderWidth: 1, borderColor: '#2196f3', width: '100%' }}>
              <Text style={{ color: '#2196f3', fontWeight: '700', fontSize: 12, marginBottom: 5 }}>ℹ️ What to prepare</Text>
              <Text style={{ color: C.sub, fontSize: 12, lineHeight: 18 }}>• Full name, address, contact number</Text>
              <Text style={{ color: C.sub, fontSize: 12, lineHeight: 18 }}>• Date of the animal bite or scratch</Text>
              <Text style={{ color: C.sub, fontSize: 12, lineHeight: 18 }}>• Details about the animal involved</Text>
            </View>
          </View>
        ) : (
          <View style={{ gap: 12 }}>
            {savedList.map((entry, index) => {
              const injuryEmoji = entry.answers.injuryType === 'Bitten' ? '🦷' : '🐾';
              const animalEmoji = entry.answers.animalType === 'Dog' ? '🐕' : entry.answers.animalType === 'Cat' ? '🐈' : '🐾';
              return (
                <TouchableOpacity key={index} onPress={() => { animate(); setSelectedIndex(index); setPhase('view'); }} activeOpacity={0.82} style={{ backgroundColor: C.card, borderRadius: 16, borderWidth: 1.5, borderColor: C.border, padding: 16, elevation: 2, flexDirection: 'row', alignItems: 'center', gap: 14 }}>
                  <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: C.tealLight, borderWidth: 2, borderColor: C.teal, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 13, color: C.teal, fontWeight: '900' }}>{`Q-${String(index + 1).padStart(3, '0')}`}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 15, fontWeight: '800', color: C.text }} numberOfLines={1}>{entry.form.fullName}</Text>
                    <Text style={{ fontSize: 12, color: C.sub, marginTop: 2 }}>{animalEmoji} {entry.answers.animalType}  {injuryEmoji} {entry.answers.injuryType}</Text>
                    <Text style={{ fontSize: 11, color: C.sub, marginTop: 2 }} numberOfLines={1}>📅 {entry.answers.incidentDate}</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end', gap: 6 }}>
                    <View style={{ backgroundColor: C.greenBg, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3, borderWidth: 1, borderColor: C.green }}>
                      <Text style={{ color: C.green, fontSize: 10, fontWeight: '700' }}>✓ Saved</Text>
                    </View>
                    <Text style={{ color: C.sub, fontSize: 14 }}>›</Text>
                  </View>
                </TouchableOpacity>
              );
            })}

          </View>
        )}
      </View>
    );
  };

  const renderQuestions = () => {
    const q = currentQuestion;
    const progress = ((currentQ + 1) / QUESTIONS.length) * 100;
    return (
      <View style={{ padding: 20 }}>
        <View style={{ marginBottom: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
            <Text style={{ color: C.sub, fontSize: 12, fontWeight: '600' }}>Question {currentQ + 1} of {QUESTIONS.length}</Text>
            <Text style={{ color: C.teal, fontSize: 12, fontWeight: '700' }}>{Math.round(progress)}%</Text>
          </View>
          <View style={{ height: 6, backgroundColor: C.border, borderRadius: 3, overflow: 'hidden' }}>
            <View style={{ height: 6, width: `${progress}%`, backgroundColor: C.teal, borderRadius: 3 }} />
          </View>
        </View>

        <View style={{ backgroundColor: C.card, borderRadius: 20, padding: 22, borderWidth: 1, borderColor: C.border, elevation: 3 }}>
          <View style={{ height: 4, backgroundColor: C.teal, borderRadius: 2, marginBottom: 18, width: 48 }} />
          <Text style={{ fontSize: 16, fontWeight: '800', color: C.text, marginBottom: 20, lineHeight: 24 }}>{q.label}</Text>

          {q.type === 'date' && (
            answers.incidentDate ? (
              <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: C.tealLight, borderRadius: 12, padding: 14, borderWidth: 1.5, borderColor: C.teal }}>
                <Text style={{ flex: 1, color: C.teal, fontSize: 15, fontWeight: '700' }}>📅 {answers.incidentDate}</Text>
                <TouchableOpacity onPress={clearDate} style={{ backgroundColor: C.red + '20', borderRadius: 12, width: 24, height: 24, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: C.red, fontSize: 12, fontWeight: '800' }}>✕</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: C.input, borderRadius: 12, padding: 14, borderWidth: 1.5, borderColor: C.border, gap: 10 }} onPress={() => setShowDatePicker(true)} activeOpacity={0.8}>
                <Text style={{ fontSize: 20 }}>📅</Text>
                <Text style={{ color: C.sub, fontSize: 14 }}>Tap to select a date</Text>
              </TouchableOpacity>
            )
          )}

          {q.type === 'choice' && (
            <View style={{ gap: 10 }}>
              {q.options.map((opt) => {
                const selected = answers[q.key] === opt;
                return (
                  <View key={opt}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, borderWidth: 1.5, borderColor: selected ? C.teal : C.border, backgroundColor: selected ? C.tealLight : C.input, gap: 12 }} onPress={() => handleAnswer(opt)} activeOpacity={0.8}>
                      <View style={{ width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: selected ? C.teal : C.border, backgroundColor: selected ? C.teal : 'transparent', justifyContent: 'center', alignItems: 'center' }}>
                        {selected && <Text style={{ color: '#fff', fontSize: 11, fontWeight: '800' }}>✓</Text>}
                      </View>
                      <Text style={{ flex: 1, color: selected ? C.teal : C.text, fontSize: 14, fontWeight: selected ? '700' : '500' }}>{opt}</Text>
                    </TouchableOpacity>
                    {opt === 'Others' && selected && (
                      <TextInput style={{ marginTop: 8, backgroundColor: C.input, borderWidth: 1.5, borderColor: C.teal, borderRadius: 10, padding: 12, color: C.text, fontSize: 13 }} placeholder="Please specify..." placeholderTextColor={C.sub} value={othersText} onChangeText={setOthersText} autoFocus />
                    )}
                  </View>
                );
              })}
            </View>
          )}

          {q.type === 'text' && (
            <TextInput style={{ backgroundColor: C.input, borderWidth: 1.5, borderColor: answers[q.key] ? C.teal : C.border, borderRadius: 12, padding: 14, color: C.text, fontSize: 14, minHeight: 80, textAlignVertical: 'top' }} placeholder={q.placeholder} placeholderTextColor={C.sub} value={answers[q.key] || ''} onChangeText={(val) => setAnswers(prev => ({ ...prev, [q.key]: val }))} multiline />
          )}

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 24, gap: 12 }}>
            <TouchableOpacity style={{ flex: 1, paddingVertical: 13, borderRadius: 12, borderWidth: 1.5, borderColor: C.border, alignItems: 'center' }} onPress={handleBack} activeOpacity={0.8}>
              <Text style={{ color: C.sub, fontWeight: '700', fontSize: 14 }}>← Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 2, paddingVertical: 13, borderRadius: 12, backgroundColor: isAnswered() ? C.teal : C.border, alignItems: 'center', elevation: isAnswered() ? 2 : 0 }} onPress={handleNext} activeOpacity={0.85}>
              <Text style={{ color: isAnswered() ? '#fff' : C.sub, fontWeight: '800', fontSize: 14 }}>{currentQ === QUESTIONS.length - 1 ? 'Next: Personal Info →' : 'Next →'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {currentQ > 0 && (
          <View style={{ marginTop: 16, backgroundColor: C.card, borderRadius: 12, padding: 14, borderWidth: 1, borderColor: C.border }}>
            <Text style={{ color: C.sub, fontSize: 11, fontWeight: '700', marginBottom: 8, letterSpacing: 0.8 }}>ANSWERED SO FAR</Text>
            {QUESTIONS.slice(0, currentQ).map((prevQ) => {
              const pq = getQuestion(prevQ);
              const ans = answers[prevQ.key];
              if (!ans) return null;
              return (
                <View key={prevQ.id} style={{ flexDirection: 'row', marginBottom: 4, gap: 6 }}>
                  <Text style={{ color: C.teal, fontSize: 11, fontWeight: '700' }}>✓</Text>
                  <Text style={{ color: C.sub, fontSize: 11, flex: 1 }} numberOfLines={1}>{pq.label.replace(/Q\d\. /, '')}: <Text style={{ color: C.text, fontWeight: '600' }}>{ans}</Text></Text>
                </View>
              );
            })}
          </View>
        )}
      </View>
    );
  };

  const renderForm = () => (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        <View style={{ backgroundColor: C.card, borderRadius: 20, padding: 22, borderWidth: 1, borderColor: C.border, elevation: 3 }}>
          <View style={{ height: 4, backgroundColor: C.green, borderRadius: 2, marginBottom: 18, width: 48 }} />
          <Text style={{ fontSize: 18, fontWeight: '800', color: C.text, marginBottom: 4 }}>📝 Personal Information</Text>
          <Text style={{ color: C.sub, fontSize: 13, marginBottom: 20, lineHeight: 18 }}>Please fill in all fields accurately.</Text>

          <Field C={C} label="Full Name" icon="👤" value={form.fullName} onChangeText={(v) => setForm(p => ({ ...p, fullName: v }))} placeholder="e.g. Juan Dela Cruz" />

          {/* Birthdate picker */}
          <View style={{ marginBottom: 16 }}>
            <Text style={{ color: C.sub, fontSize: 11, fontWeight: '700', letterSpacing: 0.8, marginBottom: 6, textTransform: 'uppercase' }}>📅  Birthdate</Text>
            {form.birthdate ? (
              <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: C.tealLight, borderRadius: 12, padding: 14, borderWidth: 1.5, borderColor: C.teal }}>
                <Text style={{ flex: 1, color: C.teal, fontSize: 15, fontWeight: '700' }}>📅 {form.birthdate}</Text>
                <TouchableOpacity onPress={clearBirthdate} style={{ backgroundColor: C.red + '20', borderRadius: 12, width: 24, height: 24, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: C.red, fontSize: 12, fontWeight: '800' }}>✕</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: C.input, borderRadius: 12, padding: 14, borderWidth: 1.5, borderColor: C.border, gap: 10 }} onPress={() => setShowBdayPicker(true)} activeOpacity={0.8}>
                <Text style={{ fontSize: 20 }}>📅</Text>
                <Text style={{ color: C.sub, fontSize: 14 }}>Tap to select your birthdate</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Age — auto-filled */}
          <View style={{ marginBottom: 16 }}>
            <Text style={{ color: C.sub, fontSize: 11, fontWeight: '700', letterSpacing: 0.8, marginBottom: 6, textTransform: 'uppercase' }}>🎂  Age</Text>
            <View style={{ backgroundColor: form.age ? C.tealLight : C.input, borderWidth: 1.5, borderColor: form.age ? C.teal : C.border, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ flex: 1, color: form.age ? C.teal : C.sub, fontSize: 14, fontWeight: form.age ? '700' : '400' }}>{form.age ? `${form.age} years old` : 'Auto-filled after selecting birthdate'}</Text>
              {form.age ? <Text style={{ fontSize: 16 }}>✓</Text> : <Text style={{ fontSize: 14, color: C.sub }}>🔒</Text>}
            </View>
          </View>

          {/* ✅ Simple text address field */}
          <Field C={C} label="Address" icon="🏠" value={form.address} onChangeText={(v) => setForm(p => ({ ...p, address: v }))} placeholder="e.g. Brgy. Carmen, Cagayan de Oro City" multiline />

          <Field C={C} label="Contact Number" icon="📞" value={form.contact} onChangeText={(v) => setForm(p => ({ ...p, contact: v }))} placeholder="e.g. 09123456789" keyboardType="phone-pad" />

          <View style={{ flexDirection: 'row', gap: 12, marginTop: 8 }}>
            <TouchableOpacity style={{ flex: 1, paddingVertical: 14, borderRadius: 12, borderWidth: 1.5, borderColor: C.border, alignItems: 'center' }} onPress={() => { animate(); if (editing) { setEditing(false); setPhase('view'); } else setPhase('questions'); }} activeOpacity={0.8}>
              <Text style={{ color: C.sub, fontWeight: '700' }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 2, paddingVertical: 14, borderRadius: 12, backgroundColor: C.teal, alignItems: 'center', elevation: 3 }} onPress={editing ? handleSaveEdit : handleSave} activeOpacity={0.85}>
              <Text style={{ color: '#fff', fontWeight: '800', fontSize: 15 }}>💾 Save Registration</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );

  const renderView = () => {
    const entry = savedList[selectedIndex];
    if (!entry) { setPhase('list'); return null; }
    const { form: f, answers: a } = entry;
    const queueNumber = `Q-${String(selectedIndex + 1).padStart(3, '0')}`;
    const Row = ({ label, value }) => (
      <View style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: C.border }}>
        <Text style={{ color: C.sub, fontSize: 10, fontWeight: '700', letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 2 }}>{label}</Text>
        <Text style={{ color: C.text, fontSize: 14, fontWeight: '600' }}>{value || '—'}</Text>
      </View>
    );
    return (
      <View style={{ padding: 20 }}>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 14, alignSelf: 'flex-start' }} onPress={() => { animate(); setPhase('list'); setSelectedIndex(null); }} activeOpacity={0.8}>
          <Text style={{ color: C.teal, fontSize: 13, fontWeight: '700' }}>← Back to Registrations</Text>
        </TouchableOpacity>
        <View style={{ backgroundColor: '#ffffff', borderRadius: 4, padding: 24, borderWidth: 1, borderColor: '#ddd', elevation: 6, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 12, marginBottom: 16 }}>
          <View style={{ alignItems: 'center', borderBottomWidth: 2, borderBottomColor: '#2BAF9E', paddingBottom: 14, marginBottom: 16 }}>
            <Text style={{ fontSize: 11, color: '#888', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 4 }}>Animal Bite Treatment Center</Text>
            <Text style={{ fontSize: 16, fontWeight: '900', color: '#1a2e2c', letterSpacing: 0.5 }}>PATIENT REGISTRATION FORM</Text>
            <Text style={{ fontSize: 10, color: '#aaa', marginTop: 2 }}>City Health Office • Cagayan de Oro City</Text>
          </View>
          <Text style={{ fontSize: 12, fontWeight: '800', color: '#2BAF9E', letterSpacing: 1, marginBottom: 8 }}>PERSONAL INFORMATION</Text>
          <Row label="Full Name"      value={f.fullName} />
          <Row label="Age"            value={f.age} />
          <Row label="Birthdate"      value={f.birthdate} />
          <Row label="Address"        value={f.address} />
          <Row label="Contact Number" value={f.contact} />
          <Text style={{ fontSize: 12, fontWeight: '800', color: '#2BAF9E', letterSpacing: 1, marginTop: 16, marginBottom: 8 }}>INCIDENT DETAILS</Text>
          <Row label="Date of Incident"      value={a.incidentDate} />
          <Row label="Type of Injury"        value={a.injuryType} />
          <Row label="Animal Involved"       value={a.animalType} />
          <Row label="Animal Owner"          value={a.animalOwner} />
          <Row label="Animal Vaccinated"     value={a.animalVaccinated} />
          <Row label="Body Part(s) Affected" value={a.bodyPart} />
          <Text style={{ fontSize: 9, color: '#bbb', textAlign: 'center', marginTop: 16 }}>This form is for ABTC-CHO use only.</Text>
        </View>
        {/* Queue Number Card */}
        <View style={{ backgroundColor: C.card, borderRadius: 16, borderWidth: 1, borderColor: C.border, overflow: 'hidden', marginBottom: 16 }}>
          <View style={{ backgroundColor: C.teal, padding: 12, alignItems: 'center' }}>
            <Text style={{ color: '#fff', fontWeight: '800', fontSize: 13 }}>🎫 Your Queue Number</Text>
            <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 11, marginTop: 2 }}>Present this at the front desk</Text>
          </View>
          <View style={{ alignItems: 'center', paddingVertical: 32, paddingHorizontal: 20 }}>
            <View style={{ backgroundColor: C.tealLight, borderRadius: 20, borderWidth: 2.5, borderColor: C.teal, paddingHorizontal: 40, paddingVertical: 20, alignItems: 'center', marginBottom: 12 }}>
              <Text style={{ fontSize: 11, color: C.sub, fontWeight: '700', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 6 }}>Queue Number</Text>
              <Text style={{ fontSize: 52, fontWeight: '900', color: C.teal, letterSpacing: 2 }}>{queueNumber}</Text>
            </View>
            <Text style={{ color: C.sub, fontSize: 12, textAlign: 'center', lineHeight: 18 }}>
              Please wait for your number to be called.{'\n'}Show this screen to the front desk staff.
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', gap: 12, marginBottom: 8 }}>
          <TouchableOpacity style={{ flex: 1, paddingVertical: 14, borderRadius: 12, borderWidth: 1.5, borderColor: C.red, alignItems: 'center', backgroundColor: dark ? '#2d1a1a' : '#ffebee' }} onPress={() => handleDelete(selectedIndex)} activeOpacity={0.8}>
            <Text style={{ color: C.red, fontWeight: '700' }}>🗑️ Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 2, paddingVertical: 14, borderRadius: 12, backgroundColor: C.teal, alignItems: 'center', elevation: 2 }} onPress={() => handleEdit(selectedIndex)} activeOpacity={0.85}>
            <Text style={{ color: '#fff', fontWeight: '800' }}>✏️ Edit Registration</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{ paddingVertical: 15, borderRadius: 12, backgroundColor: C.green, alignItems: 'center', elevation: 3, marginBottom: 8 }}
          onPress={() => { animate(); if (onDone) onDone(); else setPhase('list'); }}
          activeOpacity={0.85}
        >
          <Text style={{ color: '#fff', fontWeight: '800', fontSize: 15 }}>✅ Done</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderDatePicker = () => {
    const days = Array.from({ length: getDaysInMonth(dpYear, dpMonth) }, (_, i) => i + 1);
    return (
      <Modal visible={showDatePicker} transparent animationType="slide">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: C.card, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, maxHeight: '80%' }}>
            <Text style={{ fontSize: 16, fontWeight: '800', color: C.text, textAlign: 'center', marginBottom: 16 }}>Select Date</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <TouchableOpacity onPress={() => { if (dpMonth === 0) { setDpMonth(11); setDpYear(y => y - 1); } else setDpMonth(m => m - 1); }}><Text style={{ color: C.teal, fontSize: 14, fontWeight: '700', paddingHorizontal: 8 }}>← Prev</Text></TouchableOpacity>
              <Text style={{ color: C.text, fontSize: 15, fontWeight: '700' }}>{MONTHS[dpMonth]} {dpYear}</Text>
              <TouchableOpacity onPress={() => { if (dpMonth === 11) { setDpMonth(0); setDpYear(y => y + 1); } else setDpMonth(m => m + 1); }}><Text style={{ color: C.teal, fontSize: 14, fontWeight: '700', paddingHorizontal: 8 }}>Next →</Text></TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 16, marginBottom: 14 }}>
              <TouchableOpacity onPress={() => setDpYear(y => y - 1)}><Text style={{ color: C.sub, fontSize: 12 }}>◀ {dpYear - 1}</Text></TouchableOpacity>
              <Text style={{ color: C.teal, fontSize: 13, fontWeight: '700' }}>{dpYear}</Text>
              <TouchableOpacity onPress={() => setDpYear(y => y + 1)}><Text style={{ color: C.sub, fontSize: 12 }}>{dpYear + 1} ▶</Text></TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 16, justifyContent: 'center' }}>
              {days.map((d) => { const selected = dpDay === d; return (<TouchableOpacity key={d} style={{ width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: selected ? C.teal : C.input, borderWidth: 1, borderColor: selected ? C.teal : C.border }} onPress={() => setDpDay(d)}><Text style={{ color: selected ? '#fff' : C.text, fontWeight: selected ? '800' : '500', fontSize: 13 }}>{d}</Text></TouchableOpacity>); })}
            </View>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <TouchableOpacity style={{ flex: 1, paddingVertical: 14, borderRadius: 12, borderWidth: 1.5, borderColor: C.border, alignItems: 'center' }} onPress={() => { setShowDatePicker(false); setDpDay(null); }}><Text style={{ color: C.sub, fontWeight: '700' }}>Cancel</Text></TouchableOpacity>
              <TouchableOpacity style={{ flex: 2, paddingVertical: 14, borderRadius: 12, backgroundColor: dpDay ? C.teal : C.border, alignItems: 'center' }} onPress={confirmDate} disabled={!dpDay}><Text style={{ color: dpDay ? '#fff' : C.sub, fontWeight: '800' }}>✓ Confirm Date</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const renderBdayPicker = () => {
    const days = Array.from({ length: getDaysInMonth(bdYear, bdMonth) }, (_, i) => i + 1);
    return (
      <Modal visible={showBdayPicker} transparent animationType="slide">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: C.card, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, maxHeight: '80%' }}>
            <Text style={{ fontSize: 16, fontWeight: '800', color: C.text, textAlign: 'center', marginBottom: 4 }}>Select Birthdate</Text>
            <Text style={{ fontSize: 12, color: C.sub, textAlign: 'center', marginBottom: 16 }}>Choose your month, year, and day</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <TouchableOpacity onPress={() => { if (bdMonth === 0) { setBdMonth(11); setBdYear(y => y - 1); } else setBdMonth(m => m - 1); }}><Text style={{ color: C.teal, fontSize: 14, fontWeight: '700', paddingHorizontal: 8 }}>← Prev</Text></TouchableOpacity>
              <Text style={{ color: C.text, fontSize: 15, fontWeight: '700' }}>{MONTHS[bdMonth]} {bdYear}</Text>
              <TouchableOpacity onPress={() => { if (bdMonth === 11) { setBdMonth(0); setBdYear(y => y + 1); } else setBdMonth(m => m + 1); }}><Text style={{ color: C.teal, fontSize: 14, fontWeight: '700', paddingHorizontal: 8 }}>Next →</Text></TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 16, marginBottom: 14 }}>
              <TouchableOpacity onPress={() => setBdYear(y => y - 1)}><Text style={{ color: C.sub, fontSize: 12 }}>◀ {bdYear - 1}</Text></TouchableOpacity>
              <Text style={{ color: C.teal, fontSize: 13, fontWeight: '700' }}>{bdYear}</Text>
              <TouchableOpacity onPress={() => setBdYear(y => y + 1)}><Text style={{ color: C.sub, fontSize: 12 }}>{bdYear + 1} ▶</Text></TouchableOpacity>
            </View>
            <ScrollView style={{ maxHeight: 200 }} showsVerticalScrollIndicator={false}>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 16, justifyContent: 'center' }}>
                {days.map((d) => { const selected = bdDay === d; return (<TouchableOpacity key={d} style={{ width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: selected ? C.teal : C.input, borderWidth: 1, borderColor: selected ? C.teal : C.border }} onPress={() => setBdDay(d)}><Text style={{ color: selected ? '#fff' : C.text, fontWeight: selected ? '800' : '500', fontSize: 13 }}>{d}</Text></TouchableOpacity>); })}
              </View>
            </ScrollView>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <TouchableOpacity style={{ flex: 1, paddingVertical: 14, borderRadius: 12, borderWidth: 1.5, borderColor: C.border, alignItems: 'center' }} onPress={() => { setShowBdayPicker(false); setBdDay(null); }}><Text style={{ color: C.sub, fontWeight: '700' }}>Cancel</Text></TouchableOpacity>
              <TouchableOpacity style={{ flex: 2, paddingVertical: 14, borderRadius: 12, backgroundColor: bdDay ? C.teal : C.border, alignItems: 'center' }} onPress={confirmBirthdate} disabled={!bdDay}><Text style={{ color: bdDay ? '#fff' : C.sub, fontWeight: '800' }}>✓ Confirm Birthdate</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }} scrollEnabled={phase !== 'form'}>
        {phase === 'list'      && renderList()}
        {phase === 'questions' && renderQuestions()}
        {phase === 'form'      && renderForm()}
        {phase === 'view'      && renderView()}
      </ScrollView>
      {renderDatePicker()}
      {renderBdayPicker()}
    </View>
  );
}