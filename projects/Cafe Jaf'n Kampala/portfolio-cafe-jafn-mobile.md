# Cafe Jaf’n Kampala

**Cafe Jaf’n Kampala** is the customer-facing mobile app for the Kampala cafe: browse the menu, save favourites, build a cart, get a **delivery fee quote**, and place **cash-on-delivery** orders with address validation so people only check out when delivery is actually possible.

## My role

I built the **Expo / React Native** client end to end—navigation, state, and the data layer that powers menu browsing, auth, checkout, and order history. The app integrates with a backend the team runs separately (orders, quotes, menu data); my focus was making the **checkout and location flow** feel reliable: maps and Google Places, current location, clear messaging when someone is outside the delivery radius, and a disabled “place order” path until the quote and radius checks pass.

## What we shipped

- **Authenticated REST** flows with persisted sessions and cart state across launches.
- **Checkout** that combines device location, address search, delivery quotes, and order submission in one guided flow.
- **Orders** list and detail so customers can track what they ordered after the fact.
- **Expo** configuration for builds and over-the-air updates so the team can ship fixes without waiting on store review for every change.

## Stack

TypeScript, React Native, Expo, Expo Router, Redux Toolkit and RTK Query, NativeWind, Google Sign-In and Apple auth, maps and Places, Firebase where the product needs it, and EAS for distribution.

## What made it hard

Commerce on mobile is as much **trust and guardrails** as UI. Getting bottom sheets, lists, and gestures to play nicely while still enforcing **out-of-radius** rules and failed-quote handling took iteration—the goal was always that a mistaken tap never becomes a bad order.
