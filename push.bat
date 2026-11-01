@echo off
title Push Sultan Self Drive Bikes to GitHub
echo ===================================================
echo   Pushing code to Sultan-Self-Drive-Bikes on GitHub
echo ===================================================
echo.
echo Running: git push -u origin main
echo.
git push -u origin main
echo.
if %ERRORLEVEL% EQU 0 (
    echo [SUCCESS] Successfully pushed to GitHub!
) else (
    echo [NOTE] If prompted for credentials, please sign in with your GitHub account.
)
echo.
pause
