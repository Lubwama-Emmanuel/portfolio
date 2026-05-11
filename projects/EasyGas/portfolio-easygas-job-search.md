# Easy Gas — portfolio / job-search notes (repo-sourced)

## 1) One-line project pitch (what it is + who it’s for)

- **Easy Gas** is an Expo / React Native app for **shopping, orders, delivery-related fields, favorites, and notifications**, with a **separate admin experience** for **catalog and order management** and **broadcast messaging**; **target users are not described** in `README.md` (only “Easy Gas Mobile App repository”), so end-customer vs B2B positioning beyond the product name is **Unknown**.

## 2) My role (solo vs team; what I owned end-to-end)

- **Team (git history)**: `git log` shows multiple commit authors with non-trivial counts (e.g. `eria-developer`, `isaac-prince`, `Lubwama Emmanuel`, others) — **not solo** from repo evidence alone.
- **`package.json`**: **author** `Lubwama Emmanuel`; **repository** `https://github.com/isaac-prince/easygas_mobile_app.git`.
- **`app.json`**: Expo **`owner`** `isaac-prince`.
- **What any one person owned end-to-end**: **Unknown** (no attribution map in docs).

## 3) Problem → approach → outcome (3–5 bullets each; outcomes: metrics, scale, reliability, UX wins if evidenced in code/docs)

**Problem**

- Customers need a **mobile catalog**, **cart**, and **orders** tied to **delivery address** and **payment method** (`src/database.types.ts`, `src/redux/slices/CartSlice.ts`, order APIs under `src/api/`).
- **Order progress** is modeled with **`order_stage`** and **`status`** on `orders` rows (`src/database.types.ts`).
- **Admins** need **product CRUD**, **order views**, and **notification tooling** (`src/app/(admin)/`, `CreateProduct.tsx`, `sendGlobalNotifications.tsx`).
- Users and admins need **timely alerts** (OneSignal + Expo notifications + `notifications` table + `supabase/functions/*`).
- **Account management** includes **logout** and **delete account** with checks on active orders (`src/app/(user)/profile/AccountSettings.tsx`).

**Approach**

- **Expo ~51** + **`expo-router`** + **TypeScript `strict`** (`package.json`, `tsconfig.json`, `app.json` `experiments.typedRoutes`).
- **Supabase** JS client with **generated `Database` types**, **session in `AsyncStorage`**, and **Realtime** `postgres_changes` subscriptions that **invalidate TanStack Query** keys (`src/lib/supabase.ts`, `src/api/orders/subscriptions.ts`).
- **Redux Toolkit** + **`redux-persist`** for **`auth`** and **`cart`** only (`src/redux/Store.ts`); **TanStack React Query** via `src/providers/QueryProvider.tsx`.
- **Auth**: Supabase **email/password** plus **Apple** and **Google** (`src/app/(auth)/sign-in.tsx`, related buttons, `app.json` plugins).
- **Backend automation**: **Deno** Supabase **Edge Functions** calling **OneSignal** and writing **`notifications`** (`supabase/functions/`); **EAS Build** profiles and **Expo Updates** URL in `eas.json` / `app.json`.

**Outcome**

- **Shipped versioning**: app **`version` `1.0.7`**, Android **`versionCode` `6`** (`app.json`).
- **OTA configured**: `expo-updates` dependency and **`updates.url`** + **`runtimeVersion`** policy **`appVersion`** (`app.json`, `package.json`).
- **Live order lists**: subscription-driven **cache invalidation** on `orders` insert/update (`src/api/orders/subscriptions.ts`).
- **Revenue, DAU, crash rate, or SLA**: **Unknown** (not in repo).
- **Tests**: **Jest / jest-expo** configured; at least **one snapshot test** for `MonoText` (`src/components/__tests__/StyledText-test.js`) — overall coverage **Unknown**.

## 4) Tech stack (languages, frameworks, infra, DB, auth, CI/CD) — cite file paths or package names where obvious

- **Languages**: TypeScript (`typescript`, `tsconfig.json`), JavaScript (e.g. `src/components/Carousel.jsx`), Deno-style TS in `supabase/functions/*/index.ts`.
- **App**: `expo`, `expo-router`, `react`, `react-native`, `react-native-web` (`package.json`); fonts/splash/maps/image/location/audio (`expo-font`, `expo-splash-screen`, `react-native-maps`, `expo-location`, etc.).
- **State / server cache**: `@reduxjs/toolkit`, `react-redux`, `redux-persist`, `@tanstack/react-query` (`package.json`, `src/redux/Store.ts`, `src/providers/QueryProvider.tsx`).
- **Backend**: `@supabase/supabase-js`, `supabase` CLI package; **Postgres schema** reflected in `src/database.types.ts` (e.g. `orders`, `products`, `profiles`, `notifications`).
- **Auth**: Supabase Auth APIs + `expo-apple-authentication` + `@react-native-google-signin/google-signin` + `expo-auth-session` (`package.json`, `sign-in.tsx`).
- **Push**: `expo-notifications`, `onesignal-expo-plugin`, `react-native-onesignal` (`package.json`, `app.json`, `src/lib/notifications.ts`).
- **Infra / builds**: **EAS** (`eas.json`, `app.json` `extra.eas`); **Google Maps** keys in `app.json`.
- **CI/CD**: **No** `.github` workflows in repo; **EAS submit/build** config only (`eas.json`). Whether other CI exists: **Unknown**.

## 5) Notable technical decisions (tradeoffs, why X over Y) — only if visible in code

- **Persist only `auth` + `cart`** in Redux persist whitelist (`src/redux/Store.ts`).
- **TanStack Query + Supabase Realtime invalidation** alongside Redux for different concerns (`src/app/_layout.tsx`, `subscriptions.ts`, `Store.ts`).
- **`supabaseApi` (RTK Query)** registered in the store but **endpoints intentionally empty** — stub or future injection point (`src/api/supabaseApi.ts`).
- **`supabaseAdmin` (service role)** bundled in the app and used for **`auth.admin.deleteUser`** from `AccountSettings.tsx` (`src/lib/supabase.ts`) — **privileged key in client** (visible implementation; rationale not documented).
- **Native build flags**: `expo-build-properties` → iOS **`useFrameworks`: `static`**, Android **Proguard on release** (`app.json`).
- **Platform-specific auth UI**: `(auth)` stack `presentation` / headers differ for iOS vs Android (`src/app/_layout.tsx`).

## 6) Hardest bug or constraint and how it was handled (if inferable)

- **Unknown** as a named/tracked bug story (no `TODO`/`FIXME` in searched TS/JS files).
- **Code-visible constraints**: push registration expects a **physical device** and a resolvable **EAS `projectId`** (`src/lib/notifications.ts`); account deletion checks **`order_stage`** for incomplete stages before admin delete (`AccountSettings.tsx`).

## 7) What I’d highlight in an interview for THIS project (3 bullets)

- **Single app, two experiences**: consumer **`(user)`** routes vs **`(admin)`** tab app gated by **`profiles.group === "ADMIN"`** after Supabase sign-in (`src/app/(admin)/_layout.tsx`, `sign-in.tsx`).
- **Orders + notifications pipeline**: typed **`orders` / `order_items` / `notifications`** model, **Realtime-driven query invalidation**, and **Edge Functions** bridging **Postgres + OneSignal** (`src/database.types.ts`, `src/api/orders/subscriptions.ts`, `supabase/functions/`).
- **Release mechanics**: **EAS channels** (`development`, `preview`, `production`), **autoIncrement** on production builds, **Expo Updates** endpoint, and **native plugins** (Google Sign-In URL scheme, OneSignal iOS extension, Maps keys) in `eas.json` / `app.json`.

## 8) Suggested portfolio labels: [e.g. Mobile, Backend, Full-stack, DevOps] (pick from what’s real)

- **Mobile**
- **React Native / Expo**
- **TypeScript**
- **Supabase** (client, Realtime, Edge Functions)
- **Push notifications / OneSignal**
- **Maps & location**
- **Redux + TanStack Query**
