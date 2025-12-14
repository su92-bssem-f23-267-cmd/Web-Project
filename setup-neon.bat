@echo off
REM Neon Database Setup Script for Book Valley

echo.
echo =====================================
echo Book Valley - Neon Database Setup
echo =====================================
echo.

REM Check if .env.local exists
if exist ".env.local" (
    echo ✓ .env.local file already exists
) else (
    echo Creating .env.local file...
    copy ".env.local.example" ".env.local"
    echo ✓ .env.local created (please update with your Neon connection string)
)

echo.
echo =====================================
echo IMPORTANT NEXT STEPS:
echo =====================================
echo.
echo 1. Go to https://console.neon.tech
echo 2. Create a new project called "book-valley"
echo 3. Copy your connection string
echo 4. Open .env.local and replace DATABASE_URL with your connection string
echo.
echo 5. Run these commands:
echo    - npx prisma db push
echo    - npx prisma studio (optional, to view data)
echo.
echo 6. Then start your project:
echo    - npm run dev
echo.
echo =====================================
pause
