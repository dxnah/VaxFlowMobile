// app/schedule.tsx

import React, { useState } from 'react';
import {
    Alert, FlatList, Modal, Platform,
    ScrollView, StatusBar, StyleSheet,
    Text, TouchableOpacity, View,
} from 'react-native';
import SharedHeader from '../components/SharedHeader';
import { useUser } from '../context/UserContext';

interface Dose {
  id: number;
  name: string;
  date: Date | null;
  completed: boolean;
}

const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) : 0;

export default function PatientScheduleScreen() {
  const { darkMode } = useUser();
  const dark = darkMode;

  const C = {
    bg:        dark ? '#1a1f1e' : '#ffffff',
    contentBg: dark ? '#1a1f1e' : '#d4ede7',
    card:      dark ? '#242b2a' : '#ffffff',
    text:      dark ? '#e8f0ef' : '#333333',
    sub:       dark ? '#7aada8' : '#666666',
    border:    dark ? '#2e3837' : '#e0e0e0',
    inputBg:   dark ? '#1e2928' : '#f9f9f9',
    blue:      '#2196f3',
    teal:      '#1b7b6b',
    green:     '#4caf50',
    red:       '#f44336',
    topBar:    dark ? '#1a2e2c' : '#2BAF9E',
  };

  const [doses, setDoses] = useState<Dose[]>([
    { id: 1, name: '1st Dose', date: null, completed: false },
    { id: 2, name: '2nd Dose', date: null, completed: false },
    { id: 3, name: '3rd Dose', date: null, completed: false },
    { id: 4, name: 'Booster Shot (Optional)', date: null, completed: false },
  ]);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDoseId, setSelectedDoseId] = useState<number | null>(null);
  const [pickedDate, setPickedDate] = useState<Date | null>(null);
  const [calendarMonth, setCalendarMonth] = useState(new Date());

  const toggleDoseComplete = (doseId: number) => {
    setDoses(doses.map(dose => {
      if (dose.id === doseId) {
        const newCompleted = !dose.completed;
        if (newCompleted) Alert.alert('Congratulations! 🎉', `You're done with your ${dose.name}!`);
        return { ...dose, completed: newCompleted };
      }
      return dose;
    }));
  };

  const openDatePicker = (doseId: number) => {
    setSelectedDoseId(doseId);
    setPickedDate(null);
    setCalendarMonth(new Date());
    setShowDatePicker(true);
  };

  const saveDatePicker = () => {
    if (!pickedDate || !selectedDoseId) return;
    setDoses(doses.map(dose => dose.id === selectedDoseId ? { ...dose, date: pickedDate } : dose));
    setShowDatePicker(false);
    setSelectedDoseId(null);
    setPickedDate(null);
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return 'Set Date';
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    for (let i = 1; i <= lastDay.getDate(); i++) days.push(new Date(year, month, i));
    return days;
  };

  const currentMonthDays = getDaysInMonth(calendarMonth);
  const nextMonth = () => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1));
  const prevMonth = () => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1));

  return (
    <View style={[styles.root, { backgroundColor: C.topBar }]}>
      <StatusBar backgroundColor={C.topBar} barStyle="light-content" translucent={false} />
      <View style={[styles.statusBarSpacer, { backgroundColor: C.topBar }]} />

      <SharedHeader title="📅 Patient Schedule" subtitle="Track your vaccination doses" />

      <ScrollView style={[styles.container, { backgroundColor: C.contentBg }]}>
        <View style={styles.contentPadding}>
          <Text style={[styles.subtitle, { color: C.sub }]}>
            Set your vaccination dose dates below. You'll receive reminders 1 day before each dose.
          </Text>

          {doses.map((dose) => (
            <View key={dose.id} style={[
              styles.doseCard,
              { backgroundColor: C.card, borderLeftColor: C.blue },
              dose.completed && { backgroundColor: dark ? '#1e2a1e' : '#f5f5f5', borderLeftColor: C.green },
            ]}>
              <TouchableOpacity style={styles.checkbox} onPress={() => toggleDoseComplete(dose.id)}>
                <View style={[styles.checkboxInner, { borderColor: C.blue }, dose.completed && { backgroundColor: C.green, borderColor: C.green }]}>
                  {dose.completed && <Text style={styles.checkmark}>✓</Text>}
                </View>
              </TouchableOpacity>
              <View style={styles.doseInfo}>
                <Text style={[styles.doseName, { color: C.text }, dose.completed && { color: dark ? '#5a7a5a' : '#999' }]}>{dose.name}</Text>
                {dose.date && <Text style={[styles.doseDate, { color: C.sub }]}>{formatDate(dose.date)}</Text>}
                {dose.completed && <Text style={[styles.congratsText, { color: C.green }]}>✓ Congratulations! You're done with your {dose.name}!</Text>}
              </View>
              <TouchableOpacity style={[styles.setDateButton, { backgroundColor: dark ? '#1e2d3d' : '#e3f2fd' }]} onPress={() => openDatePicker(dose.id)}>
                <Text style={[styles.setDateButtonText, { color: C.blue }]}>{dose.date ? '✏️ Edit' : '📅 Set'}</Text>
              </TouchableOpacity>
            </View>
          ))}

          <View style={[styles.infoBox, { backgroundColor: C.inputBg, borderColor: C.border }]}>
            <Text style={[styles.infoTitle, { color: C.text }]}>ℹ️ Important</Text>
            <Text style={[styles.infoText, { color: C.sub }]}>• You'll receive notifications 1 day before each dose</Text>
            <Text style={[styles.infoText, { color: C.sub }]}>• Complete all doses as scheduled for full protection</Text>
          </View>
        </View>
      </ScrollView>

      <Modal visible={showDatePicker} transparent animationType="slide">
        <View style={styles.datePickerOverlay}>
          <View style={[styles.datePickerModal, { backgroundColor: C.card }]}>
            <Text style={[styles.datePickerTitle, { color: C.text }]}>Select Date</Text>
            <View style={[styles.monthNavigation, { borderBottomColor: C.border }]}>
              <TouchableOpacity onPress={prevMonth}><Text style={[styles.monthNavButton, { color: C.blue }]}>← Prev</Text></TouchableOpacity>
              <Text style={[styles.monthLabel, { color: C.text }]}>{calendarMonth.toLocaleString('en-US', { month: 'long', year: 'numeric' })}</Text>
              <TouchableOpacity onPress={nextMonth}><Text style={[styles.monthNavButton, { color: C.blue }]}>Next →</Text></TouchableOpacity>
            </View>
            <FlatList
              data={currentMonthDays}
              keyExtractor={(item) => item.toISOString()}
              numColumns={7}
              scrollEnabled={false}
              style={styles.dateGrid}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.dateButton, { borderColor: C.border }, pickedDate?.toDateString() === item.toDateString() && { backgroundColor: C.teal, borderColor: C.teal }]}
                  onPress={() => setPickedDate(item)}
                >
                  <Text style={[styles.dateButtonText, { color: C.text }, pickedDate?.toDateString() === item.toDateString() && { color: '#fff' }]}>
                    {item.getDate()}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <View style={styles.datePickerButtons}>
              <TouchableOpacity style={[styles.datePickerButton, { backgroundColor: dark ? '#2d1a1a' : '#ffebee', borderWidth: 2, borderColor: C.red }]} onPress={() => setShowDatePicker(false)}>
                <Text style={[styles.cancelButtonText, { color: C.red }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.datePickerButton, { backgroundColor: C.teal }]} onPress={saveDatePicker}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  statusBarSpacer: { height: STATUS_BAR_HEIGHT },
  container: { flex: 1 },
  contentPadding: { padding: 16, paddingTop: 8 },
  subtitle: { fontSize: 13, marginBottom: 16, lineHeight: 20 },
  doseCard: { borderLeftWidth: 4, padding: 14, borderRadius: 8, marginBottom: 12, flexDirection: 'row' as const, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 2, elevation: 1 },
  checkbox: { marginRight: 12 },
  checkboxInner: { width: 24, height: 24, borderRadius: 6, borderWidth: 2, justifyContent: 'center', alignItems: 'center' },
  checkmark: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  doseInfo: { flex: 1 },
  doseName: { fontSize: 14, fontWeight: 'bold' },
  doseDate: { fontSize: 12, marginTop: 2 },
  congratsText: { fontSize: 11, fontWeight: '600', marginTop: 4, fontStyle: 'italic' },
  setDateButton: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6, marginLeft: 8 },
  setDateButtonText: { fontSize: 11, fontWeight: '600' },
  infoBox: { borderWidth: 1, borderRadius: 8, padding: 14, marginTop: 20, marginBottom: 20 },
  infoTitle: { fontSize: 13, fontWeight: 'bold', marginBottom: 8 },
  infoText: { fontSize: 12, lineHeight: 18, marginBottom: 6 },
  datePickerOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' },
  datePickerModal: { borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingHorizontal: 20, paddingVertical: 20, maxHeight: '85%' },
  datePickerTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  monthNavigation: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, paddingBottom: 12, borderBottomWidth: 1 },
  monthLabel: { fontSize: 14, fontWeight: '600' },
  monthNavButton: { fontSize: 12, fontWeight: '600' },
  dateGrid: { maxHeight: 280, marginBottom: 16 },
  dateButton: { flex: 1, margin: 4, paddingVertical: 10, paddingHorizontal: 4, borderRadius: 8, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  dateButtonText: { fontSize: 13, fontWeight: '600' },
  datePickerButtons: { flexDirection: 'row', gap: 12 },
  datePickerButton: { flex: 1, paddingVertical: 14, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  cancelButtonText: { fontSize: 14, fontWeight: '600' },
  saveButtonText: { fontSize: 14, fontWeight: '600', color: '#fff' },
});