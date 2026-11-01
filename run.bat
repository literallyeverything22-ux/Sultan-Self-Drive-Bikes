@echo off
title Sultan Self Drive Bikes - Local Server
echo ===================================================
echo     Sultan Self Drive Bikes - Modern Platform
echo ===================================================
echo.
echo Starting local web server on http://localhost:3000...
echo.

if not exist node_modules (
    echo Installing dependencies first, please wait a moment...
    call npm install
)

echo Opening browser...
start http://localhost:3000

call npm run dev
pause
