@echo off
title Debug App Interface
color 0B
cls

echo.
echo ========================================
echo   Debugging App Interface Issue
echo ========================================
echo.
echo The server is working, but the app interface isn't showing.
echo.
echo Let's check a few things...
echo.
echo ========================================
echo.

REM Check if main files exist
echo [1/3] Checking required files...
if exist "index.html" (
    echo    [OK] index.html exists
) else (
    echo    [ERROR] index.html missing!
)

if exist "app.js" (
    echo    [OK] app.js exists
) else (
    echo    [ERROR] app.js missing!
)

if exist "styles.css" (
    echo    [OK] styles.css exists
) else (
    echo    [ERROR] styles.css missing!
)

echo.
echo ========================================
echo [2/3] Test URLs to try in your browser:
echo ========================================
echo.
echo 1. Simple test page:
echo    http://localhost:8000/SIMPLE-TEST.html
echo.
echo 2. Main app:
echo    http://localhost:8000/index.html
echo.
echo 3. Diagnostic page:
echo    http://localhost:8000/check-browser.html
echo.
echo ========================================
echo [3/3] What to check in browser:
echo ========================================
echo.
echo 1. Open browser to: http://localhost:8000/index.html
echo 2. Press F12 to open Developer Tools
echo 3. Click "Console" tab
echo 4. Look for RED error messages
echo 5. Click "Network" tab
echo 6. Refresh page (F5)
echo 7. Check if these files load (should show 200):
echo    - styles.css
echo    - app.js
echo    - manifest.json
echo.
echo ========================================
echo.
pause

