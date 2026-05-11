# Wire24

Wire24 is a cross-platform fintech mobile app: mobile money, bank transfers, merchant payments, and wallet-based transactions. The product asks users to move real money through screens I helped shape—so every state transition, empty state, and error path had to earn confidence, not just look polished.

## How I showed up

I joined as **Founding Software Engineer** from **February 2023 through November 2025**—about two years and nine months—**part-time and remote**, and I was **one of the first engineers** on the product. That meant less hand-holding and more judgment calls: what we built first, how we named states in the UI, and how we kept complexity from leaking into the flows people used every day.

## What I owned

I focused on the **core financial UI**, **transaction flows**, and **wallet logic**—the parts of the app where hesitation costs conversion. I built **secure onboarding** and the **KYC verification** experience from an empty state to “you’re cleared to transact.” I integrated **payment services** and backend APIs so balances and receipts updated in **real time**, and I contributed to **customer account management** so people could understand what happened with their money without opening a ticket.

I was also in the room for **application architecture** calls: how we kept the client fast, how we structured data for RTK Query, and where we drew the line between “ship now” and “pay down complexity before the next release.”

## Stack I shipped with

**React Native**, **Expo**, **TypeScript**, **Redux Toolkit**, **RTK Query**, **Firebase**, **Socket.IO**, and **NativeWind**—a setup that let us move quickly without pretending types and caching were optional.

## What made it hard

Building **financial UX** leaves no margin for a cute mistake. A broken transaction flow or a confusing onboarding step doesn’t only lose a session—it chips away at **trust with money**. I spent a lot of time on copy, loading states, and recovery paths so users always knew what was happening, what would happen next, and what to do if something failed. That discipline—treating anxiety as a first-class UX problem—is what I still carry into every product I touch.

## What shipped

We shipped a client that talks to **`https://api.wire24.co/`** with authenticated requests, persisted session state, and real-time surfaces (including **Socket.IO** and Firebase messaging) so users weren’t staring at stale balances. I helped land **iOS-only** extras where they made sense—**home screen widgets** and **Live Activities**—while keeping **Android** builds safe from native modules that don’t exist on that platform (platform-gated imports and a small **vendor patch** for `expo-widgets` when iOS packaging fought us). None of that is as important as the headline: **people could move money through the app with a straight story from tap to receipt**—and I’m proud of the parts of that story I owned.
