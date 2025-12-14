# Vercel Database Connection Setup Guide (Urdu/English)

## ⚠️ Problem: "Database Connect Nahi Ho Raha"

Agar aapko Vercel pe deployment ke baad database connection error aa raha hai, to yeh guide follow karein.

---

## ✅ Solution Steps

### Step 1: Neon Database Connection String Verify Karein

1. **Neon Console** me jayein: https://console.neon.tech
2. Aapki project select karein
3. **Connection Details** section me jayein
4. **Connection string** copy karein

**Format aisa hona chahiye:**
```
postgresql://username:password@ep-xxxxx.region.aws.neon.tech/dbname?sslmode=require
```

**Important:** Connection string me **`?sslmode=require`** zaroor hona chahiye!

---

### Step 2: Vercel Dashboard Me Environment Variables Set Karein

1. **Vercel Dashboard** me jayein: https://vercel.com/dashboard
2. Aapki project select karein
3. **Settings** tab click karein
4. **Environment Variables** section me jayein
5. **Add** button click karein

#### Zaroori Environment Variables:

| Variable Name | Value | Example |
|--------------|-------|---------|
| `DATABASE_URL` | Neon connection string | `postgresql://user:pass@ep-xxx.aws.neon.tech/db?sslmode=require` |
| `JWT_SECRET` | Random secret key (minimum 32 characters) | `your-super-secret-key-12345678901234567890` |
| `JWT_EXPIRE` | Token expiry time | `7d` |

#### Steps:

1. **Name**: `DATABASE_URL`
2. **Value**: Aapka Neon connection string paste karein
3. **Environment**: Sab select karein (Production, Preview, Development)
4. **Save** click karein

**Important Notes:**
- ❌ Connection string me quotes (`"` ya `'`) mat lagayein
- ✅ Direct connection string paste karein
- ✅ `?sslmode=require` zaroor hona chahiye

---

### Step 3: Database Schema Push Karein

Agar aapne pehle database schema push nahi kiya, to ab karein:

#### Option A: Local Se Push (Recommended)

```bash
# Local me .env.local file me DATABASE_URL set karein
# Phir run karein:
npx prisma db push
```

#### Option B: Vercel CLI Se (Alternative)

```bash
# Vercel CLI install karein
npm i -g vercel

# Project link karein (agar pehle se nahi hai)
vercel link

# Database push karein (production database URL ke saath)
DATABASE_URL="your-production-url" npx prisma db push
```

---

### Step 4: Vercel Project Redeploy Karein

Environment variables set karne ke baad:

1. **Vercel Dashboard** → **Deployments**
2. Latest deployment ke right side me **"..."** menu
3. **Redeploy** select karein
4. Ya **Settings** → **Clear Build Cache** → Phir redeploy

---

## 🔍 Verification Steps

### 1. Environment Variables Check

Vercel Dashboard me verify karein:
- ✅ `DATABASE_URL` set hai
- ✅ Format correct hai (Neon connection string)
- ✅ `?sslmode=require` included hai
- ✅ Sab environments me set hai (Production, Preview, Development)

### 2. Build Logs Check

1. Vercel Dashboard → **Deployments** → Latest deployment
2. **Build Logs** open karein
3. Koi error dikh raha hai ya nahi check karein

**Common Errors:**
- ❌ `DATABASE_URL is undefined` → Environment variable set nahi hai
- ❌ `Connection refused` → Database URL galat hai
- ❌ `SSL required` → `?sslmode=require` missing hai

### 3. Runtime Logs Check

1. Vercel Dashboard → **Deployments** → Latest deployment
2. **Runtime Logs** (Function Logs) check karein
3. Database connection errors dekh sakte hain

---

## 🐛 Common Issues & Solutions

### Issue 1: "DATABASE_URL is undefined"

**Solution:**
1. Vercel Dashboard → Settings → Environment Variables
2. `DATABASE_URL` verify karein (set hai ya nahi)
3. **Redeploy** karein environment variables set karne ke baad

### Issue 2: "Connection refused" ya "Can't reach database server"

**Solution:**
1. Neon Console me database **active** hai verify karein
2. Connection string **correct** hai verify karein
3. `?sslmode=require` included hai verify karein
4. Network firewall issue ho sakta hai (Neon me check karein)

### Issue 3: "SSL connection required"

**Solution:**
- Connection string me `?sslmode=require` add karein
- Format: `postgresql://...?sslmode=require`

### Issue 4: "Prisma Client not generated"

**Solution:**
- `package.json` me `postinstall` script already add hai:
  ```json
  "postinstall": "prisma generate"
  ```
- Agar ab bhi problem hai to manually verify karein

### Issue 5: "Tables don't exist"

**Solution:**
- Database schema push nahi hua
- Run: `npx prisma db push` (production DATABASE_URL ke saath)

---

## 📝 Step-by-Step Checklist

- [ ] Neon database active hai aur connection string available hai
- [ ] Vercel Dashboard me `DATABASE_URL` environment variable set hai
- [ ] Connection string me `?sslmode=require` included hai
- [ ] `JWT_SECRET` environment variable set hai
- [ ] `JWT_EXPIRE` environment variable set hai (optional, default: "7d")
- [ ] Database schema push ho chuka hai (`npx prisma db push`)
- [ ] Vercel project redeploy ho chuka hai (environment variables ke baad)
- [ ] Build logs me koi error nahi hai
- [ ] Runtime logs me database connection successful hai

---

## 🔗 Useful Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Neon Console**: https://console.neon.tech
- **Vercel Environment Variables Docs**: https://vercel.com/docs/concepts/projects/environment-variables
- **Prisma Deployment Guide**: https://www.prisma.io/docs/guides/deployment

---

## 💡 Quick Test

Agar aap verify karna chahte hain ke database connect ho raha hai:

1. Vercel Dashboard → **Deployments** → Latest deployment
2. **Function Logs** me database queries dikhni chahiye
3. Ya aapki API endpoint test karein (e.g., `/api/books`)
4. Agar data mil raha hai to connection successful hai! ✅

---

**Agar ab bhi problem ho to Vercel build logs/runtime logs share karein, main help karunga!** 🚀

