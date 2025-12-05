# 📚 Book Valley - Online Book Store

**Complete E-Commerce Platform for Books**

Built with Next.js 15.5.4, React 19.1.0, PostgreSQL, and TailwindCSS v4

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Setup database (update .env.local with your PostgreSQL URL)

# 3. Generate Prisma Client
npm run prisma:generate

# 4. Create database tables
npm run prisma:push

# 5. Seed initial data
npm run prisma:seed

# 6. Start development server
npm run dev
```

**Open:** http://localhost:3000

---

## ✨ Features

### **Frontend:**
- ✅ Homepage with 6 book categories
- ✅ User Authentication (Login/Signup)
- ✅ Book Listing Pages (6 categories)
- ✅ Search Functionality
- ✅ Responsive Design (Mobile-friendly)
- ✅ Beautiful UI with TailwindCSS

### **Backend (37 APIs):**
- ✅ User Authentication (JWT)
- ✅ Books Management (CRUD)
- ✅ Shopping Cart System
- ✅ Orders Management
- ✅ User Profile & Wishlist
- ✅ Admin Dashboard
- ✅ Reviews & Ratings
- ✅ Analytics & Reports

### **Database:**
- ✅ PostgreSQL with Prisma ORM
- ✅ 12 Tables (User, Book, Order, Cart, etc.)
- ✅ Pre-seeded with 12 books + 6 categories

---

## 📋 Tech Stack

- **Frontend:** Next.js 15.5.4, React 19.1.0
- **Styling:** TailwindCSS v4
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT (jsonwebtoken)
- **Password:** bcryptjs

---

## 🗂️ Project Structure

```
project dana sarkat/
├── src/app/
│   ├── api/              ← 37 Backend APIs
│   ├── componenets/      ← React Components
│   ├── LoginPage/        ← Login Page
│   ├── signup/           ← Signup Page
│   ├── NovelBooks/       ← Book Pages
│   └── ...
├── prisma/
│   ├── schema.prisma     ← Database Schema
│   └── seed.js           ← Initial Data
├── public/               ← Images
└── .env.local            ← Environment Variables
```

---

## 🔐 Admin Access

After running `npm run prisma:seed`:

```
Email: admin@bookvalley.com
Password: admin123
```

---

## 📚 Documentation

- **[START_PROJECT.md](START_PROJECT.md)** - Complete setup guide
- **[BACKEND_SETUP_GUIDE.md](BACKEND_SETUP_GUIDE.md)** - Backend details
- **[ADMIN_DASHBOARD_GUIDE.md](ADMIN_DASHBOARD_GUIDE.md)** - Admin features
- **[COMPLETE_API_LIST.md](COMPLETE_API_LIST.md)** - All 37 APIs
- **[QUICK_START.md](QUICK_START.md)** - Quick reference

---

## 🎯 Initial Data

After seeding:
- ✅ 1 Admin User
- ✅ 6 Book Categories
- ✅ 12 Urdu Novels
- ✅ 2 Authors
- ✅ Site Settings

---

## 🧪 Test APIs

```bash
# Get Categories
curl http://localhost:3000/api/categories

# Get Books
curl http://localhost:3000/api/books

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@bookvalley.com","password":"admin123"}'
```

---

## 📞 Developer

**Muhammad Rizwan**  
Email: mlkrizwan213@gmail.com  
Phone: +92 309 5693653

---

## 📄 License

This project is for educational purposes.

---

**Status:** ✅ Production Ready  
**Version:** 1.0.0  
**Last Updated:** 2025-12-03
