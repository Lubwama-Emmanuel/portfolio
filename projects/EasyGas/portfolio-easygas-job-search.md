# Easy Gas

**Easy Gas** is an **Expo / React Native** product for **ordering fuel and related goods** with delivery details, favourites, and notifications—plus an **in-app admin area** for teams who manage the catalogue, watch orders, and send broadcast messages to customers.

## My role

I contributed as part of a **multi-author team** (I’m credited as package author alongside other engineers on the project). My work sits in the **consumer flows** and the **shared data layer**: Supabase-backed auth, typed database models, orders with stage and status, maps and delivery fields, and the glue between **Redux** (auth and cart) and **TanStack Query** for server-backed lists that stay fresh when data changes.

## What we built

- **One app, two experiences**: shopper routes versus an admin tab experience gated by role after sign-in.
- **Live-feeling orders**: realtime subscriptions that invalidate the right queries when order rows change.
- **Push and messaging**: Expo notifications and OneSignal wired through config and edge automation so alerts line up with what’s in the database.
- **Account safety**: flows for sign-out and account deletion that respect in-flight orders before destructive actions.

## Stack

Expo Router, TypeScript (strict), Supabase (Auth, Postgres, Realtime, Edge Functions), Redux Toolkit with persistence for auth and cart, TanStack Query, maps and location, OneSignal, and EAS for builds and store submission.

## What made it hard

Shipping **admin and consumer** behaviour in a single binary means clear separation of routes, permissions, and state. Pairing **Realtime** with query cache invalidation—without fighting Redux for the same concerns—took care so support staff and customers each see a coherent, fast UI.
