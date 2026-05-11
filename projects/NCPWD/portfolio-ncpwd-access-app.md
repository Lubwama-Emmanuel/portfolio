# NCPWD Access App — portfolio notes

## 1) One-line project pitch

- **NCPWD** is a cross-platform **mobile client** (`app.json`: Expo app name **NCPWD**, slug `ncpwd`, bundles `com.ncpwd.mobileapp`) that calls a **Google Cloud Run**-hosted **mobile API** (`src/api/ncpwdBaseQuery.ts`) for flows documented in `docs/mobileapi.md` (auth, reports, learning content, notifications, services). Docs also describe **separate dashboard-facing HTTP APIs** under `/api/v1/dashboard/...` (e.g. learning-materials admin in `docs/mobileapi.md`; case management in `docs/case_reporting_client_guide.md`) — **those servers and UIs are not implemented in this codebase**. **End-user audience** beyond “mobile and dashboard clients” (guide wording): **Unknown**.

## 2) My role

- **Solo vs team:** Unknown (no `README`, `CONTRIBUTORS`, or org docs state team size).
- **What I owned end-to-end (in this repo):** Unknown (no attribution in repo).
- **Dashboard + Node.js API (your note):** **Not evidenced here** — this workspace contains the **Expo/React Native app** and **API documentation** under `docs/`, not a dashboard app or Node server tree. For portfolio text on those, cite the actual dashboard and API repositories.

## 3) Problem → approach → outcome

**Problem (inferred from product surface + docs in repo)**

- Mobile users need **sign-in** and **session-backed** access to `/api/v1/mobile` (`docs/mobileapi.md`, `src/api/ncpwdBaseQuery.ts`).
- **Short-lived access tokens** (example `expiresIn: 900` in `docs/mobileapi.md`) imply **refresh** without always re-authenticating.
- Users need **notifications** (history + push token) (`docs/mobileapi.md`; `src/app/Notifications.tsx`, `src/api/notifications/*`).
- Users need **reports** and **services** (`src/app/report.tsx`, `src/app/MyReports.tsx`, `src/api/report/*`, `src/app/services/*`; mobile submit flow in `docs/case_reporting_client_guide.md`).
- Users need **learning materials** + **PDF** flows and **persisted saved documents** (`src/api/content/learnContent.ts`, `src/app/learn/*`, `src/redux/slices/SavedDocumentsSlice.ts`).
- **Accessibility** and **language** (`src/app/(tabs)/accessibility/index.tsx`, `src/contexts/app-theme-context.tsx`, `src/redux/slices/PrefencesSlice.ts`, `i18next` in `package.json`).
- **Platform split:** docs describe **dashboard** case management (`GET/PATCH /api/v1/dashboard/reports...` in `docs/case_reporting_client_guide.md`) vs **mobile** — mobile app in repo consumes **mobile** paths only (dashboard implementation: **not in repo**).

**Approach (evidenced in code/config)**

- **Firebase Auth** + **Google** / **Apple** sign-in → ID token → backend **JWT** per `docs/mobileapi.md` (`src/firebase/client.ts`, `src/components/auth/*`, `package.json`).
- **RTK Query** + **`ncpwdBaseQuery`** intercepts **401**, calls **`/auth/refresh`**, updates tokens, **replays** the request (`src/api/ncpwdBaseQuery.ts`).
- **Redux** + **redux-persist** → **AsyncStorage** for `preferences`, `auth`, `savedArticles`, `savedDocuments` (`src/redux/Store.ts`).
- **`injectEndpoints`** on `ncpwdApi` across feature modules (`src/api/ncpwdApi.ts`, `src/api/auth/Session.ts`, `src/api/report/*`, etc.).
- **EAS** build/submit profiles (`eas.json`); **Expo plugins** in `app.json` (router, splash, notifications, Apple/Google sign-in, build-properties, document picker, custom `./scripts/withRNFirebase`).
- **iOS Firebase** integration: static frameworks, `$RNFirebaseAsStaticFramework`, `DEFINES_MODULE` for `RNFB*` (`app.json`, `ios/Podfile`, `scripts/withRNFirebase.js`).

**Outcome**

- **Metrics, DAU, business KPIs, production scale:** Unknown (not in repo).
- **Reliability / UX (code-evidenced):**
  - Centralized **token refresh + retry** on `401` (`src/api/ncpwdBaseQuery.ts`).
  - Notifications: **pagination**, **merge/dedupe by id**, signed-out **Apple (iOS) + Google** entry (`src/app/Notifications.tsx`).
  - Saved PDFs: **`localUri` + `remoteUrl`** + persist whitelist (`src/redux/slices/SavedDocumentsSlice.ts`, `src/redux/Store.ts`).
  - **EAS** production Android **app-bundle** + **autoIncrement** (`eas.json`).

## 4) Tech stack

| Area | Evidence |
|------|----------|
| **Languages** | TypeScript (`package.json`); JS for tooling/plugins (`scripts/withRNFirebase.js`, `tailwind.config.js`) |
| **Mobile framework** | **Expo ~55**, **expo-router**, **React 19**, **React Native 0.83** (`package.json`) |
| **UI** | **NativeWind**, **Tailwind 3.4**, **Reanimated**, **Gesture Handler**, **@gorhom/bottom-sheet** (`package.json`) |
| **State / API client** | **@reduxjs/toolkit**, **RTK Query**, **react-redux**, **redux-persist**, **AsyncStorage** (`package.json`, `src/redux/Store.ts`) |
| **Auth** | **firebase** Auth SDK; **@react-native-google-signin/google-signin**, **expo-apple-authentication** (`package.json`, `app.json`, `src/components/auth/*`); backend JWT per `docs/mobileapi.md`, `Authorization` in `src/api/ncpwdBaseQuery.ts` |
| **Push / local** | **expo-notifications** (`package.json`, `app.json`); **expo-file-system**, **expo-document-picker**, **react-native-pdf**, **react-native-blob-util** (`package.json`) |
| **i18n** | **i18next**, **react-i18next**, **expo-localization** (`package.json`); **en** / **sw** in UI (`src/app/(tabs)/accessibility/index.tsx`) |
| **Backend this app calls** | Base URL in `src/api/ncpwdBaseQuery.ts` (Cloud Run); contracts in `docs/mobileapi.md`, `docs/case_reporting_client_guide.md` |
| **Dashboard app** | **Not in this repo** — only **documented** dashboard routes (e.g. `docs/case_reporting_client_guide.md` §3, `docs/mobileapi.md` dashboard learning-materials paths) |
| **Node.js API (runtime)** | **Unknown from this repo** — docs do not state server language; no `package.json` / server entry for the API here |
| **DB** | Client: **AsyncStorage** via redux-persist; server DB: **Unknown** |
| **CI/CD** | **EAS** (`eas.json`, `app.json` `extra.eas`); **no** `.github/workflows` in repo |

## 5) Notable technical decisions (only if visible in code)

- **Central `ncpwdBaseQuery`** for refresh-and-retry vs per-endpoint handling (`src/api/ncpwdBaseQuery.ts`).
- **`ncpwdApi` + `injectEndpoints`** vs single API file (`src/api/ncpwdApi.ts` + feature files).
- **`firebaseApi` parallel to `ncpwdApi`** in the store (`src/redux/Store.ts`, `src/api/firebaseApi.ts`).
- **iOS static frameworks + RNFirebase pod patches** (`app.json`, `ios/Podfile`, `scripts/withRNFirebase.js`).
- **`typedRoutes` + `reactCompiler` experiments** (`app.json`).

## 6) Hardest bug or constraint and how it was handled

- **Specific incident / ticket:** Unknown (not documented in repo).
- **Inferable constraint:** **Firebase native modules + Expo iOS** (static frameworks, `DEFINES_MODULE` on `RNFB*` targets). **Mitigation visible:** `expo-build-properties`, Podfile + `scripts/withRNFirebase.js` (`app.json`, `ios/Podfile`, `scripts/withRNFirebase.js`).

## 7) What I’d highlight in an interview for THIS project (3 bullets)

- **Auth + session model:** Firebase providers → ID token → backend **access/refresh** JWTs; **RTK Query** base layer refreshes and **replays** failed calls on `401` (`docs/mobileapi.md`, `src/api/ncpwdBaseQuery.ts`, `src/components/auth/*`).
- **Feature surface in one mobile codebase:** reporting, services, learn/PDF + **offline-flavored** saved documents, notifications, accessibility/i18n (`src/app/*`, `src/api/*`, `src/redux/*`).
- **Release / native integration:** **EAS** profiles and Android **AAB** production defaults (`eas.json`); Expo **config plugins** and **iOS Pod** integration for Firebase (`app.json`, `ios/Podfile`, `scripts/withRNFirebase.js`).

## 8) Suggested portfolio labels

**Supported by this repository alone:**  
`Mobile` · `React Native` · `Expo` · `TypeScript` · `Redux Toolkit` · `RTK Query` · `Firebase Auth` · `REST API client` · `Push notifications` · `Accessibility` · `Internationalization (i18n)` · `Android` · `iOS`

**Not evidenced in this repo (add only if other projects prove them):** `Backend` · `Full-stack` · `DevOps` · `Dashboard` · `Node.js`
