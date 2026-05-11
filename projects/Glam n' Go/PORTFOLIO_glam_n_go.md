# Glam N’ Go

**Glam N’ Go** is a multi-vendor shopping app: discover stores and products, search the catalogue, manage cart and checkout, track orders, and handle account flows—including ratings and FAQs—so shoppers can move from browse to purchase without leaving the app.

## My role

I owned the **mobile application**: screens, navigation, components, Redux slices, and how the app talks to **Firestore** for catalogue-style data and to a **Cloud Run** service for orders, payments, and operational APIs. I also set up **Expo / EAS** build channels, runtime updates, and a lint workflow on the default branch so quality stays consistent as the product grows.

## What we built

- **Discovery** with Algolia-powered search and fast lists on home and category flows.
- **Commerce** end to end: cart, checkout, order edits and cancellations, payment retry, and delivery cost lookups.
- **Regional payments** tuned for the market—including validation paths for mobile money where the product requires it.
- **Dual data paths on mobile**: document reads and writes through one layer, HTTP mutations through another, with RTK Query keeping cache tags and pagination merges predictable.

## Stack

Expo, React Native, TypeScript, React Navigation, Redux Toolkit and RTK Query, Firebase (Auth and Firestore), Algolia, FlashList and Reanimated for performance, EAS builds and updates, and GitHub Actions for lint on push.

## What made it hard

Splitting **Firestore** and **HTTP** behind two RTK Query APIs was a deliberate tradeoff: catalogue feels snappy while order and payment traffic stays on a controlled service boundary. The interesting work was keeping invalidations and merge logic honest so users never see stale carts or order state after a mutation.
