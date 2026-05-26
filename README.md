# VaxFlow Mobile

<p align="center">
  <img src="assets/images/icon.png" alt="VaxFlow Mobile Logo" width="80"/>
</p>

<p align="center">
  <b>A React Native mobile application for managing anti-rabies vaccination records, dose schedules, and health center updates for ABTC-CHO patients.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Expo-54.0.34-000020?logo=expo&logoColor=white" />
  <img src="https://img.shields.io/badge/React_Native-0.81.5-61DAFB?logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5.9.2-3178C6?logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Expo_Router-6.0.23-000020?logo=expo&logoColor=white" />
</p>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Configuration](#api-configuration)
- [Architecture](#architecture)
- [Screens](#screens)
- [Dashboard](#dashboard)
- [Deployment](#deployment)
- [Related Repositories](#related-repositories)
- [Team](#team)

---

## Overview

VaxFlowMobile is the mobile companion application for the VaxFlow Vaccine Management & Inventory System. Built with Expo and React Native, it provides patients at the **Animal Bite Treatment Center (ABTC-CHO)** in Cagayan de Oro City with mobile access to their vaccination records, dose schedules, and real-time health center updates.

The app connects to the VaxFlow FastAPI backend hosted on Render and complements the React web application with a native mobile experience optimized for Android and iOS.

The system currently supports the **Patient** role, providing a focused set of features for ARV patients tracking their vaccination journey at ABTC-CHO.

---

## Features

| Module                      | Description                                                                                |
| --------------------------- | ------------------------------------------------------------------------------------------ |
| 🔐 **Authentication**       | Login and sign-up for Patient users via the VaxFlow backend API                            |
| 📊 **Dashboard**            | Card-based overview with quick actions, expandable info sections, and health center status |
| 📋 **Vaccination History**  | View complete vaccination records and dose history per patient                             |
| 💉 **Vaccine Information**  | Browse ARV and other vaccine details available at the health center                        |
| 📅 **Dose Scheduling**      | View and track scheduled dose dates with status indicators                                 |
| 🏥 **Patient Registration** | Register new patients and animal bite/exposure incidents                                   |
| 📢 **Announcements**        | Read health center announcements and advisories fetched from the backend                   |
| 🕐 **Reminders**            | Expandable checklist of what to bring per dose visit                                       |
| ⚙️ **Settings**             | Manage dark/light mode, profile avatar, and user preferences                               |
| 🌙 **Dark Mode**            | Full dark/light theme support across all screens via global context                        |

---

## Tech Stack

| Technology                   | Version  | Purpose                              |
| ---------------------------- | -------- | ------------------------------------ |
| Expo                         | ~54.0.34 | Mobile app runtime & toolchain       |
| React Native                 | 0.81.5   | Cross-platform mobile UI framework   |
| React                        | 19.1.0   | UI component library                 |
| Expo Router                  | ~6.0.23  | File-based stack navigation          |
| React Navigation             | ^7.1.8   | Bottom tabs & native stack navigator |
| TypeScript                   | ~5.9.2   | Type-safe development                |
| Async Storage                | 2.2.0    | Local data persistence               |
| React Native Reanimated      | ~4.1.1   | Smooth layout animations             |
| Expo Image Picker            | ~17.0.11 | Camera & gallery access for avatar   |
| Expo Haptics                 | ~15.0.8  | Tactile feedback on interactions     |
| Expo Vector Icons            | ^15.0.3  | Icon library                         |
| React Native Gesture Handler | ~2.28.0  | Touch & gesture support              |

---

## Project Structure

```
VaxFlowMobile/
├── app/                             ← Expo Router file-based routes
│   ├── _layout.tsx                  ← Root Stack layout + UserProvider wrapper
│   ├── index.jsx                    ← App entry point / redirect
│   ├── login.jsx                    ← Login screen
│   ├── signup.jsx                   ← Patient sign-up screen
│   ├── history.jsx                  ← Vaccination history screen
│   ├── information.jsx              ← Vaccine information screen
│   ├── schedule.tsx                 ← Dose schedule screen
│   ├── settings.jsx                 ← Settings screen (dark mode, avatar)
│   ├── registration.jsx             ← Patient & bite registration screen
│   └── dashboard/                   ← Dashboard screen group
├── components/
│   ├── dashboard/                   ← Dashboard card components
│   │   ├── Announcements.jsx        ← Fetches & renders announcements from API
│   │   ├── CapacityBar.jsx          ← Visual capacity indicator
│   │   ├── CenterStatusBanner.tsx   ← ABTC-CHO operational status banner
│   │   ├── DoseSchedule.jsx         ← Dose schedule summary card
│   │   ├── Registration.jsx         ← Registration summary card
│   │   ├── Reminders.jsx            ← What-to-bring reminders list
│   │   ├── StatusBadge.jsx          ← Status indicator badge
│   │   └── VaccineList.jsx          ← Full vaccine catalog list
│   └── SharedHeader.tsx             ← Shared screen header component
├── context/
│   └── UserContext.js               ← Global state: username, darkMode, avatarUri
├── data/
│   └── mockData.js                  ← Static mock/seed data
├── hooks/
│   ├── useAuth.js                   ← Authentication hook
│   └── useDashboardData.js          ← Dashboard data fetching hook
├── styles/                          ← Per-screen StyleSheet files
│   ├── colors.js                    ← Color tokens & dark/light theme constants
│   └── [screen].js                  ← Styles per screen
├── utils/
│   └── api.js                       ← BASE_URL constant for FastAPI backend
├── assets/                          ← Images, fonts, and static assets
├── app.json                         ← Expo app configuration
├── eas.json                         ← EAS Build profiles
├── tsconfig.json
├── eslint.config.js
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn
- [Expo Go](https://expo.dev/go) on your Android or iOS device (for physical device testing)
- Android Studio or Xcode for emulator/simulator (optional)

---

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/dxnah/VaxFlowMobile.git
cd VaxFlowMobile

# 2. Install dependencies
npm install

# 3. Start the Expo development server
npx expo start
```

In the output, you'll find options to open the app in a:

- [Expo Go](https://expo.dev/go) — scan the QR code with your mobile device
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/) — press `a`
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/) — press `i` (macOS only)
- [Development build](https://docs.expo.dev/develop/development-builds/introduction/) — for full native capabilities

### Reset Project

```bash
npm run reset-project
```

This moves the starter code to `app-example/` and creates a blank `app/` directory to start fresh.

---

## API Configuration

All backend communication is centralized in `utils/api.js`:

```js
// utils/api.js
const BASE_URL = "http://192.168.x.x:8000/api";
export default BASE_URL;
```

**For local development:** Replace `192.168.x.x` with your machine's local IP address. Make sure your device and development machine are on the same Wi-Fi network.

**For production:** Update `BASE_URL` to the deployed backend:

```js
const BASE_URL = "https://vaxflow-backend.onrender.com/api";
```

> ⚠️ Render's free tier spins down after inactivity — expect a short cold start delay on the first API request.

---

## Architecture

### Navigation

VaxFlowMobile uses **Expo Router** (file-based routing) with a **Stack navigator**. All screens are defined as files under `app/`. The root layout (`app/_layout.tsx`) wraps the entire app in the `UserProvider` context and disables all screen headers globally (`headerShown: false`).

### Global State

User state is managed through a React Context (`UserContext.js`) that exposes the following values throughout the app:

| Value          | Type           | Description                                  |
| -------------- | -------------- | -------------------------------------------- |
| `username`     | string         | Logged-in patient's username                 |
| `setUsername`  | function       | Setter for updating username on login        |
| `darkMode`     | boolean        | Current dark/light theme state               |
| `setDarkMode`  | function       | Toggle theme from Settings screen            |
| `avatarUri`    | string \| null | URI for the user's profile avatar            |
| `setAvatarUri` | function       | Update avatar from Settings via image picker |

### Custom Hooks

| Hook                  | Description                                              |
| --------------------- | -------------------------------------------------------- |
| `useAuth.js`          | Handles authentication logic and login state             |
| `useDashboardData.js` | Manages data fetching and state for the Dashboard screen |

---

## Screens

| Screen              | Route           | Description                                                        |
| ------------------- | --------------- | ------------------------------------------------------------------ |
| Login               | `/login`        | Role-based login for Patient users                                 |
| Sign Up             | `/signup`       | New patient account registration                                   |
| Dashboard           | `/dashboard`    | Main home screen with cards, quick actions, and sidebar navigation |
| Vaccination History | `/history`      | Complete vaccination records per patient                           |
| Vaccine Information | `/information`  | ARV and other vaccine details                                      |
| Dose Schedule       | `/schedule`     | Dose schedule list with status indicators                          |
| Registration        | `/registration` | New patient and animal bite registration                           |
| Settings            | `/settings`     | Dark mode toggle, avatar upload, and preferences                   |

---

## Dashboard

The Dashboard is the main screen of the app. It features a teal header with a **hamburger sidebar menu**, a personalized greeting, and a **quick actions row** for the three most common tasks:

| Quick Action        | Route           |
| ------------------- | --------------- |
| 🏥 Register Patient | `/registration` |
| 📅 View Schedule    | `/schedule`     |
| 💉 Vaccine Info     | `/information`  |

Below the quick actions are **six expandable/collapsible cards** with smooth `LayoutAnimation` transitions:

| Card                   | Description                                                                     |
| ---------------------- | ------------------------------------------------------------------------------- |
| 📊 Today's Status      | Always-visible `CenterStatusBanner` showing ABTC-CHO operational status         |
| 📋 What to Expect      | Step-by-step guide for first-time, Category 2, Category 3, and Booster patients |
| 🕐 Reminders           | What-to-bring checklist per dose visit with pro tips                            |
| 💉 Anti-Rabies Vaccine | 3-dose ARV series summary with shortcut to the Schedule screen                  |
| 📋 Vaccine List        | Full catalog of vaccines available at the health center                         |
| 📢 Announcements       | Health center announcements fetched live from the backend                       |

Navigation is handled via a **sidebar modal** (75% screen width, teal background) with links to Dashboard, Vaccination History, Settings, and Logout. Tapping the **user avatar** opens a logout popup showing the username, role, and logout button.

The dashboard supports **pull-to-refresh** and full **dark mode theming** driven by the `UserContext` global state.

---

## API Endpoints Used

VaxFlowMobile communicates exclusively with the VaxFlow FastAPI backend. The following endpoints are consumed by the mobile app:

| Method | Endpoint                                 | Description                                       |
| ------ | ---------------------------------------- | ------------------------------------------------- |
| POST   | `/api/login/`                            | Authenticate patient; returns session credentials |
| POST   | `/api/signup/`                           | Register a new patient account                    |
| GET    | `/api/patients/{id}/`                    | Fetch patient profile data                        |
| GET    | `/api/vaccination-history/patient/{id}/` | Patient vaccination records                       |
| GET    | `/api/dose-schedules/patient/{id}/`      | Patient dose schedule list                        |
| GET    | `/api/registrations/patient/{id}/`       | Patient animal bite registrations                 |
| GET    | `/api/vaccines/`                         | List all available vaccines                       |
| GET    | `/api/notifications/`                    | System notifications                              |
| GET    | `/api/announcements/`                    | Health center announcements                       |

Full API documentation: [https://vaxflow-backend.onrender.com/docs](https://vaxflow-backend.onrender.com/docs)

---

## Deployment

VaxFlowMobile uses **Expo Application Services (EAS)** for building and distributing the app.

```bash
# Configure EAS (first time only)
eas build:configure

# Build for Android (.apk or .aab)
eas build --platform android

# Build for iOS (.ipa)
eas build --platform ios

# Build for both platforms
eas build --platform all
```

**Notes:**

- Build profiles (development, preview, production) are configured in `eas.json`
- `expo-env.d.ts` provides TypeScript type declarations for Expo environment variables
- Before building for production, update `BASE_URL` in `utils/api.js` to the live backend URL

| Layer        | Platform      | URL                                  |
| ------------ | ------------- | ------------------------------------ |
| Mobile App   | EAS / Expo Go | —                                    |
| Backend API  | Render        | https://vaxflow-backend.onrender.com |
| Frontend Web | Vercel        | https://vaxflow-seven.vercel.app     |

---

## Learn More

- [Expo documentation](https://docs.expo.dev/)
- [Expo Router — file-based routing](https://docs.expo.dev/router/introduction)
- [React Native documentation](https://reactnative.dev/docs/getting-started)
- [EAS Build](https://docs.expo.dev/build/introduction/)

---

## Related Repositories

- **Frontend (React Web App):** [github.com/dxnah/VaxFlow](https://github.com/dxnah/VaxFlow)
- **Backend (FastAPI + ML):** [github.com/dxnah/vaxflow-backend](https://github.com/dxnah/vaxflow-backend)

---

## Team

**IT3R9 – Group 6**  
IT323 — Application Development and Emerging Technologies

---

<p align="center">Made with 💉 by the VaxFlow Team</p>
