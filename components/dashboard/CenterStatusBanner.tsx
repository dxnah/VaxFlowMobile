import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface OperatingHours {
  open: number;
  cutoff: number;
  lunchStart: number;
  lunchEnd: number;
  close: number;
}

interface OperatingSchedule {
  [key: number]: OperatingHours | 'closed';
}

export default function CenterStatusBanner() {
  const [status, setStatus] = useState('');
  const [statusColor, setStatusColor] = useState('#4caf50');

  // Operating hours with cut-off and lunch break
  const operatingHours: OperatingSchedule = {
    0: 'closed', // Sunday
    1: { open: 8, cutoff: 9.5, lunchStart: 11.5, lunchEnd: 13, close: 17 }, // Monday
    2: { open: 8, cutoff: 9.5, lunchStart: 11.5, lunchEnd: 13, close: 17 }, // Tuesday
    3: { open: 8, cutoff: 9.5, lunchStart: 11.5, lunchEnd: 13, close: 17 }, // Wednesday
    4: { open: 8, cutoff: 9.5, lunchStart: 11.5, lunchEnd: 13, close: 17 }, // Thursday
    5: { open: 8, cutoff: 9.5, lunchStart: 11.5, lunchEnd: 13, close: 17 }, // Friday
    6: { open: 8, cutoff: 9.5, lunchStart: 11.5, lunchEnd: 13, close: 12 }, // Saturday
  };

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const formatTime = (hour: number): string => {
    const floorHour = Math.floor(hour);
    const minutes = Math.round((hour - floorHour) * 60);
    const timeString = minutes === 0 ? `${floorHour}:00` : `${floorHour}:${minutes}`;

    if (floorHour === 0) return `12:${minutes === 0 ? '00' : minutes} AM`;
    if (floorHour < 12) return `${timeString} AM`;
    if (floorHour === 12) return `${timeString} PM`;
    return `${floorHour - 12}:${minutes === 0 ? '00' : minutes} PM`;
  };

  useEffect(() => {
    const updateStatus = () => {
      const now = new Date();
      const dayOfWeek = now.getDay();
      const currentHour = now.getHours();
      const currentMinutes = now.getMinutes();
      const currentTime = currentHour + currentMinutes / 60;

      const todayHours = operatingHours[dayOfWeek];

      if (todayHours === 'closed') {
        // Find next opening day
        let nextOpenDay = (dayOfWeek + 1) % 7;
        let daysUntilOpen = 1;
        while (operatingHours[nextOpenDay] === 'closed') {
          nextOpenDay = (nextOpenDay + 1) % 7;
          daysUntilOpen++;
        }
        const nextOpenHours = operatingHours[nextOpenDay];
        if (nextOpenHours !== 'closed') {
          setStatus(
            daysUntilOpen === 1
              ? `❌ CLOSED • Opens tomorrow (${dayNames[nextOpenDay]}) at ${formatTime(nextOpenHours.open)}`
              : `❌ CLOSED • Opens ${dayNames[nextOpenDay]} at ${formatTime(nextOpenHours.open)}`
          );
        }
        setStatusColor('#f44336');
      } else if (currentTime < todayHours.open) {
        // Before opening time
        setStatus(`⏰ NOT OPEN YET • Opens at ${formatTime(todayHours.open)}`);
        setStatusColor('#ff9800');
      } else if (currentTime >= todayHours.lunchStart && currentTime < todayHours.lunchEnd) {
        // During lunch break
        setStatus(
          `🍽️ LUNCH BREAK • Operations paused (resumes at ${formatTime(todayHours.lunchEnd)})`
        );
        setStatusColor('#2196f3');
      } else if (currentTime >= todayHours.open && currentTime < todayHours.cutoff) {
        // Between opening and cut-off (accepting patients)
        setStatus(`✅ ACCEPTING PATIENTS • Cut-off at ${formatTime(todayHours.cutoff)}`);
        setStatusColor('#4caf50');
      } else if (currentTime >= todayHours.cutoff && currentTime < todayHours.lunchStart) {
        // After cut-off but before lunch
        setStatus(
          `⚠️ NOT ACCEPTING NEW PATIENTS • Serving existing patients (lunch at ${formatTime(todayHours.lunchStart)})`
        );
        setStatusColor('#ff9800');
      } else if (currentTime >= todayHours.lunchEnd && currentTime < todayHours.close) {
        // After lunch but before closing
        setStatus(
          `✅ OPEN FOR FOLLOW-UP VISITS • (closes at ${formatTime(todayHours.close)})`
        );
        setStatusColor('#4caf50');
      } else {
        // After closing time
        let nextOpenDay = (dayOfWeek + 1) % 7;
        let daysUntilOpen = 1;
        while (operatingHours[nextOpenDay] === 'closed') {
          nextOpenDay = (nextOpenDay + 1) % 7;
          daysUntilOpen++;
        }
        const nextOpenHours = operatingHours[nextOpenDay];
        if (nextOpenHours !== 'closed') {
          setStatus(
            daysUntilOpen === 1
              ? `❌ CLOSED • Opens tomorrow (${dayNames[nextOpenDay]}) at ${formatTime(nextOpenHours.open)}`
              : `❌ CLOSED • Opens ${dayNames[nextOpenDay]} at ${formatTime(nextOpenHours.open)}`
          );
        }
        setStatusColor('#f44336');
      }
    };

    updateStatus();
    const interval = setInterval(updateStatus, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={[styles.banner, { backgroundColor: statusColor + '20', borderColor: statusColor }]}>
      <Text style={[styles.statusText, { color: statusColor }]}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    borderLeftWidth: 4,
    padding: 12,
    borderRadius: 8,
    marginBottom: 14,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
});