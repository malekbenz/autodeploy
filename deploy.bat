@echo off
REM echo Run with success
echo Current direcorty : %cd%
CD /D ..\ReD
echo Move to direcorty : %cd%
git pull

echo Run with success
REM # scripts/deploy
REM git checkout production
REM git pull
REM npm install # optional
REM pm2 restart service