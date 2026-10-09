@echo off
cd /d "%~dp0"
node --version
if errorlevel 1 (
 echo Node.js 24 ni nodejs.org saytidan o'rnating.
 pause
 exit /b 1
)
echo Sayt: http://localhost:3000
echo Admin yaratish: npm run admin
node server.mjs
pause
