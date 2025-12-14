# Vercel Environment Variables Setup - Step by Step

## 🎯 Goal: DATABASE_URL Set Karna Vercel Me

Aapka Vercel account: `su92-bssem-f23-267@superior.edu.pk`
GitHub: Connected ✅

---

## 📋 Step-by-Step Instructions

### Step 1: Vercel Dashboard Kholen

1. Browser me jayein: **https://vercel.com**
2. **Login** karein (email: `su92-bssem-f23-267@superior.edu.pk`)
3. Ya directly: **https://vercel.com/dashboard**

### Step 2: Aapki Project Select Karein

1. Dashboard me aapki **Book Valley** project dikhni chahiye
2. Project name pe **click** karein
3. Ya agar multiple projects hain to **Web-Project** ya **Book_valley_Project** select karein

### Step 3: Settings Tab Me Jao

1. Project page ke top me tabs honge:
   - Overview | Deployments | Analytics | **Settings** | ...
2. **Settings** tab pe click karein

### Step 4: Environment Variables Section

1. Settings page me left sidebar me options honge:
   - General
   - Domains
   - **Environment Variables** ← Yahan click karein
   - Build & Development Settings
   - etc.

2. **Environment Variables** pe click karein

### Step 5: DATABASE_URL Add Karein

1. **"Add New"** ya **"Add"** button pe click karein

2. Form me ye details fill karein:

   **Name:**
   ```
   DATABASE_URL
   ```

   **Value:**
   ```
   postgresql://username:password@ep-xxxxx.region.aws.neon.tech/dbname?sslmode=require
   ```
   *(Aapka actual Neon connection string paste karein)*

   **Environment:**
   - ✅ Production
   - ✅ Preview  
   - ✅ Development
   *(Sab 3 checkboxes select karein)*

3. **Save** button pe click karein

### Step 6: JWT_SECRET Add Karein (Agar Nahi Hai)

1. Phir se **"Add New"** click karein

2. **Name:**
   ```
   JWT_SECRET
   ```

   **Value:**
   ```
   your-super-secret-jwt-key-minimum-32-characters-long-1234567890
   ```
   *(Koi bhi random strong string, minimum 32 characters)*

   **Environment:**
   - ✅ Production
   - ✅ Preview
   - ✅ Development

3. **Save** click karein

### Step 7: JWT_EXPIRE Add Karein (Optional)

1. **"Add New"** click karein

2. **Name:**
   ```
   JWT_EXPIRE
   ```

   **Value:**
   ```
   7d
   ```

   **Environment:**
   - ✅ Production
   - ✅ Preview
   - ✅ Development

3. **Save** click karein

---

## ✅ Verification

### Check Karein Ke Variables Set Ho Gaye

1. Environment Variables page me aapko ye dikhna chahiye:
   - ✅ `DATABASE_URL` (value hidden, "••••••" dikhega)
   - ✅ `JWT_SECRET` (value hidden)
   - ✅ `JWT_EXPIRE` (value: `7d`)

2. Har variable ke right side me **3 dots (⋯)** menu hoga
   - Edit karne ke liye
   - Delete karne ke liye

---

## 🔄 Redeploy Karein

Environment variables set karne ke baad **redeploy** zaroori hai!

### Method 1: Latest Deployment Se

1. **Deployments** tab pe jayein
2. Latest deployment (top pe) ke right side me **"⋯"** menu
3. **Redeploy** select karein
4. Confirm karein

### Method 2: Settings Se

1. **Settings** → **Build & Development Settings**
2. **Clear Build Cache** button (agar available ho)
3. Phir **Deployments** tab se redeploy karein

### Method 3: GitHub Push Se

1. Koi bhi small change karein (e.g., README me space add)
2. Commit aur push karein:
   ```bash
   git add .
   git commit -m "Trigger redeploy"
   git push origin main
   ```
3. Vercel automatically redeploy karega

---

## 🧪 Test Karein

Deployment complete hone ke baad:

1. Aapki Vercel URL visit karein:
   ```
   https://your-project-name.vercel.app/api/health/database
   ```

2. **Expected Success Response:**
   ```json
   {
     "success": true,
     "message": "Database connection successful",
     "database": {
       "connected": true,
       "users": 0,
       "url": "Set (hidden for security)"
     }
   }
   ```

3. **Agar Error Aaye:**
   ```json
   {
     "success": false,
     "error": "DATABASE_URL environment variable is not set"
   }
   ```
   → Matlab variable properly set nahi hua, phir se check karein

---

## ⚠️ Important Notes

1. **Connection String Format:**
   - ✅ Correct: `postgresql://user:pass@host/db?sslmode=require`
   - ❌ Wrong: `"postgresql://..."` (quotes mat lagayein)

2. **Neon Connection String:**
   - Neon Console se copy karein
   - Format: `postgresql://username:password@ep-xxxxx.region.aws.neon.tech/dbname?sslmode=require`
   - `?sslmode=require` zaroor hona chahiye!

3. **Redeploy Zaroori:**
   - Environment variables set karne ke baad redeploy karna zaroori hai
   - Nahi to purane values use hongi

4. **Multiple Environments:**
   - Production, Preview, Development - sab me same values set karein
   - Ya agar different chahiye to alag-alag set kar sakte hain

---

## 🆘 Agar Problem Ho

### Problem: "Variable set nahi ho raha"
- Browser refresh karein
- Logout/login karein
- Clear browser cache

### Problem: "Redeploy ke baad bhi error"
- Build logs check karein (Deployments → Latest → Build Logs)
- Runtime logs check karein (Deployments → Latest → Function Logs)
- `/api/health/database` endpoint test karein

### Problem: "Neon connection string nahi pata"
- Neon Console: https://console.neon.tech
- Project select karein
- Connection Details → Connection string copy karein

---

## 📞 Next Steps

1. ✅ Vercel Dashboard me DATABASE_URL set karein
2. ✅ JWT_SECRET set karein
3. ✅ Redeploy karein
4. ✅ `/api/health/database` test karein
5. ✅ Agar success aaye to database connected hai! 🎉

---

**Agar koi step me problem ho to bata dein, main help karunga!** 🚀

