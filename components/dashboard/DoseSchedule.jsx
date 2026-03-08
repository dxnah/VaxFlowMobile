// components/dashboard/DoseSchedule.jsx
import React from 'react';
import { Text, View } from 'react-native';
import styles from '../../styles/DoseSchedule';

const ScheduleItem = ({ dose, day, time }) => (
  <Text style={styles.item}>
    <Text style={styles.bold}>{dose}:</Text> {day} {time || ''}
  </Text>
);

export default function DoseSchedule() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ℹ️ Anti-Rabies Vaccination Schedule</Text>

      <View style={styles.infoBox}>
        <Text style={styles.desc}>
          Standard anti-rabies protocol requires 5 doses:
        </Text>

        <View style={styles.scheduleList}>
          <ScheduleItem dose="1st Dose" day="Day 0" time="(at time of bite)" />
          <ScheduleItem dose="2nd Dose" day="Day 3" />
          <ScheduleItem dose="3rd Dose" day="Day 7" />
          <ScheduleItem dose="4th Dose" day="Day 14" />
          <ScheduleItem dose="5th Dose" day="Day 28" />
        </View>

        <Text style={styles.important}>
          Complete all 5 doses as scheduled for full protection.
        </Text>
      </View>
    </View>
  );
}