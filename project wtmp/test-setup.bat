@echo off
title Testing Recipe Generator Setup
color 0E
cls

echo.
echo ========================================
echo   Testing Recipe Generator Setup
echo ========================================
echo.

REM Check Node.js
echo [1/4] Checking Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo    [FAIL] Node.js not found!
    echo    Please install from: https://nodejs.org/
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%i in ('node --version') do echo    [OK] Node.js: %%i
)

REM Check required files
echo.
echo [2/4] Checking required files...
set MISSING=0

if not exist "index.html" (
    echo    [FAIL] index.html missing!
    set MISSING=1
) else (
    echo    [OK] index.html found
)

if not exist "app.js" (
    echo    [FAIL] app.js missing!
    set MISSING=1
) else (
    echo    [OK] app.js found
)

if not exist "server.js" (
    echo    [FAIL] server.js missing!
    set MISSING=1
) else (
    echo    [OK] server.js found
)

if not exist "styles.css" (
    echo    [FAIL] styles.css missing!
    set MISSING=1
) else (
    echo    [OK] styles.css found
)

if %MISSING% equ 1 (
    echo.
    echo [ERROR] Some files are missing!
    pause
    exit /b 1
)

REM Check if port is in use
echo.
echo [3/4] Checking port 8000...
netstat -ano | findstr :8000 >nul
if %errorlevel% equ 0 (
    echo    [WARNING] Port 8000 is already in use!
    echo    You may need to close other applications.
) else (
    echo    [OK] Port 8000 is available
)

REM Test server.js syntax
echo.
echo [4/4] Testing server.js...
node -c server.js >nul 2>&1
if %errorlevel% neq 0 (
    echo    [FAIL] server.js has syntax errors!
    node -c server.js
    pause
    exit /b 1
) else (
    echo    [OK] server.js syntax is valid
)

echo.
echo ========================================
echo   All checks passed!
echo ========================================
echo.
echo You can now run: start-node.bat
echo.
pause

