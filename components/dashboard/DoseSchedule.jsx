import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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

const ScheduleItem = ({ dose, day, time }) => (
  <Text style={styles.item}>
    <Text style={styles.bold}>{dose}:</Text> {day} {time || ''}
  </Text>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoBox: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
  },
  desc: {
    fontSize: 12,
    color: '#555',
    marginBottom: 10,
    lineHeight: 18,
  },
  scheduleList: {
    marginVertical: 10,
  },
  item: {
    fontSize: 12,
    color: '#333',
    marginBottom: 6,
    lineHeight: 18,
  },
  bold: {
    fontWeight: 'bold',
  },
  important: {
    fontSize: 11,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 10,
    lineHeight: 16,
  },
});