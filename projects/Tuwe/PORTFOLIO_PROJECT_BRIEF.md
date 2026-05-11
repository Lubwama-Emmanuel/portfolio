# Tuwe

**Tuwe** is a **community and estate-scoped** mobile app: marketplace, orders, rides, payments, emergency contacts, activities, notice board, and civic-style flows—so residents can handle day-to-day neighbourhood needs from one install.

## My role

I worked as **Lead Developer** alongside the broader Tuwe team. On the client I focused on how **navigation, forms, and the data layer** come together: Expo Router structure, RTK Query modules split by domain, persisted slices for auth and cart-like state, and the **token refresh** path so a 401 mid-flow recovers instead of dumping people on a dead screen.

## What we built

- **Breadth in one app**: orders, marketplace, rides, payments, emergency, notices, activities, and more—each area backed by tagged queries so caches invalidate in the right places.
- **Resilient auth**: bearer tokens with refresh coordination and deduplicated refresh work when several requests fail at once.
- **Shipping discipline**: EAS channels for development, preview, and production, plus Expo Updates so staged rollout stays practical.

## Stack

Expo, React Native, TypeScript, Expo Router, NativeWind, Redux Toolkit and RTK Query, Formik and Yup for heavier forms, AsyncStorage-backed persistence, and EAS.

## What made it hard

When one codebase covers **many services**, the architecture story is everything: clear module boundaries, predictable cache tags, and auth handling that doesn’t become a game of whack-a-mole as features grow.
