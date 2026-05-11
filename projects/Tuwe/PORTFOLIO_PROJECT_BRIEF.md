# Tuwe — portfolio / job-search brief (repo-sourced)

## 1) One-line project pitch (what it is + who it’s for)

- **Tuwe** is a cross-platform mobile app (Expo / React Native) for community and estate-scoped services—marketplace, orders, rides, payments, emergency contacts, activities, notice board, and political/candidate flows—talking to a hosted mobile API (`https://api.tuweug.com/api/v1/mobile` in `api/TuweApi.ts`).

## 2) My role (solo vs team; what I owned end-to-end)

- **Team vs solo:** `README.md` lists **Emmanuel Lubwama** as Lead Developer and **Tuwe Team** as Development Team; the repo does not map features or files to individuals.
- **End-to-end ownership:** Unknown at per-feature granularity from version control in this export (no contributor attribution cited here).

## 3) Problem → approach → outcome (3–5 bullets each; outcomes only where evidenced)

**Problem (from `README.md` + app surface area)**

- Users need multiple community services (emergency, marketplace, rides, payments, activities, notices) in one place.
- Authentication, OTP, password reset, and optional Google sign-in are documented as product requirements.
- Services are framed as estate / neighborhood scoped (`README.md`; registration uses `estate_id` in `app/(auth)/Register.tsx` via `useRegisterMutation`).

**Approach (from code and config)**

- **Client:** Expo SDK `~53`, React Native `0.79.x`, React `19`, TypeScript, file-based routing via `expo-router` (`package.json`, `app/`).
- **Data layer:** RTK Query `createApi` with `injectEndpoints` split across `api/**/*.ts`; centralized `baseQueryWithReauth` attaches Bearer tokens and retries after refresh on `401` (`api/TuweApi.ts`).
- **State:** Redux Toolkit store with `redux-persist` + AsyncStorage whitelist for `auth`, `cart`, `favourites`, `notification`, `address` (`redux/Store.ts`).
- **Forms:** Formik + Yup (e.g. `app/(auth)/Register.tsx`, `RegisterSchema`).
- **Ship pipeline:** EAS Build profiles `development`, `preview` (APK on Android), `production` with `autoIncrement` (`eas.json`, `package.json` scripts); Expo Updates URL and `runtimeVersion` policy `appVersion` in `app.json`.

**Outcome**

- Production metrics, user counts, crash rates, latency, or revenue: **Unknown** (not present in this repo).
- Reliability / UX evidenced in code: token refresh + single-flight style coordination via `helpers/tokenManager` used from `api/TuweApi.ts`; splash and permissions copy in `app.json`; lint/format scripts in `package.json`.

## 4) Tech stack (languages, frameworks, infra, DB, auth, CI/CD)

| Area | Evidence |
|------|-----------|
| **Languages** | TypeScript (`tsconfig.json`), JavaScript where used |
| **Mobile UI** | React Native `0.79.6`, Expo `~53.0.23` (`package.json`) |
| **Routing** | `expo-router` `~5.1.7`, `main`: `expo-router/entry` |
| **Styling** | NativeWind `~4.1.23`, Tailwind `3.4.17` |
| **Animation / gestures** | `react-native-reanimated`, `react-native-gesture-handler` |
| **Sheets / modals** | `@gorhom/bottom-sheet` |
| **Images** | `expo-image` |
| **State & API** | `@reduxjs/toolkit`, `react-redux`, RTK Query (`redux/Store.ts`, `api/TuweApi.ts`) |
| **Persistence** | `redux-persist`, `@react-native-async-storage/async-storage` |
| **Forms / validation** | `formik`, `yup` |
| **Auth (client)** | Bearer + refresh flow in `api/TuweApi.ts`; endpoints under `api/auth/` (login, register, OTP, forgot/reset password, Google sign-in package `@react-native-google-signin/google-signin`) |
| **Backend / DB** | **Unknown** (only HTTP client to `api.tuweug.com`; no server or schema in repo) |
| **Infra / delivery** | EAS project id and update URL in `app.json` `extra.eas` / `updates.url`; `eas.json` build channels |
| **CI/CD** | **Unknown** — no `.github/workflows` (or similar) found in this repo; local `yarn lint` / `yarn format` in `package.json` |

## 5) Notable technical decisions (tradeoffs, why X over Y) — only if visible in code

- **RTK Query + custom `baseQueryWithReauth`:** Intercepts `401`, checks refresh expiry via `tokenManager`, dedupes concurrent refresh with a shared promise, updates tokens in Redux + storage, retries the original request (`api/TuweApi.ts`).
- **Redux Persist whitelist:** Only selected slices persisted; API reducer kept non-persisted (`redux/Store.ts`).
- **Native build knobs:** iOS `useFrameworks: "static"`; Android `enableProguardInReleaseBuilds: true` via `expo-build-properties` in `app.json`.
- **EAS channels:** Separate `development` (dev client), `preview`, `production` channels in `eas.json`.
- **Monolithic API slice pattern:** `TuweApi` exports `createApi` with `endpoints: () => ({})` and many `injectEndpoints` files under `api/` (pattern visible in `api/TuweApi.ts` + file list).

## 6) Hardest bug or constraint and how it was handled (if inferable)

- **Unknown** — no root-cause write-ups, tickets, or inline comments in the sampled paths that document a single “hardest bug” narrative.

## 7) What I’d highlight in an interview for THIS project (3 bullets)

- **Auth resilience:** Walk through the `401` → refresh → retry → logout path and refresh deduplication in `api/TuweApi.ts` + `helpers/tokenManager`.
- **Domain breadth in one client:** Show how `api/` is organized (orders, marketplace, political, tuwePay, tuweRides, emergency, notices, activities) and how `tagTypes` in `TuweApi.ts` support cache invalidation design.
- **Shipping setup:** Expo Updates + EAS profiles (`app.json`, `eas.json`, `package.json` build scripts) and what that implies for staged releases vs production.

## 8) Suggested portfolio labels (from what’s real)

- **Mobile**
- **React Native / Expo**
- **TypeScript**
- **Redux Toolkit / RTK Query**
- **EAS (builds & updates)**
