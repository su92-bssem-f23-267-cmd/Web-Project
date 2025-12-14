# Neon Database Troubleshooting Guide

## Common Issues and Solutions

### 1. Database Connection Failed

**Error**: `ECONNREFUSED` or "Cannot connect to database"

**Solutions**:
```bash
# 1. Check your connection string format
# Correct: postgresql://user:password@host/dbname?sslmode=require
# ❌ Wrong: postgresql://user:password@localhost:5432 (won't work for Neon)

# 2. Verify DATABASE_URL is set
echo $env:DATABASE_URL  # PowerShell
echo $DATABASE_URL      # Bash

# 3. Test connection with Prisma
npx prisma db execute --stdin < /dev/null

# 4. Check Neon console - is your project active?
# If project is paused: restart from https://console.neon.tech
```

### 2. SSL Connection Error

**Error**: `FATAL: no pg_hba.conf entry for host`

**Solution**:
```
Add ?sslmode=require to your connection string

❌ Before: postgresql://user:password@ep-xxxxx.neon.tech/book_valley
✅ After:  postgresql://user:password@ep-xxxxx.neon.tech/book_valley?sslmode=require
```

### 3. Prisma Schema Push Failed

**Error**: `ERROR_NOT_FOUND` or schema validation errors

**Solutions**:
```bash
# 1. Check schema syntax
npx prisma validate

# 2. View current schema
npx prisma introspect

# 3. Force reset (⚠️ DELETES DATA!)
npx prisma db push --force-reset

# 4. Check for migration issues
npx prisma migrate status
```

### 4. Authentication Error

**Error**: `role "username" does not exist` or `password authentication failed`

**Solutions**:
```
1. Verify credentials in your connection string
2. Reset Neon password:
   - Go to Neon Console
   - Select your project
   - Settings → Connection details
   - Reset password
   - Copy new connection string

3. Format: postgresql://role_name:password@host/dbname?sslmode=require
```

### 5. Tables Not Created

**Error**: Tables don't exist after `prisma db push`

**Solutions**:
```bash
# 1. Verify schema file exists
ls prisma/schema.prisma  # or dir prisma\schema.prisma on Windows

# 2. Check schema syntax
npx prisma validate

# 3. Push again with verbose output
npx prisma db push --verbose

# 4. View what tables exist
npx prisma studio
```

### 6. Prisma Studio Won't Open

**Error**: Port already in use or connection failed

**Solutions**:
```bash
# 1. Try different port
npx prisma studio --browser=none

# 2. Kill process using port 5555
# Windows:
netstat -ano | findstr :5555
taskkill /PID <PID> /F

# 3. Update DATABASE_URL and try again
```

### 7. Vercel Deployment Issues

#### Build Fails
```bash
# Check logs
vercel logs

# Common causes:
# 1. Missing environment variables - add them in Vercel dashboard
# 2. prisma client not generated - run: npx prisma generate
# 3. Wrong Node version - check vercel.json
```

#### Runtime Error After Deployment
```bash
# 1. Check Vercel logs
vercel logs --follow

# 2. Verify environment variables are set correctly
# Dashboard → Settings → Environment Variables

# 3. Common issues:
# - DATABASE_URL wrong format
# - JWT_SECRET not set
# - NEXTAUTH_SECRET not set
```

#### Database Connection Timeout on Vercel
```
1. Check Neon console - verify project is active
2. Review connection string - ensure ?sslmode=require
3. Check Vercel function duration - might need optimization
4. Verify IP whitelist in Neon (usually not needed)
```

### 8. Prisma Generate Issues

**Error**: `Command not found: npx`

**Solutions**:
```bash
# 1. Verify Node.js and npm installed
node --version
npm --version

# 2. Reinstall node_modules
rm -r node_modules
npm install

# 3. Try global installation
npm install -g prisma
prisma generate
```

### 9. Environment Variable Not Reading

**Error**: `DATABASE_URL is undefined`

**Solutions**:
```bash
# 1. Restart development server
# (Environment changes require restart)

# 2. Check .env.local file exists
ls -la .env.local

# 3. Correct format in .env.local:
DATABASE_URL="postgresql://user:password@host/db?sslmode=require"
# NOT: DATABASE_URL = "..." (no spaces around =)

# 4. For Vercel, add in dashboard:
# Settings → Environment Variables (not .env.local)
```

### 10. Data Loss / Need to Reset

**⚠️ WARNING: This will DELETE ALL DATA**

```bash
# 1. Reset database schema
npx prisma db push --force-reset

# 2. Reseed with initial data
npx prisma db seed

# 3. Verify in Prisma Studio
npx prisma studio
```

## Quick Diagnostics

Run this command to help diagnose issues:

```bash
# Test connection
npx prisma db execute --stdin

# Show schema
npx prisma schema

# Check schema validity
npx prisma validate

# View database
npx prisma studio

# Check migrations
npx prisma migrate status
```

## Performance Issues

### Slow Queries
```bash
# 1. Check Neon monitoring
# Console → Your Project → Monitoring

# 2. Add indexes to frequently queried fields
# In schema.prisma:
model Book {
  id      String  @id
  email   String  @unique
  name    String
  
  @@index([email])  // Add this
}

# 3. Run db push
npx prisma db push
```

### Connection Pool Exhausted
```
Error: "sorry, too many clients already"

Solution:
1. Optimize queries - don't open multiple connections
2. Use connection pooling in production
3. Check Neon console for active connections
```

## Testing Your Setup

```bash
# 1. Test local development
npm run dev
# Visit http://localhost:3001

# 2. Test database directly
npx prisma studio

# 3. Test build
npm run build

# 4. Test production preview
npm run start

# 5. Test on Vercel
# Deploy and check: vercel logs
```

## Getting Help

If none of these solutions work:

1. **Check Error Logs**:
   - Vercel: Dashboard → Deployments → Logs
   - Local: Terminal output
   - Database: Neon Console → Monitoring

2. **Common Resources**:
   - Neon Issues: https://github.com/neondatabase/neon/issues
   - Prisma Issues: https://github.com/prisma/prisma/issues
   - Vercel Status: https://vercel.com/status

3. **Ask for Help**:
   - Provide error message (full text)
   - Include connection string format (don't share password!)
   - Specify: local dev / Vercel production
   - Include NODE version and npm version

---

**Last Updated**: December 14, 2025
