@echo off
title Recipe Generator - Easy Start
color 0A
cls

echo.
echo ========================================
echo   AI Recipe Generator - Easy Start
echo ========================================
echo.
echo Choose an option:
echo.
echo   1. Test Setup (Check if everything is OK)
echo   2. Start Server (Run the app)
echo   3. Exit
echo.
set /p choice="Enter your choice (1, 2, or 3): "

if "%choice%"=="1" (
    echo.
    echo Running test setup...
    echo.
    call test-setup.bat
    goto :end
)

if "%choice%"=="2" (
    echo.
    echo Starting server...
    echo.
    call start-node.bat
    goto :end
)

if "%choice%"=="3" (
    exit
)

echo.
echo Invalid choice! Please enter 1, 2, or 3.
timeout /t 2 >nul

:end

