# 📱 Build Android APK - Recipe Generator

## Prerequisites

Before building the APK, you need:

1. **Node.js** (already installed ✅)
2. **Java JDK 11 or higher** - Download from: https://adoptium.net/
3. **Android Studio** - Download from: https://developer.android.com/studio
4. **Android SDK** (installed via Android Studio)

## Step-by-Step Guide

### Step 1: Install Dependencies

Open Command Prompt in the project folder and run:

```bash
npm install
```

This will install Capacitor and required packages.

### Step 2: Initialize Capacitor

```bash
npx cap init
```

When prompted:
- **App name:** Recipe Generator
- **App ID:** com.recipegenerator.app
- **Web dir:** . (current directory)

### Step 3: Add Android Platform

```bash
npx cap add android
```

### Step 4: Sync Files

```bash
npx cap sync
```

This copies your web files to the Android project.

### Step 5: Open in Android Studio

```bash
npx cap open android
```

This will open Android Studio with your project.

### Step 6: Build APK in Android Studio

1. In Android Studio, wait for Gradle sync to complete
2. Go to **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
3. Wait for the build to complete
4. Click **locate** when it says "APK(s) generated successfully"
5. The APK file will be in: `android/app/build/outputs/apk/debug/app-debug.apk`

### Step 7: Install APK on Your Phone

1. Transfer the APK file to your Android phone
2. Enable "Install from Unknown Sources" in phone settings
3. Tap the APK file to install

## Quick Build Script

I've created `build-apk.bat` - double-click it to automate steps 1-5!

## Alternative: Use PWA Builder (Easier, No Android Studio)

1. Go to: https://www.pwabuilder.com/
2. Enter your app URL: `http://localhost:8000` (while server is running)
3. Click "Start"
4. Click "Build My PWA"
5. Select "Android"
6. Download the APK

**Note:** For PWA Builder, you need to host your app online (not just localhost).

## Troubleshooting

### "Java not found"
- Install Java JDK from: https://adoptium.net/
- Add Java to PATH environment variable

### "Android SDK not found"
- Install Android Studio
- Open Android Studio → SDK Manager
- Install Android SDK Platform-Tools

### "Gradle sync failed"
- Make sure you have internet connection
- Android Studio will download Gradle automatically
- Wait for it to complete

### Build Errors
- Make sure all files (index.html, app.js, styles.css) are in the project folder
- Run `npx cap sync` again
- Clean and rebuild in Android Studio

## File Locations

After building:
- **APK file:** `android/app/build/outputs/apk/debug/app-debug.apk`
- **Signed APK (for Play Store):** `android/app/build/outputs/apk/release/app-release.apk`

## Next Steps

- **Test APK:** Install on your phone and test
- **Sign APK:** For Play Store distribution, you need to sign the APK
- **Optimize:** Reduce APK size, add app icon, etc.

