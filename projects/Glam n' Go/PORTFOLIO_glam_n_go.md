# Glam N Go (GnG) — portfolio notes

## 1) One-line project pitch

- Expo/React Native mobile commerce app (“GnG”, slug `glamngo`) for browsing multi-vendor stores, products, cart, checkout, orders, ratings, FAQs, and account flows; iOS/Android identifiers under `com.kenyana.glamngo` (`app.json`).

## 2) My role

- Solo client development inferred from git history: commits overwhelmingly attributed to “Lubwama Emmanuel” (plus a small count under “Emmanuel Lubwama”), with no team roster or README in the repo.
- Owned end-to-end in this repository: mobile app structure under `src/` (screens, navigators, components, Redux slices, API layer), Expo/EAS configuration (`app.json`, `eas.json`), lint CI (`.github/workflows/lint.yml`), and dependency/tooling setup (`package.json`, `tsconfig.json`, `babel.config.js`).
- Unknown: ownership of the Cloud Run backend referenced in `src/api/backendApi.ts` (not present in this repo).

## 3) Problem → approach → outcome

**Problem (evidenced by product surface area)**

- Shoppers need catalog discovery and search across products with rich metadata (e.g. `HitType` fields in `src/screens/other/Search.tsx`).
- App must support authenticated sessions, profiles, and persisted local state across launches.
- Commerce flows require orders, cancellations, edits, payment retry, and delivery cost lookups (`src/api/backendApi.ts`, checkout screens under `src/screens/checkout/`).
- Regional payment UX: Airtel Money path with Ugandan phone validation (`src/screens/checkout/Payment.tsx`, `isValidUgandanAirtelPhoneNumber` in `src/helpers/HelperFunctions.ts`).

**Approach**

- Cross-platform shell with Expo dev client and EAS build profiles (`package.json` scripts, `eas.json`: `development`, `preview`, `production` channels; `expo-updates` and `runtimeVersion` policy `appVersion` in `app.json`).
- Data layer split: Firestore-backed reads/writes wrapped as RTK Query `queryFn` endpoints injected into `firebaseApi` (`src/api/firebaseApi.ts`, files under `src/api/requests/**`); HTTP mutations/queries to a Google Cloud Run host in `backendApi` (`src/api/backendApi.ts`).
- Product search via Algolia `InstantSearch` and `useInfiniteHits` with `FlatList` pagination (`src/screens/other/Search.tsx`, `src/components/search/InfiniteHits.tsx`), index name `glam_n_go_prod`.
- Lists tuned with `@shopify/flash-list` on home and category/tag flows (`src/screens/home/Home.tsx`, `src/screens/category/*.tsx`).
- Auth: Firebase email/password plus Apple/Google packages declared in `package.json` and `app.json` plugins; Firestore user document patterns in `src/utils/Authentication.ts` and `src/api/requests/user/addUser.ts`.
- State: Redux Toolkit store with `redux-persist` + `AsyncStorage` whitelist for auth, cart, favorites, recently viewed (`src/redux/Store.ts`).
- Quality gate: ESLint on pushes to `main` via GitHub Actions (`.github/workflows/lint.yml`).

**Outcome**

- Production-facing behaviors are implemented in code (orders API integration, search, checkout, persistence), but the repository contains no documented user metrics, load tests, revenue figures, or crash-rate data.
- Scale, reliability numbers, and quantified UX wins: Unknown (not evidenced in repo/docs).

## 4) Tech stack

- **Languages:** TypeScript (`tsconfig.json` extends Expo base, `"strict": true`); JavaScript where lint script targets `.js`/`.jsx` (`package.json` `lint` script).
- **Mobile framework:** Expo SDK `~51.0.31`, React `18.2.0`, React Native `0.74.5` (`package.json`).
- **Navigation:** `@react-navigation/native`, native stack, bottom tabs, material top tabs (`package.json`).
- **State / data fetching:** `@reduxjs/toolkit`, `react-redux`, RTK Query (`createApi`, `injectEndpoints` in `src/api/firebaseApi.ts`, `src/api/backendApi.ts`, `src/api/requests/**`), `redux-persist` with `@react-native-async-storage/async-storage` (`src/redux/Store.ts`).
- **Backend / DB (client-side integration):** `@react-native-firebase/app`, `auth`, `firestore`; REST base URL `https://api-azht7eypnq-uc.a.run.app/` in `src/api/backendApi.ts` (Cloud Run hostname pattern).
- **Search:** `algoliasearch`, `react-instantsearch-core` (`package.json`, `src/screens/other/Search.tsx`).
- **Auth (social / platform):** `@invertase/react-native-apple-authentication`, `@react-native-google-signin/google-signin`, `expo-apple-authentication`, `expo-auth-session` (`package.json`, `app.json` plugins).
- **UI / motion / lists:** `moti`, `react-native-reanimated` (Babel plugin in `babel.config.js`), `@gorhom/bottom-sheet`, `@shopify/flash-list`, `expo-image`, `expo-linear-gradient`, etc. (`package.json`).
- **Infra / delivery:** EAS project id and update URL in `app.json` `extra.eas` and `updates.url`; `eas.json` defines build/submit profiles including Android Play `internal` track via `serviceAccountKeyPath`.
- **CI/CD:** GitHub Actions workflow runs `yarn` and `yarn lint` on push to `main` (`.github/workflows/lint.yml`); Node `18.13.0`. No automated tests evidenced in that workflow.
- **Tooling:** Yarn `1.22.22` (`packageManager` in `package.json`), ESLint + Prettier-related dev deps (`package.json`, `.eslintrc.json`).

## 5) Notable technical decisions (visible in code)

- **Dual RTK Query APIs:** `firebaseApi` uses `fetchBaseQuery` with `baseUrl: "/"` and real I/O in injected `queryFn` endpoints hitting Firestore; `backendApi` targets Cloud Run for order/payment/FAQ transport endpoints (`src/api/firebaseApi.ts`, `src/api/backendApi.ts`). Separates document reads from HTTP service boundaries.
- **Pagination cache merging:** `getAllProducts` / `getAllStores` use RTK Query `merge`, `serializeQueryArgs`, and `forceRefetch` to accumulate pages (`src/api/requests/products/getAllProducts.ts`, `src/api/requests/stores/getAllStores.ts`).
- **Native build settings for Firebase/Android release:** `expo-build-properties` sets iOS `useFrameworks: "static"` and Android `enableProguardInReleaseBuilds: true` (`app.json`).
- **API migration hint:** Commented prior Cloud Run base URL alongside active URL in `src/api/backendApi.ts`.
- **Persisted slice boundary:** `redux-persist` whitelist omits `orders` and `notification` from persisted reducers (`src/redux/Store.ts`).
- **Algolia credentials in client:** App ID and search key are literals in `src/screens/other/Search.tsx` (security/maintainability tradeoff visible in code).

## 6) Hardest bug or constraint (if inferable)

- No issue tracker, test failure logs, or in-code annotations (e.g. TODO/FIXME) describing a specific “hardest bug” were found.
- **Inferable constraint / mitigation:** Integrating React Native Firebase inside Expo required explicit native build configuration (`app.json` plugins: `@react-native-firebase/app`, `@react-native-firebase/auth`, `expo-build-properties` with static iOS frameworks and Android ProGuard for release). Treat as native toolchain constraint addressed via documented Expo config rather than a diagnosed defect.

## 7) What I’d highlight in an interview for THIS project

- **Split data architecture on mobile:** articulate why Firestore `queryFn` endpoints and a separate Cloud Run client coexist, and how RTK Query cache tags/merges support orders vs catalog (`firebaseApi` vs `backendApi`, `tagTypes` / invalidations in `src/api/backendApi.ts`, merge logic in product/store queries).
- **Commerce completeness in one app:** multi-store home, FlashList-backed feeds, Algolia discovery, checkout with regional mobile money validation and backend payment re-initiation endpoint usage (`Payment.tsx`, `reinitiateAirtelMoneyPayment` in `src/api/backendApi.ts`).
- **Shipping discipline:** typed TS strict mode, persisted auth/cart experience, EAS channels/runtime updates, and automated lint on default branch (configs cited above).

## 8) Suggested portfolio labels

- Mobile
- React Native
- Expo
- E-commerce
- Firebase (Auth / Firestore)
- Redux / RTK Query
- Algolia
- CI (Lint)
