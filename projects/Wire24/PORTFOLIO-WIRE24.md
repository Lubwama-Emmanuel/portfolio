# Wire24 — portfolio / job-search notes (repo-sourced)

## 1) One-line project pitch (what it is + who it’s for)

- **Wire24** is a cross-platform mobile app (Expo / React Native) branded **Wire24** with wallet/vault flows, KYC-related UI, notifications, and maps-related configuration; API client targets **`https://api.wire24.co/`** (`api/wireApi.ts`). Intended audience is **not stated in the repo** beyond product naming.

## 2) My role (solo vs team; what I owned end-to-end)

- **Solo vs team:** Unknown (no `CONTRIBUTORS`, team roster, or authorship attribution in the files reviewed).
- **What was owned end-to-end:** Unknown at individual level; the repo contains a full client app surface (routing, state, API layer, native plugins).

## 3) Problem → approach → outcome

**Problem (evidenced)**

- Mobile client must talk to a remote API with authenticated requests (`api/wireApi.ts` — `Authorization: Bearer` from Redux auth slice).
- Users need persistent client state across sessions (`redux-persist` in `redux/store.ts`, `PersistGate` in `app/_layout.tsx`).
- Home screen “widget” grid combines reordering and context actions (`components/SortableList/WidgetList.tsx` — `react-native-sortables`, `zeego/context-menu`).
- Connectivity changes should surface in-app (`components/network/ConnectivityModal.tsx` — `@react-native-community/netinfo`, animated top banner, skips first NetInfo event).
- iOS-only **Expo Widgets / Live Activities** are configured (`app.json` — `expo-widgets` plugin with `kawidget`, `MyLiveActivity1`, `DeliveryActivity`; `expo-widgets` in `package.json`).
- Android builds must not load the `expo-widgets` native module at import time (`app/_layout.tsx`, `app/(tabs)/index.tsx` — `Platform.OS === "ios" ? require(...) : null` for `Widget.ios` / `LiveWidget.ios`).

**Approach (evidenced)**

- **RTK Query**-style API modules: `createApi` / `fetchBaseQuery` in `api/wireApi.ts`, `api/kycApi.ts`, `api/notificationsApi.ts`, plus feature endpoints under `api/`.
- **Redux Toolkit + redux-persist** with secure storage adapter references (`redux/store.ts`, `redux/secureStorage.ts`).
- **File-based routing** via Expo Router (`package.json` `"main": "expo-router/entry"`, `app/` tree).
- **Native capabilities** wired through `app.json` plugins: Firebase (`@react-native-firebase/*`), Google Sign-In, Apple Sign-In, maps/location, secure store, splash, fonts, etc.
- **Patch** shipped for `expo-widgets` iOS podspec bundle copy path (`patches/expo-widgets@55.0.13.patch`, referenced from `package.json` `patchedDependencies`).

**Outcome (evidenced vs not)**

- **Production metrics, user counts, revenue, crash rates, latency SLAs:** Unknown (not documented in repo/README).
- **Reliability / UX wins in the field:** Unknown; code shows intended UX patterns (connectivity banner, sortable widget board, optional iOS widgets/live activities) but no measured outcomes are recorded.

## 4) Tech stack (languages, frameworks, infra, DB, auth, CI/CD)

- **Languages:** TypeScript (`tsconfig.json`), JavaScript where applicable; Swift/Obj-C not authored in-repo for app logic (native iOS generated / dependencies only).
- **Mobile framework:** Expo `~55.0.15`, React Native `0.83.4`, React `19.2.0` (`package.json`).
- **Routing / UI:** `expo-router`, `react-native-screens`, `react-native-safe-area-context`, `react-native-reanimated`, `react-native-gesture-handler`, `@gorhom/bottom-sheet`, `nativewind` + `tailwindcss`, `expo-linear-gradient`, `expo-blur`, `expo-image`, maps (`expo-maps`, `react-native-maps`), charts (`victory-native`, `@shopify/react-native-skia`).
- **State / data:** `@reduxjs/toolkit`, `react-redux`, `redux-persist`, RTK Query (`createApi` in `api/*.ts`).
- **Auth (client integrations present):** `@react-native-firebase/auth`, `@react-native-google-signin/google-signin`, `expo-apple-authentication`, `jwt-decode`, `expo-secure-store`, `react-native-biometrics` (`package.json`).
- **Realtime / messaging:** `socket.io-client`, `@react-native-firebase/messaging`.
- **Forms / validation:** `formik`, `yup`.
- **Widgets / Live Activities (iOS):** `expo-widgets`, `@expo/ui` (`package.json`); widget entry files e.g. `Widget.ios.tsx`, `LiveWidget.ios.tsx` (paths implied by `require` in `app/_layout.tsx` / `app/(tabs)/index.tsx`).
- **Infra / hosting:** Unknown for backend hosting; client `baseUrl` is `https://api.wire24.co/` in `api/wireApi.ts`. EAS project id appears under `app.json` → `expo.extra.eas.projectId`.
- **Database:** Unknown (no server or client SQL/ORM evidenced in the paths sampled; API is HTTP-based).
- **CI/CD:** No `.github/workflows` found in repo; scripts include `expo lint`, platform run commands (`package.json`). **Full CI/CD pipeline:** Unknown.

## 5) Notable technical decisions (tradeoffs, why X over Y) — only if visible in code

- **Guard iOS-only native modules on Android** using `Platform.OS === "ios"` conditional `require` for `Widget.ios` and `LiveWidget.ios` (`app/_layout.tsx`, `app/(tabs)/index.tsx`) — avoids evaluating `expo-widgets` on Android where the native module is absent.
- **Vendor patch for `expo-widgets`** iOS podspec: copy destination for `ExpoWidgets.bundle` changed from `${TARGET_BUILD_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}/...` to `${BUILT_PRODUCTS_DIR}/ExpoWidgets.bundle` (`patches/expo-widgets@55.0.13.patch`).
- **iOS build flags via Expo:** `expo-build-properties` with `useFrameworks: "static"` and `buildReactNativeFromSource: true` for iOS (`app.json`).
- **New Architecture enabled:** `"newArchEnabled": true` in `app.json`.

## 6) Hardest bug or constraint and how it was handled (if inferable)

- **Constraint:** `expo-widgets` is not available as an Android native module; unconditional imports of `.ios` widget/live-activity modules caused runtime errors on Android (stack traces referenced `Widget.ios.tsx` / `LiveWidget.ios.tsx` importing `expo-widgets`).
- **Handling (evidenced):** Platform-gated `require` so Android never loads those modules (`app/_layout.tsx`, `app/(tabs)/index.tsx`); optional `kawidget.updateSnapshot` guarded when `kawidget` is null.
- **Separate iOS packaging issue (evidenced):** Patched `expo-widgets` podspec bundle copy path (`patches/expo-widgets@55.0.13.patch`) — addresses iOS build/resource layout, not Android.

## 7) What I’d highlight in an interview for THIS project (3 bullets)

- **Cross-cutting native + JS integration:** Expo app with Firebase, Google/Apple sign-in, maps, secure storage, and optional **iOS home screen widgets / Live Activities** via `expo-widgets` + `app.json` plugin configuration.
- **State and networking architecture:** Redux Toolkit + RTK Query multi-API setup (`wireApi`, `kycApi`, `notificationsApi`, …) with persisted auth token wired into `prepareHeaders` (`api/wireApi.ts`).
- **Practical mobile engineering:** Combining complex gesture/list behavior (`react-native-sortables` + `zeego` in `components/SortableList/WidgetList.tsx`) with global UX for connectivity (`components/network/ConnectivityModal.tsx`), plus documented workarounds for third-party native issues (`patches/expo-widgets@55.0.13.patch`).

## 8) Suggested portfolio labels (from what’s real)

- **Mobile**
- **React Native / Expo**
- **iOS** (widgets / live activities via `expo-widgets` — iOS-oriented)
- **Android** (explicit `expo run:android` / Gradle script in `package.json`)
- **Frontend / client application** (no separate backend codebase in this repo)
- **State management** (Redux + RTK Query + redux-persist)
