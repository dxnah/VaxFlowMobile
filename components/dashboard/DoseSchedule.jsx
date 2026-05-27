// components/dashboard/DoseSchedule.jsx
import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import styles from '../../styles/DoseSchedule';
import BASE_URL from '../../utils/api';
import { useUser } from '../../context/UserContext';  // ← fixed import

const ScheduleItem = ({ dose, date, completed }) => (
  <View style={styles.itemRow}>
    <Text style={[styles.bold, completed && styles.completedText]}>
      {dose}:
    </Text>
    <Text style={[styles.item, completed && styles.completedText]}>
      {' '}{date ? new Date(date).toLocaleDateString('en-PH', {
        year: 'numeric', month: 'short', day: 'numeric'
      }) : 'TBA'}
    </Text>
    <Text style={completed ? styles.doneBadge : styles.pendingBadge}>
      {completed ? ' ✓ Done' : ' Pending'}
    </Text>
  </View>
);

export default function DoseSchedule() {
  const { username, userId } = useUser();  // ← fixed hook usage
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        // Step 1: Resolve patient ID (use cached userId when available)
        let patientId = userId ?? null;
        if (!patientId) {
          const pRes = await fetch(`${BASE_URL}/patients/`);
          if (!pRes.ok) throw new Error('Failed to fetch patients');
          const patients = await pRes.json();
          const patient = Array.isArray(patients)
            ? patients.find(p => p.username === username)
            : null;
          if (!patient) { setLoading(false); return; }
          patientId = patient.id;
        }

        // Step 2: Fetch dose schedules by patient ID (correct endpoint)
        const res = await fetch(`${BASE_URL}/dose-schedules/patient/${patientId}/`);
        if (!res.ok) throw new Error('Failed to fetch schedules');
        const data = await res.json();
        setSchedules(data);
      } catch (err) {
        setError('Could not load schedule.');
      } finally {
        setLoading(false);
      }
    };

    if (username) fetchSchedules();
    else setLoading(false);
  }, [username]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💉 Anti-Rabies Vaccination Schedule</Text>

      <View style={styles.infoBox}>
        {loading ? (
          <ActivityIndicator color="#2BAF9E" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : schedules.length === 0 ? (
          <>
            <Text style={styles.desc}>
              Standard anti-rabies protocol requires 5 doses:
            </Text>
            <View style={styles.scheduleList}>
              <Text style={styles.item}><Text style={styles.bold}>1st Dose:</Text> Day 0 (at time of bite)</Text>
              <Text style={styles.item}><Text style={styles.bold}>2nd Dose:</Text> Day 3</Text>
              <Text style={styles.item}><Text style={styles.bold}>3rd Dose:</Text> Day 7</Text>
              <Text style={styles.item}><Text style={styles.bold}>4th Dose:</Text> Day 14</Text>
              <Text style={styles.item}><Text style={styles.bold}>5th Dose:</Text> Day 28</Text>
            </View>
            <Text style={styles.important}>
              Complete all 5 doses as scheduled for full protection.
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.desc}>Your personal dose schedule:</Text>
            <View style={styles.scheduleList}>
              {schedules.map((item, index) => (
                <ScheduleItem
                  key={item.id ?? index}
                  dose={item.dose_name}
                  date={item.dose_date}
                  completed={item.completed}
                />
              ))}
            </View>
            <Text style={styles.important}>
              Complete all doses as scheduled for full protection.
            </Text>
          </>
        )}
      </View>
    </View>
  );
}