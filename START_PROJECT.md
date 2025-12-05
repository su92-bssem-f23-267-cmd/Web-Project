# 🚀 Start Project - Complete Setup Guide

## ⚡ Quick Start (5 Steps)

```bash
# Step 1: Install all dependencies
npm install

# Step 2: Setup database (choose one option below)
# Then update .env.local with your DATABASE_URL

# Step 3: Generate Prisma Client
npm run prisma:generate

# Step 4: Create database tables
npm run prisma:push

# Step 5: Add initial data (12 books + 6 categories + admin user)
npm run prisma:seed

# Step 6: Start the project
npm run dev
```

**Project will run on:** http://localhost:3000

---

## 📋 Detailed Setup Instructions

### **Step 1: Install Dependencies**

```bash
npm install
```

This will install:
- Next.js 15.5.4
- React 19.1.0
- Prisma (Database ORM)
- bcryptjs (Password hashing)
- jsonwebtoken (Authentication)
- All other dependencies

---

### **Step 2: Setup PostgreSQL Database**

You have 3 options:

#### **Option A: Free Cloud Database (Recommended - Easiest)**

**Using Neon.tech (Free):**
1. Go to: https://neon.tech
2. Sign up (free account)
3. Click "Create Project"
4. Copy the connection string
5. Open `.env.local` file
6. Paste connection string:
```env
DATABASE_URL="postgresql://username:password@host/database?sslmode=require"
```

#### **Option B: Supabase (Free)**
1. Go to: https://supabase.com
2. Create new project
3. Go to Settings > Database
4. Copy connection string (Connection Pooling)
5. Update `.env.local`

#### **Option C: Local PostgreSQL**
1. Download: https://www.postgresql.org/download/
2. Install PostgreSQL
3. Open pgAdmin or terminal
4. Create database:
```sql
CREATE DATABASE book_valley;
```
5. Update `.env.local`:
```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/book_valley"
```

---

### **Step 3: Generate Prisma Client**

```bash
npm run prisma:generate
```

This creates the Prisma Client based on your schema.

---

### **Step 4: Create Database Tables**

```bash
npm run prisma:push
```

This creates all 12 tables in your database:
- User
- Category
- Author
- Book
- Cart
- CartItem
- Order
- OrderItem
- Payment
- Review
- Wishlist
- Settings

---

### **Step 5: Seed Initial Data**

```bash
npm run prisma:seed
```

This adds:
- ✅ 1 Admin User (admin@bookvalley.com / admin123)
- ✅ 6 Categories (Novel, Islamic, Story, Medical, Computer, Educational)
- ✅ 2 Authors (Rizwan, Umera Ahmed)
- ✅ 12 Books (All novels with images and prices)
- ✅ Site Settings

---

### **Step 6: Start Development Server**

```bash
npm run dev
```

**Your project is now running!**

Open browser: http://localhost:3000

---

## 🎯 What You'll See

### **Frontend Pages:**
- ✅ Homepage with 6 categories
- ✅ Login/Signup pages
- ✅ Novel Books page (12 books)
- ✅ Islamic Books page
- ✅ Story Books page
- ✅ Medical Books page
- ✅ Computer Books page
- ✅ Educational Books page
- ✅ About Us page

### **Backend APIs (37 endpoints):**
- ✅ Authentication APIs
- ✅ Books APIs
- ✅ Cart APIs
- ✅ Orders APIs
- ✅ User Profile APIs
- ✅ Admin Dashboard APIs
- ✅ And more...

---

## 🧪 Test Your Backend

### **Test 1: Get Categories**
Open browser: http://localhost:3000/api/categories

You should see 6 categories in JSON format.

### **Test 2: Get Books**
Open browser: http://localhost:3000/api/books

You should see 12 books.

### **Test 3: Login as Admin**
Use Postman or Thunder Client:
```
POST http://localhost:3000/api/auth/login
Body: {
  "email": "admin@bookvalley.com",
  "password": "admin123"
}
```

Copy the token from response.

### **Test 4: Get Admin Dashboard**
```
GET http://localhost:3000/api/admin/dashboard
Header: Authorization: Bearer YOUR_TOKEN
```

---

## 📁 Project Structure

```
project dana sarkat/
├── prisma/
│   ├── schema.prisma       ← Database schema
│   └── seed.js             ← Initial data
├── src/
│   ├── app/
│   │   ├── api/            ← Backend APIs (37 endpoints)
│   │   ├── componenets/    ← React components
│   │   ├── LoginPage/      ← Login page
│   │   ├── signup/         ← Signup page
│   │   ├── NovelBooks/     ← Books pages
│   │   └── ...
│   └── lib/
│       ├── prisma.js       ← Database client
│       └── auth.js         ← Auth utilities
├── public/                 ← Images
├── .env.local              ← Environment variables
└── package.json
```

---

## 🔧 Environment Variables

Your `.env.local` file should have:

```env
# Database (REQUIRED)
DATABASE_URL="postgresql://user:pass@host:5432/book_valley"

# JWT (REQUIRED)
JWT_SECRET="your-super-secret-jwt-key-change-this"
JWT_EXPIRE="7d"

# App
NODE_ENV="development"
BASE_URL="http://localhost:3000"
```

---

## 🐛 Common Issues & Solutions

### **Issue 1: "Can't reach database"**
**Solution:**
- Check PostgreSQL is running
- Verify DATABASE_URL in `.env.local`
- Test connection: `npm run prisma:push`

### **Issue 2: "Prisma Client not found"**
**Solution:**
```bash
npm run prisma:generate
```

### **Issue 3: "Module not found"**
**Solution:**
```bash
npm install
```

### **Issue 4: "Port 3000 already in use"**
**Solution:**
```bash
# Use different port
npm run dev -- -p 3001
```

### **Issue 5: "Seed failed - unique constraint"**
**Solution:**
Database already has data. To reset:
```bash
# Delete all data and re-seed
npm run prisma:push --force-reset
npm run prisma:seed
```

---

## 📊 Database Info

After seeding, you'll have:

**Admin Account:**
- Email: admin@bookvalley.com
- Password: admin123

**Categories (6):**
- Novel Books
- Islamic Books
- Story Books
- Medical Books
- Computer Books
- Educational Books

**Books (12 Novels):**
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

## 🎉 You're All Set!

Your project is now running with:
- ✅ Frontend (Next.js + React + TailwindCSS)
- ✅ Backend (37 API endpoints)
- ✅ Database (PostgreSQL with Prisma)
- ✅ Authentication (JWT)
- ✅ Admin Dashboard
- ✅ 12 Books pre-loaded
- ✅ 6 Categories pre-loaded

---

## 📚 Next Steps

1. **Test Frontend:** Browse http://localhost:3000
2. **Test APIs:** Use browser or Postman
3. **Login as Admin:** Use admin@bookvalley.com / admin123
4. **Add More Books:** Use admin APIs
5. **Customize:** Edit pages and components

---

## 📞 Need Help?

**Developer:** Muhammad Rizwan  
**Email:** mlkrizwan213@gmail.com  
**Phone:** +92 309 5693653

**Documentation:**
- `BACKEND_SETUP_GUIDE.md` - Backend details
- `ADMIN_DASHBOARD_GUIDE.md` - Admin features
- `COMPLETE_API_LIST.md` - All 37 APIs
- `QUICK_START.md` - Quick reference

---

**Status:** ✅ READY TO RUN  
**Last Updated:** 2025-12-03
