@echo off
title Deploy to Netlify Guide
color 0B
cls

echo.
echo ╔══════════════════════════════════════════════════════╗
echo ║     Deploy Recipe Generator to Netlify             ║
echo ╚══════════════════════════════════════════════════════╝
echo.
echo This will guide you to deploy your app and get a URL.
echo.
echo ========================================
echo   STEP 1: Open Netlify
echo ========================================
echo.
echo Opening Netlify website...
echo.
start https://www.netlify.com/
echo.
echo ========================================
echo   INSTRUCTIONS
echo ========================================
echo.
echo 1. Sign up or log in to Netlify
echo 2. Look for "Drag and drop your site" area
echo 3. Drag THIS folder to Netlify
echo 4. Wait for deployment
echo 5. Copy your URL (looks like: https://xxx.netlify.app)
echo.
echo ========================================
echo   STEP 2: After Getting URL
echo ========================================
echo.
echo Once you have your Netlify URL:
echo.
echo 1. Go to: https://www.pwabuilder.com/
echo 2. Paste your Netlify URL
echo 3. Click "Start"
echo 4. Build your APK!
echo.
echo ========================================
echo.
echo Press any key to open Netlify...
pause >nul

echo.
echo Opening Netlify...
start https://www.netlify.com/

echo.
echo Good luck! Follow the instructions above.
echo.
pause

