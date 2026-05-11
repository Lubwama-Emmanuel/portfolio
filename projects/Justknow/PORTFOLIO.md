# JustKnow

**JustKnow** is a **social and services** mobile app: feed and posts, messaging, business profiles, ride-hailing, notifications, and the auth and profile flows that tie them together—aimed at people who want discovery, chat, and transactional features in one place.

## My role

I built the **client application** in **Expo / React Native** with TypeScript: Expo Router screens, multiple RTK Query API surfaces for different backends, **Socket.IO** for realtime messaging and related events, and persisted auth (plus trip-related state where the product needs it) using secure storage where sensitive tokens live.

## What we built

- **Modular networking**: separate query clients per domain instead of one overloaded API module—easier to reason about as the product surface grew.
- **Realtime**: socket contexts aligned with REST configuration so environments (local vs hosted) stay consistent.
- **Maps and location** where rides and discovery depend on them, with platform-appropriate sign-in options.

## Stack

Expo, React Native, TypeScript, Expo Router, Redux Toolkit and RTK Query, redux-persist with SecureStore, Socket.IO client, NativeWind, maps, FlashList, bottom sheets and motion libraries, Formik and Yup, push notifications, and EAS.

## What made it hard

**Multiple HTTP bases and socket paths** in one app is easy to get wrong. Centralising host and path resolution—and keeping persisted state minimal—reduced footguns when switching environments or shipping native builds to both stores.
