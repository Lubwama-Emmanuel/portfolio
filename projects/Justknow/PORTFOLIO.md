# JustKnow — portfolio notes (repo facts only)

## 1) One-line project pitch

- **JustKnow** is a portrait **Expo / React Native** app (`app.json`, `package.json`) that talks to **remote REST and Socket.IO services** on `justknow.dfts.cloud` (`api/JustKnowApi.ts`, `constants/config.ts`) and bundles **posts, messaging, businesses, ride-hailing, notifications, and related auth/profile flows** in `app/` and `api/`. **Primary audience / go-to-market:** Unknown (not stated in-repo).

## 2) My role

- **Solo vs team:** Unknown (no contributors file, org chart, or README role breakdown in-repo).
- **Expo account owner field:** `owner` is `emmanuel-lubwama` in `app.json`.
- **What this repository contains end-to-end:** the **mobile client** (TypeScript, Expo Router screens, Redux store, RTK Query API modules, socket contexts, native `ios/` and `android/` trees). **Server / database / infra implementation:** not present in this repo (only URLs and HTTP clients).

## 3) Problem → approach → outcome

**Problem (inferred from structure, not from product briefs)**

- The app must coordinate **several product areas** (examples visible under `app/(tabs)/`, `app/(posts)/`, `app/(chats)/`, `app/(rides)/`, `app/(business)/`, policies) in one installable binary.
- The client must integrate **more than one HTTP base** (main API vs messaging REST) and **multiple Socket.IO hosts/paths** (`api/JustKnowApi.ts`, `api/JKMessagingApi.ts`, `constants/config.ts`, files under `contexts/`).
- **User-facing goals, KPIs, or “why we built this” narrative:** Unknown (not in-repo).

**Approach**

- **Expo Router** file-based navigation: `package.json` `"main": "expo-router/entry"`, route tree under `app/`.
- **Redux Toolkit + RTK Query** with **multiple injected API slices** in `redux/Store.ts` (`JustKnowApi`, `JKBusinessApi`, `JKMessagingApi`, `JKRideHailingApi`, `JKNotificationsApi`).
- **redux-persist** with **SecureStore-backed storage** and **whitelist** `auth` + `trip` (`redux/Store.ts`, `redux/secureStorage.ts`); **Socket.IO** via `socket.io-client` in `contexts/` (`package.json`).
- **Ship pipeline:** EAS profiles (`eas.json`), `expo-updates` + `updates.url` + `runtimeVersion` `appVersion` (`app.json`).
- **Env / gateway alignment:** `EXPO_PUBLIC_*` overrides and host-based messaging socket path (`constants/config.ts`).

**Outcome**

- **User counts, revenue, retention, crash-free sessions, latency SLOs:** Unknown (not in-repo).
- **App Store / Play status or review outcomes:** Unknown (not stored as data in this repository).
- **Concrete shipping markers in-repo:** app `version` `1.0.2`, bundle id `com.northup.app.justknow`, EAS `projectId`, iOS `appleTeamId`, Android `package` — all in `app.json`; production EAS profile sets `autoIncrement: true` (`eas.json`).

## 4) Tech stack

- **Language:** TypeScript (`package.json` `typescript`, `.ts` / `.tsx` sources).
- **Runtime / UI framework:** `expo` `~54.0.33`, `react-native` `0.81.5`, `react` `19.1.0` (`package.json`).
- **Routing:** `expo-router` `~6.0.14` (`package.json`, `app/`).
- **State:** `@reduxjs/toolkit`, `react-redux`, `redux-persist` (`package.json`, `redux/Store.ts`).
- **HTTP / caching:** RTK Query `createApi` / `fetchBaseQuery` — main REST `https://justknow.dfts.cloud/api/v1` (`api/JustKnowApi.ts`); messaging REST default `https://justknow.dfts.cloud/messaging/v1` (`constants/config.ts`, `api/JKMessagingApi.ts`).
- **Real-time:** `socket.io-client` `^4.8.1` (`package.json`, `contexts/`).
- **Auth-related client libs:** `expo-apple-authentication`, `@react-native-google-signin/google-signin`, `expo-auth-session` (`package.json`); iOS `usesAppleSignIn: true` (`app.json`); bearer `Authorization` header when `token` exists (`api/JustKnowApi.ts`).
- **Secure storage:** `expo-secure-store` (`package.json`, `redux/secureStorage.ts`).
- **Maps:** `react-native-maps` (`package.json`); Google Maps keys under `app.json` `ios.config` / `android.config`.
- **Styling:** `nativewind` `^4.2.1`, `tailwindcss` devDependency (`package.json`); `global.css` present at repo root.
- **Lists / motion / sheets:** `@shopify/flash-list`, `react-native-reanimated`, `@gorhom/bottom-sheet`, `moti` (`package.json`).
- **Forms:** `formik`, `yup` (`package.json`).
- **Push:** `expo-notifications` (`package.json`); token registration endpoints under `api/auth/` (e.g. `registerPushToken.ts`, `updatePushToken.ts`).
- **DB / server:** Unknown for backend storage; this repo is **client-only** relative to those services.
- **CI/CD:** No GitHub Actions (or similar) under `.github/` found in-repo; **CI/CD definition Unknown** beyond **EAS** config (`eas.json`, `app.json` `extra.eas`).

## 5) Notable technical decisions (visible in code)

- **New Architecture:** `"newArchEnabled": true` (`app.json`).
- **Tablet support:** iOS `"supportsTablet": false` (`app.json`).
- **Split RTK Query APIs by domain** instead of one monolithic client (`redux/Store.ts`, `api/JK*.ts`).
- **Messaging socket path** chosen by host (local LAN/localhost → `/socket.io`; `justknow.dfts.cloud` → `/messaging/socket.io`; override via `EXPO_PUBLIC_MESSAGING_SOCKET_PATH`) — `constants/config.ts` `resolveMessagingSocketPath`.
- **Persist only `auth` and `trip`** slices, not the entire store (`redux/Store.ts` `whitelist`).
- **EAS production** `autoIncrement: true` for iOS buildNumber (`eas.json`).

## 6) Hardest bug or constraint and how it was handled

- **Named incidents, root-cause write-ups, or timelines:** Unknown (no `CHANGELOG`, incident notes, or linked tickets in-repo).
- **Inferable engineering constraint:** operating multiple REST bases and Socket.IO paths/environments from one app (`constants/config.ts`, multiple `JK*Api` + `contexts/`). **How it is handled in code:** central URL helpers, `EXPO_PUBLIC_*` overrides, and host-based path resolution (`constants/config.ts`).

## 7) What I’d highlight in an interview for THIS project

- **Single mobile codebase spanning social feed, messaging, commerce/business, and ride-hailing** — evidenced by `app/` route groups and the breadth of `api/` modules.
- **Client architecture:** Redux Toolkit with **multiple RTK Query APIs**, persisted auth/trip state via **SecureStore**, and parallel **Socket.IO** contexts (`redux/Store.ts`, `contexts/`).
- **Shipping configuration:** Expo/EAS (profiles, project id), OTA updates URL, platform permissions and location copy in `app.json`, plus full `ios/` and `android/` native trees in-repo.

## 8) Suggested portfolio labels

- Mobile
- React Native
- Expo
- TypeScript
- Redux / RTK Query
- Real-time (Socket.IO client)
- Maps (`react-native-maps`)
