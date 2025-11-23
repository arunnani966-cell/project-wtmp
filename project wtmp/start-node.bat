@echo off
title Recipe Generator - Node.js Server
color 0B
cls

echo.
echo ╔══════════════════════════════════════════════════════╗
echo ║     AI Recipe Generator - Node.js Server           ║
echo ╚══════════════════════════════════════════════════════╝
echo.

echo Checking for Node.js...

node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo [❌] Node.js not found!
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo Or use Python method instead (start.bat)
    echo.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo [✓] Node.js found: %NODE_VERSION%
echo.

echo Starting server...
echo.

REM Change to script directory (where this batch file is located)
cd /d "%~dp0"

REM Show current directory for debugging
echo Current directory: %CD%
echo.

REM Test server.js first
node -c server.js >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo [❌] ERROR: server.js has syntax errors!
    echo.
    echo Running syntax check...
    node -c server.js
    echo.
    pause
    exit /b 1
)

REM Check if files exist
if not exist "index.html" (
    echo.
    echo [❌] ERROR: index.html not found!
    echo Make sure you're running this from the project folder.
    echo.
    pause
    exit /b 1
)

REM Start the server
node server.js

if %errorlevel% neq 0 (
    echo.
    echo ========================================
    echo [❌] Server failed to start!
    echo ========================================
    echo.
    echo Possible issues:
    echo   • Port 8000 is already in use
    echo   • Firewall is blocking the connection
    echo   • server.js has an error
    echo.
    echo Try running: test-setup.bat
    echo.
    pause
)

