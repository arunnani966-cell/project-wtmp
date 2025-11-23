@echo off
title Test Server Direct
color 0E
cls

echo.
echo ========================================
echo   Testing Server Directly
echo ========================================
echo.

REM Change to script directory
cd /d "%~dp0"

echo Current directory: %CD%
echo.

REM Check if files exist
if not exist "index.html" (
    echo [ERROR] index.html not found!
    echo Make sure you're in the project folder.
    pause
    exit /b 1
)

if not exist "server.js" (
    echo [ERROR] server.js not found!
    pause
    exit /b 1
)

echo [OK] Files found
echo.
echo Starting server...
echo.
echo IMPORTANT: Keep this window open!
echo.
echo If you see "✅ SERVER IS RUNNING!" below, the server started successfully.
echo Then open: http://localhost:8000 in your browser
echo.
echo ========================================
echo.

node server.js

if %errorlevel% neq 0 (
    echo.
    echo ========================================
    echo [ERROR] Server failed to start!
    echo ========================================
    echo.
    echo Check the error message above.
    echo.
    pause
)

