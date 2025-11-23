@echo off
title Build Android APK
color 0B
cls

echo.
echo ╔══════════════════════════════════════════════════════╗
echo ║     Build Android APK - Recipe Generator           ║
echo ╚══════════════════════════════════════════════════════╝
echo.

REM Change to script directory
cd /d "%~dp0"

echo [Step 1/5] Checking prerequisites...
echo.

REM Check Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js not found!
    echo Please install Node.js from: https://nodejs.org/
    pause
    exit /b 1
)
echo [OK] Node.js found

REM Check Java
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo [WARNING] Java not found!
    echo You need Java JDK 11+ for building APK
    echo Download from: https://adoptium.net/
    echo.
    echo Continue anyway? (Y/N)
    set /p continue="> "
    if /i not "%continue%"=="Y" exit /b 1
) else (
    echo [OK] Java found
)

echo.
echo ========================================
echo [Step 2/5] Installing dependencies...
echo ========================================
echo.
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] npm install failed!
    pause
    exit /b 1
)

echo.
echo ========================================
echo [Step 3/5] Initializing Capacitor...
echo ========================================
echo.

REM Check if capacitor.config.json exists
if not exist "capacitor.config.json" (
    echo Initializing Capacitor...
    npx cap init "Recipe Generator" "com.recipegenerator.app" .
    if %errorlevel% neq 0 (
        echo [ERROR] Capacitor init failed!
        pause
        exit /b 1
    )
) else (
    echo [OK] Capacitor already configured
)

echo.
echo ========================================
echo [Step 4/5] Adding Android platform...
echo ========================================
echo.

if not exist "android" (
    echo Adding Android platform...
    npx cap add android
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to add Android platform!
        echo Make sure Android Studio and Android SDK are installed.
        pause
        exit /b 1
    )
) else (
    echo [OK] Android platform already exists
)

echo.
echo ========================================
echo [Step 5/5] Syncing files...
echo ========================================
echo.

npx cap sync
if %errorlevel% neq 0 (
    echo [ERROR] Sync failed!
    pause
    exit /b 1
)

echo.
echo ========================================
echo   ✅ Setup Complete!
echo ========================================
echo.
echo Next steps:
echo   1. Android Studio should open automatically
echo   2. If not, run: npx cap open android
echo   3. In Android Studio: Build → Build APK
echo.
echo Or use the easier method:
echo   → Go to https://www.pwabuilder.com/
echo   → Enter your app URL
echo   → Download APK directly
echo.
pause

