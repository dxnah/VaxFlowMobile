import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  LayoutAnimation,
  Modal,
  Platform,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Announcements from "../../components/dashboard/Announcements";
import CenterStatusBanner from "../../components/dashboard/CenterStatusBanner";
import Reminders from "../../components/dashboard/Reminders";
import VaccineList from "../../components/dashboard/VaccineList";
import { useUser } from "../../context/UserContext";

const STATUS_BAR_HEIGHT =
  Platform.OS === "android" ? (StatusBar.currentHeight ?? 24) : 0;

export default function DashboardScreen() {
  const router = useRouter();
  const { username, darkMode, avatarUri } = useUser();
  const dark = darkMode;

  const [refreshing, setRefreshing] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [expectExpanded, setExpectExpanded] = useState(false);
  const [remindersExpanded, setRemindersExpanded] = useState(false);
  const [vaccineExpanded, setVaccineExpanded] = useState(false);
  const [announcementsExpanded, setAnnouncementsExpanded] = useState(false);

  const headerBg = dark ? "#1a2e2c" : "#2BAF9E";

  const C = {
    bg: dark ? "#1a1f1e" : "#f4faf9",
    card: dark ? "#242b2a" : "#ffffff",
    text: dark ? "#e8f0ef" : "#1a2e2c",
    sub: dark ? "#7aada8" : "#6b7280",
    border: dark ? "#2e3837" : "#e0eeec",
    teal: "#2BAF9E",
    tealLight: dark ? "#1e3330" : "#e6f7f5",
    divider: dark ? "#2e3837" : "#f0f0f0",
  };

  const refreshData = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 500);
  };
  const handleLogout = () => {
    setLogoutModalOpen(false);
    router.replace("/login");
  };
  const toggle = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setter((prev) => !prev);
  };

  const quickActions = [
    {
      label: "Register\nPatient",
      emoji: "🏥",
      color: "#43a047",
      bg: dark ? "#1a3320" : "#e8f5e9",
      onPress: () => router.push("/registration" as any),
    },
    {
      label: "View\nSchedule",
      emoji: "📅",
      color: "#1e88e5",
      bg: dark ? "#1a2a3d" : "#e3f2fd",
      onPress: () => router.push("/schedule"),
    },
    {
      label: "Vaccine\nInfo",
      emoji: "💉",
      color: "#f57c00",
      bg: dark ? "#2d1f0e" : "#fff3e0",
      onPress: () => router.push("/information"),
    },
  ];

  const CardHeader = ({
    iconBg,
    icon,
    title,
    expanded,
    onToggle,
  }: {
    iconBg: string;
    icon: string;
    title: string;
    expanded: boolean;
    onToggle: () => void;
  }) => (
    <TouchableOpacity onPress={onToggle} activeOpacity={0.8}>
      <View style={styles.cardRowHeader}>
        <View style={[styles.cardIconWrap, { backgroundColor: iconBg }]}>
          <Text style={{ fontSize: 18 }}>{icon}</Text>
        </View>
        <Text style={[styles.cardTitle, { color: C.text, flex: 1 }]}>
          {title}
        </Text>
        <Text
          style={{
            color: C.teal,
            fontSize: 13,
            fontWeight: "700",
            marginRight: 16,
          }}
        >
          {expanded ? "▲" : "▼"}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={[styles.root, { backgroundColor: headerBg }]}
      edges={["top", "left", "right"]}
    >
      <StatusBar
        translucent={false}
        backgroundColor={headerBg}
        barStyle="light-content"
      />

      {/* Sidebar Modal */}
      <Modal visible={sidebarOpen} transparent={true} animationType="fade">
        <View style={styles.sidebarContainer}>
          <View style={[styles.sidebar, { backgroundColor: "#26a69a" }]}>
            <View style={styles.sidebarProfile}>
              {avatarUri ? (
                <Image
                  source={{ uri: avatarUri }}
                  style={styles.sidebarAvatar}
                />
              ) : (
                <View style={styles.sidebarAvatarPlaceholder}>
                  <Text style={styles.sidebarAvatarLetter}>
                    {username.charAt(0).toUpperCase()}
                  </Text>
                </View>
              )}
              <Text style={styles.sidebarUsername}>{username}</Text>
            </View>
            <View style={styles.sidebarDivider} />
            <TouchableOpacity
              style={styles.sidebarItem}
              onPress={() => {
                setSidebarOpen(false);
                router.push("/dashboard");
              }}
            >
              <Text style={styles.sidebarItemText}>📊 Dashboard</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sidebarItem}
              onPress={() => {
                setSidebarOpen(false);
                router.push("/history");
              }}
            >
              <Text style={styles.sidebarItemText}>📋 Vaccination History</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sidebarItem}
              onPress={() => {
                setSidebarOpen(false);
                router.push("/settings");
              }}
            >
              <Text style={styles.sidebarItemText}>⚙️ Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sidebarItem, styles.logoutItem]}
              onPress={handleLogout}
            >
              <Text style={styles.logoutItemText}>🚪 Logout</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.sidebarOverlay}
            activeOpacity={1}
            onPress={() => setSidebarOpen(false)}
          />
        </View>
      </Modal>

      {/* Avatar Logout Modal */}
      <Modal visible={logoutModalOpen} transparent={true} animationType="fade">
        <TouchableOpacity
          style={styles.logoutOverlay}
          activeOpacity={1}
          onPress={() => setLogoutModalOpen(false)}
        >
          <View
            style={[
              styles.logoutPopup,
              { backgroundColor: dark ? "#242b2a" : "#ffffff" },
            ]}
          >
            {/* Avatar + name header */}
            <View style={styles.logoutPopupHeader}>
              {avatarUri ? (
                <Image
                  source={{ uri: avatarUri }}
                  style={styles.logoutPopupAvatar}
                />
              ) : (
                <View
                  style={[
                    styles.logoutPopupAvatarFallback,
                    { backgroundColor: "#2BAF9E" },
                  ]}
                >
                  <Text style={styles.logoutPopupAvatarLetter}>
                    {username.charAt(0).toUpperCase()}
                  </Text>
                </View>
              )}
              <View style={{ marginLeft: 12 }}>
                <Text
                  style={[
                    styles.logoutPopupName,
                    { color: dark ? "#e8f0ef" : "#1a2e2c" },
                  ]}
                >
                  {username}
                </Text>
                <Text
                  style={[
                    styles.logoutPopupRole,
                    { color: dark ? "#7aada8" : "#6b7280" },
                  ]}
                >
                  Patient
                </Text>
              </View>
            </View>
            <View
              style={[
                styles.logoutPopupDivider,
                { backgroundColor: dark ? "#2e3837" : "#e0eeec" },
              ]}
            />
            <TouchableOpacity
              style={styles.logoutPopupBtn}
              onPress={handleLogout}
              activeOpacity={0.8}
            >
              <Text style={styles.logoutPopupBtnText}>🚪 Logout</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <View style={[styles.header, { backgroundColor: headerBg }]}>
        <TouchableOpacity
          onPress={() => setSidebarOpen(true)}
          style={styles.menuBtnWrap}
          activeOpacity={0.7}
        >
          <Text style={styles.menuButton}>☰</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.greeting}>Hello, {username} 👋</Text>
          <Text style={styles.subheading}>ABTC-CHO Vaccine Status</Text>
        </View>
        {/* Avatar now opens logout popup, NOT settings */}
        <TouchableOpacity
          onPress={() => setLogoutModalOpen(true)}
          activeOpacity={0.8}
        >
          {avatarUri ? (
            <Image source={{ uri: avatarUri }} style={styles.headerAvatar} />
          ) : (
            <View style={styles.headerAvatarPlaceholder}>
              <Text style={styles.headerAvatarLetter}>
                {username.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, backgroundColor: C.bg }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 32 }}
          scrollEnabled={!sidebarOpen}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refreshData} />
          }
        >
          <View style={[styles.quickActionsRow, { backgroundColor: headerBg }]}>
            {quickActions.map((action, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.quickActionBtn, { backgroundColor: action.bg }]}
                onPress={action.onPress}
                activeOpacity={0.82}
              >
                <View
                  style={[
                    styles.quickActionIconWrap,
                    { backgroundColor: action.color },
                  ]}
                >
                  <Text style={{ fontSize: 22 }}>{action.emoji}</Text>
                </View>
                <Text
                  style={[styles.quickActionLabel, { color: action.color }]}
                >
                  {action.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.contentPadding}>
            {/* Today's Status — always open */}
            <View
              style={[
                styles.card,
                { backgroundColor: C.card, marginBottom: 12 },
              ]}
            >
              <View style={styles.cardRowHeader}>
                <View
                  style={[styles.cardIconWrap, { backgroundColor: "#e3f2fd" }]}
                >
                  <Text style={{ fontSize: 18 }}>📊</Text>
                </View>
                <Text style={[styles.cardTitle, { color: C.text }]}>
                  Today's Status
                </Text>
              </View>
              <View style={[styles.divider, { backgroundColor: C.divider }]} />
              <View style={{ paddingBottom: 8 }}>
                <CenterStatusBanner />
              </View>
            </View>

            {/* What to Expect */}
            <View
              style={[
                styles.card,
                { backgroundColor: C.card, marginBottom: 12 },
              ]}
            >
              <CardHeader
                iconBg="#fff3e0"
                icon="📋"
                title="What to Expect"
                expanded={expectExpanded}
                onToggle={() => toggle(setExpectExpanded)}
              />
              {!expectExpanded ? (
                <>
                  <View
                    style={[styles.divider, { backgroundColor: C.divider }]}
                  />
                  {[
                    "Register at entrance",
                    "Get classified (Cat 2 or Cat 3)",
                    "Receive vaccine",
                  ].map((item, i) => (
                    <View key={i} style={styles.bulletRow}>
                      <View
                        style={[styles.bullet, { backgroundColor: C.teal }]}
                      />
                      <Text style={[styles.bulletText, { color: C.sub }]}>
                        {item}
                      </Text>
                    </View>
                  ))}
                  <TouchableOpacity
                    style={[
                      styles.viewDetailsBtn,
                      { backgroundColor: C.tealLight },
                    ]}
                    onPress={() => toggle(setExpectExpanded)}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[styles.viewDetailsBtnText, { color: C.teal }]}
                    >
                      View Details →
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
                  <View
                    style={[
                      styles.divider,
                      {
                        backgroundColor: C.divider,
                        marginHorizontal: 0,
                        marginBottom: 12,
                      },
                    ]}
                  />
                  <Text style={[styles.expectSectionTitle, { color: C.teal }]}>
                    🏥 First-Time Patients
                  </Text>
                  <Text style={[styles.expectText, { color: C.sub }]}>
                    • Arrive before 8:00 AM and line up at the ABTC-CHO
                    entrance.
                  </Text>
                  <Text style={[styles.expectText, { color: C.sub }]}>
                    • Registration starts at 8:00 AM or 8:30 AM.
                  </Text>
                  <Text style={[styles.expectText, { color: C.sub }]}>
                    • You will be assessed and classified as Category 2 or
                    Category 3.
                  </Text>
                  <Text
                    style={[
                      styles.expectSectionTitle,
                      { color: "#1e88e5", marginTop: 10 },
                    ]}
                  >
                    📌 Category 2 Patients
                  </Text>
                  <Text style={[styles.expectText, { color: C.sub }]}>
                    • Proceed to the front desk for second verification. Your
                    name will be queued for processing.
                  </Text>
                  <Text style={[styles.expectText, { color: C.sub }]}>
                    • Assist with your PhilHealth form (provided by ABTC-CHO)
                    before being queued for vaccine administration.
                  </Text>
                  <Text
                    style={[
                      styles.expectSectionTitle,
                      { color: "#f57c00", marginTop: 10 },
                    ]}
                  >
                    📌 Category 3 Patients
                  </Text>
                  <Text style={[styles.expectText, { color: C.sub }]}>
                    • You'll be paired with another Cat 3 patient to share the
                    cost of one ARV vial. Purchase vial + 2 syringes (per
                    patient) from Mercury Drugstore.
                  </Text>
                  <Text style={[styles.expectText, { color: C.sub }]}>
                    • Return to front desk, submit items, and both names will be
                    queued for administration.
                  </Text>
                  <Text
                    style={[
                      styles.expectSectionTitle,
                      { color: "#43a047", marginTop: 10 },
                    ]}
                  >
                    💉 Booster Shot Patients
                  </Text>
                  <Text style={[styles.expectText, { color: C.sub }]}>
                    • Proceed to the registration area with your Vaccination
                    Card for verification.
                  </Text>
                  <TouchableOpacity
                    style={[
                      styles.viewDetailsBtn,
                      {
                        backgroundColor: C.tealLight,
                        marginTop: 14,
                        marginHorizontal: 0,
                      },
                    ]}
                    onPress={() => toggle(setExpectExpanded)}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[styles.viewDetailsBtnText, { color: C.teal }]}
                    >
                      ▲ Hide Details
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Reminders */}
            <View
              style={[
                styles.card,
                { backgroundColor: C.card, marginBottom: 12 },
              ]}
            >
              <CardHeader
                iconBg="#fff3e0"
                icon="🕐"
                title="Reminders"
                expanded={remindersExpanded}
                onToggle={() => toggle(setRemindersExpanded)}
              />
              {!remindersExpanded ? (
                <>
                  <View
                    style={[styles.divider, { backgroundColor: C.divider }]}
                  />
                  {[
                    "What to bring for 1st dose",
                    "What to bring for 2nd & 3rd dose",
                    "Pro tips for your visit",
                  ].map((item, i) => (
                    <View key={i} style={styles.bulletRow}>
                      <View
                        style={[styles.bullet, { backgroundColor: C.teal }]}
                      />
                      <Text style={[styles.bulletText, { color: C.sub }]}>
                        {item}
                      </Text>
                    </View>
                  ))}
                  <TouchableOpacity
                    style={[
                      styles.viewDetailsBtn,
                      { backgroundColor: C.tealLight },
                    ]}
                    onPress={() => toggle(setRemindersExpanded)}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[styles.viewDetailsBtnText, { color: C.teal }]}
                    >
                      View Details →
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <View
                    style={[styles.divider, { backgroundColor: C.divider }]}
                  />
                  <View style={{ paddingBottom: 8 }}>
                    <Reminders />
                  </View>
                  <TouchableOpacity
                    style={[
                      styles.viewDetailsBtn,
                      { backgroundColor: C.tealLight },
                    ]}
                    onPress={() => toggle(setRemindersExpanded)}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[styles.viewDetailsBtnText, { color: C.teal }]}
                    >
                      ▲ Hide Details
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>

            {/* Anti-Rabies Vaccine — always open */}
            <View
              style={[
                styles.card,
                { backgroundColor: C.card, marginBottom: 12 },
              ]}
            >
              <View style={styles.cardRowHeader}>
                <View
                  style={[styles.cardIconWrap, { backgroundColor: "#fce4ec" }]}
                >
                  <Text style={{ fontSize: 18 }}>💉</Text>
                </View>
                <Text style={[styles.cardTitle, { color: C.text }]}>
                  Anti-Rabies Vaccine
                </Text>
              </View>
              <View style={[styles.divider, { backgroundColor: C.divider }]} />
              <View style={styles.bulletRow}>
                <View style={[styles.bullet, { backgroundColor: "#e53935" }]} />
                <Text style={[styles.bulletText, { color: C.sub }]}>
                  3-dose series required
                </Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.viewDetailsBtn,
                  { backgroundColor: C.tealLight },
                ]}
                onPress={() => router.push("/schedule")}
                activeOpacity={0.8}
              >
                <Text style={[styles.viewDetailsBtnText, { color: C.teal }]}>
                  View Schedule →
                </Text>
              </TouchableOpacity>
            </View>

            {/* Vaccine List */}
            <View
              style={[
                styles.card,
                { backgroundColor: C.card, marginBottom: 4 },
              ]}
            >
              <CardHeader
                iconBg="#e8f5e9"
                icon="📋"
                title="Vaccine List"
                expanded={vaccineExpanded}
                onToggle={() => toggle(setVaccineExpanded)}
              />
              {!vaccineExpanded ? (
                <>
                  <View
                    style={[styles.divider, { backgroundColor: C.divider }]}
                  />
                  {[
                    "Anti-Rabies Vaccine (ARV)",
                    "BCG, Hepatitis B, MMR",
                    "Polio, DPT, Varicella",
                  ].map((item, i) => (
                    <View key={i} style={styles.bulletRow}>
                      <View
                        style={[styles.bullet, { backgroundColor: C.teal }]}
                      />
                      <Text style={[styles.bulletText, { color: C.sub }]}>
                        {item}
                      </Text>
                    </View>
                  ))}
                  <TouchableOpacity
                    style={[
                      styles.viewDetailsBtn,
                      { backgroundColor: C.tealLight },
                    ]}
                    onPress={() => toggle(setVaccineExpanded)}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[styles.viewDetailsBtnText, { color: C.teal }]}
                    >
                      View List →
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <View
                    style={[styles.divider, { backgroundColor: C.divider }]}
                  />
                  <VaccineList />
                  <TouchableOpacity
                    style={[
                      styles.viewDetailsBtn,
                      { backgroundColor: C.tealLight },
                    ]}
                    onPress={() => toggle(setVaccineExpanded)}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[styles.viewDetailsBtnText, { color: C.teal }]}
                    >
                      ▲ Hide List
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>

          {/* Announcements */}
          <View
            style={[styles.card, { backgroundColor: C.card, marginBottom: 12 }]}
          >
            <CardHeader
              iconBg="#fff3cd"
              icon="📢"
              title="Announcements"
              expanded={announcementsExpanded}
              onToggle={() => toggle(setAnnouncementsExpanded)}
            />
            {announcementsExpanded && (
              <>
                <View
                  style={[styles.divider, { backgroundColor: C.divider }]}
                />
                <Announcements />
                <TouchableOpacity
                  style={[
                    styles.viewDetailsBtn,
                    { backgroundColor: C.tealLight },
                  ]}
                  onPress={() => toggle(setAnnouncementsExpanded)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.viewDetailsBtnText, { color: C.teal }]}>
                    ▲ Hide
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>

          <View style={[styles.footer, { borderTopColor: C.border }]}>
            <Text style={[styles.footerText, { color: C.sub }]}>
              Animal Bite Treatment Center
            </Text>
            <Text style={[styles.footerSubtext, { color: C.sub }]}>
              City Health Office • Cagayan de Oro City, Misamis Oriental
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  sidebarContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  sidebar: {
    width: Dimensions.get("window").width * 0.75,
    paddingTop: 50,
    paddingHorizontal: 16,
    height: "100%",
  },
  sidebarOverlay: { flex: 1 },
  sidebarProfile: { alignItems: "center", paddingBottom: 16 },
  sidebarAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: "#ffffff50",
    marginBottom: 8,
  },
  sidebarAvatarPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderWidth: 2,
    borderColor: "#ffffff50",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  sidebarAvatarLetter: { fontSize: 26, color: "#fff", fontWeight: "700" },
  sidebarUsername: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 2,
  },
  sidebarDivider: { height: 1, backgroundColor: "#ffffff20", marginBottom: 16 },
  sidebarItem: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: "#ffffff10",
  },
  sidebarItemText: { fontSize: 14, color: "#fff", fontWeight: "500" },
  logoutItem: { marginTop: 20, backgroundColor: "#ff6b6b" },
  logoutItemText: { fontSize: 14, color: "#fff", fontWeight: "600" },

  // Avatar logout popup
  logoutOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  logoutPopup: {
    marginTop:
      Platform.OS === "android" ? (StatusBar.currentHeight ?? 24) + 60 : 60,
    marginRight: 12,
    borderRadius: 16,
    paddingVertical: 8,
    width: 220,
    elevation: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  logoutPopupHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  logoutPopupAvatar: { width: 40, height: 40, borderRadius: 20 },
  logoutPopupAvatarFallback: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutPopupAvatarLetter: { fontSize: 18, color: "#fff", fontWeight: "700" },
  logoutPopupName: { fontSize: 14, fontWeight: "700" },
  logoutPopupRole: { fontSize: 11, marginTop: 1 },
  logoutPopupDivider: { height: 1, marginHorizontal: 0 },
  logoutPopupBtn: { paddingHorizontal: 16, paddingVertical: 14 },
  logoutPopupBtnText: { fontSize: 14, color: "#e53935", fontWeight: "700" },

  header: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuBtnWrap: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 8,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  menuButton: { fontSize: 20, color: "#ffffff", fontWeight: "bold" },
  headerCenter: { flex: 1, justifyContent: "center", alignItems: "center" },
  greeting: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#ffffff",
  },
  subheading: {
    fontSize: 12,
    marginTop: 2,
    textAlign: "center",
    color: "rgba(255,255,255,0.75)",
  },
  headerAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.5)",
  },
  headerAvatarPlaceholder: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerAvatarLetter: { fontSize: 16, color: "#ffffff", fontWeight: "700" },
  quickActionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
    gap: 10,
  },
  quickActionBtn: {
    flex: 1,
    borderRadius: 16,
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 6,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  quickActionIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  quickActionLabel: {
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 16,
  },
  contentPadding: { padding: 16, paddingTop: 16 },
  card: {
    borderRadius: 16,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  cardRowHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  cardIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: { fontSize: 15, fontWeight: "700" },
  divider: { height: 1, marginHorizontal: 16 },
  bulletRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  bullet: { width: 7, height: 7, borderRadius: 4 },
  bulletText: { fontSize: 13, flex: 1 },
  viewDetailsBtn: {
    marginHorizontal: 16,
    marginBottom: 14,
    marginTop: 4,
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: "center",
  },
  viewDetailsBtnText: { fontWeight: "700", fontSize: 13 },
  expectSectionTitle: { fontSize: 13, fontWeight: "800", marginBottom: 4 },
  expectText: { fontSize: 12, lineHeight: 18, marginBottom: 3 },
  footer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    alignItems: "center",
    marginTop: 4,
  },
  footerText: { fontSize: 11, fontWeight: "600" },
  footerSubtext: { fontSize: 10, marginTop: 3 },
});
