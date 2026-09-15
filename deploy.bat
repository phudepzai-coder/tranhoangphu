@echo off
cd /d "%~dp0"
echo ===== 1/2: Cap nhat playlist tu thu muc music/ =====
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0update-playlist.ps1"
echo.
echo ===== 2/2: Day thay doi len GitHub =====
git add -A
git commit -m "Update website"
if %errorlevel%==0 (
    git push
    echo.
    echo ===== HOAN TAT! Web se cap nhat sau ~1 phut =====
) else (
    echo Khong co thay doi nao de day len.
)
echo.
pause
