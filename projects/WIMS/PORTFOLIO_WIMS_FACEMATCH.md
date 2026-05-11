# Portfolio snapshot: FaceMatch / WIMS (from repo)

## 1) One-line project pitch (what it is + who it’s for)

- Android and iOS clients for on-device face detection, recognition, and liveness, with optional WIMS mobile-device API integration (login/registration, heartbeat, queued tasks, recognition upload, face sync) for organizations using that backend; the Android README frames a complete enrollment workflow aimed at operators running the app on a device with camera and NDK build tooling.

## 2) My role (solo vs team; what I owned end-to-end)

- Unknown (no contributor list, ownership doc, or authorship metadata found in-repo).

## 3) Problem → approach → outcome (3–5 bullets each)

**Problem**

- Need performant face enrollment and recognition on mobile without doing heavy vision work on the JVM (stated in `README.md`: native C++ backend).
- WIMS-style devices must stay registered and poll for server-queued work via heartbeat/task APIs (evidenced by `WimsApiService.kt`, `HeartbeatService.kt`, `TaskProcessor.kt`, and `api/README.md`).
- Recognition and attendance rows must survive offline or failed uploads and retry (Room entities with `sync_status` / `synced_at` / `retry_count` in `WimsDatabase.kt`; iOS `WIMSAttendanceStore.swift` uses `PENDING` / `SENT` / `FAILED`).
- Sensitive session material should not live in plain prefs (Android `EncryptedSharedPreferences` in `SettingsManager.kt`; iOS Keychain in `WIMSSecureStore.swift`).

**Approach**

- Android: Kotlin UI (XML layouts, ViewBinding) calling JNI into C++ CMake build with OpenCV SDK path from `local.properties` (`app/build.gradle`, `app/src/main/cpp/`); models shipped under `app/src/main/assets/` per `README.md`.
- Android: Retrofit + Gson HTTP client (`app/build.gradle`, `WimsApiService.kt`); Room database `wims_database` (`WimsDatabase.kt`); foreground `HeartbeatService` with `delay(60000)` between heartbeats when `deviceKey` is present; WorkManager for periodic cleanup (`HeartbeatService.kt`).
- iOS: SwiftUI app (`ios_v1/ios/WIMS/WIMS/`), TensorFlowLite via CocoaPods `TensorFlowLiteSwift` `~> 2.17.0` (`Podfile`), URLSession-based `WimsAPIClient` actor aligned with `api/wims_api_client.py` (file comment).
- iOS: JSON persistence under Application Support (`WIMSDirectoryStore.swift`, `WIMSAttendanceStore.swift`) documented as parity with Android Room entities.
- Local API harness: FastAPI + Uvicorn mock and Python test client (`api/requirements.txt`, `api/README.md`, default mock port `18080`).

**Outcome**

- Documented enrollment UX: three captures, per-image pipeline log, averaging three embeddings into `face_db.bin` (`README.md`).
- Background WIMS visibility: foreground notification “WIMS Active” / “WIMS is active — face recognition service running” (`HeartbeatService.kt`).
- Settings UX for operators: last heartbeat timestamp/result enums (`SettingsManager.kt`, surfaced in `DataSettingsActivity.kt` per grep); API traffic ring buffer for debugging (`ApiCallLogStore.kt`, `ApiCallLogInterceptor.kt`).
- Quantitative production metrics (DAU, recognition accuracy in the field, SLA): Unknown (not present in repo).

## 4) Tech stack (languages, frameworks, infra, DB, auth, CI/CD)

- **Languages:** Kotlin (`build.gradle` plugins), C++14 (`app/build.gradle` `cppFlags`), Swift (`ios_v1/.../*.swift`), Python (`api/`).
- **Android frameworks:** Android Gradle Plugin `8.13.2`, Kotlin `1.9.22` (root `build.gradle`); CameraX `1.4.2`, Retrofit `2.9.0`, Room `2.6.1`, WorkManager `2.9.0`, Glide `4.16.0`, `play-services-location` `21.2.0`, ViewBinding (`app/build.gradle`); CMake `3.22.1` for `app/src/main/cpp/CMakeLists.txt`.
- **Android native:** JNI entrypoints under `app/src/main/cpp/`; README cites MTCNN, MobileFaceNet, anti-spoof TFLite; `face_antispoofing.h` defines `THRESHOLD = 0.7f` and Laplacian thresholds.
- **iOS frameworks:** SwiftUI, AVFoundation (camera pipelines in `LivenessTabView.swift`, `CameraEnrollView.swift` per structure), Vision (likely face geometry—files reference face boxes), TensorFlow Lite Swift pod; `SettingsStore.swift` imports `CryptoKit`.
- **Infra / persistence:** Android internal storage for `face_db.bin` (`README.md`); Room DB filename `wims_database` (`WimsDatabase.kt`); iOS `Application Support/WIMS/directory.json` and attendance JSON (`WIMSDirectoryStore.swift`, `WIMSAttendanceStore.swift`); Android `SharedPreferences` + encrypted prefs namespace `secret_settings` (`SettingsManager.kt`).
- **Auth / session:** JWT and `device_key` API fields (`WimsAPIClient.swift`, `WimsApiService.kt`); Android stores JWT/device key via encrypted prefs; iOS Keychain service `com.example.wims.ios.secrets` (`WIMSSecureStore.swift`).
- **API / testing:** `fastapi==0.110.0`, `uvicorn==0.27.1`, `pydantic`, `requests` (`api/requirements.txt`).
- **CI/CD:** Unknown (no `.github` workflows found at repo root).

## 5) Notable technical decisions (tradeoffs, why X over Y) — only if visible in code

- **Heavy vision on native C++ (Android)** vs Kotlin-only: `README.md` states all heavy lifting in C++ for performance; Gradle wires NDK ABIs `arm64-v8a`, `armeabi-v7a` and OpenCV SDK.
- **Room on Android vs JSON file stores on iOS:** `WIMSDirectoryStore` / `WIMSAttendanceStore` file headers explicitly describe Android `UserEntity` / `FaceTemplateEntity` / `RecognitionRecordEntity` parity without pulling SQLite/Room onto iOS.
- **Secrets storage:** iOS comment on `WIMSSecureStore` states Keychain replaces plain `UserDefaults` for JWT/device key; Android uses `androidx.security:security-crypto` `EncryptedSharedPreferences`.
- **Concurrency on iOS liveness:** `LivenessTabView` uses a dedicated `frameQueue` for `AVCaptureVideoDataOutput`; comments and `syncRecognitionCachesFromSettings()` copy `@MainActor` `SettingsStore` fields into caches so recognition reads do not touch main-actor-isolated settings from the video queue.

## 6) Hardest bug or constraint and how it was handled (if inferable)

- **Swift concurrency / camera pipeline:** `LivenessTabView.swift` documents that `SettingsStore` is `@MainActor` while frames run off the main queue; mitigation is explicit cached floats/bools updated on the main actor via `syncRecognitionCachesFromSettings()` (also invoked from `onAppear` / settings change handlers per file).

## 7) What I’d highlight in an interview for THIS project (3 bullets)

- End-to-end WIMS mobile surface area in code: same endpoint set on Android Retrofit interface and iOS `WimsAPIClient`, plus a Python mock and scripted client flows in `api/README.md`.
- Hybrid mobile architecture: JNI + CMake + TFLite/OpenCV on Android versus SwiftUI + TensorFlow Lite Swift on iOS, both supporting live camera and recognition-oriented settings (thresholds, bounding box, multi-face) visible in `SettingsManager.kt` and `LivenessTabView.swift`.
- Operational robustness patterns: 60-second heartbeat loop with persisted last result, Room/JSON recognition rows with sync status, foreground service when background mode is enabled, and HTTP call logging for support/debug.

## 8) Suggested portfolio labels

- [Mobile, Android, iOS, Kotlin, Swift, SwiftUI, Native (C++/JNI), On-device ML, Computer Vision, TensorFlow Lite, API Integration, Local-first / Offline sync patterns]
