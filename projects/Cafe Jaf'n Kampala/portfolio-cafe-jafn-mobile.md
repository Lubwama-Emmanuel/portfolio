# Cafe Jaf’n mobile app — portfolio / job-search summary

Factual notes grounded in **this repository** (`cafe-jafn`). Where something is not evidenced in the repo, it is marked **Unknown**.

---

## 1) One-line project pitch

- **Cafe Jaf’n Kampala** (`app.config.js`): Expo/React Native customer app to browse the menu, sign in, manage profile/cart, get a **delivery fee quote**, place **COD** orders via **`POST /orders/{userId}`**, and view orders—aimed at **Cafe Jaf’n customers in Kampala** (store listing copy in `app.config.js`).

---

## 2) My role

- **Solo vs team:** Unknown from this repo (no contributors file, org docs, or required commit metadata summarized here).
- **What this repo shows (client):** End-to-end **mobile app** implementation: routing (`expo-router`), state (`redux` + `redux-persist`), API layer (`@reduxjs/toolkit/query` in `api/JafnApi.ts` and `api/**`), checkout/location UX (`app/Checkout.tsx`, `expo-location`, `react-native-google-places-autocomplete`), orders UI (`app/(tabs)/orders`, `app/orderDetails`), alignment with internal API docs (`docs/orders-integration.md`).
- **Dashboard + Go backend:** If you also built an admin dashboard and a Go API, **their source trees are not in this repository**. `docs/orders-integration.md` only **references** server paths (e.g. `server/http/handlers/orders/route.go`) as documentation, not as code here.

---

## 3) Problem → approach → outcome

**Problem (from code/docs)**

- Need **authenticated REST** calls with a **Bearer** token (`docs/orders-integration.md`; `api/JafnApi.ts` `prepareHeaders`).
- **Checkout** must respect **delivery radius** and fee logic (`docs/orders-integration.md`; `app/Checkout.tsx` uses quote + `outOfDeliveryRadius`).
- **Orders** use OMS-style **create / list / detail** (`api/orders/placeOrder.ts`, `getAllMyOrders.ts`, `getOrderByID.ts`; contract in `docs/orders-integration.md`).
- **Legacy POS checkout** (`/jafn/...`) is called out as **separate** from in-app orders in `docs/orders-integration.md`.

**Approach**

- **RTK Query** `createApi` + `injectEndpoints` for menu, user, delivery quote, orders (`api/JafnApi.ts`, `api/**`).
- **Checkout:** Google Places + current location + **`POST /delivery/fee/quote`** before submit; **`POST /orders/{userID}`** with line items mapped from cart (`app/Checkout.tsx`, `helpers/cartToOrderItems.ts`, `types/OrderApiType.ts`).
- **Persisted** auth, cart, favourites (`redux/Store.ts` whitelist).
- **Expo** config for **EAS Updates** URL + `runtimeVersion` (`app.config.js`).

**Outcome**

- **Metrics, scale, reliability, quantitative UX:** Unknown in repo (no analytics, load tests, SLOs, or user metrics files reviewed).
- **Code-evidenced:** “Place Order” is **disabled** when `isOutOfDeliveryRadius` is true (`app/Checkout.tsx`); documented **API contract** for orders and delivery quote in `docs/orders-integration.md`.

---

## 4) Tech stack

| Area | Details |
|------|--------|
| **Languages** | TypeScript (`package.json`); JS config (`app.config.js`). |
| **Mobile** | React Native `0.83.4`, React `19.2.0`, Expo `~55.0.9`, expo-router (`package.json`). |
| **UI** | NativeWind (`package.json`, `tailwind.config.js`), `@gorhom/bottom-sheet`, `react-native-reanimated`, `expo-image`, `@expo/vector-icons`. |
| **State / data** | Redux Toolkit, RTK Query, react-redux, redux-persist, AsyncStorage (`package.json`, `redux/Store.ts`). |
| **Auth (client)** | Google Sign-In (`@react-native-google-signin/google-signin`), Expo Apple Auth (`expo-apple-authentication`), Expo Auth Session (`expo-auth-session`); tokens in Redux + `utils/tokenManager` (used from `api/JafnApi.ts`). |
| **Location / maps** | `expo-location`, `expo-maps`, `react-native-google-places-autocomplete`; Maps/Places keys in `app.config.js` (`ios.config` / `android.config`). |
| **HTTP API** | `fetchBaseQuery` in `api/JafnApi.ts` (check in-repo `baseUrl`—may point at dev LAN or commented Cloud Run). `axios` is in `package.json`. |
| **Firebase** | `firebase` dependency; `google-services.json` / `GoogleService-Info.plist` referenced in `app.config.js`. |
| **Distribution** | `expo-updates` + EAS Updates URL in `app.config.js`. |
| **DB** | No app-side DB; backend storage is **described** in `docs/orders-integration.md` (Firestore-backed menu/orders)—not implemented in this codebase. |
| **CI/CD** | Unknown in repo (no `.github/workflows` found at time of writing). |

---

## 5) Notable technical decisions (visible in code)

- **In-app orders vs POS:** Explicit separation in `docs/orders-integration.md` (mobile order flow vs JAFN POS `/jafn/...`).
- **Auth on API:** `Authorization: Bearer <Firebase_ID_TOKEN>` in `docs/orders-integration.md`; `api/JafnApi.ts` `prepareHeaders` attaches Bearer token and may refresh via `TokenManager`.
- **Environment switching:** Commented vs active `baseUrl` in `api/JafnApi.ts`.
- **Bottom sheet:** `enableDynamicSizing={false}` with `snapPoints` on checkout modal (`app/Checkout.tsx`); `BottomSheetView` used for sheet content (also `components/ui/AuthBottomSheet.tsx`).
- **Network / ATS:** Android cleartext and iOS ATS exception domain for a specific host in `app.config.js` (HTTP image host / networking allowances).

---

## 6) Hardest bug or constraint (inferable)

- **Constraint:** Delivery and address UX inside `@gorhom/bottom-sheet` without breaking list/gesture behavior—`BottomSheetView` + fixed sizing flags in `app/Checkout.tsx` (and auth sheet).
- **Constraint:** **Out-of-radius** and failed quotes should not allow a bad checkout—quote state, disabled submit, and user messaging in `app/Checkout.tsx`.
- **Incident-style “hardest bug” write-up:** Unknown (no postmortems in repo).

---

## 7) Interview highlights (this repo)

- **Contract-driven integration:** Mobile flows implemented against a documented **`/api/v1`** order + delivery-quote contract (`docs/orders-integration.md`) with RTK Query modules under `api/orders/` and related `api/jafn/` endpoints.
- **Checkout complexity:** Combines **Google Places**, **device location**, **fee quote**, and **order placement** with **Bearer** auth (`app/Checkout.tsx`, `api/JafnApi.ts`).
- **Cross-surface story:** This repo is the **customer app**; docs reference **dashboard / ops** (`docs/orders-integration.md`, `docs/theming-handoff.md`)—pair this repo in conversation with **separate** repos or demos for any **Go backend** and **admin dashboard** you own.

---

## 8) Suggested portfolio labels

- Mobile  
- React Native  
- Expo  
- TypeScript  
- Redux Toolkit / RTK Query  
- REST API integration  
- Maps & location (Google Places / Expo Location)  
- EAS / Expo Updates (config in repo)  

**Use only with other evidence:** Backend (Go), Admin dashboard — not contained in this repository.
