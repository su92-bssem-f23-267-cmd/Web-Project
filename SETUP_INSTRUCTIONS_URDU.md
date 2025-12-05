# 🚀 Book Valley - Backend Setup Guide (Urdu)

## ✅ Backend Tayyar Hai!

Tumhara complete backend ready hai with:
- ✅ 37 APIs (Authentication, Books, Cart, Orders, Admin Dashboard)
- ✅ PostgreSQL Database Schema
- ✅ 12 Tables
- ✅ Admin Panel
- ✅ JWT Authentication

---

## 📋 Setup Karne Ka Tareeqa (Step by Step)

### **Step 1: Dependencies Install Karo**

```bash
npm install
```

Ye sab install karega:
- Next.js, React
- Prisma (Database)
- bcryptjs (Password encryption)
- jsonwebtoken (Authentication)

---

### **Step 2: Database Setup (ZAROORI)**

**Tumhe PostgreSQL chahiye. 3 options hain:**

#### **Option 1: Free Cloud Database (BEST - Download ki zaroorat nahi)**

**Neon.tech use karo (100% FREE):**

1. Website kholo: **https://neon.tech**
2. Sign up karo (email se)
3. "Create Project" pe click karo
4. Project name do: `book_valley`
5. Connection string copy karo (ye milega):
   ```
   postgresql://username:password@ep-xxx.neon.tech/book_valley
   ```
6. Project folder me `.env.local` file kholo
7. Ye line add karo:
   ```env
   DATABASE_URL="postgresql://username:password@ep-xxx.neon.tech/book_valley"
   ```

**Bas! Database ready hai. Kuch download nahi karna.**

---

#### **Option 2: Supabase (Bhi FREE hai)**

1. Website: **https://supabase.com**
2. Sign up karo
3. New project banao
4. Settings > Database me jao
5. Connection string copy karo
6. `.env.local` me paste karo

---

#### **Option 3: Local PostgreSQL (Agar space hai)**

1. Download: https://www.postgresql.org/download/
2. Install karo
3. pgAdmin kholo
4. Database banao: `book_valley`
5. `.env.local` me ye likho:
   ```env
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/book_valley"
   ```

---

### **Step 3: Prisma Client Generate Karo**

```bash
npm run prisma:generate
```

Ye database client banaega.

---

### **Step 4: Database Tables Banao**

```bash
npm run prisma:push
```

Ye 12 tables banaega:
- User, Book, Category, Cart, Order, etc.

---

### **Step 5: Initial Data Add Karo**

```bash
npm run prisma:seed
```

Ye add karega:
- ✅ 1 Admin User (admin@bookvalley.com / admin123)
- ✅ 6 Categories (Novel, Islamic, Story, Medical, Computer, Educational)
- ✅ 12 Books (Salaar Sikandar, Peer E Kamil, etc.)
- ✅ 2 Authors

---

### **Step 6: Project Start Karo**

```bash
npm run dev
```

**Done! Project chal gaya:** http://localhost:3000

---

## 🎯 Kya Milega?

### **Frontend:**
- Homepage with 6 categories
- Login/Signup pages
- Books listing pages
- Beautiful UI

### **Backend (37 APIs):**
- User registration & login
- Books management
- Shopping cart
- Orders system
- Admin dashboard
- Reviews & ratings

### **Admin Panel:**
- Email: admin@bookvalley.com
- Password: admin123

---

## 🧪 Backend Test Karo

### **Browser me ye URLs kholo:**

```
http://localhost:3000/api/categories
http://localhost:3000/api/books
```

Agar JSON data dikhe to backend working hai! ✅

---

## ⚠️ Important Notes

1. **Database ZAROORI hai** - Bina database ke backend nahi chalega
2. **Neon.tech FREE hai** - Kuch download nahi karna, online database hai
3. **`.env.local` file zaroori hai** - Database URL yahan hona chahiye
4. **Commands order me run karo** - Ek ke baad ek

---

## 🐛 Agar Error Aaye

### **Error: "Can't reach database"**
- Check karo `.env.local` me DATABASE_URL sahi hai
- Neon.tech pe jao aur connection string dobara copy karo

### **Error: "Prisma Client not found"**
```bash
npm run prisma:generate
```

### **Error: "Module not found"**
```bash
npm install
```

### **Error: "Port 3000 already in use"**
```bash
npm run dev -- -p 3001
```

---

## 📊 Database Info

Seed ke baad ye milega:

**Admin Login:**
- Email: admin@bookvalley.com
- Password: admin123

**6 Categories:**
- Novel Books
- Islamic Books
- Story Books
- Medical Books
- Computer Books
- Educational Books

**12 Books:**
- Salaar Sikandar (RS 1800)
- Salaar Imaama (RS 1500)
- Aab E Hayaat (RS 1900)
- Peer E Kamil (RS 1400)
- Jaan (RS 2500)
- Omar O Ayaar (RS 2700)
- Beast Ka Ishq (RS 2300)
- Diyaar E Dil (RS 2800)
- Ghulam Baagh (RS 2600)
- Khaali Asmaan (RS 2400)
- Mera Ishq (RS 2900)
- Ye Dil Mera (RS 2550)

---

## 📁 Project Structure

```
project dana sarkat/
├── src/app/api/          ← 37 Backend APIs yahan hain
├── prisma/
│   ├── schema.prisma     ← Database structure
│   └── seed.js           ← Initial data
├── .env.local            ← Database URL yahan
└── package.json
```

---

## ✅ Complete Commands (Ek Saath)

Agar sab ek saath karna hai:

```bash
npm install && npm run prisma:generate && npm run prisma:push && npm run prisma:seed && npm run dev
```

---

## 🎉 Summary

**Backend 100% Ready Hai:**
- ✅ 37 APIs implemented
- ✅ PostgreSQL database schema
- ✅ Authentication system
- ✅ Admin dashboard
- ✅ Shopping cart
- ✅ Orders management
- ✅ 12 books pre-loaded

**Bas Database Setup Karna Hai:**
- Neon.tech use karo (FREE, no download)
- Connection string copy karo
- `.env.local` me paste karo
- Commands run karo
- Done!

---

## 📞 Contact

**Developer:** Muhammad Rizwan  
**Email:** mlkrizwan213@gmail.com  
**Phone:** +92 309 5693653

---

## 📚 Documentation Files

- `START_PROJECT.md` - English detailed guide
- `BACKEND_SETUP_GUIDE.md` - Backend details
- `ADMIN_DASHBOARD_GUIDE.md` - Admin features
- `COMPLETE_API_LIST.md` - All 37 APIs list
- `QUICK_START.md` - Quick reference

---

**Status:** ✅ PRODUCTION READY  
**Last Updated:** 2025-12-03
