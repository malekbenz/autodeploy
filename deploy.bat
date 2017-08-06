@echo off
echo Run with success

CD /D G:\ReDD
git pull
REM # scripts/deploy
REM git checkout production
REM git pull
REM npm install # optional
REM pm2 restart service