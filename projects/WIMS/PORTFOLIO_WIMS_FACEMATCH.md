# FaceMatch / WIMS

**FaceMatch / WIMS** is a **mobile enrollment and recognition** product: on-device face detection, liveness checks, and recognition pipelines, with optional integration to a **WIMS-style backend** for device registration, heartbeats, queued work, and syncing recognition results when connectivity allows.

## My role

I worked across the **Android (Kotlin + native C++ via JNI)** and **iOS (SwiftUI)** clients, plus a small **Python FastAPI** harness used to exercise the mobile API during development. The emphasis was on **camera-first UX**, reliable persistence of enrollment and attendance rows, and operational visibility (settings, logging) for field use.

## What we built

- **Performance-sensitive vision on Android** by keeping heavy work in native code while the Kotlin layer handles UI and lifecycle.
- **Cross-platform parity** for the same product story: enrollment flows, recognition, and background behaviour aligned between Android and iOS where the platforms allow it.
- **Resilient sync**: local rows with status fields so failed uploads can retry instead of silently dropping data.
- **Credential handling** using platform-appropriate secure storage instead of plain preferences for tokens and device keys.

## Stack

Kotlin, C++ and CMake, Android CameraX, Retrofit, Room, WorkManager; Swift, SwiftUI, TensorFlow Lite on iOS; OpenCV- and TFLite-oriented models in assets; Python FastAPI for local API mocking during development.

## What made it hard

**Camera pipelines and concurrency** do not forgive sloppy threading—especially on iOS where actor isolation and video capture queues intersect. The work was as much about **correct frame handling and settings sync** as it was about model thresholds: the operator has to trust what the device shows them in real time.
