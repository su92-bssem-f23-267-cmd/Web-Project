#!/usr/bin/env pwsh

Write-Host "`n" -ForegroundColor White
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "Book Valley - Neon Database Setup" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "`n" -ForegroundColor White

# Check if .env.local exists
if (Test-Path ".env.local") {
    Write-Host "✓ .env.local file already exists" -ForegroundColor Green
} else {
    Write-Host "Creating .env.local file from template..." -ForegroundColor Yellow
    Copy-Item ".env.local.example" ".env.local"
    Write-Host "✓ .env.local created" -ForegroundColor Green
    Write-Host "⚠ Please update DATABASE_URL with your Neon connection string" -ForegroundColor Red
}

Write-Host "`n" -ForegroundColor White
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "IMPORTANT NEXT STEPS:" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "`n" -ForegroundColor White

Write-Host "1. Go to https://console.neon.tech" -ForegroundColor Yellow
Write-Host "2. Create a new project called 'book-valley'" -ForegroundColor Yellow
Write-Host "3. Copy your Node.js connection string" -ForegroundColor Yellow
Write-Host "4. Open .env.local and update DATABASE_URL" -ForegroundColor Yellow
Write-Host "`n" -ForegroundColor White

Write-Host "5. Run these commands in order:" -ForegroundColor Yellow
Write-Host "   $ npx prisma db push" -ForegroundColor Cyan
Write-Host "   $ npx prisma studio (optional - to view data)" -ForegroundColor Cyan
Write-Host "`n" -ForegroundColor White

Write-Host "6. Start your project:" -ForegroundColor Yellow
Write-Host "   $ npm run dev" -ForegroundColor Cyan
Write-Host "`n" -ForegroundColor White

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "Happy Coding! 🚀" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "`n" -ForegroundColor White
