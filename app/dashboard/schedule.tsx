import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    Modal,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface Dose {
  id: number;
  name: string;
  date: Date | null;
  completed: boolean;
}

const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) : 0;

export default function PatientScheduleScreen() {
  const router = useRouter();
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
    <View style={styles.root}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      {/* Status bar spacer */}
      <View style={styles.statusBarSpacer} />

      {/* App header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButtonContainer}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Patient Schedule</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.contentPadding}>
          <Text style={styles.subtitle}>
            Set your vaccination dose dates below. You'll receive reminders 1 day before each dose.
          </Text>

          {doses.map((dose) => (
            <View key={dose.id} style={[styles.doseCard, dose.completed && styles.doseCardCompleted]}>
              <TouchableOpacity style={styles.checkbox} onPress={() => toggleDoseComplete(dose.id)}>
                <View style={[styles.checkboxInner, dose.completed && styles.checkboxChecked]}>
                  {dose.completed && <Text style={styles.checkmark}>✓</Text>}
                </View>
              </TouchableOpacity>
              <View style={styles.doseInfo}>
                <Text style={[styles.doseName, dose.completed && styles.doseNameCompleted]}>{dose.name}</Text>
                {dose.date && (
                  <Text style={[styles.doseDate, dose.completed && styles.doseDateCompleted]}>{formatDate(dose.date)}</Text>
                )}
                {dose.completed && (
                  <Text style={styles.congratsText}>✓ Congratulations! You're done with your {dose.name}!</Text>
                )}
              </View>
              <TouchableOpacity style={styles.setDateButton} onPress={() => openDatePicker(dose.id)}>
                <Text style={styles.setDateButtonText}>{dose.date ? '✏️ Edit' : '📅 Set'}</Text>
              </TouchableOpacity>
            </View>
          ))}

          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>ℹ️ Important</Text>
            <Text style={styles.infoText}>• You'll receive notifications 1 day before each dose</Text>
            <Text style={styles.infoText}>• Complete all doses as scheduled for full protection</Text>
          </View>
        </View>
      </ScrollView>

      <Modal visible={showDatePicker} transparent={true} animationType="slide">
        <View style={styles.datePickerOverlay}>
          <View style={styles.datePickerModal}>
            <Text style={styles.datePickerTitle}>Select Date</Text>
            <View style={styles.monthNavigation}>
              <TouchableOpacity onPress={prevMonth}><Text style={styles.monthNavButton}>← Prev</Text></TouchableOpacity>
              <Text style={styles.monthLabel}>{calendarMonth.toLocaleString('en-US', { month: 'long', year: 'numeric' })}</Text>
              <TouchableOpacity onPress={nextMonth}><Text style={styles.monthNavButton}>Next →</Text></TouchableOpacity>
            </View>
            <FlatList
              data={currentMonthDays}
              keyExtractor={(item) => item.toISOString()}
              numColumns={7}
              scrollEnabled={false}
              style={styles.dateGrid}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.dateButton, pickedDate && pickedDate.toDateString() === item.toDateString() && styles.dateButtonSelected]}
                  onPress={() => setPickedDate(item)}
                >
                  <Text style={[styles.dateButtonText, pickedDate && pickedDate.toDateString() === item.toDateString() && styles.dateButtonTextSelected]}>
                    {item.getDate()}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <View style={styles.datePickerButtons}>
              <TouchableOpacity style={[styles.datePickerButton, styles.cancelButton]} onPress={() => setShowDatePicker(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.datePickerButton, styles.saveButton]} onPress={saveDatePicker}>
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
  root: { flex: 1, backgroundColor: '#ffffff' },
  statusBarSpacer: { height: STATUS_BAR_HEIGHT, backgroundColor: '#ffffff' },
  container: { flex: 1, backgroundColor: '#d4ede7' },
  header: { backgroundColor: '#fff', paddingVertical: 14, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#e0e0e0', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  backButtonContainer: { paddingRight: 8 },
  backButton: { fontSize: 16, fontWeight: '600', color: '#2196f3', paddingVertical: 6, paddingHorizontal: 8 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#333', textAlign: 'center' },
  contentPadding: { padding: 16, paddingTop: 8 },
  subtitle: { fontSize: 13, color: '#666', marginBottom: 16, lineHeight: 20 },
  doseCard: { backgroundColor: '#fff', borderLeftWidth: 4, borderLeftColor: '#2196f3', padding: 14, borderRadius: 8, marginBottom: 12, flexDirection: 'row' as const, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 2, elevation: 1 },
  doseCardCompleted: { backgroundColor: '#f5f5f5', borderLeftColor: '#4caf50' },
  checkbox: { marginRight: 12 },
  checkboxInner: { width: 24, height: 24, borderRadius: 6, borderWidth: 2, borderColor: '#2196f3', justifyContent: 'center', alignItems: 'center' },
  checkboxChecked: { backgroundColor: '#4caf50', borderColor: '#4caf50' },
  checkmark: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  doseInfo: { flex: 1 },
  doseName: { fontSize: 14, fontWeight: 'bold', color: '#333' },
  doseNameCompleted: { color: '#999' },
  doseDate: { fontSize: 12, color: '#666', marginTop: 2 },
  doseDateCompleted: { color: '#bbb' },
  congratsText: { fontSize: 11, color: '#4caf50', fontWeight: '600', marginTop: 4, fontStyle: 'italic' },
  setDateButton: { paddingHorizontal: 10, paddingVertical: 6, backgroundColor: '#e3f2fd', borderRadius: 6, marginLeft: 8 },
  setDateButtonText: { fontSize: 11, fontWeight: '600', color: '#2196f3' },
  infoBox: { backgroundColor: '#f9f9f9', borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 14, marginTop: 20, marginBottom: 20 },
  infoTitle: { fontSize: 13, fontWeight: 'bold', marginBottom: 8, color: '#333' },
  infoText: { fontSize: 12, color: '#666', lineHeight: 18, marginBottom: 6 },
  datePickerOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' },
  datePickerModal: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingHorizontal: 20, paddingVertical: 20, maxHeight: '85%' },
  datePickerTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 16, textAlign: 'center' },
  monthNavigation: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  monthLabel: { fontSize: 14, fontWeight: '600', color: '#333' },
  monthNavButton: { fontSize: 12, fontWeight: '600', color: '#2196f3' },
  dateGrid: { maxHeight: 280, marginBottom: 16 },
  dateButton: { flex: 1, margin: 4, paddingVertical: 10, paddingHorizontal: 4, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', alignItems: 'center', justifyContent: 'center' },
  dateButtonSelected: { backgroundColor: '#1b7b6b', borderColor: '#1b7b6b' },
  dateButtonText: { fontSize: 13, fontWeight: '600', color: '#333' },
  dateButtonTextSelected: { color: '#fff' },
  datePickerButtons: { flexDirection: 'row', gap: 12 },
  datePickerButton: { flex: 1, paddingVertical: 14, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  cancelButton: { backgroundColor: '#ffebee', borderWidth: 2, borderColor: '#f44336' },
  cancelButtonText: { fontSize: 14, fontWeight: '600', color: '#f44336' },
  saveButton: { backgroundColor: '#1b7b6b' },
  saveButtonText: { fontSize: 14, fontWeight: '600', color: '#fff' },
});