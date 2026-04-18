// app/schedule.tsx

import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "../context/UserContext";
import BASE_URL from "../utils/api";

interface Dose {
  id: number;
  name: string;
  date: Date | null;
  completed: boolean;
  optional?: boolean;
}

const STATUS_BAR_HEIGHT =
  Platform.OS === "android" ? (StatusBar.currentHeight ?? 24) : 0;

export default function PatientScheduleScreen() {
  const router = useRouter();
  const { darkMode, username } = useUser();
  const dark = darkMode;

  const C = {
    bg: dark ? "#1a1f1e" : "#ffffff",
    contentBg: dark ? "#1a1f1e" : "#d4ede7",
    card: dark ? "#242b2a" : "#ffffff",
    text: dark ? "#e8f0ef" : "#333333",
    sub: dark ? "#7aada8" : "#666666",
    border: dark ? "#2e3837" : "#e0e0e0",
    inputBg: dark ? "#1e2928" : "#f9f9f9",
    blue: "#2196f3",
    teal: "#1b7b6b",
    green: "#4caf50",
    red: "#f44336",
    topBar: dark ? "#1a2e2c" : "#2BAF9E",
    progressBg: dark ? "#2e3837" : "#e0f2ef",
  };

  const [doses, setDoses] = useState<Dose[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (username) fetchSchedule();
  }, [username]);

  const fetchSchedule = async () => {
    try {
      const res = await fetch(`${BASE_URL}/schedules/?username=${username}`);
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const mapped = data.map((item: any) => ({
          id: item.id,
          name: item.dose_name,
          date: item.dose_date ? new Date(item.dose_date) : null,
          completed: item.completed,
          optional: item.is_optional,
        }));
        setDoses(mapped);
      } else {
        setDoses([
          { id: 1, name: "1st Dose", date: null, completed: false },
          { id: 2, name: "2nd Dose", date: null, completed: false },
          { id: 3, name: "3rd Dose", date: null, completed: false },
          {
            id: 4,
            name: "Booster Shot",
            date: null,
            completed: false,
            optional: true,
          },
        ]);
      }
    } catch (e) {
      setDoses([
        { id: 1, name: "1st Dose", date: null, completed: false },
        { id: 2, name: "2nd Dose", date: null, completed: false },
        { id: 3, name: "3rd Dose", date: null, completed: false },
        {
          id: 4,
          name: "Booster Shot",
          date: null,
          completed: false,
          optional: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const requiredDoses = doses.filter((d) => !d.optional);
  const completedRequired = requiredDoses.filter((d) => d.completed).length;
  const progressPercent =
    requiredDoses.length > 0
      ? Math.round((completedRequired / requiredDoses.length) * 100)
      : 0;
  const allRequiredDone =
    completedRequired === requiredDoses.length && requiredDoses.length > 0;

  const formatDate = (date: Date | null): string => {
    if (!date) return "Not set";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <SafeAreaView
        style={[styles.root, { backgroundColor: C.topBar }]}
        edges={["top", "left", "right"]}
      >
        <View style={[styles.header, { backgroundColor: C.topBar }]}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backBtn}
          >
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>📅 Patient Schedule</Text>
          <View style={{ width: 70 }} />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: C.contentBg,
          }}
        >
          <ActivityIndicator size="large" color={C.teal} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.root, { backgroundColor: C.topBar }]}
      edges={["top", "left", "right"]}
    >
      <StatusBar
        translucent={false}
        backgroundColor={C.topBar}
        barStyle="light-content"
      />

      {/* ── Header ── */}
      <View style={[styles.header, { backgroundColor: C.topBar }]}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backBtn}
          activeOpacity={0.7}
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>📅 Patient Schedule</Text>
        <View style={{ width: 70 }} />
      </View>

      <View style={{ flex: 1, backgroundColor: C.contentBg }}>
        <ScrollView style={styles.container}>
          <View style={styles.contentPadding}>
            {/* ── Progress Tracker ── */}
            <View
              style={[
                styles.progressCard,
                { backgroundColor: C.card, borderColor: C.border },
              ]}
            >
              <View style={styles.progressHeader}>
                <Text style={[styles.progressTitle, { color: C.text }]}>
                  💉 Vaccination Progress
                </Text>
                <View
                  style={[
                    styles.progressBadge,
                    {
                      backgroundColor: allRequiredDone
                        ? "#e8f5e9"
                        : dark
                          ? "#1e2d3d"
                          : "#e3f2fd",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.progressBadgeText,
                      { color: allRequiredDone ? C.green : C.blue },
                    ]}
                  >
                    {allRequiredDone
                      ? "✅ Complete"
                      : `${completedRequired}/${requiredDoses.length} doses`}
                  </Text>
                </View>
              </View>

              <View
                style={[
                  styles.progressBarBg,
                  { backgroundColor: C.progressBg },
                ]}
              >
                <View
                  style={[
                    styles.progressBarFill,
                    {
                      width: `${progressPercent}%` as any,
                      backgroundColor: allRequiredDone ? C.green : C.teal,
                    },
                  ]}
                />
              </View>
              <Text
                style={[
                  styles.progressPercent,
                  { color: allRequiredDone ? C.green : C.teal },
                ]}
              >
                {progressPercent}% complete
              </Text>

              <View style={styles.stepsRow}>
                {doses.map((dose, index) => (
                  <View key={dose.id} style={styles.stepItem}>
                    {index > 0 && (
                      <View
                        style={[
                          styles.stepLine,
                          {
                            backgroundColor: doses[index - 1].completed
                              ? C.teal
                              : C.progressBg,
                          },
                        ]}
                      />
                    )}
                    <View
                      style={[
                        styles.stepCircle,
                        {
                          backgroundColor: dose.completed
                            ? C.teal
                            : dose.optional
                              ? "transparent"
                              : C.progressBg,
                          borderColor: dose.completed ? C.teal : C.border,
                          borderWidth: dose.optional ? 1.5 : 2,
                          borderStyle: dose.optional ? "dashed" : "solid",
                        },
                      ]}
                    >
                      {dose.completed ? (
                        <Text style={styles.stepCheck}>✓</Text>
                      ) : (
                        <Text style={[styles.stepNum, { color: C.sub }]}>
                          {index + 1}
                        </Text>
                      )}
                    </View>
                    <Text
                      style={[
                        styles.stepLabel,
                        { color: dose.completed ? C.teal : C.sub },
                        dose.optional && { fontStyle: "italic" },
                      ]}
                    >
                      {dose.optional ? "Boost" : `D${index + 1}`}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <Text style={[styles.subtitle, { color: C.sub }]}>
              Your vaccination schedule is set by the health center staff.
            </Text>

            {doses.map((dose) => (
              <View
                key={dose.id}
                style={[
                  styles.doseCard,
                  { backgroundColor: C.card, borderLeftColor: C.blue },
                  dose.completed && {
                    backgroundColor: dark ? "#1e2a1e" : "#f5f5f5",
                    borderLeftColor: C.green,
                  },
                  dose.optional &&
                    !dose.completed && { borderLeftColor: "#ff9800" },
                ]}
              >
                <View
                  style={[
                    styles.checkboxInner,
                    { borderColor: dose.optional ? "#ff9800" : C.blue },
                    dose.completed && {
                      backgroundColor: C.green,
                      borderColor: C.green,
                    },
                  ]}
                >
                  {dose.completed && <Text style={styles.checkmark}>✓</Text>}
                </View>

                <View style={styles.doseInfo}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <Text
                      style={[
                        styles.doseName,
                        { color: C.text },
                        dose.completed && { color: dark ? "#5a7a5a" : "#999" },
                      ]}
                    >
                      {dose.name}
                    </Text>
                    {dose.optional && (
                      <View style={styles.optionalTag}>
                        <Text style={styles.optionalTagText}>Optional</Text>
                      </View>
                    )}
                  </View>
                  <Text style={[styles.doseDate, { color: C.sub }]}>
                    📅 {formatDate(dose.date)}
                  </Text>
                  {dose.completed && (
                    <Text style={[styles.congratsText, { color: C.green }]}>
                      ✓ Done!
                    </Text>
                  )}
                </View>
              </View>
            ))}

            {allRequiredDone && (
              <View
                style={[
                  styles.allDoneBanner,
                  {
                    backgroundColor: dark ? "#1a3320" : "#e8f5e9",
                    borderColor: C.green,
                  },
                ]}
              >
                <Text style={styles.allDoneEmoji}>🎉</Text>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.allDoneTitle, { color: C.green }]}>
                    All doses complete!
                  </Text>
                  <Text style={[styles.allDoneSub, { color: C.sub }]}>
                    You are fully protected. Consider the booster for extra
                    immunity.
                  </Text>
                </View>
              </View>
            )}

            <View
              style={[
                styles.infoBox,
                { backgroundColor: C.inputBg, borderColor: C.border },
              ]}
            >
              <Text style={[styles.infoTitle, { color: C.text }]}>
                ℹ️ Important
              </Text>
              <Text style={[styles.infoText, { color: C.sub }]}>
                • Your schedule is managed by the health center
              </Text>
              <Text style={[styles.infoText, { color: C.sub }]}>
                • Complete all doses as scheduled for full protection
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backBtn: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  backText: { color: "#fff", fontWeight: "700", fontSize: 14 },
  headerTitle: { color: "#fff", fontWeight: "800", fontSize: 16 },
  container: { flex: 1 },
  contentPadding: { padding: 16, paddingTop: 12 },
  progressCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  progressTitle: { fontSize: 14, fontWeight: "700" },
  progressBadge: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  progressBadgeText: { fontSize: 12, fontWeight: "700" },
  progressBarBg: {
    height: 8,
    borderRadius: 4,
    marginBottom: 6,
    overflow: "hidden",
  },
  progressBarFill: { height: 8, borderRadius: 4 },
  progressPercent: { fontSize: 11, fontWeight: "600", marginBottom: 16 },
  stepsRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  stepItem: { flex: 1, alignItems: "center", position: "relative" },
  stepLine: {
    position: "absolute",
    top: 14,
    right: "50%",
    left: "-50%",
    height: 2,
  },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  stepCheck: { color: "#fff", fontSize: 13, fontWeight: "800" },
  stepNum: { fontSize: 12, fontWeight: "600" },
  stepLabel: { fontSize: 10, fontWeight: "600", textAlign: "center" },
  subtitle: { fontSize: 13, marginBottom: 12, lineHeight: 20 },
  doseCard: {
    borderLeftWidth: 4,
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 1,
  },
  checkboxInner: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  checkmark: { color: "#fff", fontWeight: "bold", fontSize: 14 },
  doseInfo: { flex: 1 },
  doseName: { fontSize: 14, fontWeight: "bold" },
  doseDate: { fontSize: 12, marginTop: 2 },
  congratsText: {
    fontSize: 11,
    fontWeight: "600",
    marginTop: 4,
    fontStyle: "italic",
  },
  optionalTag: {
    backgroundColor: "#fff3e0",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  optionalTagText: { fontSize: 9, color: "#ff9800", fontWeight: "700" },
  allDoneBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
  },
  allDoneEmoji: { fontSize: 28 },
  allDoneTitle: { fontSize: 14, fontWeight: "800", marginBottom: 2 },
  allDoneSub: { fontSize: 12, lineHeight: 16 },
  infoBox: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    marginTop: 4,
    marginBottom: 20,
  },
  infoTitle: { fontSize: 13, fontWeight: "bold", marginBottom: 8 },
  infoText: { fontSize: 12, lineHeight: 18, marginBottom: 6 },
});
